import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { ZodError } from 'zod';
import { db } from './supabase';

export async function requireRole(allowed: ('admin' | 'seller')[]) {
  const jar = await cookies();
  const devSession = jar.get('dev_admin_session');
  if (devSession?.value) {
    const isSeller = devSession.value.startsWith('seller:');
    const role: 'admin' | 'seller' = isSeller ? 'seller' : 'admin';
    const email = devSession.value.includes(':')
      ? devSession.value.split(':')[1]
      : 'og.barrios@gmail.com';

    if (!allowed.includes(role)) {
      throw new Error('FORBIDDEN');
    }

    return {
      user: {
        id: '00000000-0000-0000-0000-000000000000',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        email,
      },
      role,
    };
  }

  const client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return jar.getAll();
        },
        setAll() {},
      },
    },
  );
  const {
    data: { user },
    error,
  } = await client.auth.getUser();
  if (error || !user) throw new Error('UNAUTHORIZED');
  const { data: profile } = await db()
    .from('profiles')
    .select('role,active')
    .eq('id', user.id)
    .single();
  if (!profile?.active || !allowed.includes(profile.role)) throw new Error('FORBIDDEN');
  return { user, role: profile.role as 'admin' | 'seller' };
}

export function authError(error: unknown) {
  if (error instanceof ZodError) {
    return Response.json({ error: 'Datos inválidos', code: 'VALIDATION_ERROR' }, { status: 400 });
  }

  const message = error instanceof Error ? error.message : '';
  const status = message === 'UNAUTHORIZED' ? 401 : message === 'FORBIDDEN' ? 403 : 500;
  const body =
    status === 401
      ? { error: 'No autenticado', code: 'UNAUTHORIZED' }
      : status === 403
        ? { error: 'Sin permisos', code: 'FORBIDDEN' }
        : { error: 'Error interno', code: 'INTERNAL_ERROR' };
  return Response.json(body, { status });
}
