import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { db } from '@/lib/supabase';
import { requireRole } from '@/lib/auth';
import * as buyers from '@/app/api/admin/buyers/route';
import * as orders from '@/app/api/admin/orders/route';
import * as adminPayments from '@/app/api/admin/payments/route';
import * as publish from '@/app/api/admin/raffle-publish/route';
import * as validation from '@/app/api/admin/raffle-validation/route';
import * as evidence from '@/app/api/payments/evidence/route';
import * as payments from '@/app/api/payments/route';
import * as reservations from '@/app/api/reservations/route';

vi.mock('@/lib/supabase', () => ({ db: vi.fn(() => { throw new Error('DB must not be reached'); }) }));
vi.mock('@/lib/auth', () => ({
  requireRole: vi.fn(() => { throw new Error('Auth must not be reached'); }),
  authError: vi.fn(() => Response.json({ code: 'UNEXPECTED_AUTH_CALL' }, { status: 500 })),
}));

const routes: [string, string, (req: Request) => Promise<Response>][] = [
  ['/api/admin/buyers', 'GET', buyers.GET],
  ['/api/admin/buyers', 'POST', buyers.POST],
  ['/api/admin/orders', 'POST', orders.POST],
  ['/api/admin/payments', 'PATCH', adminPayments.PATCH],
  ['/api/admin/raffle-publish', 'POST', publish.POST],
  ['/api/admin/raffle-validation', 'POST', validation.POST],
  ['/api/payments/evidence', 'POST', evidence.POST],
  ['/api/payments', 'POST', payments.POST],
  ['/api/reservations', 'POST', reservations.POST],
];

beforeEach(() => vi.clearAllMocks());
afterEach(() => vi.unstubAllEnvs());

describe.each(['false', 'true'])('contención con PUBLIC_SALES_ENABLED=%s', (flag) => {
  it.each(routes)('%s %s devuelve 503 sin Auth ni DB', async (path, method, handler) => {
    vi.stubEnv('PUBLIC_SALES_ENABLED', flag);
    const response = await handler(new Request(`http://localhost${path}`, { method }));

    expect(response.status).toBe(503);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(await response.json()).toEqual({
      error: 'Operación deshabilitada durante la auditoría de seguridad.',
      code: 'OPERATIONS_DISABLED',
    });
    expect(requireRole).not.toHaveBeenCalled();
    expect(db).not.toHaveBeenCalled();
  });
});
