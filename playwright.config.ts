import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  testIgnore: '**/auth-e2e/**',
  use: {
    baseURL: 'http://127.0.0.1:3000',
  },
  webServer: {
    command: 'pnpm dev --hostname 127.0.0.1',
    url: 'http://127.0.0.1:3000',
    // Nunca probar contra un servidor ya abierto o credenciales de .env.local.
    reuseExistingServer: false,
    env: {
      NEXT_PUBLIC_SUPABASE_URL: 'http://127.0.0.1:1',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'phase0-test-only',
      SUPABASE_SERVICE_ROLE_KEY: 'phase0-test-only',
      RAFFLE_ID: '',
      PUBLIC_SALES_ENABLED: 'false',
      NEXT_TELEMETRY_DISABLED: '1',
    },
    timeout: 120_000,
  },
});
