import { z } from 'zod';
import { rpcError } from '@/lib/api-errors';
import { authError, requireRole } from '@/lib/auth';
import { db } from '@/lib/supabase';

const buyerSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  phone: z.string()
    .trim()
    .min(7)
    .max(20)
    .transform((val) => val.replace(/\s+/g, '')),
});

const searchSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    await requireRole(['admin', 'seller']);
    const { searchParams } = new URL(req.url);
    
    const query = searchSchema.parse({
      name: searchParams.get('name')?.toLowerCase(),
      phone: searchParams.get('phone')?.replace(/\s+/g, ''),
    });

    let filter: any = {};
    if (query.name) {
      filter.name = `%${query.name}%`;
    }
    if (query.phone) {
      filter.phone = `%${query.phone}%`;
    }

    const { data, error } = await db()
      .from('buyers')
      .select('id, name, phone, created_at')
      .ilike('name', filter.name || '%')
      .ilike('phone', filter.phone || '%')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;
    return Response.json({ buyers: data });
  } catch (error) {
    return authError(error);
  }
}

export async function POST(req: Request) {
  try {
    await requireRole(['admin', 'seller']);
    const body = buyerSchema.parse(await req.json());

    // 1. Verificar si ya existe alguien con el mismo teléfono (evitar duplicados)
    const { data: existing } = await db()
      .from('buyers')
      .select('id')
      .eq('phone', body.phone)
      .maybeSingle();

    if (existing) {
      return Response.json(
        { error: 'Ya existe un comprador registrado con este teléfono', code: 'DUPLICATE_BUYER' },
        { status: 409 }
      );
    }

    // 2. Registrar nuevo comprador
    const { data: newBuyer, error } = await db()
      .from('buyers')
      .insert({
        name: body.name,
        phone: body.phone,
      })
      .select()
      .single();

    if (error) throw error;

    return Response.json({ buyer: newBuyer }, { status: 201 });
  } catch (error) {
    return authError(error);
  }
}
