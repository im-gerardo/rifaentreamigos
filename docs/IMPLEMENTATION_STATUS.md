# Estado de implementación — recuperación Fase 0

Actualizado: 2026-11-05. Responsable: GPT-6.1 Sol (coordinación, QA y revisión).

**ESTADO DEL PRODUCTO: PARCIAL. No apto para operar ni cobrar. F0-P02: depuración del identificador conocido COMPLETADA con autorización; no equivale a autorización de publicación.**
Este informe sustituye afirmaciones contradictorias del informe anterior; el commit raíz conserva el estado recuperado. La existencia de archivos no demuestra funcionamiento. No se ejecutaron emisión, limpieza de reservas, migraciones ni escrituras en Supabase.

## Resultado vigente de Fase 0

Gates locales estabilizados y bloqueo histórico F0-P01 resuelto mediante F0-P02; auditoría/estabilización de Fase 0 completada dentro del alcance documentado. Producto **PARCIAL**, operación **BLOQUEADA**. Sin desarrollar funcionalidades de Fases 1–7. La contención no arregla los defectos subyacentes ni certifica dinero/inventario. Backups privados fuera de Git conservan PII deliberadamente: no distribuirlos ni copiar todo el directorio de trabajo.

| Gate final | Resultado ejecutado |
|---|---|
| `pnpm install --frozen-lockfile` | Correcto; lockfile canónico pnpm |
| `pnpm run lint` | Correcto, cero advertencias |
| `pnpm run typecheck` | Correcto, ejecutado sin build concurrente |
| `pnpm run test` | Correcto, 4 archivos / 28 unitarias, Vitest 4.1.12 |
| `pnpm run build` | Correcto con entorno ficticio del README |
| `pnpm run test:e2e` | Correcto, 10 smoke (Chromium), fixtures/URL ficticia; incluye móvil y bloqueo HTTP |
| `pnpm audit --json` | Exit 0, cero avisos conocidos tras F0-V01 |
| SQL/RPC/RLS/concurrencia desde cero | **NO VERIFICADO**, falta entorno nuevo y desechable; no usar stack existente ni aplicar `007` |
| Login real, roles cruzados, upload, dinero, restore/UAT | **NO VERIFICADO**, suites e infraestructura de negocio pendientes |
| CI GitHub Actions | Configurada; ejecución remota **NO VERIFICADA**, sin push autorizado |
| Privacidad del identificador detectado en Git | **VERIFICADA**, ausente de todos los objetos y metadatos tras reescritura autorizada; original/respaldo privados ignorados, no certifica toda PII |

### Commits asociados

| Tarea | Responsable | Estado en alcance | Commit |
|---|---|---|---|
| F0-A01 / F0-G01 — auditoría y Git | GPT-6.1 Sol | completado | `04c78d0` |
| F0-A02 — inspección delegada | gemma-worker (Ollama 26B configurado) | parcial, sin edición/pruebas | No aplica; evidencia en baseline |
| F0-T01 — emisor inerte/typecheck | GPT-6.1 Sol | completado, emisión no implementada | `7d408d3` |
| F0-S01 — contención 9 handlers | GPT-6.1 Sol | completado, negocio bloqueado | `cb929bb` |
| F0-Q01 — ESLint/CI básica | GPT-6.1 Sol | completado local, remoto no verificado | `8d4e632` |
| F0-Q02 — smoke E2E aislado | GPT-6.1 Sol | completado | `a841f23` |
| F0-V01 — avisos de dependencias | GPT-6.1 Sol | completado local | `401e4d1` |
| F0-P01 — anonimizar SQL vigente | GPT-6.1 Sol | completado; depuración histórica cubierta por F0-P02 | `0e4d52e` |
| F0-D01 — informe documental y revisión | GPT-6.1 Sol | completado; su bloqueo histórico resuelto después en F0-P02 | `49a1816` |
| F0-P02 — depuración histórica autorizada | GPT-6.1 Sol | completado en alcance conocido; regresión local correcta | Asunto `chore: verify authorized Git history redaction` |

