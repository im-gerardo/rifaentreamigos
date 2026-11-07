-- SOLO el runner nuevo; IDs pertenecen a usuarios sintéticos creados por Auth API.
begin;
insert into public.profiles(id,role,active) values
 (:'admin','admin',true),(:'seller_a','seller',true),(:'seller_b','seller',true),(:'inactive','seller',false);
insert into public.buyers(id,name,phone) values
 ('30000000-0000-4000-8000-000000000001','[DEMO] Comprador A','0000000001'),
 ('30000000-0000-4000-8000-000000000002','[DEMO] Comprador B','0000000002');
insert into public.orders(id,raffle_id,buyer_id,seller_id,source,total_cents,expires_at) values
 ('40000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001',
  '30000000-0000-4000-8000-000000000001',:'seller_a','seller',25000,now()+interval '1 hour'),
 ('40000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000001',
  '30000000-0000-4000-8000-000000000002',:'seller_b','seller',25000,now()+interval '1 hour');
commit;
