# Plan de pruebas

## Ejecutado

- Unitarias de validación: teléfono, selección, centavos enteros, transferencia con referencia y formato MXN.
- Unitarias de emisión: 200 folios, 1,000 números únicos, cobertura `000-999`, checksum determinista y semilla obligatoria.
- Typecheck y build de Next.js.

## Pendiente y necesario antes de operar

- Integración PostgreSQL: aplicar migraciones desde cero, RLS por rol, reserva doble concurrente, idempotencia, doble aprobación y sobrepago.
- Integración de Storage: MIME real, tamaño, hash, URL temporal y permisos de comprobantes.
- E2E: login, logout, restricción vendedor-administrador, reserva, pago, conciliación, expiración y móvil.
- Accesibilidad y revisión visual en 375, 768 y 1440 px.

Las E2E no se pudieron ejecutar en este sandbox porque no permite abrir el servidor de desarrollo en un puerto local.
