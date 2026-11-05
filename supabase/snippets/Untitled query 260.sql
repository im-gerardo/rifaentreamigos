-- Solo plantilla DEMO. No ejecutar sobre usuarios/datos existentes.
-- Original conservado localmente fuera de Git; no corresponde a autorización.
insert into public.profiles (id, role, active)
select id, 'admin', true
from auth.users
where email = 'admin-demo@example.invalid'
on conflict (id) do update
set role = 'admin', active = true;
