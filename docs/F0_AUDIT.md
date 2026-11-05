# Fase 0 — auditoría y plan de recuperación

Fecha: 2026-11-05. Alcance exclusivo de esta iteración: auditoría, recuperación local y estabilización; el plan maestro no se reemplaza.

## Hallazgos críticos

1. **F0-R01 — bloqueo de compilación:** `scripts/issue_tickets.ts:2` importa `arg` como `fs`; solo tiene tres imports, ninguna emisión implementada. TS2307 reproducido con typecheck/build. Corregir import no certificará integridad ni idempotencia. No ejecutar.
2. **F0-R02 — identidad suplantable:** `app/api/admin/orders/route.ts:29` usa `sellerId` enviado por cliente en RPC service role, no `user.id`. Puede suplantar actor si los privilegios se habilitan; no se explotó. La ruta ya no devuelve 503 como afirmaba la documentación previa.
3. **F0-R03 — autorización de compradores/comprobantes:** listado global de nombres/teléfonos para cualquier vendedor en `app/api/admin/buyers/route.ts:38`; `app/api/payments/evidence/route.ts:19` solo comprueba existencia de pago, no vendedor/orden/objeto. Hash proviene del cliente. No se solicitaron datos ni se escribieron registros para comprobarlo.
4. **F0-R04 — apertura insegura:** `007_publish_raffle.sql:12` usa `search_batch` en vez de `search_path` (defecto SQL no ejecutado); líneas 53–55 abren la rifa sin checklist. Sin límites exactos de manifiesto, actor, bloqueo de rifa ni cotejo físico. Endpoint serializa array como string (`raffle-publish:31`). No aplicar ni invocar.
5. **F0-R05 — permisos y RLS:** catálogo local confirma service role sin SELECT/INSERT en las 15 tablas y sin EXECUTE en RPC críticas; BYPASSRLS no equivale a GRANT. `order_consents` e `idempotency_keys` no habilitan RLS. No hay políticas en public/Storage. No se concedieron permisos ni se alteraron RLS para pruebas.
6. **F0-R06 — trigger y auditoría:** `004_orders_and_audit.sql` no fija search_path; el trigger no registra actor. Función visible con EXECUTE a anon/authenticated/service_role (una función trigger no se invoca como RPC ordinaria; no confundir visibilidad con explotación probada). Auditoría no tiene garantías append-only contra escritor privilegiado.
7. **F0-R07 — expiración/finanzas sin QA:** `006:419–422` consulta todos los vínculos históricos del pedido al liberar; falta probar un boleto reasignado y vuelto a reservar. `register_payment` no comprueba deadline de orden. `review_payment` bloquea pago→orden, el resto orden→boletos: falta análisis/pruebas de concurrencia, no hay suite SQL. Revisiones no guardan motivo. La sobrecarga antigua de reserva sigue existiendo; mantener EXECUTE revocado.
8. **F0-R08 — persistencia de manifiesto:** `existsSync` seguido de `writeFileSync` sin `flag:'wx'` tiene carrera TOCTOU y posible truncamiento. El worker no certificó esta parte; coordinador corrigió su afirmación sobre atomicidad. Unitarias no prueban carrera, escritura parcial ni cotejo impreso.
9. **F0-R09 — QA/entorno:** falta configuración ESLint/CI; dos smoke E2E esperan UI antigua. Ya se puede abrir puerto local; la restricción EPERM del informe antiguo no se reproduce. Hay dos lockfiles; pnpm es canónico. Se conserva carpeta literal `` `app/ `` con copia de ruta, fuera de App Router: no borrar trabajo preexistente.
10. **F0-R10 — documentación no fiable:** informe previo simultáneamente decía migraciones aplicadas y no aplicadas; README decía build exitoso/login ausente. Catálogo verificado ahora: `001–006`, no `007`. Las garantías del SQL no equivalen a comportamiento probado.
11. **F0-R11 — dependencias vulnerables (corregido localmente):** `pnpm audit --json` reportó 2 críticos/3 altos/6 moderados. Vitest se actualizó a 4.1.12 (elimina tinypool vulnerable y corrige mocker), Zod a 4.6.7 y overrides transitivos acotados para PostCSS 8.5.23/minimatch 11.0.1. Segundo audit exit 0, cero avisos; lint/typecheck/28 unitarias/build/10 E2E pasan. Referencias: GHSA-5gmw-xhrv-c9v3, GHSA-85c8-ppgw-ccpr, GHSA-qxg6-89mg-rqv8, GHSA-mrhx-c7xc-m3w5, GHSA-fxqj-rqcc-2cmp, GHSA-g3hv-75wg-m249. No usar el lockfile npm histórico para reinstalar.

## Evidencia SQL (solo metadatos)

Comandos ejecutados con `docker exec supabase_db_rifa-entre-amigos psql -U postgres -d postgres -X -v ON_ERROR_STOP=1 -c "BEGIN READ ONLY; ...; ROLLBACK;"`:

```sql
SELECT version FROM supabase_migrations.schema_migrations ORDER BY version;
SELECT c.relname,c.relrowsecurity
FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
WHERE n.nspname='public' AND c.relkind='r' ORDER BY c.relname;
SELECT tablename,policyname,roles,cmd FROM pg_policies
WHERE schemaname IN ('public','storage');
-- Para cada tabla: has_table_privilege(role, 'public.' || tablename, 'SELECT'/'INSERT').
-- Para cada RPC: has_function_privilege(role, oid, 'EXECUTE'), prosecdef y proconfig.
```

No se leyeron compradores, pagos, secretos, archivos de comprobantes ni boletos. No se inició/reinició el stack ni se ejecutó seed/reset/push. El historial registra aplicación, no garantiza integridad de migraciones desde cero.

Para comandos frontend se sobrescribieron URL Supabase a `http://127.0.0.1:1`, ambas claves a `phase0-test-only`, `RAFFLE_ID` vacío, `PUBLIC_SALES_ENABLED=false`, `NEXT_TELEMETRY_DISABLED=1`; E2E con `CI=1` para no reutilizar servidores existentes. No se usaron credenciales reales. Chromium se instaló en la caché de Playwright, sin cambiar datos de aplicación.

