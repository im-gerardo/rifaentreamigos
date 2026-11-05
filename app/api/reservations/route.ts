import { z } from 'zod';
import { rpcError } from '@/lib/api-errors';
import { authError, requireRole } from '@/lib/auth';
import { db } from '@/lib/supabase';
import { reservationSchema } from '@/lib/validation';
import { operationalBlockResponse } from '@/lib/operation-gate';

export async function POST(req: Request) {
  const blocked = operationalBlockResponse();
  if (blocked) return blocked;
  try {
    const { user } = await requireRole(['admin', 'seller']);
    const body = reservationSchema.parse(await req.json());
    const idempotencyKey = z.string().uuid().parse(req.headers.get('idempotency-key'));
    const raffleId = process.env.RAFFLE_ID;

    if (!raffleId) {
      return Response.json({ error: 'Rifa no configurada', code: 'RAFFLE_NOT_CONFIGURED' }, { status: 503 });
    }

    const { data, error } = await db().rpc('reserve_tickets', {
      p_raffle: raffleId,
      p_name: body.buyerName,
      p_phone: body.phone,
      p_ticket_ids: body.ticketIds,
      p_source: 'seller',
      p_seller: user.id,
      p_idempotency_key: idempotencyKey,
    });
    if (error) return rpcError(error.message);
    return Response.json({ orderId: data }, { status: 201 });
  } catch (error) {
    return authError(error);
  }
}
