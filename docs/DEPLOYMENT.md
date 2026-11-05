# Despliegue

No hay autorización para despliegue público, cobros ni apertura de ventas.

**Bloqueo adicional F0-P01:** no compartir/publicar el repositorio ni crear remotos
antes de depurar el dato personal del historial inicial con autorización específica.
La copia actual del SQL está anonimizada; eso no sanea commits anteriores.

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
