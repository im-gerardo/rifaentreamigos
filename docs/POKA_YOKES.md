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
| Venta presencial sin comprador autorizado | API | Ruta bloqueada con `503` hasta implementar el flujo completo | Implementado |
| Checkout público no autorizado | Producto | No existe ruta ni endpoint público de compra | Implementado |

Cada control pendiente de validar requiere integración PostgreSQL antes de poder considerarse terminado.
