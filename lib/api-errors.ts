const errorMap: Record<string, { code: string; message: string; status: number }> = {
  FORBIDDEN: { code: 'FORBIDDEN', message: 'Sin permisos', status: 403 },
  INVALID_SELECTION: { code: 'VALIDATION_ERROR', message: 'La selección no es válida.', status: 400 },
  INVALID_SOURCE: { code: 'VALIDATION_ERROR', message: 'El origen de la operación no es válido.', status: 400 },
  IDEMPOTENCY_KEY_REUSED: {
    code: 'VALIDATION_ERROR',
    message: 'La llave de idempotencia ya corresponde a otra solicitud.',
    status: 409,
  },
  RAFFLE_NOT_OPEN: { code: 'RAFFLE_NOT_OPEN', message: 'La rifa no está abierta.', status: 409 },
  RESERVATION_EXPIRED: {
    code: 'RESERVATION_EXPIRED',
    message: 'No es posible crear una reservación después de la fecha límite.',
    status: 409,
  },
  TICKETS_UNAVAILABLE: {
    code: 'TICKET_UNAVAILABLE',
    message: 'Uno o más boletos ya no están disponibles.',
    status: 409,
  },
  ORDER_NOT_FOUND: { code: 'VALIDATION_ERROR', message: 'La orden no existe.', status: 400 },
  ORDER_NOT_ACTIVE: { code: 'PAYMENT_REVIEW_REQUIRED', message: 'La orden no admite pagos.', status: 409 },
  INVALID_PAYMENT: { code: 'VALIDATION_ERROR', message: 'El pago no es válido.', status: 400 },
  PAYMENT_REFERENCE_REQUIRED: {
    code: 'VALIDATION_ERROR',
    message: 'La referencia es obligatoria para transferencias.',
    status: 400,
  },
  OVERPAYMENT: {
    code: 'VALIDATION_ERROR',
    message: 'El importe excede el saldo de la orden.',
    status: 409,
  },
  PAYMENT_NOT_PENDING: {
    code: 'PAYMENT_REVIEW_REQUIRED',
    message: 'El pago ya fue revisado o no está disponible.',
    status: 409,
  },
};

export function rpcError(message?: string) {
  const error = errorMap[message ?? ''];
  if (error) return Response.json({ error: error.message, code: error.code }, { status: error.status });
  return Response.json({ error: 'No fue posible completar la operación.', code: 'INTERNAL_ERROR' }, { status: 500 });
}
