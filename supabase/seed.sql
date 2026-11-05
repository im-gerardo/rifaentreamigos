-- Seed data for development/demo
-- Note: This does NOT create auth.users, only profiles. 
-- You must create users in Supabase Auth and then links them or manually insert profiles.

-- 1. Create a demo raffle
insert into raffles (name, prize, price_cents, draw_at, payment_deadline, reservation_hours, status)
values ('Demo Raffle - Pulsar N250', 'Bajaj Pulsar N250, 2026, Yellow', 25000, '2026-11-20 20:00:00+00', '2026-11-17 20:00:00+00', 24, 'draft')
returning id;

-- 2. Assuming you have created a user with UUID '00000000-0000-0000-0000-000000000000' as admin
-- insert into profiles (id, role, active) values ('00000000-0000-0000-0000-000000000000', 'admin', true);

-- 3. Assuming you have created a user with UUID '11111111-1111-1111-1111-111111111111' as seller
-- insert into profiles (id, role, active) values ('11111111-1111-1111-1111-111111111111', 'seller', true);

-- 4. Create some dummy buyers
insert into buyers (name, phone) values 
('Juan Perez', '5551234567'),
('Maria Garcia', '5559876543');
