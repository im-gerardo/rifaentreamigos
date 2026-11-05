import { z } from 'zod';

const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[0-9 ]{10,16}$/, 'Teléfono inválido')
  .transform((phone) => phone.replace(/\s/g, ''));

export const reservationSchema = z.object({
  buyerName: z.string().trim().min(2).max(120),
  phone: phoneSchema,
  ticketIds: z.array(z.string().uuid()).min(1).max(20),
});

export const paymentSchema = z.object({
  orderId: z.string().uuid(),
  amountCents: z.number().int().positive().max(5_000_000),
  method: z.enum(['transfer', 'cash']),
  reference: z.string().trim().max(100).optional(),
  evidencePath: z.string().url().optional(),
})
  .superRefine((payment, context) => {
    if (payment.method === 'transfer' && !payment.reference) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['reference'],
        message: 'La referencia es obligable para transferencias.',
      });
    }
  });

export function formatMXN(cents: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(cents / 100);
}
