import { test, expect, type Page } from '@playwright/test';

const password = process.env.RIFA_AUTH_TEST_PASSWORD!;
const api = process.env.RIFA_AUTH_TEST_URL!;
const anon = process.env.RIFA_AUTH_TEST_ANON_KEY!;

async function login(page: Page, user: string) {
  await page.goto('/iniciar-sesion');
  await page.getByLabel('Correo electrónico').fill(`${user}@example.invalid`);
  await page.getByLabel('Contraseña', { exact: true }).fill(password);
  await page.getByRole('button', { name: 'Iniciar sesión', exact: true }).click();
}

test('admin inicia y cierra sesion real; deja de acceder al panel', async ({ page }) => {
  await login(page, 'admin');
  await expect(page).toHaveURL(/\/admin$/);
  await expect(page.locator('.stat').filter({ hasText: 'Órdenes' }).locator('strong')).toHaveText('2');
  await expect(page.getByRole('heading', { name: 'Panel de administración' })).toBeVisible();
  const response = await page.request.get('/api/admin/payments');
  expect(response.status()).toBe(200);
  await page.getByRole('button', { name: 'Cerrar sesión' }).click();
  await expect(page).toHaveURL(/\/iniciar-sesion$/);
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/iniciar-sesion/);
});

test('seller autentica pero no consulta conciliacion admin', async ({ page }) => {
  await login(page, 'seller-a');
  await expect(page).toHaveURL(/\/admin$/);
  await expect(page.locator('.stat').filter({ hasText: 'Órdenes' }).locator('strong')).toHaveText('1');
  const response = await page.request.get('/api/admin/payments');
  expect(response.status()).toBe(403);
  expect((await response.json()).code).toBe('FORBIDDEN');
  expect((await page.request.post('/api/reservations', { data: {} })).status()).toBe(503);
});

for (const user of ['inactive', 'no-profile']) {
  test(`usuario ${user} no accede al panel aunque Auth valide credenciales`, async ({ page }) => {
    await login(page, user);
    await expect(page).toHaveURL(/\/iniciar-sesion\?reason=access_denied$/);
    expect((await page.request.get('/api/admin/payments')).status()).toBe(403);
  });
}

test('JWT real de seller solo permite leer su orden via PostgREST', async ({ request }) => {
  const auth = await request.post(`${api}/auth/v1/token?grant_type=password`, {
    headers: { apikey: anon }, data: { email: 'seller-a@example.invalid', password },
  });
  expect(auth.ok()).toBe(true);
  const session = await auth.json();
  const headers = { apikey: anon, Authorization: `Bearer ${session.access_token}` };
  const own = await request.get(`${api}/rest/v1/orders?select=id`, { headers });
  expect(own.status()).toBe(200);
  expect(await own.json()).toEqual([{ id: '40000000-0000-4000-8000-000000000001' }]);
  const other = await request.get(`${api}/rest/v1/orders?id=eq.40000000-0000-4000-8000-000000000002&select=id`, { headers });
  expect(await other.json()).toEqual([]);
  const escalate = await request.patch(`${api}/rest/v1/profiles?id=eq.${session.user.id}`, {
    headers, data: { role: 'admin' },
  });
  expect([401, 403]).toContain(escalate.status());
});

test('anon no lee compradores via PostgREST', async ({ request }) => {
  const response = await request.get(`${api}/rest/v1/buyers?select=id,name,phone`, { headers: { apikey: anon } });
  expect([401, 403]).toContain(response.status());
});
