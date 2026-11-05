import { z } from 'zod';
import { rpcError } from '@/lib/api-errors';
import { authError, requireRole } from '@/lib/auth';
import { db } from '@/lib/supabase';

const validationSchema = z.object({
  masterManifest: z.array(z.object({
    folio: z.string().regex(/^\d{3}$/),
    numbers: z.array(z.string().regex(/^\d{3}$/)).length(5),
  })),
  checksumSha256: z.string().length(64),
});

export async function POST(req: Request) {
  try {
    const { user } = await requireRole(['admin']);
    const body = validationSchema.parse(await req.json());
    
    const raffleId = process.env.RAFFLE_ID;
    if (!raffleId) {
      return Response.json({ error: 'Rifa no configurada', code: 'RAFFLE_NOT_CONFIGURED' }, { status: 503 });
    }

    // 1. Re-generar el canonical mapping para verificar el checksum
    const canonicalMapping = body.masterManifest
      .map((t) => `${t.folio}:${t.numbers.join(',')}`)
      .join('\n');
    
    const crypto = require('crypto');
    const computedChecksum = crypto.createHash('sha256').update(canonicalMapping).digest('hex');

    if (computedChecksum !== body.checksumSha256) {
      return Response.json({ error: 'Checksum mismatch: El contenido no coincide con la firma', code: 'CHECKSUM_INVALID' }, { status: 400 });
    }

    // 2. Verificar que no haya duplicados en el lote
    const allNumbers = body.masterManifest.flatMap(t => t.numbers);
    const uniqueNumbers = new Set(allNumbers);
    if (uniqueNumbers.size !== allNumbers.length) {
      return Response.json({ error: 'Se detectaron números duplicados en el lote de validación', code: 'DUPLICATE_NUMBERS' }, { status: 400 });
    }

    // 3. Aquí iría la lógica de persistencia en la BD (actualizar tickets/ticket_numbers)
    // Por ahora, simulamos éxito de validación.
    
    return Response.json({ 
      ok: true, 
       message: 'Validación de integridad completada con éxito',
       auditedBy: user.id 
    }, { status: 200 });

  } catch (error) {
    return authError(error);
  }
}
