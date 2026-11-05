# Cambios

## 2026-11-05 — depuración histórica autorizada (F0-P02)

- Usuario autorizó reescribir únicamente el historial local de recuperación; ocho commits preservados, mensajes/fechas y código actual intactos. SQL e identidades author/committer depurados del identificador conocido; hashes nuevos en GIT_PRIVACY_RECOVERY.
- Verificados todos los objetos y metadatos Git, objetos commit antiguos ausentes, fsck correcto. Original/bundle privado ignorados con permisos restringidos; no distribuir `.local-recovery/` ni el directorio de trabajo completo.
- Identidad técnica solo en configuración Git local; global, entorno y agentes sin cambios. No hay remoto, push, despliegue ni operaciones Supabase. Bloqueo específico F0-P01 cerrado; producto y dinero siguen sin certificar.

## 2026-11-05 — recuperación / Fase 0

- Git local recuperado en `main`, baseline `04c78d0` (hash vigente tras F0-P02) explícitamente sin certificar; secretos y artefactos locales excluidos. Sin remotos, push ni despliegue.
- Emisor persistente reemplazado por marcador inerte, sin ejecutarlo; TS2307 corregido.
- Contención 503 de escrituras, publicación, validación y listado inseguro de compradores; defectos internos pendientes, código preservado bajo bloqueo.
- ESLint 9 flat config no interactivo y CI básica aislada; CI remota no ejecutada.
- 28 unitarias y 10 smoke E2E pasan, con build/typecheck/lint. Avisos conocidos de dependencias corregidos (Vitest 4, Zod 4, overrides PostCSS/minimatch); audit sin avisos.
- Catálogos SQL inspeccionados solo lectura: `001–006` aplicadas, grants de servicio ausentes y 2 tablas sin RLS. `007` insegura/no aplicada; integración SQL y flujos de dinero NO VERIFICADOS.
- Matriz, agentes/delegación parcial, backlog y commits en IMPLEMENTATION_STATUS/F0_AUDIT. No se avanzó a funcionalidades de Fases 1–7.
- Hallazgo tardío de PII en SQL auxiliar del baseline: copia actual anonimizada, original preservado ignorado/0600, sin ejecutar SQL. Se bloqueó compartir Git hasta obtener autorización; posteriormente resuelto mediante F0-P02, sin reescritura unilateral.

## 2026-10-28

- Se estabilizó el proyecto con pnpm, alias de TypeScript y separación de pruebas unitarias y E2E.
- Se agregó emisión determinista comprobable de boletos, sin cargar una emisión aleatoria como inventario real.
- Se añadieron migraciones pendientes de aplicar para idempotencia, pagos, conciliación y expiración atómica.
- Se agregó inicio de sesión por correo y contraseña y middleware para proteger `/admin/**`.
- Se actualizaron los documentos de arquitectura, base de datos, API, reglas, diseño, poka-yokes, pruebas y despliegue.

Nota histórica del 2026-10-28: entonces no había Git; esta limitación se resolvió el 2026-11-05, sin certificar el producto.
