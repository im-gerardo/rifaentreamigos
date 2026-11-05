# Despliegue

No hay autorización para despliegue público, cobros ni apertura de ventas.

Antes de desplegar se requiere:

1. Aplicar y verificar migraciones en un entorno de desarrollo o staging desde cero.
2. Configurar secretos únicamente en el gestor del entorno, nunca en el repositorio.
3. Ejecutar typecheck, unitarias, integración PostgreSQL, E2E, build y revisión visual.
4. Verificar RLS, bucket privado, URLs firmadas y no exposición de PII.
5. Confirmar bases, aviso de privacidad, mecánica, archivo físico maestro y autorización aplicable.

No hay configuración de CI ni de plataforma de despliegue en este checkout, por lo que no se realizó ningún push ni despliegue.
