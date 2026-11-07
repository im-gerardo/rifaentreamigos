begin;
select test_support.assert_true(
 (select count(*) = 15 and bool_and(c.relrowsecurity)
  from pg_class c join pg_namespace n on n.oid=c.relnamespace
  where n.nspname='public' and c.relkind='r'), 'RLS habilitado en las 15 tablas');
select test_support.assert_true((select count(*)=1 and bool_and(status='draft')
 from public.raffles), 'seed repetido deja una sola rifa draft');
select test_support.assert_true((select draw_at is null and payment_deadline is null
 from public.raffles limit 1), 'seed no inventa fechas oficiales');
select test_support.assert_true((select not public from storage.buckets where id='payment-evidence'), 'bucket de comprobantes privado');
select test_support.assert_true((select proconfig @> array['search_path=public, pg_temp']
 from pg_proc where oid='public.fn_audit_ticket_state_change()'::regprocedure), 'trigger fija search_path');
create function public._future_rpc_test() returns integer language sql as $$ select 1; $$;
select test_support.assert_true(not has_function_privilege('anon','public._future_rpc_test()','EXECUTE'), 'futuras funciones no heredan EXECUTE anon');
select test_support.assert_true(not has_function_privilege('authenticated','public._future_rpc_test()','EXECUTE'), 'futuras funciones no heredan EXECUTE authenticated');
select test_support.assert_true(not has_function_privilege('service_role','public._future_rpc_test()','EXECUTE'), 'futuras funciones no heredan EXECUTE service_role');
select test_support.assert_true(not has_schema_privilege('authenticated','public','CREATE'), 'authenticated no sustituye objetos del search_path');
select test_support.assert_true(not has_database_privilege('authenticated',current_database(),'CREATE'), 'authenticated no puede crear schemas del search_path');
select test_support.assert_true((select proconfig @> array['search_path=public, extensions, pg_temp']
 from pg_proc where oid='public.reserve_tickets(uuid,text,text,uuid[],text,uuid,uuid)'::regprocedure), 'reserva admite pgcrypto en extensions con pg_temp al final');

set local role anon;
select test_support.expect_error('select * from public.buyers','42501','anon no lee compradores');
select test_support.expect_error('select * from public.orders','42501','anon no lee ordenes');
select test_support.expect_error('select public.current_active_app_role()','42501','anon no invoca helper de perfil');
select test_support.expect_error($q$select public.reserve_tickets(null,'demo','0000000000',array[]::uuid[],'seller',null,null)$q$,
 '42501','anon no invoca reserva privilegiada');
reset role;

set local role authenticated;
set local "request.jwt.claim.sub" = '10000000-0000-4000-8000-000000000002';
select test_support.assert_true(public.current_active_app_role()='seller','perfil seller activo');
select test_support.assert_true((select count(*)=1 from public.profiles),'seller solo lee su perfil');
select test_support.assert_true((select count(*)=1 from public.orders),'seller A solo lee su orden');
select test_support.assert_true(not exists(select 1 from public.orders where id='40000000-0000-4000-8000-000000000002'),'IDOR orden B ocultada');
select test_support.assert_true((select count(*)=1 from public.buyers),'seller A solo lee su comprador');
select test_support.assert_true((select count(*)=1 from public.order_items),'seller A solo lee sus items');
select test_support.assert_true((select count(*)=1 from public.payments),'seller A solo lee sus pagos');
select test_support.assert_true((select count(*)=1 from public.payment_evidence),'seller A solo lee su evidencia');
select test_support.assert_true((select count(*)=1 from public.order_consents),'seller A solo lee su consentimiento');
select test_support.assert_true((select count(*)=1 from public.idempotency_keys),'seller A solo lee su idempotencia');
select test_support.assert_true((select count(*)=1 from public.ticket_events),'seller A solo lee sus eventos');
select test_support.assert_true((select count(*)=0 from public.audit_logs),'seller no lee auditoria global');
select test_support.assert_true((select count(*)=0 from public.raffle_closures),'seller no lee snapshots');
select test_support.assert_true((select count(*)=2 from public.tickets),'seller puede consultar inventario sin PII');
select test_support.expect_error($q$update public.profiles set role='admin' where id=auth.uid()$q$,'42501','seller no eleva rol');
select test_support.expect_error($q$update public.payments set state='approved'$q$,'42501','seller no aprueba directamente');
select test_support.expect_error($q$select public.review_payment('60000000-0000-4000-8000-000000000001',true,auth.uid())$q$,
 '42501','seller no ejecuta RPC de revision');
select test_support.expect_error($q$select public.reserve_tickets(null,'demo','0000000000',array[]::uuid[],'seller',auth.uid(),null)$q$,
 '42501','seller no reserva saltando API');

