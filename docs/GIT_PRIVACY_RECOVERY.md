# F0-P02 — depuración autorizada del historial local

Fecha: 2026-11-05. Responsable: GPT-6.1 Sol (ejecución y QA). Sin nuevas
delegaciones: no se distribuyó el identificador privado a otros agentes.
Autorización explícita del usuario posterior al bloqueo F0-P01.

## Alcance y conservación

- Solo ocho commits de recuperación, rama `main`; no había otras refs, remotos,
  worktrees, alternates ni objetos ajenos no alcanzables. No se hizo push.
- Se sustituyó el correo conocido en un blob SQL y en author/committer de los
  ocho commits. Las identidades coincidentes quedaron como
  `Rifa Recovery <recovery@example.invalid>`; el SQL usa un correo DEMO reservado.
- Se preservaron los ocho commits, su orden, mensajes y fechas. Para cada commit
  se cotejaron todos los archivos y modos con el estado previo, permitiendo solo
  la sustitución SQL prevista. Árbol HEAD e índice previos/posteriores idénticos.
- `.env.local`, configuración de agentes y original privado mantuvieron sus
  SHA-256. Solo se configuró una identidad técnica **Git local** para prevenir
  reintroducción del dato; configuración global no modificada.

## Respaldo privado (no distribuir)

El original sigue en `.local-recovery/original-admin-snippet.sql` (0600).
En `.local-recovery/history-redaction-2026-11-05/` se conservan bundle previo
verificado, configuración Git previa, reglas/mailmap privados, manifiestos,
mapa de commits y resultados de verificación. Directorio 0700, archivos 0600;
toda la carpeta está ignorada, no hay refs Git apuntando al respaldo.

**El respaldo contiene deliberadamente el dato original y el historial antiguo.**
No compartir `.local-recovery/`, sus bundles ni el directorio de trabajo completo.
Esta tarea no autoriza borrar el respaldo, crear remotos ni publicar el proyecto.
Los hashes antiguos siguientes son trazabilidad, no objetos recuperables del Git actual.

## Correspondencia de commits

| Anterior | Vigente | Tarea |
|---|---|---|
| `9292bc6` | `04c78d0` | Baseline sin certificar |
| `e521fd9` | `7d408d3` | Emisor inerte y typecheck |
| `a161f02` | `cb929bb` | Contención HTTP |
| `73f601e` | `8d4e632` | ESLint y CI básica |
| `3e4fd1a` | `a841f23` | E2E aisladas |
| `704fa97` | `401e4d1` | Dependencias vulnerables |
| `e1c6256` | `0e4d52e` | Anonimizar SQL vigente |
| `71fdb33` | `49a1816` | Informe previo al saneamiento |

El commit documental posterior se identifica por asunto
`chore: verify authorized Git history redaction`.

## Método y comprobaciones ejecutadas

1. Lectura README → AGENTS → plan; árbol limpio, refs e inventario de objetos
   comprobados. Bundle privado creado/verificado antes de reescribir.
2. `git-filter-repo==2.47.0` instalado en venv temporal aislado, sin modificar
   dependencias del proyecto. Ensayo inicial detectó que la poda por defecto
   elimina commits sintéticos vacíos: no se ejecutó sobre el proyecto así.
3. Ensayos corregidos de contenido e identidades con conservación explícita de
   commits. La prevalidación encontró también el dato en identidades Git y se
   ajustó el alcance exacto antes de la única reescritura real.
4. Herramienta con `--force --prune-empty never --prune-degenerate never`,
   `--replace-text` y `--mailmap`, usando archivos privados, nunca el dato en
   argumentos o salida. Reempaquetado/limpieza efectuados por la herramienta.
5. Comparación de los ocho árboles completos y metadatos contra manifiesto
   previo; mensajes/fechas intactos, solo identidades previstas cambiadas.
6. `git cat-file --batch-all-objects --batch`, procesado en memoria sin mostrar
   contenido, inspeccionó **217 objetos** (129 blobs, 80 árboles, 8 commits):
   **cero coincidencias** del identificador conocido, sin distinguir mayúsculas.
7. Inspección de **31 archivos de metadatos** fuera de objetos: cero coincidencias.
   Ninguno de los ocho objetos commit originales existe. Solo `refs/heads/main`,
   sin refs de backup/reemplazo. `git fsck --full --no-reflogs`: correcto, sin hallazgos.
8. Regresión posterior: instalación frozen, lint, typecheck, 28 unitarias, build
   ficticio, 10 smoke E2E y audit sin avisos conocidos, todos exit 0. Evidencia
   privada en `regression-results.json`. Reescaneo tras el commit documental:
   evidencia en `final-verification.json` privado y confirmación en reporte final;
   no se deduce su resultado únicamente del éxito de la herramienta de reescritura.

Las cifras 217/31 corresponden al instante posterior a reescribir, antes del
commit documental. Ese commit agrega objetos y se vuelve a inspeccionar al final.
La depuración comprueba el identificador conocido en este repositorio, **no**
anonimato universal, borrado en backups/conversaciones/snapshots externos ni
ausencia de toda PII posible. Ventas, pagos y publicación siguen sin autorización;
no se ejecutó SQL, emisión, limpieza de reservas ni conexiones Supabase.
