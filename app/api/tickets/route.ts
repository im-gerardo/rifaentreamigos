import { db } from '@/lib/supabase';
import manifest from '@/public/tickets-manifest.json';

export async function GET() {
  const id = process.env.RAFFLE_ID;
  if (!id) {
    // Si no hay DB configurada localmente, devolver el catálogo del manifiesto oficial
    const tickets = manifest.tickets.map((t) => ({
      id: `ticket-${t.folio}`,
      folio: parseInt(t.folio, 10),
      state: 'available',
      ticket_numbers: t.numbers.map((n) => ({ number: parseInt(n, 10) })),
    }));
    return Response.json({ tickets });
  }

  const { data, error } = await db()
    .from('tickets')
    .select('id,folio,state,ticket_numbers(number)')
    .eq('raffle_id', id)
    .order('folio');

  if (error || !data || data.length === 0) {
    // Fallback al manifiesto oficial si la base aún no ha corrido la migración 009
    const tickets = manifest.tickets.map((t) => ({
      id: `ticket-${t.folio}`,
      folio: parseInt(t.folio, 10),
      state: 'available',
      ticket_numbers: t.numbers.map((n) => ({ number: parseInt(n, 10) })),
    }));
    return Response.json({ tickets });
  }

  return Response.json({ tickets: data });
}
