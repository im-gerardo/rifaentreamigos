# Despliegue

No hay autorización para despliegue público, cobros ni apertura de ventas.

**F0-P01 resuelto mediante F0-P02:** historial local depurado con autorización,
incluyendo autor/committer, y ausencia del identificador conocido verificada en
objetos/metadatos. No equivale a permiso para crear remotos, push o desplegar.
No compartir `.local-recovery/`, sus bundles ni el directorio de trabajo completo:
conservan PII/secretos privados fuera de Git. Ver `GIT_PRIVACY_RECOVERY.md`.

Antes de desplegar se requiere:

1. Aplicar y verificar migraciones en un entorno de desarrollo o staging desde cero.
2. Configurar secretos únicamente en el gestor del entorno, nunca en el repositorio.
3. Ejecutar typecheck, unitarias, integración PostgreSQL, E2E, build y revisión visual.
4. Verificar RLS, bucket privado, URLs firmadas y no exposición de PII.
5. Confirmar bases, aviso de privacidad, mecánica, archivo físico maestro y autorización aplicable.

Hay CI básica en `.github/workflows/ci.yml`: pnpm frozen, lint, typecheck,
unitarias, build y smoke E2E con credenciales ficticias. No contiene despliegue,
secretos reales ni integración SQL. No se realizó push ni ejecución remota, por
lo que CI remota es NO VERIFICADA. No hay plataforma/remoto configurado por esta
sesión. El siguiente entorno debe ser nuevo y desechable; no aplicar `007` ni
reutilizar la BD existente antes de revisar los bloqueos de `F0_AUDIT.md`.
