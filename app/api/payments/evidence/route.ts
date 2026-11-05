import { z } from 'zod';
import { authError, requireRole } from '@/lib/auth';
import { db } from '@/lib/supabase';
import { operationalBlockResponse } from '@/lib/operation-gate';

const evidenceSchema = z.object({
  paymentId: z.string().uuid(),
  storagePath: z.string().min(1),
  sha256: z.string().length(64).optional(),
});

export async function POST(req: Request) {
  const blocked = operationalBlockResponse();
  if (blocked) return blocked;
  try {
    // Falta verificar propiedad de pago/orden/objeto; conservar el bloqueo.
    await requireRole(['admin', 'seller']);
    const body = evidenceSchema.parse(await req.json());
    const { paymentId, storagePath, sha256 } = body;

    // 1. Verificar que el pago existe y pertenece a la rifa
    const { data: payment, error: paymentError } = await db()
      .from('payments')
      .select('id')
      .eq('id', paymentId)
      .single();

    if (paymentError || !payment) {
      return Response.json({ error: 'Pago no encontrado', code: 'PAYMENT_NOT_found' }, { status: 404 });
    }

    // 2. Registrar el comprobante en la tabla payment_evidence
    const { error: evidenceError } = await db()
      .from('payment_evidence')
      .insert({
        payment_id: paymentId,
        storage_path: storagePath,
        sha256: sha256,
      });

    if (evidenceError) throw evidenceError;

    return Response.json({ ok: true, message: 'Evidencia vinculada con éxito' }, { status: 201 });
  } catch (error) {
    return authError(error);
  }
}
