import { test, expect } from '@playwright/test';

test.describe('Middleware: Protección de rutas administrativas', () => {
  
  test('unauthenticated user accessing /admin/pagos redirects to /iniciar-sesion', async ({ page }) => {
    // Intentar acceder a una route protegida del admin
    await page.goto('/admin/pagos');
    
    // Verificar que la URL ha cambiado a la página de inicio de sesión
    await expect(page).toHaveURL(/\/iniciar-sesion/);
  });

  test('unauthenticated user accessing /admin/orders redirects to /iniciar-sesion', async ({ page }) =>
  {
    // Intentar acceder a otra ruta protegida del admin
    await page.goto('/admin/orders');
    
    // Verificar redirección
    await expect(page).toHaveURL(/\/iniciar-sesion/);
  });

  test('unauthenticated user accessing /boletos is NOT redirected (public route)', async ({ page }) =>
  {
    // Intentar acceder a una ruta pública (fuera del matcher de middleware)
    await page.goto('/boletos');
    
    // Verificar que permanece en la ruta pública
    await expect(page).toHaveURL(/\/boletos/);
  });

  test('redirect includes the original destination in searchParams', async ({ page }) =>
  {
    const targetPath = '/admin/pagos?param=test';
    await page.goto(targetPath);
    
    // Verificar que el parámetro 'redirect' contiene el destino original
    const url = new URL(page.url());
    expect(url.searchParams.get('redirect')).toBe(targetPath);
  });

});
