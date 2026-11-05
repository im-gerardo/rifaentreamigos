# Poka-yokes

| Riesgo | Capa | Control | Estado |
|---|---|---|---|
| Enviar login incompleto | Interfaz | Botón deshabilitado hasta correo y contraseña | Implementado, pendiente E2E |
| Contraseña escrita a ciegas | Interfaz | Control visible para mostrar u ocultar contraseña | Implementado, pendiente E2E |
| Doble reserva | PostgreSQL | Bloqueo de filas y verificación de disponibilidad | Pendiente de validar en PostgreSQL |
| Reintento de reserva | PostgreSQL | Llave UUID de idempotencia vinculada al actor y contenido | Pendiente de validar en PostgreSQL |
| Liberar boleto con movimiento financiero | PostgreSQL | Retención de conciliación, nunca liberación automática | Pendiente de validar en PostgreSQL |
| Sobrepago | API y PostgreSQL | Centavos enteros y suma de pagos pendientes/aprobados bajo bloqueo de orden | Pendiente de validar en PostgreSQL |
| Doble conciliación | PostgreSQL | Un pago solo puede revisarse desde estado `pending` | Pendiente de validar en PostgreSQL |
| Venta presencial, pago o publicación inseguros | API | Todos los POST/PATCH y GET compradores bloqueados con `503 OPERATIONS_DISABLED`, sin switch por entorno | Verificado: 18 unitarias de handlers y 1 E2E HTTP sobre 9 handlers |
| Checkout público no autorizado | Producto | No existe checkout; selección consultiva nunca envía POST y reserva permanece deshabilitada | Verificado en smoke E2E con fixtures |

Cada control pendiente de validar requiere integración PostgreSQL antes de poder considerarse terminado.
