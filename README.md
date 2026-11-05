# Rifa Entre Amigos — MVP técnico

Next.js 15 + TypeScript + Supabase/PostgreSQL. Configuración: apartados 24 h; transferencia y efectivo; roles admin y vendedor. Las ventas públicas permanecen deshabilitadas hasta confirmar autorización y bases.

## Iniciar

1. `pnpm install --frozen-lockfile`
2. Copia `.env.example` a `.env.local` y llena los valores (NUNCA exponer `SUPABASE_SERVICE_ROLE_KEY` al navegador).
3. Ejecuta las migraciones en orden mediante Supabase CLI (`supabase db push`) o SQL Editor.
4. Crea la rifa en `raffles` con `status='draft'`, precio `25000` centavos y fechas correctas; guarda su UUID en `RAFFLE_ID`.
5. Genera 200 boletos y una permutación auditada de 000 a 999, cinco números por boleto. No se incluye seed definitivo para evitar divergencias con el PDF impreso.
6. Crea usuarios en Supabase Auth y sus filas en `profiles` (rol `admin` o `seller`).
7. `pnpm dev` y visita http://localhost:3000.

## Endpoints

- `GET /api/tickets`: catálogo de folios y participaciones.
- `POST /api/reservations`: reserva autenticada por admin/vendedor, transacción RPC.
- `POST /api/payments`: registro de pago pendiente (admin/vendedor).
- `GET /api/admin/payments`: listado de pagos (admin).
- `PATCH /api/admin/payments`: aprobación/rechazo por admin, RPC transaccional.

## Pruebas

- `pnpm run typecheck`
- `pnpm run test` (Vitest)
- `pnpm exec playwright install chromium && pnpm run test:e2e`

Consulta [`docs/IMPLEMENTATION_STATUS.md`](docs/IMPLEMENTATION_STATUS.md) para distinguir lo validado de lo pendiente. El build actual pasa, pero las pruebas E2E y las migraciones todavía requieren un entorno local de Supabase y un host que permita abrir el servidor de desarrollo.

## Pendientes para producción

Este repositorio es un **esqueleto funcional**, NO un sistema listo para cobrar. Faltan: pantalla de login, CRUD de compradores y ventas, flujo de checkout, subida de comprobantes mediante URLs firmadas y verificación de archivos, conciliación de saldos y sobrepagos al registrar, control de expiración y liberación de reservas, autorización por vendedor sobre sus órdenes, snapshots de cierre, validación formal de mecánica de sorteo, generación y cotejo de PDFs/QR, tests de concurrencia en PostgreSQL, rate limits y controles antiabuso. La RPC de reserva requiere pruebas de integración antes de usarse con dinero real. La clave service role se usa solo en servidor y jamás debe publicarse.

## Plan completo para Codex

Consulta [`docs/DEVELOPMENT_PLAN.md`](docs/DEVELOPMENT_PLAN.md) para el backlog integral, fases, criterios de aceptación, arquitectura objetivo, APIs, seguridad y pruebas. **El código actual es un esqueleto y el plan no implica que las funciones estén implementadas.**
