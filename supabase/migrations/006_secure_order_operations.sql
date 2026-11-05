-- Operaciones críticas de órdenes, pagos y expiraciones.
-- Las funciones no se exponen a anon ni authenticated: las rutas de servidor
-- autentican al actor y la service role es la única que las invoca.

create table idempotency_keys (
  actor_id uuid not null references profiles(id),
  operation text not null check (operation in ('seller_reservation')),
  request_key uuid not null,
  request_hash text not null,
  order_id uuid references orders(id),
  created_at timestamptz not null default now(),
  primary key (actor_id, operation, request_key)
);

create index idempotency_keys_created_at_idx on idempotency_keys(created_at);

create or replace function private_require_active_role(
  p_actor uuid,
  p_allowed app_role[]
)
returns app_role
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_role app_role;
  v_active boolean;
begin
  select role, active into v_role, v_active
  from profiles
  where id = p_actor;

  if not found or not v_active or not (v_role = any (p_allowed)) then
    raise exception 'FORBIDDEN' using errcode = '42501';
  end if;

  return v_role;
end;
$$;

revoke all on function private_require_active_role(uuid, app_role[]) from public, anon, authenticated;

create or replace function reserve_tickets(
  p_raffle uuid,
  p_name text,
  p_phone text,
  p_ticket_ids uuid[],
  p_source text,
  p_seller uuid,
  p_idempotency_key uuid
)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_raffle raffles%rowtype;
  v_count integer;
  v_buyer uuid;
  v_order uuid;
  v_expires_at timestamptz;
  v_request_hash text;
  v_existing_order uuid;
begin
  perform private_require_active_role(p_seller, array['admin', 'seller']::app_role[]);

  if p_source <> 'seller' then
    raise exception 'INVALID_SOURCE';
  end if;

  if coalesce(array_length(p_ticket_ids, 1), 0) = 0
     or array_length(p_ticket_ids, 1) > 20
     or array_length(p_ticket_ids, 1) <> (select count(distinct ticket_id) from unnest(p_ticket_ids) as ticket_id) then
    raise exception 'INVALID_SELECTION';
  end if;

  v_request_hash := encode(
    digest(
      concat_ws(
        '|',
        p_raffle::text,
        p_name,
        p_phone,
        (select string_agg(ticket_id::text, ',' order by ticket_id) from unnest(p_ticket_ids) as ticket_id)
      ),
      'sha256'
    ),
    'hex'
  );

  insert into idempotency_keys(actor_id, operation, request_key, request_hash)
  values (p_seller, 'seller_reservation', p_idempotency_key, v_request_hash)
  on conflict (actor_id, operation, request_key) do nothing;

  select order_id into v_existing_order
  from idempotency_keys
  where actor_id = p_seller
    and operation = 'seller_reservation'
    and request_key = p_idempotency_key
    and request_hash = v_request_hash
  for update;

  if not found then
    raise exception 'IDEMPOTENCY_KEY_REUSED';
  end if;

  if v_existing_order is not null then
    return v_existing_order;
  end if;

  select * into v_raffle
  from raffles
  where id = p_raffle
  for share;

  if not found or v_raffle.status <> 'open' then
    raise exception 'RAFFLE_NOT_OPEN';
  end if;

  v_expires_at := least(
    now() + make_interval(hours => v_raffle.reservation_hours),
    coalesce(v_raffle.payment_deadline, 'infinity'::timestamptz)
  );

  if v_expires_at <= now() then
    raise exception 'RESERVATION_EXPIRED';
  end if;

  select count(*) into v_count
  from (
    select id
    from tickets
    where id = any(p_ticket_ids)
      and raffle_id = p_raffle
      and state = 'available'
    order by id
    for update
  ) as locked_tickets;

  if v_count <> array_length(p_ticket_ids, 1) then
    raise exception 'TICKETS_UNAVAILABLE';
  end if;

  insert into buyers(name, phone)
  values (btrim(p_name), btrim(p_phone))
  returning id into v_buyer;

  insert into orders(raffle_id, buyer_id, seller_id, source, total_cents, expires_at)
  values (
    p_raffle,
    v_buyer,
    p_seller,
    'seller',
    v_raffle.price_cents * v_count,
    v_expires_at
  )
  returning id into v_order;

  insert into order_items(order_id, ticket_id, price_cents)
  select v_order, ticket_id, v_raffle.price_cents
  from unnest(p_ticket_ids) as ticket_id;

  update tickets
  set state = 'reserved'
  where id = any(p_ticket_ids);

  insert into audit_logs(actor_id, entity, entity_id, action, details)
  values (
    p_seller,
    'orders',
    v_order,
    'reserved',
    jsonb_build_object('ticket_count', v_count, 'source', 'seller')
  );

  update idempotency_keys
  set order_id = v_order
  where actor_id = p_seller
    and operation = 'seller_reservation'
    and request_key = p_idempotency_key;

  return v_order;
end;
$$;

revoke all on function reserve_tickets(uuid, text, text, uuid[], text, uuid, uuid) from public, anon, authenticated;
revoke all on function reserve_tickets(uuid, text, text, uuid[], text, uuid) from public, anon, authenticated;

create or replace function register_payment(
  p_order uuid,
  p_amount_cents integer,
  p_method text,
  p_reference text,
  p_actor uuid
)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_role app_role;
  v_order orders%rowtype;
  v_existing_cents bigint;
  v_payment uuid;
