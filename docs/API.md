# API

## Contención temporal de Fase 0 (2026-11-05)

**Contrato actual:** todos los POST/PATCH existentes y `GET /api/admin/buyers`
responden `503`, código `OPERATIONS_DISABLED`, con `Cache-Control: no-store`,
antes de autenticar o acceder a BD. Incluye publicación y validación de emisión.
No hay variable de entorno que permita abrir este bloqueo. Los contratos descritos
abajo son recuperados/objetivo, no autorización para operar. Los defectos subyacentes
siguen pendientes en `F0_AUDIT.md`; el bloqueo los contiene, no los corrige.

Todas las respuestas de error evitan enviar trazas, credenciales o mensajes internos de PostgreSQL.

| Método | Ruta | Acceso actual | Estado |
|---|---|---|---|
| `GET` | `/api/tickets` | Público, sin PII | Implementado; depende de `RAFFLE_ID` |
| `POST` | `/api/reservations` | Ninguno durante contención | 503 `OPERATIONS_DISABLED` |
| `POST` | `/api/payments` | Ninguno durante contención | 503 `OPERATIONS_DISABLED` |
| `GET` | `/api/admin/payments` | Administrador | Código recuperado; falta integración/grants |
| `PATCH` | `/api/admin/payments` | Ninguno durante contención | 503 `OPERATIONS_DISABLED` |
| `GET/POST` | `/api/admin/buyers` | Ninguno durante contención | 503; aislamiento vendedor pendiente |
| `POST` | `/api/admin/orders` | Ninguno durante contención | 503; actor seguro/flujo completo pendientes |
| `POST` | `/api/payments/evidence` | Ninguno durante contención | 503; propiedad/archivo/hash pendientes |
| `POST` | `/api/admin/raffle-validation` | Ninguno durante contención | 503; no certifica maestro físico |
| `POST` | `/api/admin/raffle-publish` | Ninguno durante contención | 503; RPC `007` insegura/no aplicada |

## Contrato recuperado/objetivo de reserva (no operativo)

`POST /api/reservations` requiere sesión, `Idempotency-Key` como UUID y cuerpo:

```json
{
  "buyerName": "Comprador de prueba",
  "phone": "4772879564",
  "ticketIds": ["uuid-del-boleto"]
}
```

## Contrato recuperado/objetivo de pago (no operativo)

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
