'use client';

import { useState, useEffect, useMemo, useTransition } from 'react';
import Link from 'next/link';
import styles from './como-se-elige.module.css';
import { extractWinningNumber } from '@/lib/winning-number';
import invertedManifest from '@/public/relacion_numeros_a_boletos.json';

// Ejemplos precargados del brief
const PRELOADED_EXAMPLES = ['34827', '07968', '12005', '60000', '00123'];

interface MappedTicketEntry {
  numeroParticipante: string;
  numeroBoleto: number;
  folio: string;
  codigoAlfanumerico: string;
  folioCompleto: string;
  combinacionesBoleto: string[];
}

export default function ComoSeEligeAlGanadorPage() {
  // --- PASO 2: Demostración Interactiva 34827 ---
  // Estados de animación: 0 = inicial (34827), 1 = resaltar últimas 3, 2 = atenuar primeras 2, 3 = resultado 827 + boleto ganador
  const [demoStep, setDemoStep] = useState<number>(0);
  const [isDemoPlaying, setIsDemoPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isDemoPlaying) return;

    const timer = setInterval(() => {
      setDemoStep((prev) => (prev >= 3 ? 3 : prev + 1));
    }, 1400);

    return () => clearInterval(timer);
  }, [isDemoPlaying]);

  const restartDemo = () => {
    setDemoStep(0);
    setIsDemoPlaying(true);
  };

  // --- PASO 3: Simulador del Número Ganador ---
  const [simInput, setSimInput] = useState<string>('34827');
  const [copied, setCopied] = useState<boolean>(false);
  const [, startTransition] = useTransition();

  const simResult = useMemo(() => {
    return extractWinningNumber(simInput);
  }, [simInput]);

  // Búsqueda del boleto oficial en la fuente sellada de participaciones
  const matchedTicket: MappedTicketEntry | undefined = useMemo(() => {
    if (!simResult.valid || !simResult.winningNumber) return undefined;
    const all = invertedManifest.datos as MappedTicketEntry[];
    return all.find((item) => item.numeroParticipante === simResult.winningNumber);
  }, [simResult]);

  const handleCopy = async () => {
    if (!simResult.valid || !simResult.winningNumber) return;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(simResult.winningNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      // Fallback
    }
  };

  const handleSelectExample = (val: string) => {
    startTransition(() => {
      setSimInput(val);
    });
  };

  return (
    <main className={styles.page}>
      {/* HEADER DE PRESENTACIÓN */}
      <header className={styles.heroHeader}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span className="route-label" style={{ marginBottom: 0 }}>
            Guía Explicativa & Simulador
          </span>
          <span style={{ color: '#8fa09d', fontSize: 13 }}>·</span>
          <span style={{ color: '#ffd21a', fontSize: 13, fontWeight: 700 }}>
            Sorteo Especial No. 319 de la Lotería Nacional
          </span>
        </div>
        <h1>¿Cómo se elige al ganador?</h1>
        <p className={styles.summary}>
          El sorteo oficial es 100% público, transparente y auditable. Descubre en 3 sencillos pasos cómo las <strong>últimas tres cifras del Premio Mayor</strong> determinan de forma inapelable al ganador de la <strong>Bajaj Pulsar N250 mod. 2026</strong>.
        </p>
      </header>

      {/* BARRA DE NAVEGACIÓN ENTRE PASOS */}
      <nav className={styles.stepperBar} aria-label="Navegación entre pasos explicativos">
        <a href="#paso-1" className={`${styles.stepDot} ${styles.stepDotActive}`}>
          <span>1</span>
          <span>Estructura de la Rifa</span>
        </a>
        <span className={styles.stepDivider}>→</span>
        <a href="#paso-2" className={styles.stepDot}>
          <span>2</span>
          <span>Ejemplo Práctico</span>
        </a>
        <span className={styles.stepDivider}>→</span>
        <a href="#paso-3" className={styles.stepDot}>
          <span>3</span>
          <span>Simulador en Vivo</span>
        </a>
      </nav>

      {/* ========================================================================= */}
      {/* PASO 1. ¿CÓMO FUNCIONA NUESTRA RIFA?                                     */}
      {/* ========================================================================= */}
      <section id="paso-1" className={styles.stepSection} aria-labelledby="paso-1-title">
        <div className={styles.stepHeader}>
          <span className={styles.stepBadge}>PASO 1</span>
          <h2 id="paso-1-title" className={styles.stepTitle}>
            ¿Cómo funciona nuestra rifa?
          </h2>
          <p className={styles.stepDescription}>
            Una relación matemática perfecta que garantiza transparencia total: cada número del <strong>000 al 999</strong> está asignado exactamente una vez a un solo boleto físico.
          </p>
        </div>

        {/* 3 Indicadores destacados: 200 boletos × 5 números = 1,000 participaciones */}
        <div className={styles.metricGrid}>
          <div className={styles.metricCard}>
            <span className={styles.metricIcon} aria-hidden="true">🎟️</span>
            <span className={styles.metricValue}>200</span>
            <span className={styles.metricLabel}>Boletos Físicos</span>
            <span className={styles.metricHint}>Emisión oficial numerada del 001 al 200 ($250 MXN c/u).</span>
          </div>

          <div className={styles.metricCard}>
            <span className={styles.metricIcon} aria-hidden="true">✖️</span>
            <span className={styles.metricValue}>5</span>
            <span className={styles.metricLabel}>Números por Boleto</span>
            <span className={styles.metricHint}>5 combinaciones de 3 cifras en cada talón y cuerpo.</span>
          </div>

          <div className={styles.metricCard}>
            <span className={styles.metricIcon} aria-hidden="true">🎯</span>
            <span className={styles.metricValue}>1,000</span>
            <span className={styles.metricLabel}>Participaciones Totales</span>
            <span className={styles.metricHint}>Cubre exactamente del 000 al 999 sin duplicados ni vacíos.</span>
          </div>
        </div>

        {/* Representación visual de un boleto físico demostrativo */}
        <div className={styles.ticketDemoCard}>
          <div className={styles.ticketDemoHeader}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#ffd21a', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Boleto Demostrativo
              </span>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#ffffff' }}>
                FOLIO 1AAA (001)
              </div>
            </div>
            <span
              style={{
                background: 'rgba(52, 211, 153, 0.15)',
                color: '#34d399',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                padding: '4px 10px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 800,
              }}
            >
              5 Oportunidades de Ganar
            </span>
          </div>

          <div className={styles.ticketDemoPills}>
            {['042', '187', '356', '827', '991'].map((num) => (
              <div key={num} className={styles.ticketPillItem}>
                <span className={styles.pillNumber}>{num}</span>
                <span className={styles.pillChance}>Oportunidad</span>
              </div>
            ))}
          </div>

          <div className={styles.calloutBanner}>
            <span style={{ fontSize: 20 }}>💡</span>
            <span>
              <strong>Aclaración oficial:</strong> Cada boleto tiene cinco oportunidades de ganar. Todos los números del 000 al 999 tienen la misma probabilidad matemática de resultar ganadores con el sorteo de la Lotería Nacional.
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PASO 2. EJEMPLO PRÁCTICO: ¿CÓMO IDENTIFICAMOS AL GANADOR?                */}
      {/* ========================================================================= */}
      <section id="paso-2" className={styles.stepSection} aria-labelledby="paso-2-title">
        <div className={styles.stepHeader}>
          <span className={styles.stepBadge}>PASO 2</span>
          <h2 id="paso-2-title" className={styles.stepTitle}>
            Ejemplo práctico: ¿Cómo identificamos al ganador?
          </h2>
          <p className={styles.stepDescription}>
            Imagina que el día del sorteo los Niños Gritones de la Lotería Nacional cantan el siguiente número ficticio de 5 cifras para el Primer Premio:
          </p>
        </div>

        <div className={styles.demoStage}>
          <span style={{ fontSize: 12, fontWeight: 800, color: '#8fa09d', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Premio Mayor Ficticio Cantado:
          </span>

          {/* Cajas de dígitos del número 34827 */}
          <div className={styles.digitsDisplay} aria-label="Premio Mayor 34827">
            {/* Cifra 3 */}
            <div className={`${styles.digitBox} ${demoStep >= 2 ? styles.digitDimmed : ''}`}>
              <span>3</span>
              <span className={styles.digitSub} style={{ color: '#8fa09d' }}>Serie/Prefijo</span>
            </div>

            {/* Cifra 4 */}
            <div className={`${styles.digitBox} ${demoStep >= 2 ? styles.digitDimmed : ''}`}>
              <span>4</span>
              <span className={styles.digitSub} style={{ color: '#8fa09d' }}>Prefijo</span>
            </div>

            {/* Cifra 8 */}
            <div className={`${styles.digitBox} ${demoStep >= 1 ? styles.digitWinnerHighlight : ''}`}>
              <span>8</span>
              <span className={`${styles.digitSub} ${demoStep >= 1 ? styles.pillChanceWinning : ''}`}>
                {demoStep >= 1 ? 'Ganador' : 'Cifra 3'}
              </span>
            </div>

            {/* Cifra 2 */}
            <div className={`${styles.digitBox} ${demoStep >= 1 ? styles.digitWinnerHighlight : ''}`}>
              <span>2</span>
              <span className={`${styles.digitSub} ${demoStep >= 1 ? styles.pillChanceWinning : ''}`}>
                {demoStep >= 1 ? 'Ganador' : 'Cifra 4'}
              </span>
            </div>

            {/* Cifra 7 */}
            <div className={`${styles.digitBox} ${demoStep >= 1 ? styles.digitWinnerHighlight : ''}`}>
              <span>7</span>
              <span className={`${styles.digitSub} ${demoStep >= 1 ? styles.pillChanceWinning : ''}`}>
                {demoStep >= 1 ? 'Ganador' : 'Cifra 5'}
              </span>
            </div>
          </div>

          {/* Mensaje principal de la secuencia */}
          <div className={styles.demoSummaryBox}>
            <div className={styles.demoSummaryHighlight}>
              «Si el Premio Mayor es <strong>34827</strong>, el número ganador de nuestra rifa es <strong>827</strong>».
            </div>
            <p style={{ margin: '8px 0 0', color: '#aeb7b4', fontSize: 14, lineHeight: 1.5 }}>
              No importa la serie del billete oficial de la Lotería Nacional (Serie 1, Serie 2, etc.), porque el mecanismo preestablecido y notariado utiliza <strong>únicamente las últimas tres cifras</strong> del Premio Mayor.
            </p>
          </div>

          {/* Boleto demostrativo ganador */}
          <div
            style={{
              marginTop: 20,
              background: demoStep >= 3 ? '#0e2319' : '#141a1d',
              border: `2px solid ${demoStep >= 3 ? '#34d399' : '#2b3b42'}`,
              borderRadius: 12,
              padding: 18,
              textAlign: 'left',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: demoStep >= 3 ? '#34d399' : '#ffffff' }}>
                {demoStep >= 3 ? '🏆 ¡BOLETO GANADOR DE LA MOTOCICLETA!' : 'Boleto participante en juego:'}
              </span>
              <span style={{ fontSize: 12, color: '#8fa09d' }}>Folio 1AAA (001)</span>
            </div>

            <div className={styles.ticketDemoPills} style={{ marginBottom: 0 }}>
              {['042', '187', '356', '827', '991'].map((num) => {
                const isWinningNum = num === '827';
                return (
                  <div
                    key={num}
                    className={`${styles.ticketPillItem} ${
                      isWinningNum && demoStep >= 3 ? styles.ticketPillHighlighted : ''
                    }`}
                    style={
                      isWinningNum && demoStep >= 3
                        ? { borderColor: '#34d399', background: '#093322', transform: 'scale(1.06)' }
                        : {}
                    }
                  >
                    <span
                      className={styles.pillNumber}
                      style={{ color: isWinningNum && demoStep >= 3 ? '#34d399' : '#ffd21a' }}
                    >
                      {num}
                    </span>
                    <span
                      className={styles.pillChance}
                      style={{ color: isWinningNum && demoStep >= 3 ? '#34d399' : '#8da1ab' }}
                    >
                      {isWinningNum && demoStep >= 3 ? '✨ Ganador' : 'No coincide'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Control para repetir la demostración */}
          <div style={{ marginTop: 24 }}>
            <button
              type="button"
              onClick={restartDemo}
              className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
            >
              <span>🔄</span>
              <span>Repetir demostración interactiva</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PASO 3. SIMULADOR INTERACTIVO DEL NÚMERO GANADOR                         */}
      {/* ========================================================================= */}
      <section id="paso-3" className={styles.stepSection} aria-labelledby="paso-3-title">
        <div className={styles.stepHeader}>
          <span className={styles.stepBadge}>PASO 3</span>
          <h2 id="paso-3-title" className={styles.stepTitle}>
            Simulador interactivo del número ganador
          </h2>
          <p className={styles.stepDescription}>
            Prueba con cualquier número oficial de 5 dígitos (entre el <strong>00001</strong> y el <strong>60000</strong>) para comprobar de inmediato cómo se extraen las 3 cifras y a qué boleto físico corresponde en nuestra emisión oficial.
          </p>
        </div>

        <div className={styles.simulatorBox}>
          {/* Campo de Entrada */}
          <div className={styles.inputGroup}>
            <label htmlFor="sim-input-number" className={styles.inputLabel}>
              Introduce el número del Premio Mayor (5 dígitos):
            </label>

            <div className={styles.inputWrapper}>
              <input
                id="sim-input-number"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={5}
                placeholder="Ej. 34827"
                value={simInput}
                onChange={(e) => setSimInput(e.target.value.replace(/\D/g, ''))}
                className={`${styles.numberInput} ${!simResult.valid && simInput ? styles.numberInputError : ''}`}
                aria-invalid={!simResult.valid}
                aria-describedby={!simResult.valid ? 'sim-error-msg' : undefined}
              />

              <button
                type="button"
                onClick={() => setSimInput('')}
                className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
                style={{ padding: '12px 16px', fontSize: 13 }}
              >
                Limpiar
              </button>
            </div>

            {/* Mensajes de Validación */}
            {!simResult.valid && (
              <div id="sim-error-msg" className={styles.errorMessage} role="alert">
                <span>⚠️</span>
                <span>{simResult.error}</span>
              </div>
            )}

            {/* Ejemplos precargados */}
            <div className={styles.quickPillList}>
              <span style={{ fontSize: 12, color: '#8fa09d', fontWeight: 600 }}>
                Ejemplos del sorteo para probar:
              </span>
              {PRELOADED_EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => handleSelectExample(ex)}
                  className={styles.quickPill}
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {/* Resultado Dinámico */}
          {simResult.valid && (
            <div className={styles.simulatorResultCard}>
              <div className={styles.resultTitle}>
                Desglose oficial del número simulado
              </div>

              {/* Animación visual de los 5 dígitos */}
              <div className={styles.digitsDisplay} style={{ margin: '10px 0 20px' }}>
                <div className={`${styles.digitBox} ${styles.digitDimmed}`}>
                  <span>{simResult.firstTwoDigits?.[0]}</span>
                  <span className={styles.digitSub} style={{ color: '#8fa09d' }}>Prefijo</span>
                </div>
                <div className={`${styles.digitBox} ${styles.digitDimmed}`}>
                  <span>{simResult.firstTwoDigits?.[1]}</span>
                  <span className={styles.digitSub} style={{ color: '#8fa09d' }}>Prefijo</span>
                </div>
                <div className={`${styles.digitBox} ${styles.digitWinnerHighlight}`}>
                  <span>{simResult.lastThreeDigits?.[0]}</span>
                  <span className={`${styles.digitSub} ${styles.pillChanceWinning}`}>1ª Ganadora</span>
                </div>
                <div className={`${styles.digitBox} ${styles.digitWinnerHighlight}`}>
                  <span>{simResult.lastThreeDigits?.[1]}</span>
                  <span className={`${styles.digitSub} ${styles.pillChanceWinning}`}>2ª Ganadora</span>
                </div>
                <div className={`${styles.digitBox} ${styles.digitWinnerHighlight}`}>
                  <span>{simResult.lastThreeDigits?.[2]}</span>
                  <span className={`${styles.digitSub} ${styles.pillChanceWinning}`}>3ª Ganadora</span>
                </div>
              </div>

              <div className={styles.resultHero}>
                <div>
                  <span style={{ fontSize: 12, color: '#8da09d', fontWeight: 700, textTransform: 'uppercase' }}>
                    Número Ganador en Nuestra Rifa:
                  </span>
                  <div className={styles.resultNumberBig}>
                    {simResult.winningNumber}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={styles.actionButton}
                  >
                    <span>{copied ? '✓ ¡Copiado!' : '📋 Copiar número ganador'}</span>
                  </button>
                </div>
              </div>

              {/* Búsqueda Real del Boleto Asignado en el Manifiesto Sellado */}
              {matchedTicket ? (
                <div
                  style={{
                    marginTop: 20,
                    background: '#0d1316',
                    border: '1px solid #28373e',
                    borderRadius: 10,
                    padding: 16,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                    <span style={{ color: '#ffd21a', fontWeight: 800, fontSize: 13, textTransform: 'uppercase' }}>
                      📍 Ubicación en el Manifiesto Oficial de la Rifa:
                    </span>
                    <span style={{ color: '#8fa1b3', fontSize: 12 }}>
                      Boleto Físico #{matchedTicket.folio}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <span
                      style={{
                        background: '#ffd21a',
                        color: '#121415',
                        fontWeight: 900,
                        fontSize: 16,
                        padding: '6px 12px',
                        borderRadius: 6,
                        letterSpacing: '0.04em',
                      }}
                    >
                      FOLIO {matchedTicket.codigoAlfanumerico}
                    </span>
                    <span style={{ color: '#c9d4d2', fontSize: 14 }}>
                      Este boleto ampara las 5 combinaciones:
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                    {matchedTicket.combinacionesBoleto.map((comb) => {
                      const isWinning = comb === simResult.winningNumber;
                      return (
                        <span
                          key={comb}
                          style={{
                            background: isWinning ? '#34d399' : '#1c242b',
                            color: isWinning ? '#06281b' : '#9bb0bf',
                            fontWeight: isWinning ? 900 : 700,
                            fontSize: 13,
                            padding: '4px 10px',
                            borderRadius: 6,
                            fontFamily: 'ui-monospace, monospace',
                            border: isWinning ? '1px solid #34d399' : '1px solid #2d3b45',
                          }}
                        >
                          {comb} {isWinning ? '★' : ''}
                        </span>
                      );
                    })}
                  </div>

                  <div style={{ marginTop: 12, textAlign: 'right' }}>
                    <Link
                      href={`/boletos?search=${matchedTicket.codigoAlfanumerico}`}
                      style={{ color: '#ffd21a', fontSize: 13, fontWeight: 700, textDecoration: 'underline' }}
                    >
                      Ver boleto en el catálogo público →
                    </Link>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: 16, fontSize: 13, color: '#8fa09d' }}>
                  Consulta el listado oficial en <Link href="/numeros" style={{ color: '#ffd21a' }}>Relación de Números</Link> para ver el boleto físico correspondiente.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECCIÓN OFICIAL Y TRANSPARENCIA                                           */}
      {/* ========================================================================= */}
      <section className={styles.transparencySection} aria-labelledby="transparency-title">
        <h2 id="transparency-title" style={{ fontSize: 20, fontWeight: 800, color: '#ffffff', margin: '0 0 12px' }}>
          ¿Dónde consultar el resultado oficial?
        </h2>
        <p style={{ color: '#aeb7b4', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
          El número mostrado en el simulador es <strong>exclusivamente demostrativo</strong> para capacitación y atención a clientes. El ganador definitivo se determinará a partir del resultado oficial del Premio Mayor del <strong>Sorteo Especial No. 319</strong> de la Lotería Nacional, el sábado <strong>12 de diciembre de 2026</strong> a las 20:00 hrs.
        </p>

        <div className={styles.officialLinksGrid}>
          <a
            href="https://www.loterianacional.gob.mx/Billete/CalendarioSorteos"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.officialLinkCard}
          >
            <span className={styles.officialLinkTitle}>📅 Calendario de Sorteos Oficiales</span>
            <span className={styles.officialLinkUrl}>loterianacional.gob.mx/Billete/CalendarioSorteos ↗</span>
          </a>

          <a
            href="https://www.loterianacional.gob.mx/Billete/DetalleBillete?product=5&number=319"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.officialLinkCard}
          >
            <span className={styles.officialLinkTitle}>🏛️ Detalle del Sorteo Especial No. 319</span>
            <span className={styles.officialLinkUrl}>loterianacional.gob.mx (Sorteo 319) ↗</span>
          </a>

          <a
            href="https://miloteria.mx/boletoElectronico/ESPECIAL?sorteo=319"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.officialLinkCard}
          >
            <span className={styles.officialLinkTitle}>🎫 Emisión y Billete Electrónico 319</span>
            <span className={styles.officialLinkUrl}>miloteria.mx/boletoElectronico/ESPECIAL?sorteo=319 ↗</span>
          </a>
        </div>

        <div
          style={{
            background: 'rgba(255, 210, 26, 0.05)',
            border: '1px solid rgba(255, 210, 26, 0.2)',
            borderRadius: 10,
            padding: '16px 20px',
            fontSize: 13,
            color: '#c9d4d2',
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: '#ffd21a' }}>Regla de Venta Total y Liquidación:</strong> Conforme a las bases aprobadas, la rifa se celebrará únicamente habiendo vendido los 200 boletos físicos y estando liquidados al 100% 24 horas antes del sorteo. En caso de no completarse la venta total antes del 11 de diciembre de 2026, el sorteo se pospondrá a la fecha oficial inmediata posterior de la Lotería Nacional hasta completar el 100%.
        </div>
      </section>
    </main>
  );
}