Git local rama `main`, sin remotos ni push/despliegue. Ocho commits recuperados conservados con hashes nuevos; tabla anterior usa hashes vigentes y `GIT_PRIVACY_RECOVERY.md` conserva correspondencia. Código actual idéntico antes/después de reescritura; `.env.local`, configuración de agentes y original privado sin cambios. Solo identidad técnica Git local ajustada para no reintroducir el dato; configuración global sin modificar. Estado limpio se comprueba tras commit documental. Siguiente **F1-I01** (infraestructura nueva, migraciones desde cero, grants mínimos/RLS y pruebas), sin quitar la contención; publicar sigue requiriendo autorización independiente.

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
| 0 — build/typecheck/lint | funcional (local) | Gates pasan; emisión persistente sigue deshabilitada/no implementada |
| 0 — unitarias | funcional (28 casos) | Validación, generador, emisor inerte y contención; no prueban BD |
| 0 — E2E | funcional (10 smoke) | No prueban login real, roles activos, dinero ni RLS |
| 0 — CI básica | parcial | Workflow escrito, no ejecutado remotamente; sin CI SQL ni deploy |
| 0 — Git | funcional (local, alcance verificado) | `main`, 8 commits preservados y depurados del identificador conocido; sin remotos/push; backups privados no distribuibles |
| 1 — Supabase local / migraciones / seed DEMO | parcial | Stack ya existente y `001–006` en catálogo; desde cero NO VERIFICADO. Seed no idempotente, sin usuarios Auth, horas demo no son decisiones oficiales |
| 1 — login / logout / sesión | parcial | Login y middleware existen; no logout encontrado; login real y renovación NO VERIFICADOS |
| 1 — roles / vendedor solo asignado | bloqueada | `admin/orders` acepta `sellerId` del cliente; compradores se consultan sin filtro de vendedor; dashboard muestra agregados globales |
| 1 — RLS / Storage / auditoría | bloqueada | Sin políticas; RLS falta en consentimientos/idempotencia; grants service_role ausentes; trigger sin search_path ni actor real |
| 2 — CRUD rifas / reglas versionadas | no implementada | Tablas iniciales, no CRUD completo |
| 2 — permutación 200×5 / CSV / JSON / checksum | parcial | 4 unitarias pasan; checksum no sustituye cotejo físico; escritura de archivo no atómica ante carrera |
| 2 — emisión / cotejo / inmutabilidad | bloqueada | `issue_tickets.ts` es marcador inerte; maestro físico ausente; validación contenida con 503, no compara con BD ni garantiza cobertura exacta |
| 2 — inventario admin / eventos físicos | no implementada | Sin `/admin/boletos` ni flujo físico completo |
| 2 — publicación / checklist legal | bloqueada | `007` contiene `set search_batch`, abre ventas sin checklist ni 200×5; endpoint envía JSON serializado en lugar de array |
| 3 — compradores / privacidad / deduplicación | bloqueada | GET/POST contenidos 503; sin UI, consentimiento ni aislamiento; deduplicación no transaccional |
| 3 — órdenes / reserva atómica idempotente | no verificada | SQL `006` con locks ordenados y actor validado por perfil; falta EXECUTE, pruebas SQL y autorización integral |
| 3 — expiración / retención / job | no verificada | RPC y script existen; job ausente; riesgo al liberar historial de vínculos. Script NO ejecutado |
| 3 — venta presencial / cancelación / reembolso | bloqueada | POST órdenes ahora contenido 503; actor arbitrario sigue en código recuperado, no cancelación/reembolso |
| 4 — registro / revisión de pagos | no verificada | API y RPC existen, sin privilegios operativos ni QA de doble revisión/concurrencia; sin motivo/historial de revisión completo |
| 4 — comprobantes / upload seguro / descarga | bloqueada | Falta propiedad de pago, verificación de archivo/hash, URLs firmadas y Storage policies. UI envía hash vacío |
| 4 — saldos / sobrepago / duplicados | parcial | Restricciones y sumas SQL, sin reembolsos ni integración; no detección de hash duplicado |
| 4 — bandeja / filtros / exportación | parcial | Lista y botones; sin filtros/exportación y sin ejecución con cuentas ficticias |
| 5 — home / catálogo / responsive | parcial | Smoke actualizado pasa y móvil 375px sin overflow; precio informativo fijo; auditoría completa de accesibilidad/visual NO VERIFICADA |
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
| F0-G01 — recuperar Git seguro | GPT-6.1 Sol | completado | `.gitignore`, informes | Exclusiones verificadas y escaneo heurístico sin hallazgos; sin historia local recuperable identificada | `04c78d0`, sin remotos/push; posterior depuración F0-P02 |

Ollama responde y tiene `gemma4:26b` instalado. Configuración local define `hybrid-lead`, `gemma-worker` y `local-lead`; el catálogo de modelos de OpenCode solo anuncia Ollama 12B, no 26B. La invocación real del worker produjo respuesta, pero no se obtuvo metadato independiente que certifique el modelo ejecutado. El respaldo `local-lead` no se invocó ni se certifica. No se alteró la configuración local; excluida de Git. No hay edición concurrente: el worker fue de solo lectura; implementación, QA y aprobación corresponden al coordinador.

