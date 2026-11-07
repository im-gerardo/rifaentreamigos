import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { expect, it } from 'vitest';

const script = resolve('scripts/test-db.mjs');

it('el runner rechaza targets externos antes de ejecutar Docker', () => {
  const result = spawnSync(process.execPath, [script, '--target=external'], {
    encoding: 'utf8', timeout: 10_000,
  });
  expect(result.status).toBe(1);
  expect(result.stderr).toContain('no external targets accepted');
  expect(result.stdout).not.toContain('Disposable PostgreSQL:');
});

it('el runner rechaza un daemon Docker remoto antes de conectarse', () => {
  const result = spawnSync(process.execPath, [script], {
    env: { ...process.env, DOCKER_HOST: 'tcp://198.51.100.1:2375' },
    encoding: 'utf8', timeout: 10_000,
  });
  expect(result.status).toBe(1);
  expect(result.stderr).toContain('Only a local Unix Docker daemon is allowed');
  expect(result.stdout).not.toContain('Disposable PostgreSQL:');
});
