# Arquitectura

## Capas actuales

```text
app/                  Rutas App Router, páginas y endpoints HTTP
lib/                  Autenticación, clientes Supabase, validación y errores estables
supabase/migrations/  Esquema y operaciones PostgreSQL versionadas
scripts/              Herramientas administrativas ejecutables en servidor
tests/                Unitarias y E2E separadas
```

Las reglas que cambian inventario o dinero están propuestas en funciones PostgreSQL
invocadas por servidor. **En Fase 0 todas las rutas mutantes y GET de compradores
se contienen con `lib/operation-gate.ts`: 503 antes de Auth/BD, sin interruptor por entorno.**
El código recuperado permanece para revisión, no como operación autorizada.

## Límites de seguridad

- `lib/supabase.ts` solo se importa en servidor y utiliza `SUPABASE_SERVICE_ROLE_KEY`.
- `lib/supabase-browser.ts` solo utiliza las dos variables públicas de Supabase.
- El middleware redirige solicitudes no autenticadas de `/admin/**` al inicio de sesión. Cada endpoint sensible vuelve a validar rol para no depender del middleware.
- Precios/sumas se calculan en SQL; actor de `/api/reservations` deriva de sesión, pero `/api/admin/orders` conserva el defecto `sellerId` arbitrario detrás de contención. No reabrir sin corregirlo y probarlo.
- `lib/supabase.ts` carece de una barrera `server-only`; uso actual inspeccionado en servidor/scripts, falta hardening y verificación automática de bundles.

## Amenazas pendientes de comprobar

- RLS/Storage y RPC requieren un entorno **nuevo de pruebas**, no producción. Catálogo local: dos tablas sin RLS, sin políticas y sin grants de tablas/RPC a service role. No se alteraron permisos.
- Falta limitación de solicitudes, CSRF para flujos que lo requieran y el flujo privado de comprobantes.
- Faltan políticas de retención de PII y un aviso de privacidad aprobado.
