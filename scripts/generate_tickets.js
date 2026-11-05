const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('path');

const TICKET_COUNT = 200;
const NUMBERS_PER_TICKET = 5;
const TOTAL_NUMBERS = TICKET_COUNT * NUMBERS_PER_TICKET;

function usage() {
  return [
    'Uso: TICKET_ISSUANCE_SEED=<secreto> node scripts/generate_tickets.js --output <archivo.json> [--format <json|csv>]',
    '',
    '  --output  Archivo de salida.',
    '  --format  Formato de salida (json, csv). Por defecto: json.',
    '  No ejecutes este comando para emitir boletos reales sin cotejar el archivo maestro de los boletos físicos.',
  ].join('\n');
}

function argumentValue(argumentName) {
  const index = process.argv.indexOf(argumentName);
  return index === -1 ? undefined : process.argv[index + 1];
}

function createDeterministicRandom(seed) {
  let counter = 0;
  let bytes = Buffer.alloc(0);

  function nextUint32() {
    while (bytes.length < 4) {
      const block =
        crypto
          .createHmac('sha256', seed)
          .update(`rifa-entre-amigos-ticket-issuance:${counter++}`)
          .digest();
      bytes = Buffer.concat([bytes, block]);
    }

    const value = bytes.readUInt32BE(0);
    bytes = bytes.subarray(4);
    return value;
  }

  return (maxExclusive) => {
    const maxUint32 = 0x1_0000_0000;
    const acceptableCeiling = maxUint32 - (maxUint32 % maxExclusive);
    let value;
    do {
      value = nextUint32();
    } while (value >= acceptableCeiling);
    return value % maxExclusive;
  };
}

function issueTickets(seed) {
  if (!seed || seed.length < 16) {
    throw new Error('La semilla de emisión debe tener al menos 16 caracteres.');
  }

  const randomIndex = createDeterministicRandom(seed);
  const numbers = Array.from({ length: TOTAL_NUMBERS }, (_, number) => number);

  for (let index = numbers.length - 1; index > 0; index -= 1) {
    const otherIndex = randomIndex(index + 1);
    [numbers[index], numbers[otherIndex]] = [numbers[otherIndex], numbers[index]];
  }

  const tickets = Array.from({ length: TICKET_COUNT }, (_, index) => ({
    folio: String(index + 1).padStart(3, '0'),
    numbers: numbers
      .slice(index * NUMBERS_PER_TICKET, (index +
        1) * NUMBERS_PER_TICKET)
      .sort((left, right) => left - right)
      .map((number) => String(number).padStart(3, '0')),
  }));

  const canonicalMapping = tickets
    .map((ticket) => `${ticket.folio}:${ticket.numbers.join(',')}`)
    .join('\n');

  return {
    format: 'rifa-entre-amigos-ticket-manifest/v1',
    ticketCount: TICKET_COUNT,
    numbersPerTicket: NUMBERS_PER_TICKET,
    universe: '000-999',
    checksumSha256: crypto
      .createHash('sha256')
      .update(canonicalMapping)
      .digest('hex'),
    tickets,
  };
}

function writeManifest(outputPath, manifest) {
  if (fs.existsSync(outputPath)) {
    throw new Error(`El archivo de salida ya existe: ${outputPath}`);
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, {
    encoding: 'utf8',
    mode: 0o600,
  });
}

function writeCsv(outputPath, manifest) {
  if (fs.existsSync(outputPath)) {
    throw new Error(`El archivo de salida ya existe: ${outputPath}`);
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const header = 'folio,number_1,number_2,number_3,number_4,number_5';
  const rows = manifest.tickets.map((t) => [
    t.folio,
    ...t.numbers,
  ].join(','));

  const csvContent = [header, ...rows].join('\n');
  fs.writeFileSync(outputPath, csvContent, {
    encoding: 'utf8',
    mode: 0o600,
  });
}

function main() {
  const outputPath = argumentValue('--output');
  const format = argumentValue('--format') || 'json';

  if (!outputPath) {
    console.error(usage());
    process.exitCode = 1;
    return;
  }

  try {
    const manifest = issueTickets(process.env.TICKET_ISSUANCE_SEED);
    if (format === 'csv') {
      writeCsv(path.resolve(outputPath), manifest);
    } else {
      writeManifest(path.resolve(outputPath), manifest);
    }
    console.log(`Manifiesto generado (${format}): ${path.resolve(outputPath)}`);
    console.log(`Checksum SHA-256: ${manifest.checksumsha256 || manifest.checksumSha256}`);
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : 'No fue posible generar el manifiesto.'
    );
    process.exitCode = 1;
  }
}

if (require.main === module) main();

module.exports = { issueTickets };
