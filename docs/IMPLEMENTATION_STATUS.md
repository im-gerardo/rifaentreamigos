# Estado de implementación — recuperación Fase 0

Actualizado: 2026-11-05. Responsable: GPT-6.1 Sol (coordinación, QA y revisión).

**ESTADO: PARCIAL. Estado recuperado, sin certificar. No apto para operar ni cobrar.**
Este informe sustituye afirmaciones contradictorias del informe anterior; el commit raíz conserva el estado recuperado. La existencia de archivos no demuestra funcionamiento. No se ejecutaron emisión, limpieza de reservas, migraciones ni escrituras en Supabase.

## Evidencia inicial reproducida

| Comando / inspección | Resultado real (2026-11-05) |
|---|---|
| Lectura README → AGENTS → plan maestro | Los tres documentos existen y se leyeron en ese orden |
| `git rev-parse --show-toplevel` antes de recuperar | Exit 128; sin `.git` en raíz ni ancestros |
| Búsqueda de historia local | Sin `.git` anidado, bundles ni copia hermana identificable; no URL remota del proyecto encontrada. Historia remota desconocida, no consultada |
| `pnpm install --frozen-lockfile` | Exit 0, lockfile vigente |
| `pnpm run typecheck` | Exit 1, TS2307 `scripts/issue_tickets.ts:2`, módulo `arg` inexistente |
| `pnpm run lint` | Exit 1; `next lint` pide configurar ESLint interactivamente |
| `pnpm run test` | Exit 0; 2 archivos, 9 pruebas |
| `pnpm run build` con entorno ficticio aislado | Exit 1 por el mismo TS2307; compilación webpack sí termina |
| `pnpm run test:e2e` con entorno ficticio aislado | Inicialmente faltaba Chromium; después de instalarlo: 4 pasan, 2 fallan por textos/selectores antiguos de `tests/public.spec.ts` |
| `docker info` / `docker ps` | Docker 29.6.1 disponible; stack local existente, no reiniciado ni alterado |
| Catálogos PostgreSQL con `BEGIN READ ONLY` / `ROLLBACK` | Aplicadas `001–006`; `007` ausente. 15 tablas sin privilegios SELECT/INSERT para service_role; RPC críticas sin EXECUTE para service_role. RLS deshabilitado en 2 tablas |
| Escaneo previo a Git | 74 candidatos, sin patrones de secretos detectados; `.env.local`, secretos temporales, dependencias y configuración local excluidos. Escaneo heurístico, no garantía absoluta |

Entorno: Node 26.5.0, pnpm 12.15.0, npm 11.17.0, Git 2.55.0, Next 15.5.28, Vitest 3.2.7, Supabase CLI 2.114.0. pnpm es el gestor canónico; `package-lock.json` preexistente se conserva, no se certifica como equivalente.

## Matriz contra el plan maestro

Estados: **funcional** = evidencia ejecutada en el alcance indicado; **parcial** = código incompleto o prueba limitada; **no implementada** = sin flujo encontrado; **bloqueada** = dependencias/seguridad; **no verificada** = falta ejecución representativa.

