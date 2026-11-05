-- 1. Tabla de Consentimientos
-- Registra qué versión de las bases y aviso de privacidad aceptó el comprador en cada orden.
create table order_consents (
    id uuid primary key default gen_random_uuid(),
    order_id uuid not null references orders(id) on delete cascade,
    raffle_rules_id uuid references raffle_rules(id),
    accepted_at timestamptz not null default now(),
    ip_address text,
    user_agent text,
    unique(order_id)
);

-- 2. Trigger de Auditoría Automática para Boletos
-- Cada vez que un boleto cambie de estado, se registra automáticamente en ticket_events.
create or replace function public.fn_audit_ticket_state_change()
returns trigger language plpgsql security definer as $$
begin
    if (old.state is distinct from new.state) then
        insert into public.ticket_events (ticket_id, action, details, created_at)
        values (
            new.id, 
            'state_change', 
            jsonb_build_object('from', old.state, 'to', new.state), 
            now()
        );
    end if;
    return new;
end;
$$;

create trigger tr_audit_ticket_state
after update on public.tickets
for each row execute function public.fn_audit_ticket_state_change();

-- 3. Índice para optimizar la búsqueda de boletos expirados
create index idx_orders_expires_at on orders(expires_at) where state = 'reserved';
