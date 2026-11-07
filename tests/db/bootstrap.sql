-- Contrato MINIMO de Auth/Storage para PostgreSQL aislado, NO servicios Supabase.
-- Solo el runner crea esta BD nueva; nunca ejecutar en un stack existente.
create role anon nologin;
create role authenticated nologin;
create role service_role nologin bypassrls;
create schema auth;
create table auth.users (id uuid primary key, email text not null unique);
create function auth.uid() returns uuid language sql stable as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid;
$$;
grant usage on schema auth to anon, authenticated, service_role;
grant execute on function auth.uid() to anon, authenticated, service_role;

create schema storage;
create table storage.buckets (
  id text primary key, name text not null, public boolean not null default false,
  file_size_limit bigint, allowed_mime_types text[]
);
alter table storage.buckets enable row level security;

create schema test_support;
create function test_support.assert_true(p_condition boolean, p_label text)
returns void language plpgsql as $$
begin
  if p_condition is distinct from true then
    raise exception 'RIFA_TEST_FAIL: %', p_label;
  end if;
  raise notice 'RIFA_TEST_PASS: %', p_label;
end;
$$;
grant usage on schema test_support to anon, authenticated, service_role;
grant execute on function test_support.assert_true(boolean,text) to anon, authenticated, service_role;

-- Invoker, NO SECURITY DEFINER: el SQL se evalúa con los permisos del rol probado.
create function test_support.expect_error(p_sql text, p_state text, p_label text)
returns void language plpgsql as $$
declare v_state text;
begin
  begin
    execute p_sql;
  exception when others then
    get stacked diagnostics v_state = returned_sqlstate;
    if v_state = p_state then
      raise notice 'RIFA_TEST_PASS: %', p_label;
      return;
    end if;
    raise exception 'RIFA_TEST_FAIL: % expected %, received %', p_label, p_state, v_state;
  end;
  raise exception 'RIFA_TEST_FAIL: % unexpectedly succeeded', p_label;
end;
$$;
grant execute on function test_support.expect_error(text,text,text) to anon, authenticated, service_role;
