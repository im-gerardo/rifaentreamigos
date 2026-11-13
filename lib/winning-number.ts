/**
 * Función pura y tipada para la extracción y validación de las 3 cifras del Premio Mayor.
 */

export interface WinningNumberExtractionResult {
  valid: boolean;
  rawInput: string;
  sanitized: string;
  error?: string;
  firstTwoDigits?: string;
  lastThreeDigits?: string;
  winningNumber?: string;
  numericValue?: number;
}

export const LOTERIA_NACIONAL_EMISION_MIN = 1;
export const LOTERIA_NACIONAL_EMISION_MAX = 60000;

/**
 * Extrae y valida las últimas 3 cifras de un número de 5 dígitos del Premio Mayor.
 * 
 * Reglas:
 * - Debe ser estrictamente numérico (se admiten 5 dígitos exactos, preservando ceros iniciales como '07968' o '00123').
 * - Rango oficial de la emisión de Lotería Nacional: 00001 a 60000.
 */
export function extractWinningNumber(input: string): WinningNumberExtractionResult {
  if (typeof input !== 'string') {
    return {
      valid: false,
      rawInput: String(input ?? ''),
      sanitized: '',
      error: 'La entrada debe ser una cadena de texto.',
    };
  }

  const sanitized = input.trim();

  if (!sanitized) {
    return {
      valid: false,
      rawInput: input,
      sanitized: '',
      error: 'Introduce el número de 5 dígitos del Premio Mayor.',
    };
  }

  if (!/^\d+$/.test(sanitized)) {
    return {
      valid: false,
      rawInput: input,
      sanitized,
      error: 'Solo se admiten caracteres numéricos (0-9).',
    };
  }

  if (sanitized.length < 5) {
    return {
      valid: false,
      rawInput: input,
      sanitized,
      error: `Faltan ${5 - sanitized.length} dígito(s). Debe contener exactamente 5 cifras (ej. 34827).`,
    };
  }

  if (sanitized.length > 5) {
    return {
      valid: false,
      rawInput: input,
      sanitized,
      error: 'Excede los 5 dígitos permitidos. La emisión de Lotería Nacional tiene 5 cifras.',
    };
  }

  const numericValue = parseInt(sanitized, 10);

  if (numericValue < LOTERIA_NACIONAL_EMISION_MIN || numericValue > LOTERIA_NACIONAL_EMISION_MAX) {
    return {
      valid: false,
      rawInput: input,
      sanitized,
      numericValue,
      error: `Número fuera del rango oficial de emisión (00001 al 60000). El valor introducido es ${numericValue}.`,
    };
  }

  const firstTwoDigits = sanitized.slice(0, 2);
  const lastThreeDigits = sanitized.slice(2, 5);

  return {
    valid: true,
    rawInput: input,
    sanitized,
    numericValue,
    firstTwoDigits,
    lastThreeDigits,
    winningNumber: lastThreeDigits,
  };
}
