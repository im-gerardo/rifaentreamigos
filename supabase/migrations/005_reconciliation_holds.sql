-- Estados explícitos para fondos o comprobantes que requieren intervención.
-- Esta migración solo agrega valores al enum. Debe aplicarse antes de 006.
alter type ticket_state add value if not exists 'reconciliation_hold';
alter type order_state add value if not exists 'reconciliation_hold';
