import { describe, it, expect } from 'vitest';
import {
  extractWinningNumber,
  LOTERIA_NACIONAL_EMISION_MIN,
  LOTERIA_NACIONAL_EMISION_MAX,
} from '@/lib/winning-number';

describe('extractWinningNumber (Lógica pura de extracción de ganador)', () => {
  it('extrae correctamente las últimas tres cifras de un número estándar', () => {
    const res = extractWinningNumber('34827');
    expect(res.valid).toBe(true);
    expect(res.firstTwoDigits).toBe('34');
    expect(res.lastThreeDigits).toBe('827');
    expect(res.winningNumber).toBe('827');
    expect(res.numericValue).toBe(34827);
  });

  it('conserva estrictamente los ceros iniciales', () => {
    const res1 = extractWinningNumber('07968');
    expect(res1.valid).toBe(true);
    expect(res1.firstTwoDigits).toBe('07');
    expect(res1.lastThreeDigits).toBe('968');
    expect(res1.winningNumber).toBe('968');

    const res2 = extractWinningNumber('12005');
    expect(res2.valid).toBe(true);
    expect(res2.firstTwoDigits).toBe('12');
    expect(res2.lastThreeDigits).toBe('005');
    expect(res2.winningNumber).toBe('005');

    const res3 = extractWinningNumber('00123');
    expect(res3.valid).toBe(true);
    expect(res3.firstTwoDigits).toBe('00');
    expect(res3.lastThreeDigits).toBe('123');
    expect(res3.winningNumber).toBe('123');
  });

  it('resuelve correctamente el límite superior 60000 con terminación 000', () => {
    const res = extractWinningNumber('60000');
    expect(res.valid).toBe(true);
    expect(res.firstTwoDigits).toBe('60');
    expect(res.lastThreeDigits).toBe('000');
    expect(res.winningNumber).toBe('000');
    expect(res.numericValue).toBe(60000);
  });

  it('resuelve correctamente el límite inferior 00001 con terminación 001', () => {
    const res = extractWinningNumber('00001');
    expect(res.valid).toBe(true);
    expect(res.firstTwoDigits).toBe('00');
    expect(res.lastThreeDigits).toBe('001');
    expect(res.winningNumber).toBe('001');
  });

  it('rechaza entradas con caracteres no numéricos', () => {
    const res1 = extractWinningNumber('34A27');
    expect(res1.valid).toBe(false);
    expect(res1.error).toContain('Solo se admiten caracteres numéricos');

    const res2 = extractWinningNumber('34-27');
    expect(res2.valid).toBe(false);

    const res3 = extractWinningNumber('abcde');
    expect(res3.valid).toBe(false);
  });

  it('rechaza números con menos de cinco dígitos', () => {
    const res = extractWinningNumber('827');
    expect(res.valid).toBe(false);
    expect(res.error).toContain('Faltan 2 dígito(s)');
  });

  it('rechaza números con más de cinco dígitos', () => {
    const res = extractWinningNumber('123456');
    expect(res.valid).toBe(false);
    expect(res.error).toContain('Excede los 5 dígitos permitidos');
  });

  it('rechaza el número 00000 por estar fuera de emisión oficial (min: 00001)', () => {
    const res = extractWinningNumber('00000');
    expect(res.valid).toBe(false);
    expect(res.error).toContain('fuera del rango oficial de emisión');
  });

  it('rechaza números superiores a 60000 por exceder la emisión oficial', () => {
    const res = extractWinningNumber('60001');
    expect(res.valid).toBe(false);
    expect(res.error).toContain('fuera del rango oficial de emisión');

    const res2 = extractWinningNumber('99999');
    expect(res2.valid).toBe(false);
  });
});
