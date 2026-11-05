# API

Todas las respuestas de error evitan enviar trazas, credenciales o mensajes internos de PostgreSQL.

| Método | Ruta | Acceso actual | Estado |
|---|---|---|---|
| `GET` | `/api/tickets` | Público, sin PII | Implementado; depende de `RAFFLE_ID` |
| `POST` | `/api/reservations` | Administrador o vendedor | Implementado sin validar contra PostgreSQL |
| `POST` | `/api/payments` | Administrador o vendedor | Implementado sin validar contra PostgreSQL |
| `GET/PATCH` | `/api/admin/payments` | Administrador | Implementado sin validar contra PostgreSQL |
| `POST` | `/api/admin/orders` | Ninguno | Devuelve `503` hasta implementar el flujo autorizado de compradores |

## Reserva de vendedor

`POST /api/reservations` requiere sesión, `Idempotency-Key` como UUID y cuerpo:

```json
{
  "buyerName": "Comprador de prueba",
  "phone": "4772879564",
  "ticketIds": ["uuid-del-boleto"]
}
```

## Pago

`POST /api/payments` recibe importes en centavos, no en pesos:

```json
{
  "orderId": "uuid-de-la-orden",
  "amountCents": 25000,
  "method": "transfer",
  "reference": "REFERENCIA-DEL-PAGO"
}
```

Los códigos estables contemplados incluyen `UNAUTHORIZED`, `FORBIDDEN`, `VALIDATION_ERROR`, `TICKET_UNAVAILABLE`, `RAFFLE_NOT_OPEN`, `RESERVATION_EXPIRED` y `PAYMENT_REVIEW_REQUIRED`.