## Bloqueos y continuación

### Iteración F0-P02 — depuración histórica autorizada (vigente)

- Autorización: respuesta explícita del usuario «sí, adelante con la depuración», posterior al informe F0-P01. Responsable real: GPT-6.1 Sol, implementación y QA; sin delegaciones nuevas para no distribuir el identificador privado. No se atribuye revisión independiente a Gemma.
- Alcance: exactamente los ocho commits locales de recuperación en `main`, sin otras refs, remotos, worktrees ni objetos ajenos no alcanzables. Un blob SQL y los campos author/committer de los ocho commits contenían el mismo identificador. Se retira de contenido y se sustituyen las identidades coincidentes por `Rifa Recovery <recovery@example.invalid>`.
- Respaldo: original previo intacto e ignorado, permisos 0600; bundle predepuración verificado, reglas privadas, metadatos y evidencia en `.local-recovery/history-redaction-2026-11-05/` (directorio 0700, archivos 0600). **Contiene PII original: NO COMPARTIR**. Copia de configuración Git previa privada; nueva identidad solo local, sin alterar configuración global.
- Herramienta: `git-filter-repo 2.47.0` en venv temporal aislado, sin dependencias nuevas del proyecto. `--prune-empty never --prune-degenerate never` conserva commits; el ensayo sintético inicial detectó poda automática, corregida y probada antes de tocar el proyecto. La prevalidación también detectó PII en identidades: se amplió el alcance exacto antes de ejecutar. Una única reescritura real.
- Verificación: 8/8 commits preservados; archivos de cada commit iguales salvo sustitución SQL prevista; mensajes y fechas preservados, identidades coincidentes anonimizadas. Árbol HEAD e índice exactamente iguales al previo, hashes de entorno/configuración de agentes/original privado intactos.
- Git: 217 objetos inspeccionados tras reescribir (129 blobs, 80 árboles, 8 commits), cero coincidencias del identificador conocido; 31 archivos de metadatos fuera de objetos, cero coincidencias; los 8 objetos commit antiguos ausentes. Solo `refs/heads/main`, sin refs de respaldo/reemplazo; `git fsck --full --no-reflogs` sin hallazgos. Respaldo antiguo solo fuera de Git, ignorado.
- Archivos documentales afectados: `README.md`, `docs/IMPLEMENTATION_STATUS.md`, `docs/DEVELOPMENT_PLAN.md`, `docs/F0_AUDIT.md`, `docs/DEPLOYMENT.md`, `docs/CHANGELOG.md`, `docs/TEST_PLAN.md`, nuevo `docs/GIT_PRIVACY_RECOVERY.md` y observación metodológica. No cambios de código, emisión ni consultas/escrituras Supabase en esta tarea.
- Regresión reejecutada secuencialmente tras reescritura: frozen install, lint, typecheck, 28 unitarias, build ficticio, 10 E2E smoke y audit sin avisos conocidos, todos exit 0. Evidencia privada `regression-results.json`; no se modificaron dependencias del proyecto. Revisión documental: enlaces locales/hashes y diff; el reescaneo de objetos/metadatos tras commit se guarda en `final-verification.json` privado y se confirma en el reporte final.
- Estado: completado en alcance conocido. Commit por asunto `chore: verify authorized Git history redaction`; su SHA definitivo se obtiene con `git log -1`, sin inventar autorreferencias. Persisten NO VERIFICADOS SQL/RPC/RLS/concurrencia, login real, dinero y CI remota; no se ejecutaron como parte de esta depuración.
- Límite: se acredita ausencia del identificador conocido en este Git, no anonimato general ni eliminación en backups privados, conversaciones, snapshots externos o copias no inspeccionadas. Retirado el bloqueo específico F0-P01; no se otorga permiso de push/despliegue/ventas. Siguiente F1-I01 conforme al plan.

### Iteración F0-D01 — informe y validación final

Registro histórico previo a autorización; el estado de privacidad vigente es F0-P02, no las restricciones pendientes descritas en esta sección.

