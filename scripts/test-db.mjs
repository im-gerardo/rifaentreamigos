import { spawnSync } from 'node:child_process';
import { randomUUID, createHash } from 'node:crypto';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// No URL/credenciales/ID de contenedor configurables: este runner SOLO crea su BD.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const runId = randomUUID();
const name = `rifa-db-test-${runId}`;
const label = 'io.rifa.disposable-test';
const image = 'postgres:17-alpine';
const report = { runId, image, migrations: [], suites: [], mutationChecks: [], status: 'failed' };
let container;
let layout;

function docker(args, input, timeout = 60_000) {
  const result = spawnSync('docker', args, {
    cwd: root, input, encoding: 'utf8', timeout, maxBuffer: 4 * 1024 * 1024,
  });
  if (result.error || result.status !== 0) {
    throw new Error(`docker ${args[0]} failed: ${result.error?.message || result.stderr || result.stdout}`);
  }
  return result;
}

function sql(source) {
  if (!container) throw new Error('No disposable container');
  return docker([
    'exec', '-i', container, 'psql', '-X', '-v', 'ON_ERROR_STOP=1', '-U', 'postgres', '-d', 'rifa_test',
  ], source);
}

function file(relative) {
  return readFileSync(join(root, relative), 'utf8');
}

function cleanup() {
  if (!container) return;
  const owned = docker(['inspect', '--format', `{{index .Config.Labels "${label}"}}`, container]).stdout.trim();
  if (owned !== runId) throw new Error('Refusing to remove a container not owned by this run');
  docker(['rm', '-f', container]); // Solo el ID creado y etiquetado por ESTA ejecución.
  container = undefined;
}

try {
  if (process.argv.length !== 2) throw new Error('Usage: node scripts/test-db.mjs (no external targets accepted)');
  if (process.env.DOCKER_HOST && !process.env.DOCKER_HOST.startsWith('unix://')) {
    throw new Error('Only a local Unix Docker daemon is allowed');
  }
  const context = JSON.parse(docker(['context', 'inspect']).stdout);
  if (!context[0]?.Endpoints?.docker?.Host?.startsWith('unix://')) {
    throw new Error('Only a local Unix Docker context is allowed');
  }
  docker(['info', '--format', '{{.ServerVersion}}']);
  // Supabase puede preinstalar pgcrypto en extensions, mientras PostgreSQL
  // nuevo lo instala en public según 001. Probar AMBOS layouts, cada uno nuevo.
  for (layout of ['public', 'extensions']) {
    const created = docker([
      'run', '-d', '--name', name, '--label', `${label}=${runId}`,
      '--network', 'none', '--read-only',
      '--tmpfs', '/var/lib/postgresql/data:rw,nosuid,size=256m',
      '--tmpfs', '/var/run/postgresql:rw,noexec,nosuid,size=16m',
      '--tmpfs', '/tmp:rw,noexec,nosuid,size=32m',
      '-e', 'POSTGRES_DB=rifa_test', '-e', 'POSTGRES_PASSWORD=disposable-demo-only', image,
    ]);
    container = created.stdout.trim();
    if (!/^[a-f0-9]{64}$/.test(container)) throw new Error('Invalid newly created container ID');
    const inspect = JSON.parse(docker(['inspect', container]).stdout)[0];
    if (inspect.HostConfig.NetworkMode !== 'none'
        || !inspect.HostConfig.ReadonlyRootfs
        || Object.keys(inspect.HostConfig.PortBindings || {}).length
        || inspect.Mounts.some(mount => mount.Type !== 'tmpfs')) {
      throw new Error('Disposable container isolation contract violated');
    }
    report.imageId = inspect.Image;
    console.log(`Disposable PostgreSQL: ${name}, pgcrypto=${layout}, no network/ports/host mounts/persistent volumes`);
    docker(['exec', container, 'sh', '-c',
      'i=0; until [ "$(cat /proc/1/comm)" = postgres ] && psql -X -U postgres -d rifa_test -Atqc "select 1" >/dev/null 2>&1; do i=$((i+1)); [ "$i" -lt 100 ] || exit 1; sleep 0.1; done',
    ], undefined, 20_000);
    report.serverVersion = sql('show server_version;').stdout.trim();
    sql(file('tests/db/bootstrap.sql'));
    if (layout === 'extensions') {
      sql('create schema extensions; create extension pgcrypto with schema extensions;');
    }

    const migrations = readdirSync(join(root, 'supabase/migrations')).filter(path => path.endsWith('.sql')).sort();
    for (const migration of migrations) {
      const source = file(`supabase/migrations/${migration}`);
      // Una transacción por migración: los enum de 005 se confirman antes de 006.
      sql(`BEGIN;\n${source}\nCOMMIT;`);
      report.migrations.push({ layout, file: migration, sha256: createHash('sha256').update(source).digest('hex') });
      console.log(`PASS migration ${migration} (${layout})`);
    }
    sql(file('supabase/seed.sql'));
    sql(file('supabase/seed.sql')); // Seed DEMO repetible, nunca el de una BD existente.
    sql(file('tests/db/fixtures.sql'));
    const suites = readdirSync(join(root, 'tests/db'))
      .filter(path => path.endsWith('.sql') && !['bootstrap.sql', 'fixtures.sql'].includes(path)).sort();
    for (const suite of suites) {
      const result = sql(file(`tests/db/${suite}`));
      const checks = [...result.stderr.matchAll(/RIFA_TEST_PASS:/g)].length;
      report.suites.push({ layout, file: suite, checks });
      console.log(`PASS SQL suite ${suite} (${layout}, ${checks} named assertions)`);
    }

    // Contraprueba: el test debe FALLAR si un owner convierte el stub en no-op.
    // Solo esta BD nueva, dentro de una transacción que el error revierte.
    let rejectedMutant = false;
    try {
      sql(`BEGIN;
        create or replace function public.publish_raffle_batch(p_raffle_id uuid,p_manifest_json jsonb)
        returns void language plpgsql security definer set search_path=public,pg_temp
        as $$ begin return; end; $$;
        ${file('tests/db/publish-disabled.sql')}`);
    } catch (error) {
      rejectedMutant = error instanceof Error && error.message.includes('La función NO lanzó la excepción esperada');
      if (!rejectedMutant) throw error;
    }
    if (!rejectedMutant) throw new Error('Publication test failed to reject no-op mutant');
    // El cierre de psql tras ON_ERROR_STOP revierte el mutant; comprobarlo.
    sql(file('tests/db/publish-disabled.sql'));
    report.mutationChecks.push({ layout, noOpPublicationRejected: true, originalStubRestored: true });
    console.log(`PASS publication no-op mutation rejected and original stub restored (${layout})`);
    cleanup();
  }
  report.status = 'passed';
} catch (error) {
  report.error = error instanceof Error ? error.message : String(error);
  report.failedLayout = layout;
  console.error(report.error);
  process.exitCode = 1;
} finally {
  try {
    cleanup();
    report.cleanedUp = !container;
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    report.cleanedUp = false;
    process.exitCode = 1;
  }
  const output = join(root, 'artifacts/db-tests');
  mkdirSync(output, { recursive: true });
  writeFileSync(join(output, `${runId}.json`), `${JSON.stringify(report, null, 2)}\n`, { mode: 0o600 });
  console.log(`Database test result: ${report.status}; disposable container removed: ${report.cleanedUp}`);
}
