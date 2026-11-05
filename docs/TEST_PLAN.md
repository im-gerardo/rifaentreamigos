# Plan de pruebas

## Ejecutado

- Unitarias de validación: teléfono, selección, centavos enteros, transferencia con referencia y formato MXN.
- Unitarias de emisión: 200 folios, 1,000 números únicos, cobertura `000-999`, checksum determinista y semilla obligatoria.
- Lint no interactivo sin advertencias, typecheck y build Next.js con entorno ficticio.
- 28 unitarias (Vitest 4.1.12): 9 existentes + AST de emisor inerte + 18 handlers contenidos sin Auth/DB, incluso con flag pública true.
- 10 smoke Playwright/Chromium: 4 redirecciones anónimas, 5 portal consultivo (listo/vacío/error, selección sin POST y móvil 375px), 1 transporte que comprueba 9 handlers HTTP 503.
- Auditoría de paquetes: inicialmente 11 avisos (2 críticos/3 altos/6 moderados); tras corrección `pnpm audit --json` exit 0, cero avisos conocidos.
- Catálogos SQL solo lectura, sin probar operación ni acceder a registros sensibles.
- F0-P02: ensayo Git sintético de sustitución en blob/autor/committer conservando commits vacíos; verificación por commit de archivos/mensajes/fechas, árbol actual e índice intactos, originales privados sin cambios. Escaneo posterior: 217 objetos Git y 31 archivos de metadatos, cero coincidencias del identificador; 8 objetos commit antiguos ausentes, fsck sin hallazgos. Son cifras al terminar la reescritura; el commit documental añade objetos nuevos y exige reescaneo. Véase `GIT_PRIVACY_RECOVERY.md`.

## Reproducción segura

Comandos en README. Playwright sobrescribe credenciales/URL con valores ficticios
y no reutiliza un servidor existente. Los folios simulados existen solo como
fixtures de respuesta de navegador. Build, typecheck y dev/E2E son secuenciales:
ejecutarlos simultáneamente puede borrar/regenerar `.next/types` durante typecheck.
CI básica usa Node 24; ejecución local se comprobó con Node 26.5.0. CI remota no
ejecutada, sin push. No afirmar equivalencia entre esos entornos.

## Pendiente y necesario antes de operar

- Integración PostgreSQL: aplicar migraciones desde cero, RLS por rol, reserva doble concurrente, idempotencia, doble aprobación y sobrepago.
- Integración de Storage: MIME real, tamaño, hash, URL temporal y permisos de comprobantes.
- E2E: login, logout, restricción vendedor-administrador, reserva, pago, conciliación, expiración y móvil.
- Accesibilidad y revisión visual en 375, 768 y 1440 px.

La restricción histórica EPERM no se reproduce en esta sesión. Inicialmente
faltaba Chromium y fallaron 2/6 E2E por selectores antiguos; tras instalarlo y
actualizar cobertura pasan 10/10. Un intento intermedio tuvo 2 selectores `status`
ambiguos; se acotaron por contenido sin eliminar garantías. El historial completo
queda registrado en IMPLEMENTATION_STATUS. Integración SQL, login real y E2E de
negocio siguen **NO VERIFICADOS**; requieren infraestructura desechable nueva,
no otorgar permisos ni escribir datos en el stack existente para pasar QA.
