import { test, expect } from '@playwright/test';

test('todas las operaciones HTTP permanecen bloqueadas antes de tocar Supabase', async ({ request }) => {
  const routes = [
    ['GET', '/api/admin/buyers'],
    ['POST', '/api/admin/buyers'],
    ['POST', '/api/admin/orders'],
    ['PATCH', '/api/admin/payments'],
    ['POST', '/api/admin/raffle-publish'],
    ['POST', '/api/admin/raffle-validation'],
    ['POST', '/api/payments/evidence'],
    ['POST', '/api/payments'],
    ['POST', '/api/reservations'],
  ];
  for (const [method, path] of routes) {
    const response = await request.fetch(path, { method });
    expect(response.status(), `${method} ${path}`).toBe(503);
    expect((await response.json()).code).toBe('OPERATIONS_DISABLED');
    expect(response.headers()['cache-control']).toBe('no-store');
  }
});
