-- Solo entorno NUEVO de desarrollo/demo; nunca ejecutar sobre datos existentes.
-- Determinista, repetible, sin compradores reales ni decisiones legales/horarias.
-- No crea cuentas Auth, no emite boletos y no habilita ventas.
insert into public.raffles
  (id, name, prize, price_cents, reservation_hours, status)
values
  ('20000000-0000-4000-8000-000000000001', '[DEMO] Rifa de pruebas',
   '[DEMO] Premio ficticio, no participar ni pagar', 25000, 24, 'draft')
on conflict (id) do nothing;
