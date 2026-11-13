import { test, expect } from '@playwright/test';

test.describe('Página interactiva: ¿Cómo se elige al ganador?', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/como-se-elige-al-ganador');
  });

  test('Carga correctamente la estructura y los 3 pasos educativos', async ({ page }) => {
    // Título principal
    await expect(page.locator('h1')).toContainText('¿Cómo se elige al ganador?');

    // Paso 1: Indicadores visuales
    await expect(page.locator('text=200 Boletos')).toBeVisible();
    await expect(page.locator('text=5 Números')).toBeVisible();
    await expect(page.locator('text=1,000 Participaciones')).toBeVisible();

    // Boleto de ejemplo con 5 números
    await expect(page.locator('text=042')).toBeVisible();
    await expect(page.locator('text=187')).toBeVisible();
    await expect(page.locator('text=356')).toBeVisible();
    await expect(page.locator('text=827')).toBeVisible();
    await expect(page.locator('text=991')).toBeVisible();

    // Paso 2: Demostración práctica con 34827
    await expect(page.locator('text=34827')).toBeVisible();
    await expect(page.locator('text=Repetir demostración')).toBeVisible();

    // Paso 3: Simulador interactivo
    await expect(page.locator('label', { hasText: 'Introduce el número del Premio Mayor' })).toBeVisible();
    const input = page.locator('input[placeholder="Ej. 34827"]');
    await expect(input).toBeVisible();
  });

  test('Simulador valida y extrae dinámicamente las últimas 3 cifras', async ({ page }) => {
    const input = page.locator('input[placeholder="Ej. 34827"]');
    
    // Probar número válido
    await input.fill('07968');
    await expect(page.locator('text=968')).toBeVisible();

    // Probar límite superior 60000 -> 000
    await input.fill('60000');
    await expect(page.locator('text=000')).toBeVisible();

    // Probar número fuera de emisión (ej: 60001)
    await input.fill('60001');
    await expect(page.locator('text=Número fuera de emisión oficial (00001 a 60000)')).toBeVisible();

    // Probar longitud insuficiente
    await input.fill('123');
    await expect(page.locator('text=Faltan 2 dígitos (deben ser 5 exactos)')).toBeVisible();
  });

  test('Botones de ejemplos precargados actualizan el resultado y búsqueda de boleto', async ({ page }) => {
    // Click en ejemplo 34827
    await page.click('button:has-text("34827")');
    await expect(page.locator('text=827')).toBeVisible();
    // Debe buscar en la relación de boletos y encontrar el folio
    await expect(page.locator('text=Boleto Oficial Asignado:')).toBeVisible();

    // Click en copiar
    const copyButton = page.locator('button:has-text("Copiar número ganador")');
    await expect(copyButton).toBeVisible();
  });

  test('Enlaces oficiales de transparencia y Lotería Nacional están presentes', async ({ page }) => {
    const lnLink = page.locator('a[href*="loterianacional.gob.mx"]');
    await expect(lnLink.first()).toBeVisible();

    const miloteriaLink = page.locator('a[href*="miloteria.mx"]');
    await expect(miloteriaLink).toBeVisible();
  });
});
