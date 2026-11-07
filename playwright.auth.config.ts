import { defineConfig } from '@playwright/test';

const runId = process.env.RIFA_AUTH_DISPOSABLE_RUN_ID;
const url = process.env.RIFA_AUTH_TEST_URL;
const port = process.env.RIFA_AUTH_APP_PORT;
if (!runId?.match(/^[a-f0-9]{32}$/) || !url?.match(/^http:\/\/127\.0\.0\.1:\d+$/) || !port?.match(/^\d+$/)) {
  throw new Error('Use pnpm run test:auth; an owned disposable Supabase stack is required');
}

export default defineConfig({
  testDir: './tests/auth-e2e',
  testMatch: '**/*.spec.ts',
  outputDir: `./artifacts/auth-tests/${runId}/playwright`,
  workers: 1,
  use: { baseURL: `http://127.0.0.1:${port}` },
  webServer: {
    command: `pnpm dev --hostname 127.0.0.1 --port ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      NEXT_PUBLIC_SUPABASE_URL: url,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.RIFA_AUTH_TEST_ANON_KEY!,
      SUPABASE_SERVICE_ROLE_KEY: process.env.RIFA_AUTH_TEST_SERVICE_KEY!,
      RAFFLE_ID: '20000000-0000-4000-8000-000000000001',
      PUBLIC_SALES_ENABLED: 'false',
      NEXT_TELEMETRY_DISABLED: '1',
    },
  },
});
