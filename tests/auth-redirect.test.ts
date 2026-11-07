import { expect, it } from 'vitest';
import { safeAdminRedirect } from '@/lib/auth-redirect';

it.each(['/admin', '/admin/pagos', '/admin/pagos?filter=pending', '/admin#resumen'])(
  'preserva destino local %s', value => expect(safeAdminRedirect(value)).toBe(value),
);
it.each([undefined, '', '//example.invalid', 'https://example.invalid', 'javascript:alert(1)',
  '/\\example.invalid', '/administer', '/admin\\example.invalid', '/admin%5cfoo', '/admin%0afoo', '/admin%zz', '/boletos'])(
  'rechaza destino externo/ambiguo %s', value => expect(safeAdminRedirect(value)).toBe('/admin'),
);
