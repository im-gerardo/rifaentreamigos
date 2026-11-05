# Skill Observation Log

Observations captured during task-oriented work.

**Status key:** OPEN = not yet actioned | ACTIONED (YYYY-MM-DD) = skill updated/created | DECLINED (YYYY-MM-DD) = user decided not to pursue.

---

## 2026-10-28

### Observation 1: Verificar la instalación funcional, no solo el lockfile

**Status:** OPEN
**Date:** 2026-10-28
**Session context:** Estabilización de un proyecto Next.js después de migrar de npm a pnpm.
**Skill:** New skill candidate: baseline de dependencias JavaScript
**Type:** open-source
**Phase/Area:** Validación del entorno

**Issue:** Un lockfile puede pasar la verificación de políticas aunque `node_modules` esté incompleto o en transición desde otro gestor; las pruebas y el build siguen sin poder ejecutarse.

**Suggested improvement:** Tras instalar o migrar de gestor de paquetes, ejecutar de inmediato una comprobación funcional mínima, por ejemplo el binario del framework, typecheck y una prueba unitaria, antes de declarar el entorno listo.

**Principle:** La integridad declarativa de dependencias no sustituye una verificación ejecutable del entorno.

## 2026-11-05

### Observation 2: Reservar presupuesto para evidencia y revisar entregas parciales

**Status:** OPEN
**Date:** 2026-11-05
**Session context:** Auditoría delegada con lectura previa obligatoria y límite reducido de pasos.
**Skill:** New skill candidate: delegación verificable de auditorías
**Type:** open-source
**Phase/Area:** Orquestación y aceptación

**Issue:** Un ejecutor agotó pasos antes de revisar el archivo de pruebas; su resumen contenía una afirmación de atomicidad no sustentada. La sesión terminada no demostraba el alcance completado.

**Suggested improvement:** Presupuestar lectura obligatoria, inspección y reporte por separado; pedir evidencia por archivo y auditar de forma independiente lo incompleto, sin repetir automáticamente la misma delegación.

**Principle:** El cierre de una sesión y la confianza del resumen no sustituyen evidencia de cobertura ni revisión independiente.

### Observation 3: Los gates con artefactos compartidos no son independientes

**Status:** OPEN
**Date:** 2026-11-05
**Session context:** Estabilización de typecheck y build en un proyecto App Router.
**Skill:** New skill candidate: baseline de dependencias JavaScript
**Type:** open-source
**Phase/Area:** Validación del entorno

**Issue:** Ejecutar build y typecheck simultáneamente provocó TS6053 al regenerarse los tipos de Next. La misma verificación pasó al ejecutarse secuencialmente, sin cambiar tipos del proyecto.

**Suggested improvement:** Antes de paralelizar gates, identificar directorios generados compartidos. Ejecutar build, dev/E2E y typecheck secuencialmente; registrar el fallo inicial y su causa, no ocultarlo mediante reintentos.

**Principle:** La independencia lógica de dos comprobaciones no implica independencia de sus efectos sobre el sistema de archivos.

### Observation 4: El escaneo de secretos no sustituye revisar privacidad antes del baseline

**Status:** OPEN
**Date:** 2026-11-05
**Session context:** Recuperación de versionado sobre archivos preexistentes.
**Skill:** New skill candidate: recuperación segura de repositorios
**Type:** open-source
**Phase/Area:** Auditoría previa al primer commit

**Issue:** El escaneo heurístico de claves no detectó un identificador personal dentro de un SQL auxiliar. Se encontró después del commit raíz; anonimizar el árbol actual no lo eliminó del historial local.

**Suggested improvement:** Antes de crear baseline, inventariar y leer snippets/seeds además del código principal; añadir detección de emails/PII y revisión de excepciones. Si se detecta tarde, preservar el original fuera de versionado, bloquear distribución y obtener autorización específica antes de reescribir historial.

**Principle:** Un repositorio limpio de claves no implica un historial apto para distribuir; la revisión de privacidad debe preceder al primer commit.

### Observation 5: Depurar identidades y objetos recuperables, no solo versiones de archivos

**Status:** OPEN
**Date:** 2026-11-05
**Session context:** Depuración autorizada de historial Git local con respaldo privado.
**Skill:** New skill candidate: recuperación segura de repositorios
**Type:** open-source
**Phase/Area:** Verificación de reescritura

**Issue:** El mismo identificador del archivo también aparecía en author/committer. La poda por defecto de la herramienta eliminaba un commit vacío en el ensayo sintético. Revisar solo árboles alcanzables habría omitido identidades, reflogs y objetos antiguos recuperables.

**Suggested improvement:** Ensayar con datos sintéticos, preservar commits explícitamente y cotejar árboles/metadatos contra manifiesto previo. Ajustar identidad local antes de reescribir, inspeccionar todos los objetos y metadatos, verificar ausencia de commits originales y repetir el escaneo tras el commit documental. Mantener backups sensibles fuera de refs/versionado.

**Principle:** La ausencia de un dato en archivos actuales no demuestra su ausencia en el repositorio; la verificación debe abarcar contenido, identidades, referencias y objetos recuperables.