| Fase / historia del plan | Estado | Evidencia y faltantes |
|---|---|---|
| 0 — inventario, dependencias y diagnóstico | funcional (auditoría local) | Código, UI, rutas, SQL, documentación y pruebas inspeccionados; ver `F0_AUDIT.md` |
| 0 — build/typecheck/lint | bloqueada | TS2307 y ESLint sin configurar |
| 0 — unitarias | funcional (9 casos existentes) | Validación y generador; no prueban base de datos |
| 0 — E2E | parcial | 4/6; no prueban login real, roles activos, dinero ni RLS |
| 0 — CI básica | no implementada | Sin workflow encontrado |
| 0 — Git | parcial | Inicializado `main`, pendiente commit raíz revisado; no remotos |
| 1 — Supabase local / migraciones / seed DEMO | parcial | Stack ya existente y `001–006` en catálogo; desde cero NO VERIFICADO. Seed no idempotente, sin usuarios Auth, horas demo no son decisiones oficiales |
| 1 — login / logout / sesión | parcial | Login y middleware existen; no logout encontrado; login real y renovación NO VERIFICADOS |
| 1 — roles / vendedor solo asignado | bloqueada | `admin/orders` acepta `sellerId` del cliente; compradores se consultan sin filtro de vendedor; dashboard muestra agregados globales |
| 1 — RLS / Storage / auditoría | bloqueada | Sin políticas; RLS falta en consentimientos/idempotencia; grants service_role ausentes; trigger sin search_path ni actor real |
| 2 — CRUD rifas / reglas versionadas | no implementada | Tablas iniciales, no CRUD completo |
| 2 — permutación 200×5 / CSV / JSON / checksum | parcial | 4 unitarias pasan; checksum no sustituye cotejo físico; escritura de archivo no atómica ante carrera |
| 2 — emisión / cotejo / inmutabilidad | bloqueada | `issue_tickets.ts` es placeholder; maestro físico ausente; endpoint de validación no compara con BD ni garantiza cobertura exacta |
| 2 — inventario admin / eventos físicos | no implementada | Sin `/admin/boletos` ni flujo físico completo |
| 2 — publicación / checklist legal | bloqueada | `007` contiene `set search_batch`, abre ventas sin checklist ni 200×5; endpoint envía JSON serializado en lugar de array |
| 3 — compradores / privacidad / deduplicación | parcial | GET/POST existen, sin UI, consentimiento ni aislamiento; deduplicación no transaccional |
| 3 — órdenes / reserva atómica idempotente | no verificada | SQL `006` con locks ordenados y actor validado por perfil; falta EXECUTE, pruebas SQL y autorización integral |
| 3 — expiración / retención / job | no verificada | RPC y script existen; job ausente; riesgo al liberar historial de vínculos. Script NO ejecutado |
| 3 — venta presencial / cancelación / reembolso | bloqueada | Ruta POST de órdenes no está bloqueada como decía la documentación; flujo incompleto e inseguro; no cancelación/reembolso |
| 4 — registro / revisión de pagos | no verificada | API y RPC existen, sin privilegios operativos ni QA de doble revisión/concurrencia; sin motivo/historial de revisión completo |
| 4 — comprobantes / upload seguro / descarga | bloqueada | Falta propiedad de pago, verificación de archivo/hash, URLs firmadas y Storage policies. UI envía hash vacío |
| 4 — saldos / sobrepago / duplicados | parcial | Restricciones y sumas SQL, sin reembolsos ni integración; no detección de hash duplicado |
| 4 — bandeja / filtros / exportación | parcial | Lista y botones; sin filtros/exportación y sin ejecución con cuentas ficticias |
| 5 — home / catálogo / responsive | parcial | UI consultiva, precio informativo fijo; pruebas antiguas fallan; accesibilidad y móvil completos NO VERIFICADOS |
| 5 — checkout público / antiabuso | bloqueada | No existe checkout, reserva pública rechazada por rol; `PUBLIC_SALES_ENABLED` no se usa como garantía efectiva |
| 5 — token privado / PDF / QR / WhatsApp | no implementada | Sin flujos encontrados |
| 6 — dashboard / reportes / control físico | parcial | Agregados iniciales; sin reportes protegidos, ingresos conciliados ni control físico completo |
| 6 — cierre / snapshot / resultado / contingencias | no implementada | Tabla de cierres no equivale a flujo; faltan bases autorizadas |
| 7 — QA integral / hardening / CI / backups / UAT | bloqueada | Solo unitarias y E2E smoke; no integración, concurrencia, rate limits, restore ni aprobación operativa |

## Agentes y trazabilidad inicial

