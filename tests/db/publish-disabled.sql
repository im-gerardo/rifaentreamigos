-- Test para verificar que publish_raffle_batch está bloqueada y configurada correctamente.

BEGIN;

DO $$
DECLARE
  v_func_oid regprocedure := 'public.publish_raffle_batch(uuid,jsonb)'::regprocedure;
BEGIN
  -- 1. Verificar SECURITY DEFINER
  IF NOT (SELECT prosecdef FROM pg_proc WHERE oid = v_func_oid::regproc) THEN
    RAISE EXCEPTION 'La función no es SECURITY DEFINER.';
  END IF;

  -- 2. Verificar search_path
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc p, unnest(p.proconfig) as cfg
    WHERE p.oid = v_func_oid::regproc AND cfg = 'search_path=public, pg_temp'
  ) THEN
    RAISE EXCEPTION 'El search_path es incorrecto. Se esperaba "public, pg_temp".';
  END IF;

  -- 3. Verificar que EXECUTE ha sido revocado para roles clave
  IF has_function_privilege('anon', v_func_oid::regproc, 'execute') THEN
    RAISE EXCEPTION 'El rol anon aún tiene permiso EXECUTE.';
  END IF;

  IF has_function_privilege('authenticated', v_func_oid::regproc, 'execute') THEN
    RAISE EXCEPTION 'El rol authenticated aún tiene permiso EXECUTE.';
  END IF;

  IF has_function_privilege('service_role', v_func_oid::regproc, 'execute') THEN
    RAISE EXCEPTION 'El rol service_role aún tiene permiso EXECUTE.';
  END IF;

  -- 4. Verificar que la llamada lanza la excepción correcta
  BEGIN
    PERFORM public.publish_raffle_batch('00000000-0000-0000-0000-000000000000'::uuid, '[]'::jsonb);
    RAISE EXCEPTION 'La función NO lanzó la excepción esperada.';
  EXCEPTION
    WHEN SQLSTATE '55000' THEN
      IF SQLERRM != 'OPERATIONS_DISABLED' THEN
        RAISE EXCEPTION 'La excepción tiene el código 55000 pero el mensaje es: %', SQLERRM;
      END IF;
    WHEN OTHERS THEN
      RAISE EXCEPTION 'Se lanzó una excepción inesperada: % (SQLSTATE: %)', SQLERRM, SQLSTATE;
  END;

  RAISE NOTICE 'RIFA_TEST_PASS: Todos los tests de publish_raffle_batch pasaron con éxito.';
END $$;

ROLLBACK;

