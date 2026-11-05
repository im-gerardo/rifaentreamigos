# Base de datos

## Migraciones

| Migración | Propósito | Estado de ejecución |
|---|---|---|
| `001_init.sql` | Tablas principales, enums, índices, RLS habilitado y bucket privado | Aplicada localmente |
| `002_reservation.sql` | Primera versión de la reserva | Aplicada localmente; sustituida de forma funcional por la sobrecarga de `006` |
| `003_payment_review.sql` | Primera versión de conciliación | Aplicada localmente; sustituida de forma funcional por `006` |
| `004_orders_and_audit.sql` | Consentimientos e historial de cambios de boletos | Aplicada localmente |
| `005_reconciliation_holds.sql` | Estados de retención para conciliación | Aplicada localmente |
| `006_secure_order_operations.sql` | Idempotencia, reservas, pagos y expiración atómicos | Aplicada localmente |

## Funciones privilegiadas

Las funciones de `006` son `SECURITY DEFINER`, fijan `search_path` a `public, pg_temp` y revocan `EXECUTE` a `public`, `anon` y `authenticated`.

- `reserve_tickets(...)`: reserva de vendedor con idempotencia.
- `register_payment(...)`: inserta un pago pendiente sin exceder el total y coloca los boletos en retención.
- `review_payment(...)`: aprueba o rechaza solo con actor administrador activo.
- `expire_reservations()`: libera únicamente órdenes vencidas sin actividad financiera.

Las rutas de servidor validan sesión antes de invocarlas con la service role. Aún falta comprobar este diseño en PostgreSQL real, incluidas RLS y carreras concurrentes.
