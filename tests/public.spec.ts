import { test, expect } from '@playwright/test';

const tickets = [
  { id: 'demo-available', folio: 1, state: 'available', ticket_numbers: [0, 1, 2, 3, 4].map(number => ({ number })) },
  { id: 'demo-paid', folio: 2, state: 'paid', ticket_numbers: [5, 6, 7, 8, 9].map(number => ({ number })) },
];

test('home presenta el premio, precio informativo y bloqueo de ventas', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Pulsar N250');
  await expect(page.getByRole('region', { name: 'Datos principales de la emisión' }).getByText('$250', { exact: true })).toBeVisible();
  await expect(page.getByRole('status').filter({ hasText: 'Ventas públicas deshabilitadas' })).toBeVisible();
  await expect(page.locator('a[href="/checkout"]')).toHaveCount(0);
});

test('inventario permite selección consultiva, nunca reserva ni pago', async ({ page }) => {
  await page.route('**/api/tickets', route => route.fulfill({ json: { tickets } }));
  const writes: string[] = [];
  page.on('request', request => {
    if (['POST', 'PATCH', 'DELETE', 'PUT'].includes(request.method())) writes.push(request.url());
  });
  await page.goto('/boletos');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Consulta los folios de la emisión.');
  await expect(page.getByText('Las ventas públicas todavía no están habilitadas.', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: /001 Disponible/ }).click();
  await expect(page.getByText('1 seleccionados', { exact: false })).toBeVisible();
  await expect(page.getByRole('button', { name: /002 Pagado/ })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Reservar próximamente' })).toBeDisabled();
  await expect(page.getByText('000 · 001 · 002 · 003 · 004')).toBeVisible();
  expect(writes).toEqual([]);
});

test('inventario vacío no inventa folios ni muestra compra activa', async ({ page }) => {
  await page.route('**/api/tickets', route => route.fulfill({ json: { tickets: [] } }));
  await page.goto('/boletos');
  await expect(page.getByRole('heading', { name: 'La emisión aún no está publicada' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Reservar/ })).toHaveCount(0);
});

test('error de inventario es explicativo y no habilita compra', async ({ page }) => {
  await page.route('**/api/tickets', route => route.fulfill({ status: 503, json: { error: 'DEMO_UNAVAILABLE' } }));
  await page.goto('/boletos');
  await expect(page.getByText('Los folios todavía no se han publicado.', { exact: false })).toBeVisible();
  await expect(page.getByRole('button', { name: /Reservar/ })).toHaveCount(0);
});

test('portal consultivo es navegable en móvil sin desbordamiento horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.route('**/api/tickets', route => route.fulfill({ json: { tickets: [] } }));
  await page.goto('/');
  await expect(page.getByRole('status').filter({ hasText: 'Ventas públicas deshabilitadas' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('link', { name: 'Consultar los folios' }).click();
  await expect(page.getByRole('heading', { name: 'La emisión aún no está publicada' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
