import { z } from 'zod';
import { rpcError } from '@/lib/api-errors';
import { authError, requireRole } from '@/lib/auth';
import { db } from '@/lib/supabase';
import { operationalBlockResponse } from '@/lib/operation-gate';

const reviewSchema = z.object({ paymentId: z.string().uuid(), approve: z.boolean() });

export async function GET() {
  try {
    await requireRole(['admin']);
    const { data, error } = await db()
      .from('payments')
      .select('id,amount_cents,method,reference,state,created_at,orders(id,buyers(name,phone))')
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) throw error;
    return Response.json({ payments: data });
  } catch (error) {
    return authError(error);
  }
}

export async function PATCH(req: Request) {
  const blocked = operationalBlockResponse();
  if (blocked) return blocked;
  try {
    const { user } = await requireRole(['admin']);
    const body = reviewSchema.parse(await req.json());
    const { error } = await db().rpc('review_payment', {
      p_payment: body.paymentId,
      p_approve: body.approve,
      p_actor: user.id,
    });
    if (error) return rpcError(error.message);
    return Response.json({ ok: true });
  } catch (error) {
    return authError(error);
  }
}