## Backlog según plan maestro (P0 antes de P1)

| ID | Prioridad / fase | Trabajo acotado | Dependencias | Criterios de aceptación | Responsable propuesto |
|---|---|---|---|---|---|
| F0-G01 | P0 / 0 | Git, exclusiones, baseline sin certificar | Auditoría, revisión de candidatos | Commit raíz local, secretos fuera, archivos preservados, sin remotos | Sol implementación y QA |
| F0-S01 | P0 / 0 | Contener escrituras/publicación inseguras | Baseline | Rutas mutantes responden 503 sin tocar DB, incluso con variable de ventas habilitada; unitarias | Sol implementación y revisión de seguridad |
| F0-T01 | P0 / 0 | Retirar import inválido conservando emisión deshabilitada | Baseline, F0-A02 | Typecheck pasa; script sin efectos/import DB; prueba estática, NO ejecutar | Sol (worker agotado) |
| F0-Q01 | P0 / 0 | ESLint no interactivo y smoke CI | Baseline | lint ejecutable, workflow pnpm+typecheck+unit+build+E2E aislados; CI remota NO VERIFICADA hasta ejecución autorizada | Worker en siguiente delegación pequeña o Sol |
| F0-Q02 | P0 / 0 | E2E determinista de UI consultiva | Chromium, baseline | Textos vigentes, sin red real, prueba no reserva, estados error/vacío, smoke móvil | Sol QA |
| F0-V01 | P0 / 0 | Corregir avisos conocidos de dependencias | Auditoría de paquetes | Audit sin avisos conocidos y todos los gates pasan tras actualizar | Sol implementación/QA |
| F0-D01 | P0 / 0 | Documentar y reejecutar gates | Tareas F0 | Informe de resultados, revisión de diff, commits atómicos, estado limpio | Sol |
| F1-I01 | P0 / 1 | Infraestructura PostgreSQL desechable y prueba desde cero | Fase 0, no reutilizar DB existente | Migraciones desde cero; detectar error de `007`, grants explícitos mínimos, test RLS sin datos reales | Worker implementación aislada / Sol QA |
| F1-A01 | P0 / 1 | Auth/logout y permisos por asignación | F1-I01 | E2E login/logout, perfil inactivo, IDOR y seller→admin; RLS en todas las tablas | Delegar una ruta/flujo por vez |
| F2-E01 | P0 / 2 | Emisión verificable e inmutable, sin abrir ventas | Fase 1; maestro físico para cotejo | 200×5, DB transaccional, checksum comparado, idempotencia/carreras, actor; no autoapertura | Worker + revisión Sol |
| F3-O01 | P0 / 3 | Compradores/órdenes/expiración | Fase 2 y privacidad | Consentimiento, actor servidor, aislamiento por vendedor, concurrencia y expiración con retención | Iteraciones por historia del plan |
| F4-P01 | P0 / 4 | Conciliación y comprobantes privados | Fase 3, política de caja | MIME real/hash servidor, doble aprobación, saldo parcial/sobrepago, URLs firmadas y autorización | Iteraciones por historia del plan |
| F5-U01 | P1 / 5 | Portal/checkout/PDF/token | Fases 0–4, aprobación para activar | Pruebas móvil/PII/antiabuso; bloqueo draft obligatorio | No iniciar antes de P0 |
| F6-C01 | P1 / 6 | Reportes/cierre/resultado manual | Fases previas, bases/mecánica | Snapshot inmutable, reporte auditado, evidencia oficial | No iniciar ahora |
| F7-H01 | P0 antes producción / 7 | QA integral/backups/UAT | Todas las fases y autorizaciones | Suite representativa/restore/UAT y apertura humana independiente | No desplegar automáticamente |

No se aprueba operación real con ninguno de estos criterios parciales. Aprobaciones legales, bancos, privacidad, maestro físico y hora límite no se inventan ni se sustituyen con valores de seed.

## Agentes / continuidad

Coordinador real: GPT-6.1 Sol. Delegación real de solo lectura a `gemma-worker`: sesión `ses_e5367bf7dffeFKnx2MYLY4vRN7`, resultado PARCIAL por límite de pasos. No se repitió la solicitud. Informe del worker no constituye prueba; coordinador comprobó archivos y ejecutó QA independientemente. Configuración apunta a Ollama 26B instalado; catálogo OpenCode muestra solo 12B para Ollama, por lo que la identidad efectiva de ejecución requiere corroboración. Respaldo `local-lead` configurado, no invocado. Sin otros agentes simulados.

Para retomar: leer README, AGENTS y plan, luego IMPLEMENTATION_STATUS y este informe. Consultar Git y no restaurar/descartar archivos existentes. Tareas y commits posteriores se registran en IMPLEMENTATION_STATUS.
