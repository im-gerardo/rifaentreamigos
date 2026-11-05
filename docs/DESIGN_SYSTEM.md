# Sistema visual actual

El sistema visual usa negro, amarillo, blanco y grises neutros. La intención es un portal de motocicleta claro y sobrio, no una interfaz genérica de sorteos.

| Token | Valor | Uso |
|---|---|---|
| Fondo | `#101114` | Base del sitio |
| Superficie | `#1b1d22` | Tarjetas y paneles |
| Acento | `#ffd21a` | Acción primaria y foco |
| Texto | `#f6f6f6` | Contenido principal |
| Texto secundario | `#c8c8c8` | Descripciones |
| Error | `#ffb4a9` | Error de campo |

## Formularios

- La etiqueta siempre va sobre el campo.
- El envío se deshabilita hasta tener los datos mínimos.
- Los errores se muestran junto al formulario, sin temporizador.
- Las contraseñas permiten mostrarse u ocultarse.
- El foco visible usa el amarillo de marca y no depende solo del cambio de color.

El panel administrativo actual no está migrado a shadcn/ui y no debe considerarse terminado. Esa migración requiere instalar sus dependencias y validar todos los recorridos.