| ID / descripción | Responsable / modelo | Estado real | Archivos modificados | Validación / revisión | Commit / siguiente paso |
|---|---|---|---|---|---|
| F0-A01 — auditoría y QA inicial | GPT-6.1 Sol | completado (diagnóstico, no certificación) | Documentación de auditoría | Resultados arriba; inspección independiente de rutas/SQL | Commit raíz pendiente; estabilizar P0 |
| F0-A02 — auditar emisión (solo lectura) | `gemma-worker`, configurado `ollama/gemma4:26b` | parcial, agotó 12 pasos | Ninguno | Sesión real `ses_e5367bf7dffeFKnx2MYLY4vRN7`; reportó import roto y generador. No leyó el test ni ejecutó pruebas; QA del coordinador detecta carrera de archivo, NO escritura atómica | Sin commit; coordinador revisó los tres archivos al terminar la delegación |
| F0-G01 — recuperar Git seguro | GPT-6.1 Sol | parcial | `.gitignore`, informes | Exclusiones verificadas y escaneo heurístico sin hallazgos; sin historia local recuperable identificada | Commit raíz pendiente, mensaje de estado sin certificar |

Ollama responde y tiene `gemma4:26b` instalado. Configuración local define `hybrid-lead`, `gemma-worker` y `local-lead`; el catálogo de modelos de OpenCode solo anuncia Ollama 12B, no 26B. La invocación real del worker produjo respuesta, pero no se obtuvo metadato independiente que certifique el modelo ejecutado. El respaldo `local-lead` no se invocó ni se certifica. No se alteró la configuración local; excluida de Git. No hay edición concurrente: el worker fue de solo lectura; implementación, QA y aprobación corresponden al coordinador.

## Bloqueos y continuación

### Iteración F0-S01 — contención operativa

- Responsable: GPT-6.1 Sol (implementación y QA); no se delegaron ediciones concurrentes.
- Archivos: `lib/operation-gate.ts`, las ocho rutas API mutantes (también GET compradores), `vitest.config.ts`, `tests/operation-gate.test.ts`, `docs/API.md` y este informe.
- Alcance: bloqueo HTTP 503 previo a Auth/BD de 9 handlers; sin interruptor por entorno. Conserva el código recuperado detrás del bloqueo. No corrige ni certifica permisos, RLS, integridad de emisión ni idempotencia.
- Validación ejecutada: 18 casos de handlers pasan (flag pública false/true), sin llamadas a Auth/DB; suite completa 28/28, typecheck y build aislado pasan. E2E de transporte pendiente en F0-Q02. Estado: completado el bloqueo HTTP, NO los flujos de negocio.
- Commit previsto: `fix: contain unsafe operational endpoints during audit`. Siguiente: ESLint/CI y smoke E2E.

### Iteración F0-T01 — emisor inerte

- Responsable: GPT-6.1 Sol; sin nueva delegación tras el límite del worker.
- Base segura: commit raíz `9292bc6` (estado recuperado, sin certificar), rama `main`; escaneo de secretos sin hallazgos. `git diff --cached --check` encontró espacios finales preexistentes, conservados deliberadamente en baseline.
- Cambio: `scripts/issue_tickets.ts` deja de importar `arg` y el cliente de BD; conserva solo una constante deshabilitada. **No implementa emisión.**
- Prueba nueva: `tests/issuance-safety.test.ts` inspecciona AST, no importa/ejecuta el script, y rechaza cualquier sentencia adicional.
- Validación: 10 unitarias pasan; build aislado pasa; typecheck pasa al reejecutar secuencialmente. Primer typecheck concurrente con build falló TS6053 porque Next regeneraba `.next/types`: no ejecutar esos gates en paralelo. Lint y 2 E2E siguen pendientes de estabilización (no se atribuye éxito a esta tarea).
- Estado: completado únicamente el marcador seguro y desbloqueo de compilación, NO la emisión. Commit posterior se identifica por `fix: keep ticket issuance inert and restore typecheck`.

Ver backlog priorizado, dependencias y criterios en [`F0_AUDIT.md`](F0_AUDIT.md). Prohibido operar con la BD existente, otorgar permisos para hacer pasar pruebas, ejecutar emisión o aplicar `007`. La integración debe usar infraestructura **nueva y desechable**, no la BD existente. Requieren autorización/datos humanos: bases, permiso, mecanismo oficial, maestro físico, privacidad, bancos, hora límite y entrega. No se crearon remotos, push ni despliegues.