- Responsable: GPT-6.1 Sol (documentación, QA y revisión; no agente independiente de aprobación).
- Archivos: `README.md`, `docs/DEVELOPMENT_PLAN.md`, `docs/API.md`, `docs/ARCHITECTURE.md`, `docs/DATABASE.md`, `docs/BUSINESS_RULES.md`, `docs/TEST_PLAN.md`, `docs/DEPLOYMENT.md`, `docs/POKA_YOKES.md`, `docs/CHANGELOG.md` y este estado. Hallazgos/backlog en F0_AUDIT.
- Validación secuencial final: frozen install, lint, typecheck, 28 unitarias, build ficticio, 10 smoke E2E y audit sin avisos, todos exit 0. Enlaces locales comprobados, sin faltantes. Diff sin errores de whitespace nuevos; baseline conserva los originales. No SQL mutante, emisión, cleanup, push ni despliegue.
- Privacidad: escaneo ampliado del árbol vigente sin emails ajenos a plantillas, original ignorado/0600 verificado. El historial anterior conserva el dato personal: **NO saneado**, requiere autorización de reescritura antes de compartir Git. Esta verificación NO certifica ausencia de toda PII posible.
- Estado de la tarea documental: completado; estado integral Fase 0: **PARCIAL** por F0-P01. Commit final asociado por asunto estable `docs: record phase zero validation and privacy blocker` (su propio hash se consulta con `git log -1`; no se inventa autorreferencia).
- Siguiente: autorización específica para depurar únicamente el historial local creado en recuperación, preservando original local y verificando ausencia histórica. No iniciar funcionalidades nuevas con este bloqueo abierto. Después F1-I01 según plan, con infraestructura desechable nueva.

### Iteración F0-P01 — privacidad del SQL auxiliar

Registro histórico previo a autorización. La copia actual se anonimizó en esta tarea; el bloqueo de historial se resolvió después mediante F0-P02.

- Responsable: GPT-6.1 Sol; fallo de cobertura inicial reconocido, no atribuible al worker (fuera de su alcance).
- Archivos: `.gitignore`, SQL auxiliar, `docs/F0_AUDIT.md`, este informe; copia original preservada en `.local-recovery/original-admin-snippet.sql` (ignorada, modo 0600), sin mostrar su contenido. El SQL no fue ejecutado.
- Hallazgo: correo personal en el SQL administrativo incluido en baseline. Anonimizada copia actual con dominio reservado `.invalid`. **Historial previo NO saneado**, no remoto/push. Prohibido compartir repo/bundle/copia de recuperación; se requiere autorización de reescritura histórica local para cerrar F0.
- Pruebas: verificación de exclusión y permisos de copia, escaneo ampliado de emails del árbol vigente; no ejecución SQL ni escritura en BD. Reescritura y verificación de ausencia en historial: NO EJECUTADAS por autorización pendiente.
- Estado: parcial, bloquea certificación de Git distribuible. Commit por asunto `fix: anonymize administrative SQL and block repository sharing`. Siguiente: autorización específica y depuración comprobada; no continuar nuevas funcionalidades.

### Iteración F0-V01 — dependencias vulnerables

