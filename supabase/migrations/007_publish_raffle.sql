-- Función para publicar una rifa con un lote de boletos validado.
-- Esta función es SECURITY DEFINER para poder manejar la inserción masiva
-- y actualzar el estado de la rifa de forma atómica.

create or replace function publish_raffle_batch(
  p_raffle_id uuid,
  p_manifest_json jsonb
)
returns void
language plpgsql
security definer
set search_batch = public, pg_temp
as $$
declare
  v_raffle_exists boolean;
  v_item jsonb;
  v_ticket_id uuid;
  v_folio integer;
  v_number integer;
begin
  -- 1. Verificar que la rifa existe y está en estado 'draft'
  select exists (
    select 1 from raffles 
    where id = p_raffle_id and status = 'draft'
  ) into v_raffle_exists;

  if not v_raffle_exists then
    raise exception 'Rifa no encontrada o no está en estado draft';
  end if;

  -- 2. Iterar sobre el JSON del manifiesto
  -- Estructura esperada: [{"folio": "001", "numbers": ["000", "001", "002", "003", "004"]}, ...]
  for v_item in select * from jsonb_array_elements(p_manifest_json)
  loop
    -- Insertar el ticket
    insert into tickets (raffle_id, folio, state)
    values (
      p_raffle_id, 
      (v_item->>'folio')::integer, 
      'available'
    )
    returning id into v_ticket_id;

    -- Insertar cada número asociado al ticket
    for v_number in select jsonb_array_elements_text(v_item->'numbers')::integer
    loop
      insert into ticket_numbers (raffle_id, ticket_id, number)
      values (p_raffle_id, v_ticket_id, v_number);
    end loop;
  end loop;

  -- 3. Cambiar el estado de la rifra a 'open'
  update raffles
  set status = 'open'
  where id = p_raffle_id;

  -- 4. Log de auditoría
  insert into audit_logs (entity, entity_id, action, details)
  values ('raffles', p_raffle_id, 'published', jsonb_build_object('batch_size', jsonb_array_length(p_manifest_json)));

end;
$$;

revoke all on function publish_raffle_batch(uuid, jsonb) from public, anon, authenticated;