begin
  v_role := private_require_active_role(p_actor, array['admin', 'seller']::app_role[]);

  if p_amount_cents <= 0 or p_method not in ('transfer', 'cash') then
    raise exception 'INVALID_PAYMENT';
  end if;

  if p_method = 'transfer' and nullif(btrim(coalesce(p_reference, '')), '') is null then
    raise exception 'PAYMENT_REFERENCE_REQUIRED';
  end if;

  select * into v_order
  from orders
  where id = p_order
  for update;

  if not found then
    raise exception 'ORDER_NOT_FOUND';
  end if;

  if v_role = 'seller' and v_order.seller_id is distinct from p_actor then
    raise exception 'FORBIDDEN' using errcode = '42501';
  end if;

  if v_order.state not in ('reserved', 'partial', 'proof_pending', 'reconciliation_hold') then
    raise exception 'ORDER_NOT_ACTIVE';
  end if;

  select coalesce(sum(amount_cents), 0) into v_existing_cents
  from payments
  where order_id = p_order
    and state in ('pending', 'approved');

  if v_existing_cents + p_amount_cents > v_order.total_cents then
    raise exception 'OVERPAYMENT';
  end if;

  insert into payments(order_id, amount_cents, method, reference)
  values (p_order, p_amount_cents, p_method, nullif(btrim(p_reference), ''))
  returning id into v_payment;

  update orders
  set state = 'proof_pending'
  where id = p_order;

  update tickets
  set state = 'reconciliation_hold'
  where id in (
    select ticket_id
    from order_items
    where order_id = p_order
      and released_at is null
  )
    and state <> 'paid';

  insert into audit_logs(actor_id, entity, entity_id, action, details)
  values (
    p_actor,
    'payments',
    v_payment,
    'registered',
    jsonb_build_object('amount_cents', p_amount_cents, 'method', p_method)
  );

  return v_payment;
end;
$$;

revoke all on function register_payment(uuid, integer, text, text, uuid) from public, anon, authenticated;

create or replace function review_payment(
  p_payment uuid,
  p_approve boolean,
  p_actor uuid
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_payment payments%rowtype;
  v_order orders%rowtype;
  v_approved_cents bigint;
  v_pending_count integer;
begin
  perform private_require_active_role(p_actor, array['admin']::app_role[]);

  select * into v_payment
  from payments
  where id = p_payment
  for update;

  if not found or v_payment.state <> 'pending' then
    raise exception 'PAYMENT_NOT_PENDING';
  end if;

  select * into v_order
  from orders
  where id = v_payment.order_id
  for update;

  if v_order.state in ('expired', 'cancelled') then
    raise exception 'ORDER_NOT_ACTIVE';
  end if;

  if p_approve then
    select coalesce(sum(amount_cents), 0) into v_approved_cents
    from payments
    where order_id = v_order.id
      and state = 'approved';

    if v_approved_cents + v_payment.amount_cents > v_order.total_cents then
      raise exception 'OVERPAYMENT';
    end if;
  end if;

  update payments
  set state = case when p_approve then 'approved'::payment_state else 'rejected'::payment_state end,
      reviewed_by = p_actor,
      reviewed_at = now()
  where id = p_payment;

  select coalesce(sum(amount_cents), 0) into v_approved_cents
  from payments
  where order_id = v_order.id
    and state = 'approved';

  select count(*) into v_pending_count
  from payments
  where order_id = v_order.id
    and state = 'pending';

  if v_approved_cents = v_order.total_cents then
    update orders set state = 'paid' where id = v_order.id;
    update tickets
    set state = 'paid'
    where id in (
      select ticket_id from order_items where order_id = v_order.id and released_at is null
    );
  elsif v_pending_count > 0 then
    update orders set state = 'proof_pending' where id = v_order.id;
  elsif v_approved_cents > 0 then
    update orders set state = 'reconciliation_hold' where id = v_order.id;
  else
    update orders set state = 'reserved' where id = v_order.id;
    update tickets
    set state = 'reserved'
    where id in (
      select ticket_id from order_items where order_id = v_order.id and released_at is null
    )
      and state <> 'paid';
  end if;

  insert into audit_logs(actor_id, entity, entity_id, action, details)
  values (
    p_actor,
    'payments',
    p_payment,
    case when p_approve then 'approved' else 'rejected' end,
    jsonb_build_object('amount_cents', v_payment.amount_cents)
  );
end;
$$;

revoke all on function review_payment(uuid, boolean, uuid) from public, anon, authenticated;

create or replace function expire_reservations()
returns table(expired_orders integer, held_orders integer)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_order orders%rowtype;
  v_has_financial_activity boolean;
begin
  expired_orders := 0;
  held_orders := 0;

  for v_order in
    select *
    from orders
    where state in ('reserved', 'partial')
      and expires_at <= now()
    order by expires_at, id
    for update skip locked
  loop
    select exists(
      select 1
      from payments
      where order_id = v_order.id
        and state in ('pending', 'approved')
    ) into v_has_financial_activity;

    if v_has_financial_activity then
      update orders set state = 'reconciliation_hold' where id = v_order.id;
      update tickets
      set state = 'reconciliation_hold'
      where id in (
        select ticket_id from order_items where order_id = v_order.id and released_at is null
      )
        and state <> 'paid';
      insert into audit_logs(entity, entity_id, action, details)
      values ('orders', v_order.id, 'expired_with_financial_activity', '{}'::jsonb);
      held_orders := held_orders + 1;
    else
      update orders set state = 'expired' where id = v_order.id;
      update order_items set released_at = now()
      where order_id = v_order.id and released_at is null;
      update tickets
      set state = 'available'
      where id in (
        select ticket_id from order_items where order_id = v_order.id
      )
        and state = 'reserved';
      insert into audit_logs(entity, entity_id, action, details)
      values ('orders', v_order.id, 'expired_and_released', '{}'::jsonb);
      expired_orders := expired_orders + 1;
    end if;
  end loop;

  return next;
end;
$$;

revoke all on function expire_reservations() from public, anon, authenticated;
