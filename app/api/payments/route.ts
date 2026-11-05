import { rpcError } from '@/lib/api-errors';
import { authError, requireRole } from '@/lib/auth';
import { db } from '@/lib/supabase';
import { paymentSchema } from '@/lib/validation';

export async function POST(req: Request) {
  try {
    const { user } = await requireRole(['admin', 'seller']);
    const body = paymentSchema.parse(await req.json());
    const { data, error } = await db().rpc('register_payment', {
      p_order: body.orderId,
      p_amount_cents: body.amountCents,
      p_method: body.method,
      p_reference: body.reference ?? null,
      p_actor: user.id,
    });
    if (error) return rpcError(error.message);
    return Response.json({ paymentId: data }, { status: 201 });
  } catch (error) {
    return authError(error);
  }
}