set local "request.jwt.claim.sub" = '10000000-0000-4000-8000-000000000003';
select test_support.assert_true((select count(*)=1 from public.orders where seller_id=auth.uid()),'seller B ve solo su orden');
select test_support.assert_true(not exists(select 1 from public.buyers where id='30000000-0000-4000-8000-000000000001'),'seller B no lee comprador A');

set local "request.jwt.claim.sub" = '10000000-0000-4000-8000-000000000001';
select test_support.assert_true(public.current_active_app_role()='admin','perfil admin activo');
select test_support.assert_true((select count(*)=2 from public.orders),'admin lee todas las ordenes');
select test_support.assert_true((select count(*)=2 from public.buyers),'admin lee todos los compradores');
select test_support.assert_true((select count(*)=2 from public.payment_evidence),'admin lee toda evidencia');
select test_support.assert_true((select count(*)=4 from public.profiles),'admin consulta perfiles incluso inactivos');
select test_support.assert_true((select count(*)=1 from public.audit_logs),'admin lee auditoria');
select test_support.assert_true((select count(*)=1 from public.raffle_closures),'admin lee snapshots');
select test_support.expect_error($q$update public.payments set state='approved'$q$,'42501','admin navegador tampoco escribe pagos directamente');

set local "request.jwt.claim.sub" = '10000000-0000-4000-8000-000000000004';
select test_support.assert_true(public.current_active_app_role() is null,'perfil inactivo no obtiene rol');
select test_support.assert_true((select count(*)=0 from public.orders),'inactivo no lee ordenes');
select test_support.assert_true((select count(*)=0 from public.buyers),'inactivo no lee compradores');
select test_support.assert_true((select count(*)=0 from public.tickets),'inactivo no lee inventario interno');
set local "request.jwt.claim.sub" = '10000000-0000-4000-8000-000000000005';
select test_support.assert_true(public.current_active_app_role() is null,'usuario sin perfil no obtiene rol');
select test_support.assert_true((select count(*)=0 from public.payments),'sin perfil no lee pagos');
set local "request.jwt.claim.sub" = '';
select test_support.assert_true((select count(*)=0 from public.orders),'sin identidad no lee ordenes');
reset role;

select test_support.assert_true(not has_table_privilege('service_role','public.payments','INSERT'), 'service_role sin INSERT directo de pagos');
select test_support.assert_true(not has_table_privilege('service_role','public.profiles','UPDATE'), 'service_role sin UPDATE de roles');
select test_support.assert_true(not has_function_privilege('service_role','public.reserve_tickets(uuid,text,text,uuid[],text,uuid)','EXECUTE'), 'reserva legacy sin EXECUTE');
select test_support.assert_true(has_function_privilege('service_role','public.reserve_tickets(uuid,text,text,uuid[],text,uuid,uuid)','EXECUTE'), 'solo reserva vigente invocable en servidor');
select test_support.assert_true(has_function_privilege('service_role','public.review_payment(uuid,boolean,uuid)','EXECUTE'), 'revision invocable solo desde servidor');

set local role service_role;
select test_support.assert_true((select count(*)=4 from public.profiles),'service_role puede verificar perfiles para API');
select test_support.expect_error($q$select public.review_payment('60000000-0000-4000-8000-000000000001',true,'10000000-0000-4000-8000-000000000002')$q$,
 '42501','RPC rechaza actor seller al aprobar');
select test_support.expect_error($q$select public.register_payment('40000000-0000-4000-8000-000000000001',1,'cash',null,'10000000-0000-4000-8000-000000000003')$q$,
 '42501','RPC rechaza pago sobre orden ajena');
select test_support.expect_error($q$select public.register_payment('40000000-0000-4000-8000-000000000001',1,'cash',null,'10000000-0000-4000-8000-000000000004')$q$,
 '42501','RPC rechaza perfil inactivo');
select public.review_payment('60000000-0000-4000-8000-000000000001',false,'10000000-0000-4000-8000-000000000001');
select test_support.assert_true((select state='rejected' and reviewed_by='10000000-0000-4000-8000-000000000001'
 from public.payments where id='60000000-0000-4000-8000-000000000001'),'admin via RPC puede revisar pago sintetico');
select test_support.assert_true((select count(*)=1 and bool_and(status='draft') from public.raffles),'ninguna prueba abre la rifa');
do $$
begin
  begin
    perform public.reserve_tickets('20000000-0000-4000-8000-000000000001','[DEMO]','0000000000',
      array['50000000-0000-4000-8000-000000000001']::uuid[],'seller',
      '10000000-0000-4000-8000-000000000002','80000000-0000-4000-8000-000000000003');
    raise exception 'RIFA_TEST_FAIL: reserva draft aceptada';
  exception when raise_exception then
    if sqlerrm <> 'RAFFLE_NOT_OPEN' then raise; end if;
    raise notice 'RIFA_TEST_PASS: reserva RPC mantiene bloqueo draft';
  end;
end;
$$;
reset role;
rollback;
