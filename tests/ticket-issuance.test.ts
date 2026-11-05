import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const script = join(process.cwd(), 'scripts/generate_tickets.js');
const seed = 'semilla-de-prueba-for-emision-2026';

function createManifest(filename: string, format: 'json' | 'csv' = 'json') {
  const directory = mkdtempSync(join(tmpdir(), 'rifa-ticket-issuance-'));
  const output = join(directory, filename);
  execFileSync(process.execPath, [script, '--output', output, '--format', format], {
    env: { ...process.env, TICKET_ISSUANCE_SEED: seed },
    stdio: 'pipe',
  });
  const content = readFileSync(output, 'utf8');
  return format === 'json' ? JSON.parse(content) : content;
}

describe('emisión determinista de boletos', () => {
  it('crea los 200 folios y cubre exactamente el universo 000-999', () => {
    const manifest = createManifest('manifest.json');
    const numbers = manifest.tickets.flatMap((ticket: { numbers: string[] }) => ticket.numbers);

    expect(manifest.tickets).toHaveLength(200);
    expect(manifest.tickets[0].folio).toBe('001');
    expect(manifest.tickets.at(-1).folio).toBe('200');
    expect(numbers).toHaveLength(1000);
    expect(new Set(numbers).size).toBe(1000);
    expect(numbers.sort()).toEqual(Array.from({ length: 1000 }, (_, number) => String(number).padStart(3, '0')));
  });

  it('produce el mismo checksum con la misma semilla', () => {
    const first = createManifest('first.json');
    const second = createManifest('second.json');

    const checksum1 = first.checksumSha256 || first.checksumsha256;
    const checksum2 = second.checksumSha256 || second.checksumsha256;

    expect(checksum1).toMatch(/^[a-f0-9]{64}$/);
    expect(checksum1).toBe(checksum2);
    expect(first.tickets).toEqual(second.tickets);
  });

  it('genera un CSV válido y estructurado', () => {
    const csvContent = createManifest('manifest.csv', 'csv');
    const lines = csvContent.split('\n');
    const header = lines[0];
    const firstRow = lines[1];

    expect(header).toBe('folio,number_1,number_2,number_3,number_4,number_5');
    expect(firstRow).toMatch(/^001/);
    expect(lines.length).toBe(201); // Header + 200 tickets
  });

  it('falla cuando falta la semilla de emisión', () => {
    const directory = mkdtempSync(join(tmpdir(), 'rifa-ticket-issuance-'));
    const output = join(directory, 'manifest.json');

    expect(() =>
      execFileSync(process.execPath, [script, '--output', output], {
        env: { ...process.env, TICKET_ISSUANCE_SEED: '' },
        stdio: 'pipe',
      }),
    ).toThrow();
  });
});
