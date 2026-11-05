import { z } from 'zod';
import { rpcError } from '@/lib/api-errors';
import { authError, requireRole } from '@/lib/auth';
import { db } from '@/lib/supabase';
import { operationalBlockResponse } from '@/lib/operation-gate';

const publishSchema = z.object({
  raffleId: z.string().uuid(),
  manifest: z.array(z.object({
    folio: z.string().regex(/^\d{3}$/),
    numbers: z.array(z.string().regex(/^\d{3}$/)).length(5),
  })),
});

export async function POST(req: Request) {
  const blocked = operationalBlockResponse();
  if (blocked) return blocked;
  try {
    const { user } = await requireRole(['admin']);
    const body = publishSchema.parse(await req.json());
    const { raffleId, manifest } = body;

    // Transformamos el formato del frontend para que sea compatible con el JSONB de SQL
    // El frontend envía strings, pero el SQL necesita arrays de números/folios.
    // Aunque el SQL hace el cast, enviamos los datos limpios.
    const manifestForRpc = manifest.map(m => ({
      folio: m.folio,
    // El SQL usa jsonb_array_elements_text para los números, así que enviamos strings
      numbers: m.numbers, 
    }));

    const { data, error } = await db().rpc('publish_raffle_batch', {
      p_raffle_id: raffleId,
      p_manifest_json: JSON.stringify(manifest) // Enviamos el array de objetos
    });

    if (error) return rpcError(error.message);

    return Response.json({ 
      ok: true, 
      message: 'Rifa publicada e inventario persistido con éxito',
      auditTrail: {
        admin: user.id,
        timestamp: new Date().toISOString()
      }
    }, { status: 201 });

  } catch (error) {
    return authError(error);
  }
}
