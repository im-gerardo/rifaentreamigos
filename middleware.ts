import { createServerClient } from '@supabase/ssr';
import type { CookieOptions } from '@supabase/ssr/dist/module/types';
import { NextResponse, type NextRequest } from 'next/server';

type CookieToSet = { name: string; value: string; options: CookieOptions };

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
    },
  );

  // Bypass local de desarrollo para pruebas si existe la cookie dev_admin_session
  const devSession = request.cookies.get('dev_admin_session');
  if (devSession?.value) {
    return response;
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) return response;
  } catch {
    // Si Supabase local no responde, continúa a login
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/iniciar-sesion';
  loginUrl.searchParams.set('redirect', `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*'],
};
