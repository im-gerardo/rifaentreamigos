# Rifa Entre Amigos — base técnica en recuperación

Next.js 15, React 19, TypeScript estricto y Supabase/PostgreSQL; Zod 4, Vitest 4 y Playwright.
**No listo para operar ni cobrar.** Fase 0 auditada y baseline local estabilizada el 2026-11-05.
**Depuración local autorizada y verificada:** el identificador detectado se retiró
del historial, incluidos autor/committer. Los ocho commits se conservaron con
nuevos hashes; no hubo push. El original y el respaldo privado permanecen
ignorados en `.local-recovery/`: **no compartir esa carpeta ni el directorio de
trabajo completo**. Esto no certifica ausencia de toda PII ni autoriza publicar.
Detalle y correspondencia de commits: [`docs/GIT_PRIVACY_RECOVERY.md`](docs/GIT_PRIVACY_RECOVERY.md).
El plan maestro sigue siendo [`docs/DEVELOPMENT_PLAN.md`](docs/DEVELOPMENT_PLAN.md).

## Seguridad antes de iniciar

- Ventas/reservas públicas deshabilitadas; no hay checkout.
- Todos los POST/PATCH actuales y GET de compradores devuelven `503 OPERATIONS_DISABLED`, sin acceso a BD. `PUBLIC_SALES_ENABLED=true` no retira este bloqueo.
- No ejecutar `scripts/issue_tickets.ts` (marcador inerte, emisión no implementada), limpieza de reservas, seed ni migraciones sobre datos existentes.
- **No ejecutar `supabase db push`:** `007` es defectuosa y contiene apertura sin checklist. Las migraciones desde cero y RLS requieren un entorno nuevo, aislado y desechable.
- No modificar `.env.local`, secretos, permisos ni datos reales para pasar pruebas. `.env.example` solo describe nombres; service role nunca va al navegador.

## Instalar y validar sin Supabase real

Usar pnpm 12.15.0. Se probó localmente con Node 26.5.0; CI básica declara Node 24, aún sin ejecución remota. `package-lock.json` se conserva como archivo histórico: **no usar npm install/ci**, no está sincronizado ni certificado.

```sh
pnpm install --frozen-lockfile
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm exec playwright install chromium
pnpm run test:e2e
```

Playwright inicia un servidor nuevo en `127.0.0.1:3000` con claves ficticias/URL inalcanzable; no reutiliza servidores ni requiere cuentas reales. Cerrar solo el servidor propio que ocupe ese puerto; no detener proyectos ajenos.

Build sin contactar un proyecto Supabase real:

```sh
env NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:1 \
  NEXT_PUBLIC_SUPABASE_ANON_KEY=phase0-test-only \
  SUPABASE_SERVICE_ROLE_KEY=phase0-test-only RAFFLE_ID= \
  PUBLIC_SALES_ENABLED=false NEXT_TELEMETRY_DISABLED=1 pnpm run build
```

Ejecutar build, typecheck y dev/E2E **secuencialmente**, comparten `.next/types`.
Resultado local final: lint, typecheck y build pasan; 28 unitarias y 10 E2E smoke pasan.
`pnpm audit --json`: cero avisos conocidos tras actualizar dependencias; no es certificación de seguridad.

## Estado y continuidad

- [`docs/IMPLEMENTATION_STATUS.md`](docs/IMPLEMENTATION_STATUS.md): matriz real, agentes, tareas, commits y pruebas no verificadas.
- [`docs/F0_AUDIT.md`](docs/F0_AUDIT.md): hallazgos críticos y backlog P0/P1 dependiente del plan.
- [`docs/API.md`](docs/API.md), [`docs/DATABASE.md`](docs/DATABASE.md), [`docs/TEST_PLAN.md`](docs/TEST_PLAN.md): límites operativos y validación pendiente.

Login y middleware existen, pero login real, aislamiento por vendedor, RLS/Storage, RPC/concurrencia, comprobantes, saldos, publicación/inmutabilidad, maestro físico, cierre, PDF/QR y UAT no están certificados. CI básica escrita sin despliegue; ejecución remota NO VERIFICADA. Git local recuperado, sin remotos/push.

Permiso, bases, mecánica, privacidad, hora límite, bancos y maestro físico siguen pendientes de confirmación humana. No inventar esos datos ni abrir ventas para demostrar funcionalidad.
