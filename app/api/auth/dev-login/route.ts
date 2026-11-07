import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const normalizedEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!normalizedEmail || !cleanPassword) {
      return NextResponse.json({ error: 'Ingresa correo y contraseña.' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://supabase-kong:8000';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Si Supabase está disponible, autenticar de forma estricta contra auth.users
    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() { return []; },
          setAll() {},
        },
      });

      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: cleanPassword,
      });

      if (error || !data.user) {
        return NextResponse.json(
          { error: 'Credenciales inválidas. Verifica tu correo y contraseña.' },
          { status: 401 }
        );
      }

      // Validar rol en profiles
      const { data: profile } = await supabase
        .from('profiles')
        .select('role, active')
        .eq('id', data.user.id)
        .single();

      if (!profile?.active) {
        return NextResponse.json({ error: 'Esta cuenta está desactivada.' }, { status: 403 });
      }

      const role = profile.role || 'seller';
      const redirectUrl = role === 'admin' ? '/admin' : '/admin/boletos';

      const response = NextResponse.json({ success: true, redirect: redirectUrl });
      response.cookies.set('dev_admin_session', `${role}:${normalizedEmail}`, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }

    // Fallback estricto con contraseña requerida si no hay Supabase configurado
    if (normalizedEmail === 'og.barrios@gmail.com') {
      if (cleanPassword !== 'adminRifa2026!') {
        return NextResponse.json({ error: 'Contraseña incorrecta.' }, { status: 401 });
      }
      const response = NextResponse.json({ success: true, redirect: '/admin' });
      response.cookies.set('dev_admin_session', `admin:${normalizedEmail}`, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }

    return NextResponse.json({ error: 'Usuario no autorizado.' }, { status: 401 });
  } catch (e) {
    return NextResponse.json({ error: 'Error interno en autenticación.' }, { status: 500 });
  }
}
