import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const normalized = (email || '').trim().toLowerCase();
    
    // Si contiene "vendedor" o "seller", inicia sesión de vendedor en modo local
    if (normalized.includes('vendedor') || normalized.includes('seller')) {
      const response = NextResponse.json({ success: true, redirect: '/admin/boletos' });
      response.cookies.set('dev_admin_session', `seller:${normalized}`, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }

    // Acepta og.barrios@gmail.com o cualquier usuario admin en local
    if (
      normalized === 'og.barrios@gmail.com' ||
      normalized.includes('admin') ||
      normalized.includes('gera')
    ) {
      const response = NextResponse.json({ success: true, redirect: '/admin' });
      response.cookies.set('dev_admin_session', `admin:${normalized}`, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 días
      });
      return response;
    }

    return NextResponse.json(
      { error: 'Correo no autorizado para administración' },
      { status: 401 },
    );
  } catch (e) {
    return NextResponse.json({ error: 'Error interno en login dev' }, { status: 500 });
  }
}
