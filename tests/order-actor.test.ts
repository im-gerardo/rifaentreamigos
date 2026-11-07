import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/admin/orders/route';

const mocks = vi.hoisted(() => ({ rpc: vi.fn(), requireRole: vi.fn() }));
vi.mock('@/lib/operation-gate', () => ({ operationalBlockResponse: () => null }));
vi.mock('@/lib/supabase', () => ({ db: () => ({ rpc: mocks.rpc }) }));
vi.mock('@/lib/auth', async () => {
  const original = await vi.importActual<typeof import('@/lib/auth')>('@/lib/auth');
  return { ...original, requireRole: mocks.requireRole };
});

const actor = '10000000-0000-4000-8000-000000000002';
const body = { buyerName: '[DEMO] Comprador', phone: '0000000001',
  ticketIds: ['50000000-0000-4000-8000-000000000001'], idempotencyKey: '80000000-0000-4000-8000-000000000001' };
function request(value: unknown) {
  return new Request('http://localhost/api/admin/orders', { method: 'POST',
    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(value) });
}
beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv('RAFFLE_ID', '20000000-0000-4000-8000-000000000001');
  mocks.requireRole.mockResolvedValue({ user: { id: actor }, role: 'seller' });
  mocks.rpc.mockResolvedValue({ data: 'demo-order', error: null });
});
afterEach(() => vi.unstubAllEnvs());

it('deriva el actor de sesión con BD simulada y sin retirar el gate real', async () => {
  expect((await POST(request(body))).status).toBe(201);
  expect(mocks.rpc).toHaveBeenCalledWith('reserve_tickets', expect.objectContaining({ p_seller: actor }));
});
it('rechaza sellerId suministrado por el cliente', async () => {
  expect((await POST(request({ ...body, sellerId: '10000000-0000-4000-8000-000000000003' }))).status).toBe(400);
  expect(mocks.rpc).not.toHaveBeenCalled();
});
it('rechaza actor sin permiso antes de tocar la BD simulada', async () => {
  mocks.requireRole.mockRejectedValue(new Error('FORBIDDEN'));
  expect((await POST(request(body))).status).toBe(403);
  expect(mocks.rpc).not.toHaveBeenCalled();
});
