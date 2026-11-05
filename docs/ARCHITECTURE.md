# Arquitectura

## Capas actuales

```text
app/                  Rutas App Router, páginas y endpoints HTTP
lib/                  Autenticación, clientes Supabase, validación y errores estables
supabase/migrations/  Esquema y operaciones PostgreSQL versionadas
scripts/              Herramientas administrativas ejecutables en servidor
tests/                Unitarias y E2E separadas
```

Las rutas HTTP autentican y validan entradas. Las reglas que cambian inventario o dinero se concentran en funciones PostgreSQL y se invocan con un cliente de servidor. El navegador no recibe la service role key.

## Límites de seguridad

- `lib/supabase.ts` solo se importa en servidor y utiliza `SUPABASE_SERVICE_ROLE_KEY`.
- `lib/supabase-browser.ts` solo utiliza las dos variables públicas de Supabase.
- El middleware redirige solicitudes no autenticadas de `/admin/**` al inicio de sesión. Cada endpoint sensible vuelve a validar rol para no depender del middleware.
- El cliente no envía ni determina precios, estados de pago ni el actor de una auditoría.

## Amenazas pendientes de comprobar

- RLS y Storage requieren pruebas contra Supabase real.
- Falta limitación de solicitudes, CSRF para flujos que lo requieran y el flujo privado de comprobantes.
- Faltan políticas de retención de PII y un aviso de privacidad aprobado.
