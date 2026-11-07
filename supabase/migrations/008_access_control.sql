-- Aditiva: mínimo acceso explícito, sin abrir ventas ni escrituras de navegador.
-- service_role NO obtiene DML directo: cambios solo por RPC autorizadas en servidor.
alter table public.order_consents enable row level security;
alter table public.idempotency_keys enable row level security;

create function public.current_active_app_role()
returns public.app_role
language sql stable security definer
set search_path = ''
as $$
  select p.role from public.profiles p where p.id = auth.uid() and p.active;
$$;
revoke all on function public.current_active_app_role() from public, anon, authenticated, service_role;
grant execute on function public.current_active_app_role() to authenticated;

grant usage on schema public to authenticated, service_role;
revoke all on table public.profiles, public.raffles, public.raffle_rules,
  public.tickets, public.ticket_numbers, public.buyers, public.orders,
  public.order_items, public.payments, public.payment_evidence, public.ticket_events,
  public.audit_logs, public.raffle_closures, public.order_consents, public.idempotency_keys
  from public, anon, authenticated, service_role;

grant select on table public.profiles, public.raffles, public.raffle_rules,
  public.tickets, public.ticket_numbers, public.buyers, public.orders,
  public.order_items, public.payments, public.payment_evidence, public.ticket_events,
  public.audit_logs, public.raffle_closures, public.order_consents, public.idempotency_keys
  to authenticated;

-- Solo tablas consultadas por las rutas de servidor recuperadas. RLS no protege
-- este rol privilegiado: la autorización de cada API sigue siendo obligatoria.
grant select on table public.profiles, public.raffles, public.tickets,
  public.ticket_numbers, public.buyers, public.orders, public.payments to service_role;

create policy profiles_read on public.profiles for select to authenticated
using (public.current_active_app_role() = 'admin'
  or (id = auth.uid() and active and public.current_active_app_role() = 'seller'));
create policy raffles_read on public.raffles for select to authenticated
using (public.current_active_app_role() in ('admin','seller'));
create policy rules_read on public.raffle_rules for select to authenticated
using (public.current_active_app_role() in ('admin','seller'));
create policy tickets_read on public.tickets for select to authenticated
using (public.current_active_app_role() in ('admin','seller'));
create policy numbers_read on public.ticket_numbers for select to authenticated
using (public.current_active_app_role() in ('admin','seller'));
create policy orders_read on public.orders for select to authenticated
using (public.current_active_app_role() = 'admin'
  or (public.current_active_app_role() = 'seller' and seller_id = auth.uid()));
create policy buyers_read on public.buyers for select to authenticated
using (public.current_active_app_role() = 'admin'
  or (public.current_active_app_role() = 'seller'
    and exists (select 1 from public.orders o where o.buyer_id = buyers.id and o.seller_id = auth.uid())));
create policy items_read on public.order_items for select to authenticated
using (exists (select 1 from public.orders o where o.id = order_items.order_id));
create policy payments_read on public.payments for select to authenticated
using (exists (select 1 from public.orders o where o.id = payments.order_id));
create policy evidence_read on public.payment_evidence for select to authenticated
using (exists (select 1 from public.payments p where p.id = payment_evidence.payment_id));
create policy ticket_events_read on public.ticket_events for select to authenticated
using (public.current_active_app_role() = 'admin'
  or (public.current_active_app_role() = 'seller' and actor_id = auth.uid()));
create policy audit_read on public.audit_logs for select to authenticated
using (public.current_active_app_role() = 'admin');
create policy closures_read on public.raffle_closures for select to authenticated
using (public.current_active_app_role() = 'admin');
create policy consents_read on public.order_consents for select to authenticated
using (exists (select 1 from public.orders o where o.id = order_consents.order_id));
create policy idempotency_read on public.idempotency_keys for select to authenticated
using (public.current_active_app_role() = 'admin'
  or (public.current_active_app_role() = 'seller' and actor_id = auth.uid()));

-- Las funciones privilegiadas no son RPC de navegador, ni siquiera para admin.
revoke all on function public.reserve_tickets(uuid,text,text,uuid[],text,uuid)
  from public, anon, authenticated, service_role;
revoke all on function public.reserve_tickets(uuid,text,text,uuid[],text,uuid,uuid)
  from public, anon, authenticated, service_role;
revoke all on function public.register_payment(uuid,integer,text,text,uuid)
  from public, anon, authenticated, service_role;
revoke all on function public.review_payment(uuid,boolean,uuid)
  from public, anon, authenticated, service_role;
revoke all on function public.expire_reservations()
  from public, anon, authenticated, service_role;
revoke all on function public.private_require_active_role(uuid,public.app_role[])
  from public, anon, authenticated, service_role;
revoke all on function public.publish_raffle_batch(uuid,jsonb)
  from public, anon, authenticated, service_role;
grant execute on function public.reserve_tickets(uuid,text,text,uuid[],text,uuid,uuid),
  public.register_payment(uuid,integer,text,text,uuid),
  public.review_payment(uuid,boolean,uuid), public.expire_reservations() to service_role;

-- Supabase puede preinstalar pgcrypto en extensions. Mantener pg_temp al final
-- y ambos schemas de aplicación/extensión bajo control del owner.
alter function public.reserve_tickets(uuid,text,text,uuid[],text,uuid,uuid)
  set search_path = public, extensions, pg_temp;

alter function public.fn_audit_ticket_state_change() set search_path = public, pg_temp;
revoke all on function public.fn_audit_ticket_state_change() from public, anon, authenticated, service_role;

-- Default global del owner: un REVOKE solo por schema no anula el EXECUTE
-- público que PostgreSQL concede por defecto globalmente a nuevas funciones.
alter default privileges revoke execute on functions from public;
