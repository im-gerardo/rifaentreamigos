create or replace function review_payment(p_payment uuid,p_approve boolean,p_actor uuid)
returns void language plpgsql security definer set search_path=public as $$
declare v_payment payments%rowtype;v_order orders%rowtype;v_approved bigint;
begin
 select * into v_payment from payments where id=p_payment for update;
 if not found or v_payment.state<>'pending' then raise exception 'PAYMENT_NOT_PENDING';end if;
 select * into v_order from orders where id=v_payment.order_id for update;
 if v_order.state in ('expired','cancelled') then raise exception 'ORDER_NOT_ACTIVE';end if;
 update payments set state=case when p_approve then 'approved'::payment_state else 'rejected'::payment_state end,reviewed_by=p_actor,reviewed_at=now() where id=p_payment;
 select coalesce(sum(amount_cents),0) into v_approved from payments where order_id=v_order.id and state='approved';
 if v_approved>v_order.total_cents then raise exception 'OVERPAYMENT';end if;
 if v_approved=v_order.total_cents then
  update orders set state='paid' where id=v_order.id;
  update tickets set state='paid' where id in(select ticket_id from order_items where order_id=v_order.id and released_at is null);
 elsif v_approved>0 then update orders set state='partial' where id=v_order.id;
 else update orders set state='reserved' where id=v_order.id;end if;
 insert into audit_logs(actor_id,entity,entity_id,action,details) values(p_actor,'payments',p_payment,case when p_approve then 'approved' else 'rejected' end,jsonb_build_object('amount_cents',v_payment.amount_cents));
end $$;
revoke all on function review_payment(uuid,boolean,uuid) from public,anon,authenticated;
