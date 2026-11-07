DO $$
DECLARE
  v_user_id uuid := 'a0000000-0000-4000-8000-000000000001';
BEGIN
  -- Insertar o actualizar usuario en auth.users
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    v_user_id,
    'authenticated',
    'authenticated',
    'og.barrios@gmail.com',
    crypt('adminRifa2026!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Gerardo Barrios"}',
    now(),
    now()
  ) ON CONFLICT (id) DO UPDATE SET
    encrypted_password = crypt('adminRifa2026!', gen_salt('bf')),
    email_confirmed_at = now();

  -- Asignar en public.profiles como admin activo
  INSERT INTO public.profiles (id, role, active)
  VALUES (v_user_id, 'admin', true)
  ON CONFLICT (id) DO UPDATE SET role = 'admin', active = true;

  -- Crear identidad en auth.identities con provider_id
  INSERT INTO auth.identities (
    id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at
  ) VALUES (
    gen_random_uuid(),
    v_user_id::text,
    v_user_id,
    jsonb_build_object('sub', v_user_id::text, 'email', 'og.barrios@gmail.com'),
    'email',
    now(),
    now(),
    now()
  ) ON CONFLICT DO NOTHING;
END $$;
