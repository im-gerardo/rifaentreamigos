import { describe, expect, it } from 'vitest';
import { formatMXN, paymentSchema, reservationSchema } from '../lib/validation';

const orderId = 'a6c2cbf1-64dd-4d4d-b36f-6ebc61e31c2a';

describe('reglas de validación', () => {
  it('acepta una reserva de vendedor y normaliza el teléfono', () => {
    const result = reservationSchema.safeParse({
      buyerName: 'Juan Pérez',
      phone: '477 287 9564',
      ticketIds: [orderId],
    });

    expect(result.success).toBe(true);
    if (result.success) expect(result.data.phone).toBe('4772879564');
  });

  it('rechaza teléfono inválido y selección vacía', () => {
    expect(reservationSchema.safeParse({ buyerName: 'Juan', phone: '123', ticketIds: [orderId] }).success).toBe(false);
    expect(reservationSchema.safeParse({ buyerName: 'Juan', phone: '4772879564', ticketIds: [] }).success).toBe(false);
  });

  it('acepta importes enteros en centavos, nunca flotantes', () => {
    expect(paymentSchema.safeParse({ orderId, amountCents: 25_000, method: 'cash' }).success).toBe(true);
    expect(paymentSchema.safeParse({ orderId, amountCents: 250.5, method: 'cash' }).success).toBe(false);
    expect(paymentSchema.safeParse({ orderId, amountCents: -1, method: 'cash' }).success).toBe(false);
  });

  it('exige una referencia para transferencias', () => {
    expect(paymentSchema.safeParse({ orderId, amountCents: 25_000, method: 'transfer' }).success).toBe(false);
    expect(
      paymentSchema.safeParse({ orderId, amountCents: 25_000, method: 'transfer', reference: 'SPEI-123' }).success,
    ).toBe(true);
  });

  it('formatea centavos como pesos mexicanos', () => {
    expect(formatMXN(25_000)).toContain('250');
  });
});
