-- Datos exclusivamente sintéticos dentro del contenedor recién creado.
-- Auth aquí es contrato mínimo: estas filas NO representan usuarios/login reales.
insert into auth.users(id,email) values
 ('10000000-0000-4000-8000-000000000001','admin@example.invalid'),
 ('10000000-0000-4000-8000-000000000002','seller-a@example.invalid'),
 ('10000000-0000-4000-8000-000000000003','seller-b@example.invalid'),
 ('10000000-0000-4000-8000-000000000004','inactive@example.invalid'),
 ('10000000-0000-4000-8000-000000000005','no-profile@example.invalid');
insert into public.profiles(id,role,active) values
 ('10000000-0000-4000-8000-000000000001','admin',true),
 ('10000000-0000-4000-8000-000000000002','seller',true),
 ('10000000-0000-4000-8000-000000000003','seller',true),
 ('10000000-0000-4000-8000-000000000004','seller',false);
insert into public.buyers(id,name,phone) values
 ('30000000-0000-4000-8000-000000000001','[DEMO] Comprador A','0000000001'),
 ('30000000-0000-4000-8000-000000000002','[DEMO] Comprador B','0000000002');
insert into public.orders(id,raffle_id,buyer_id,seller_id,source,state,total_cents,expires_at) values
 ('40000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001',
  '30000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000002','seller','proof_pending',25000,now()+interval '1 hour'),
 ('40000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000001',
  '30000000-0000-4000-8000-000000000002','10000000-0000-4000-8000-000000000003','seller','proof_pending',25000,now()+interval '1 hour');
insert into public.tickets(id,raffle_id,folio,state) values
 ('50000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001',1,'reconciliation_hold'),
 ('50000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000001',2,'reconciliation_hold');
insert into public.ticket_numbers(raffle_id,ticket_id,number)
 select '20000000-0000-4000-8000-000000000001','50000000-0000-4000-8000-000000000001',n from generate_series(0,4) n;
insert into public.ticket_numbers(raffle_id,ticket_id,number)
 select '20000000-0000-4000-8000-000000000001','50000000-0000-4000-8000-000000000002',n from generate_series(5,9) n;
insert into public.order_items(order_id,ticket_id,price_cents) values
 ('40000000-0000-4000-8000-000000000001','50000000-0000-4000-8000-000000000001',25000),
 ('40000000-0000-4000-8000-000000000002','50000000-0000-4000-8000-000000000002',25000);
insert into public.payments(id,order_id,amount_cents,method) values
 ('60000000-0000-4000-8000-000000000001','40000000-0000-4000-8000-000000000001',5000,'cash'),
 ('60000000-0000-4000-8000-000000000002','40000000-0000-4000-8000-000000000002',5000,'cash');
insert into public.payment_evidence(payment_id,storage_path) values
 ('60000000-0000-4000-8000-000000000001','demo/a.pdf'),
 ('60000000-0000-4000-8000-000000000002','demo/b.pdf');
insert into public.order_consents(order_id) values
 ('40000000-0000-4000-8000-000000000001'),('40000000-0000-4000-8000-000000000002');
insert into public.idempotency_keys(actor_id,operation,request_key,request_hash,order_id) values
 ('10000000-0000-4000-8000-000000000002','seller_reservation','80000000-0000-4000-8000-000000000001','demo-a','40000000-0000-4000-8000-000000000001'),
 ('10000000-0000-4000-8000-000000000003','seller_reservation','80000000-0000-4000-8000-000000000002','demo-b','40000000-0000-4000-8000-000000000002');
insert into public.ticket_events(ticket_id,actor_id,action) values
 ('50000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000002','demo'),
 ('50000000-0000-4000-8000-000000000002','10000000-0000-4000-8000-000000000003','demo');
insert into public.audit_logs(actor_id,entity,action) values
 ('10000000-0000-4000-8000-000000000002','demo','demo');
insert into public.raffle_closures(raffle_id,snapshot) values
 ('20000000-0000-4000-8000-000000000001','{"demo":true}');
