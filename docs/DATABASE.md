# Base de datos

## Auditoría 2026-11-05 (solo lectura)

El historial del stack local existente contiene `001–006`, comprobado mediante
catálogos dentro de `BEGIN READ ONLY`/`ROLLBACK`. No se aplicaron migraciones en
esta sesión y **no se verificó instalación desde cero**. No consultar datos reales
para QA ni reutilizar esta BD como fixture.

- `order_consents` e `idempotency_keys` tienen RLS deshabilitado; no hay políticas en public/Storage.
- Ninguna de las 15 tablas concede SELECT/INSERT a `service_role`; las RPC críticas tampoco conceden EXECUTE a ese rol. BYPASSRLS no sustituye privilegios SQL.
- La función trigger de `004` no fija search_path ni registra actor; auditoría append-only no certificada.
- `007_publish_raffle.sql` NO está aplicada: contiene `set search_batch` y abre la rifa sin checklist legal/operativo. No aplicar ni invocar.
- Mantener revocadas las funciones antiguas; no dar grants para hacer pasar pruebas. Diseñar mínimos explícitos con integración en infraestructura nueva/desechable.

Detalle, evidencia y revisión de locks: [`F0_AUDIT.md`](F0_AUDIT.md).

## Migraciones

| Migración | Propósito | Estado de ejecución |
|---|---|---|
| `001_init.sql` | Tablas principales, enums, índices, RLS habilitado y bucket privado | Aplicada localmente |
| `002_reservation.sql` | Primera versión de la reserva | Aplicada localmente; sustituida de forma funcional por la sobrecarga de `006` |
| `003_payment_review.sql` | Primera versión de conciliación | Aplicada localmente; sustituida de forma funcional por `006` |
| `004_orders_and_audit.sql` | Consentimientos e historial de cambios de boletos | Aplicada localmente |
| `005_reconciliation_holds.sql` | Estados de retención para conciliación | Aplicada localmente |
| `006_secure_order_operations.sql` | Idempotencia, reservas, pagos y expiración atómicos | Aplicada localmente |
| `007_publish_raffle.sql` | Intento incompleto/inseguro de publicación | No aplicada; bloqueada, no usar |

## Funciones privilegiadas

Las funciones de `006` son `SECURITY DEFINER`, fijan `search_path` a `public, pg_temp` y revocan `EXECUTE` a `public`, `anon` y `authenticated`.

- `reserve_tickets(...)`: reserva de vendedor con idempotencia.
- `register_payment(...)`: inserta un pago pendiente sin exceder el total y coloca los boletos en retención.
- `review_payment(...)`: aprueba o rechaza solo con actor administrador activo.
- `expire_reservations()`: libera únicamente órdenes vencidas sin actividad financiera.

Actualmente las rutas mutantes están contenidas con `503` antes de sesión/BD. Las
descripciones de RPC son intención del código, no comportamiento certificado:
faltan privilegios y QA real de RLS, carreras, expiración, sobrepagos y reasignaciones.
