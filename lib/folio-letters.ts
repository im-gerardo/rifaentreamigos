/**
 * Nomenclatura oficial por series sin guiones (1 + 3 letras / 2 + 3 letras):
 * - Primeros 100 boletos (1 al 100): 1AAA, 1AAB, 1AAC ... 1AAG ... 1ADV
 * - Siguientes 100 boletos (101 al 200): 2AAA, 2AAB, 2AAC ... 2ADV
 *
 * Cero colisiones garantizado matemáticamente y formato compacto sin caracteres especiales.
 */
export function getLetterFolio(folioNum: number): string {
  const series = folioNum <= 100 ? '1' : '2';
  const offset = Math.max(0, (folioNum - 1) % 100); // 0 a 99
  const first = Math.floor(offset / 26); // 0 a 3 ('A' a 'D')
  const second = offset % 26; // 0 a 25 ('A' a 'Z')
  return `${series}A${String.fromCharCode(65 + first)}${String.fromCharCode(65 + second)}`;
}

export function parseLetterFolio(code: string): number | null {
  const clean = code.trim().toUpperCase().replace(/[^0-9A-Z]/g, '');
  if (clean.length !== 4) return null;
  const series = clean.charAt(0);
  const firstLetter = clean.charCodeAt(2) - 65;
  const secondLetter = clean.charCodeAt(3) - 65;

  if (firstLetter < 0 || firstLetter > 25 || secondLetter < 0 || secondLetter > 25) {
    return null;
  }

  const offset = firstLetter * 26 + secondLetter;
  if (series === '1') {
    return offset + 1;
  } else if (series === '2') {
    return offset + 101;
  }
  return null;
}
