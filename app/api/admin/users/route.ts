import { NextResponse } from 'next/server';
import { db } from '@/lib/supabase';

// Generar una contraseña segura y fácil de compartir ej: Rifa-9k2X!
function generateSecurePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let randomPart = '';
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `Rifa-${randomPart}!`;
}

export async function POST(req: Request) {
  try {
    const { name, email, phone, role } = await req.json();

    const normalizedEmail = (email || '').trim().toLowerCase();
    const cleanName = (name || '').trim();
    const cleanPhone = (phone || '').replace(/\D/g, '');
    const userRole = role === 'admin' ? 'admin' : 'seller';

    if (!cleanName || !normalizedEmail || !cleanPhone) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios.' }, { status: 400 });
    }

    const supabase = db();
    const generatedPassword = generateSecurePassword();

    // 1. Crear el usuario en auth.users mediante admin auth api de Supabase
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: normalizedEmail,
      password: generatedPassword,
      email_confirm: true,
      user_metadata: {
        name: cleanName,
        phone: cleanPhone,
      },
    });

    if (authError || !authData.user) {
      if (authError?.message?.includes('already been registered') || authError?.message?.includes('duplicate')) {
        return NextResponse.json({ error: 'Ya existe un usuario con este correo electrónico en Supabase.' }, { status: 409 });
      }
      return NextResponse.json({ error: authError?.message || 'Error al crear usuario en Supabase.' }, { status: 500 });
    }

    const userId = authData.user.id;

    // 2. Insertar / Actualizar en public.profiles
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        role: userRole,
        active: true,
      });

    if (profileError) {
      console.error('Error al actualizar profile:', profileError);
    }

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        name: cleanName,
        email: normalizedEmail,
        phone: cleanPhone,
        role: userRole,
        active: true,
        createdAt: new Date().toISOString(),
      },
      generatedPassword,
    });
  } catch (error: unknown) {
    console.error('Error en POST /api/admin/users:', error);
    const message = error instanceof Error ? error.message : 'Error interno del servidor.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
