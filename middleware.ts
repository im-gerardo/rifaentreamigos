import { createServerClient } from '@supabase/ssr';
import type { CookieOptions } from '@supabase/ssr/dist/module/types';
import { NextResponse, type NextRequest } from 'next/server';

type CookieToSet = { name: string; value: string; options: CookieOptions };

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  // 1. Bypass si existe la sesión de administrador
  const devSession = request.cookies.get('dev_admin_session');
  if (devSession?.value) {
    return response;
  }

  // 2. Si las variables de Supabase están configuradas, validar sesión de auth
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet: CookieToSet[]) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          },
        },
      });

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) return response;
    } catch {
      // Continuar a redirección de login
    }
  }

  // Redirigir a iniciar sesión con parámetro de retorno
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/iniciar-sesion';
  loginUrl.searchParams.set('redirect', `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*'],
};