- Responsable: GPT-6.1 Sol; archivos `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `docs/F0_AUDIT.md` y este informe.
- Auditoría inicial `pnpm audit --json`: exit 1, 2 críticos/3 altos/6 moderados. Afectaba Vitest/mocker/tinypool (dev), PostCSS (Next), Zod y minimatch (lint).
- Cambios: Vitest 4.1.12, Zod 4.6.7; overrides acotados `next>postcss=8.5.23` y `@typescript-eslint/typescript-estree>minimatch=11.0.1`. No se forzó tinypool incompatible: se actualizó el runner completo. No se desactivaron avisos de auditoría.
- Validación: lint, typecheck, 28 unitarias, build aislado y 10 E2E pasan tras actualizaciones; `pnpm audit --json` exit 0, 0 avisos en todas las severidades. Esto cubre avisos conocidos del lockfile canónico, no garantiza ausencia de vulnerabilidades.
- Estado: completado en alcance local. Commit previsto `fix: patch audited dependency vulnerabilities`. `package-lock.json` histórico no se usa y queda pendiente de reconciliar; no ejecutar npm install/ci con él. Siguiente: cierre F0-D01.

### Iteración F0-Q02 — E2E determinista y transporte

- Responsable: GPT-6.1 Sol (QA y revisión); archivos `playwright.config.ts`, `tests/public.spec.ts`, `tests/operational-block.spec.ts`, este estado y registro metodológico `skill-observations/log.md`.
- Se actualizan los selectores al portal consultivo vigente sin habilitar ventas. Casos de inventario simulado listo/vacío/error, selección sin POST, móvil 375px y 9 handlers HTTP bloqueados. El servidor siempre usa URL/claves ficticias y no reutiliza uno existente; fixtures solo en memoria del navegador.
- Primer recorrido actualizado: 8/10; dos selectores `status` ambiguos (incluían `<output>`) se acotaron por contenido, sin retirar aserciones. Segundo recorrido: **10/10 pasan**. Lint/typecheck y reinstalación frozen pasan después del cambio. Los 4 smoke de middleware solo prueban anonimato, no login/roles reales.
- Estado: completado smoke aislado, NO E2E de negocio/BD. Build/unitarias se reejecutan en cierre global; CI remota sigue NO VERIFICADA. Commit previsto `test: isolate browser smoke checks and verify operational lock`. Siguiente F0-D01: cierre documental/gates.

### Iteración F0-Q01 — ESLint y CI básica

- Responsable: GPT-6.1 Sol; alcance de Fase 0, sin habilitar funcionalidades.
- Cambios: `eslint.config.mjs`, scripts/dependencias en `package.json`/`pnpm-lock.yaml`, workflow `.github/workflows/ci.yml`; limpieza de tipos/imports no usados en cinco rutas, componente de upload y test de emisión. Excepción CommonJS limitada a `scripts/*.js`, sin desactivar validación de tipos ni reglas de seguridad.
- El primer lint configurado encontró 10 errores/8 advertencias reales; se corrigieron tipos/imports y variables sin reabrir rutas. Los defectos de autorización y publicación siguen contenidos y registrados; no se confunde limpieza lint con corrección de negocio.
- CI sin secretos reales, con URL ficticia, sin DB, sin deploy; solo smoke frontend/unitarias. Ejecución remota NO VERIFICADA (no push autorizado). pnpm advierte deprecación ESLint 9, conservado por compatibilidad Next 15; migración mayor pendiente, no resuelta mediante silenciar advertencias.
- Validación local ejecutada: lint sin advertencias, typecheck, 28 unitarias y build aislado pasan. CI remota y E2E actualizadas NO VERIFICADAS aún. Estado: completado lint/configuración CI básica; no certifica pipeline remoto ni CI SQL. Commit previsto: `chore: add noninteractive lint and safe baseline CI`. Siguiente F0-Q02.

### Iteración F0-S01 — contención operativa

- Responsable: GPT-6.1 Sol (implementación y QA); no se delegaron ediciones concurrentes.
- Archivos: `lib/operation-gate.ts`, las ocho rutas API mutantes (también GET compradores), `vitest.config.ts`, `tests/operation-gate.test.ts`, `docs/API.md` y este informe.
- Alcance: bloqueo HTTP 503 previo a Auth/BD de 9 handlers; sin interruptor por entorno. Conserva el código recuperado detrás del bloqueo. No corrige ni certifica permisos, RLS, integridad de emisión ni idempotencia.
- Validación ejecutada: 18 casos de handlers pasan (flag pública false/true), sin llamadas a Auth/DB; suite completa 28/28, typecheck y build aislado pasan. E2E de transporte pendiente en F0-Q02. Estado: completado el bloqueo HTTP, NO los flujos de negocio.
- Commit previsto: `fix: contain unsafe operational endpoints during audit`. Siguiente: ESLint/CI y smoke E2E.

### Iteración F0-T01 — emisor inerte

- Responsable: GPT-6.1 Sol; sin nueva delegación tras el límite del worker.
- Base recuperada: commit raíz `04c78d0` (hash vigente tras depuración F0-P02; estado sin certificar), rama `main`; escaneo inicial de secretos sin hallazgos, con posterior fallo de cobertura PII documentado. `git diff --cached --check` encontró espacios finales preexistentes, conservados deliberadamente en baseline.
- Cambio: `scripts/issue_tickets.ts` deja de importar `arg` y el cliente de BD; conserva solo una constante deshabilitada. **No implementa emisión.**
- Prueba nueva: `tests/issuance-safety.test.ts` inspecciona AST, no importa/ejecuta el script, y rechaza cualquier sentencia adicional.
- Validación: 10 unitarias pasan; build aislado pasa; typecheck pasa al reejecutar secuencialmente. Primer typecheck concurrente con build falló TS6053 porque Next regeneraba `.next/types`: no ejecutar esos gates en paralelo. Lint y 2 E2E siguen pendientes de estabilización (no se atribuye éxito a esta tarea).
- Estado: completado únicamente el marcador seguro y desbloqueo de compilación, NO la emisión. Commit posterior se identifica por `fix: keep ticket issuance inert and restore typecheck`.

Ver backlog priorizado, dependencias y criterios en [`F0_AUDIT.md`](F0_AUDIT.md). Prohibido operar con la BD existente, otorgar permisos para hacer pasar pruebas, ejecutar emisión o aplicar `007`. La integración debe usar infraestructura **nueva y desechable**, no la BD existente. Requieren autorización/datos humanos: bases, permiso, mecanismo oficial, maestro físico, privacidad, bancos, hora límite y entrega. No se crearon remotos, push ni despliegues.
