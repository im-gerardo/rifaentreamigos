import { z } from 'zod';
import { rpcError } from '@/lib/api-errors';
import { authError, requireRole } from '@/lib/auth';
import { db } from '@/lib/supabase';
import { reservationSchema } from '@/lib/validation';
import { operationalBlockResponse } from '@/lib/operation-gate';

const adminOrderSchema = reservationSchema.extend({
  sellerId: z.string().uuid(),
  idempotencyKey: z.string().uuid(),
});

export async function POST(req: Request) {
  const blocked = operationalBlockResponse();
  if (blocked) return blocked;
  try {
    // Pendiente: derivar el actor de sesión, nunca reabrir esta ruta tal como está.
    await requireRole(['admin', 'seller']);
    const body = adminOrderSchema.parse(await req.json());
    const { buyerName, phone, ticketIds, sellerId, idempotencyKey } = body;
    
    const raffleId = process.env.RAFFLE_ID;
    if (!raffleId) {
      return Response.json({ error: 'Rifa no configurada', code: 'RAFFLE_NOT_CONFIGURED' }, { status: 503 });
    }

    const { data, error } = await db().rpc('reserve_tickets', {
      p_raffle: raffleId,
      p_name: buyerName,
      p_phone: phone,
      p_ticket_ids: ticketIds,
      p_source: 'seller',
      p_seller: sellerId,
      p_idempotency_key: idempotencyKey,
    });

    if (error) {
      const errorMessage = error.message.split(':').pop()?.trim() || error.message;
      return rpcError(errorMessage);
    }

    return Response.json({ orderId: data }, { status: 201 });
  } catch (error) {
    return authError(error);
  }
}
