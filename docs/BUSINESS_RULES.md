# Reglas de negocio — intención del código y límites verificados

Actualizado 2026-11-05: los controles SQL listados abajo **NO están certificados**.
Faltan grants, integración/RLS y pruebas de concurrencia. Se verificó el bloqueo
HTTP 503 previo a BD de toda operación mutante y GET compradores (28 unitarias
totales y 10 E2E smoke); no hay interruptor público para retirarlo. La consulta
de catálogo sigue siendo informativa. Ver `IMPLEMENTATION_STATUS.md`.

## Estados

Los valores vigentes en base de datos están en inglés para conservar compatibilidad técnica; la interfaz debe mostrarlos en español.

| Entidad | Estados |
|---|---|
| Boleto | `available`, `reserved`, `reconciliation_hold`, `paid`, `blocked` |
| Orden | `reserved`, `partial`, `proof_pending`, `reconciliation_hold`, `paid`, `expired`, `cancelled` |
| Pago | `pending`, `approved`, `rejected` |

## Controles críticos propuestos en SQL (pendientes de integración)

- Un vendedor solo puede crear reservas con una llave de idempotencia UUID. Reintentar la misma solicitud devuelve la misma orden; reutilizar la llave para otro contenido se rechaza.
- La reserva bloquea los boletos en orden y exige que todos sigan disponibles antes de crear la orden.
- La expiración nunca libera boletos si hay un pago pendiente o aprobado. Los pasa a `reconciliation_hold` para revisión administrativa.
- Los importes se reciben y almacenan como centavos enteros. No se aceptan números flotantes.
- Una transferencia exige referencia. El registro de un pago no lo confirma, queda `pending` hasta la conciliación de un administrador.
- La aprobación verifica el total aprobado antes de cambiar estado. No permite sobrepagos ni doble aprobación.
- El checkout público permanece ausente y, por tanto, deshabilitado. El portal no cobra ni genera reservas públicas.

## Emisión de boletos

`scripts/generate_tickets.js` crea 200 folios con 5 números por folio, cubriendo el universo `000` a `999` una sola vez. Requiere `TICKET_ISSUANCE_SEED` y produce un checksum SHA-256 para cotejo.

El script no autoriza emitir ni cargar boletos. Antes de usar un manifiesto se debe cotejar con el archivo maestro de los boletos físicos y aplicar las restricciones de publicación pendientes.
