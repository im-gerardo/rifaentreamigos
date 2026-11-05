-- Service-role-only RPC; transaction and row locks prevent double booking.
create or replace function reserve_tickets(p_raffle uuid,p_name text,p_phone text,p_ticket_ids uuid[],p_source text,p_seller uuid default null)
returns uuid language plpgsql security definer set search_path=public as $$
declare v_raffle raffles%rowtype;v_count integer;v_buyer uuid;v_order uuid;v_ticket uuid;
begin
 if array_length(p_ticket_ids,1) is null or array_length(p_ticket_ids,1)>20 or array_length(p_ticket_ids,1)<>(select count(distinct x) from unnest(p_ticket_ids) x) then raise exception 'INVALID_SELECTION';end if;
 select * into v_raffle from raffles where id=p_raffle for share;
 if not found or v_raffle.status<>'open' then raise exception 'RAFFLE_NOT_OPEN';end if;
 select count(*) into v_count from (select id from tickets where id=any(p_ticket_ids) and raffle_id=p_raffle and state='available' for update) locked;
 if v_count<>array_length(p_ticket_ids,1) then raise exception 'TICKETS_UNAVAILABLE';end if;
 insert into buyers(name,phone) values(p_name,p_phone) returning id into v_buyer;
 insert into orders(raffle_id,buyer_id,seller_id,source,total_cents,expires_at)
 values(p_raffle,v_buyer,p_seller,p_source,v_raffle.price_cents*v_count,least(now()+make_interval(hours=>v_raffle.reservation_hours),coalesce(v_raffle.payment_deadline,'infinity'::timestamptz))) returning id into v_order;
 foreach v_ticket in array p_ticket_ids loop
  insert into order_items(order_id,ticket_id,price_cents) values(v_order,v_ticket,v_raffle.price_cents);
  update tickets set state='reserved' where id=v_ticket;
  insert into ticket_events(ticket_id,actor_id,action) values(v_ticket,p_seller,'reserved');
 end loop;
 return v_order;
end $$;
revoke all on function reserve_tickets(uuid,text,text,uuid[],text,uuid) from public,anon,authenticated;
