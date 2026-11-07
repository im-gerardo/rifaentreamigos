-- Stub de contención: no emite, inserta ni abre rifas, incluso invocado por owner.
-- La implementación real/verificación de publicación pertenece a Fase 2 y
-- requiere cotejo físico, inmutabilidad y autorización legal/operativa.

create or replace function publish_raffle_batch(
  p_raffle_id uuid,
  p_manifest_json jsonb
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  raise exception 'OPERATIONS_DISABLED' using errcode='55000';
end;
$$;

revoke all on function publish_raffle_batch(uuid, jsonb) from public, anon, authenticated, service_role;
