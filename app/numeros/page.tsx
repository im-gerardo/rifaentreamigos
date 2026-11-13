'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import invertedManifest from '@/public/relacion_numeros_a_boletos.json';
import { useTicketStore } from '@/lib/ticket-store';
import styles from './numeros.module.css';

type NumberEntry = {
  numeroParticipante: string;
  numeroBoleto: number;
  folio: string;
  codigoAlfanumerico: string;
  folioCompleto: string;
  combinacionesBoleto: string[];
};

const CENTENAS = [
  { label: 'Todos (1,000)', range: null },
  { label: '000 - 099', min: 0, max: 99 },
  { label: '100 - 199', min: 100, max: 199 },
  { label: '200 - 299', min: 200, max: 299 },
  { label: '300 - 399', min: 300, max: 399 },
  { label: '400 - 499', min: 400, max: 499 },
  { label: '500 - 599', min: 500, max: 599 },
  { label: '600 - 699', min: 600, max: 699 },
  { label: '700 - 799', min: 700, max: 799 },
  { label: '800 - 899', min: 800, max: 899 },
  { label: '900 - 999', min: 900, max: 999 },
];

export default function NumerosParticipantesPage() {
  const [search, setSearch] = useState('');
  const [selectedCentena, setSelectedCentena] = useState<number | null>(null);
  const { tickets: storeTickets } = useTicketStore();

  // Mapear estado en vivo de los boletos para cada número
  const ticketStateMap = useMemo(() => {
    const map = new Map<number, string>();
    if (storeTickets && Array.isArray(storeTickets)) {
      storeTickets.forEach((t) => {
        map.set(t.folio, t.state);
      });
    }
    return map;
  }, [storeTickets]);

  const allEntries: NumberEntry[] = invertedManifest.datos;

  const filteredEntries = useMemo(() => {
    let result = allEntries;

    // Filtro por centena si está seleccionada
    if (selectedCentena !== null) {
      const min = selectedCentena;
      const max = selectedCentena + 99;
      result = result.filter((item) => {
        const n = parseInt(item.numeroParticipante, 10);
        return n >= min && n <= max;
      });
    }

    // Filtro de búsqueda
    const q = search.trim().toUpperCase();
    if (q) {
      result = result.filter((item) => {
        return (
          item.numeroParticipante.includes(q) ||
          item.codigoAlfanumerico.toUpperCase().includes(q) ||
          item.folio.includes(q) ||
          item.folioCompleto.toUpperCase().includes(q) ||
          item.combinacionesBoleto.some((comb) => comb.includes(q))
        );
      });
    }

    return result;
  }, [allEntries, search, selectedCentena]);

  return (
    <div className={styles.page}>
      {/* Cabecera */}
      <div className={styles.header}>
        <div className={styles.tagRow}>
          <span className={styles.tagBadge}>
            Guía Oficial Ascendente
          </span>
          <span className={styles.tagSub}>
            Sorteo 12 de diciembre de 2026 · Lotería Nacional
          </span>
        </div>
        <h1 className={styles.title}>
          Relación de Números a Boletos (000 al 999)
        </h1>
        <p className={styles.description}>
          Localiza de forma inmediata en qué boleto físico y folio alfanumérico se encuentra cada uno de los 1,000 números participantes, en estricto orden ascendente.
        </p>
      </div>

      {/* Controles de Búsqueda */}
      <div className={styles.cardContainer}>
        <div style={{ position: 'relative' }}>
          <label
            htmlFor="search-number"
            style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#fac802', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}
          >
            Buscar por número o folio
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="search-number"
              type="text"
              placeholder="Ej: 000, 043, 344, 777, 1AAA, 2ADV..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.inputSearch}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#8d9896',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 'bold',
                  padding: '6px',
                }}
              >
                ✕ Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Búsquedas Rápidas */}
        <div className={styles.quickFilters}>
          <span className={styles.quickFiltersLabel}>Prueba rápida:</span>
          {['000', '777', '999', '1AAA', '2ADV'].map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => {
                setSelectedCentena(null);
                setSearch(example);
              }}
              className={styles.quickFilterBtn}
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Pestañas de Filtrado Rápido por Centena */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#8d9896', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Filtrar por bloque de números:
        </div>
        <div className={styles.centenaGroup}>
          {CENTENAS.map((c, idx) => {
            const isActive = selectedCentena === (c.min !== undefined ? c.min : null);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedCentena(c.min !== undefined ? c.min : null);
                }}
                className={`${styles.centenaBtn} ${isActive ? styles.centenaBtnActive : ''}`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contador de resultados */}
      <div className={styles.statusBar}>
        <span style={{ fontSize: 13, color: '#8d9896' }}>
          Mostrando <strong style={{ color: '#fff' }}>{filteredEntries.length}</strong> de 1,000 números
        </span>
        <Link
          href="/boletos"
          style={{ fontSize: 13, color: '#fac802', textDecoration: 'none', fontWeight: 700 }}
        >
          ← Ir a la cuadrícula de Boletos
        </Link>
      </div>

      {/* Tabla Oficial de Relación */}
      <div className={styles.tableWrap}>
        <div className={styles.tableScroll}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 620 }}>
            <thead>
              <tr style={{ background: '#161f28', borderBottom: '2px solid #2e3e4e' }}>
                <th style={{ padding: '12px 14px', color: '#fac802', fontSize: 12, fontWeight: 800, width: 100 }}>
                  NÚMERO
                </th>
                <th style={{ padding: '12px 14px', color: '#fff', fontSize: 12, fontWeight: 800, width: 110 }}>
                  FOLIO
                </th>
                <th style={{ padding: '12px 14px', color: '#fff', fontSize: 12, fontWeight: 800, width: 90 }}>
                  BOLETO
                </th>
                <th style={{ padding: '12px 14px', color: '#fff', fontSize: 12, fontWeight: 800 }}>
                  TODAS LAS COMBINACIONES DEL BOLETO
                </th>
                <th style={{ padding: '12px 14px', color: '#fff', fontSize: 12, fontWeight: 800, textAlign: 'right', width: 110 }}>
                  ESTADO
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '40px 20px', textAlign: 'center', color: '#8d9896' }}>
                    No se encontró ningún número o folio coincidente con &ldquo;{search}&rdquo;.
                  </td>
                </tr>
              ) : (
                filteredEntries.map((row, idx) => {
                  const state = ticketStateMap.get(row.numeroBoleto) || 'available';
                  const isPaid = state === 'paid';
                  const isReserved = state === 'reserved';

                  return (
                    <tr
                      key={row.numeroParticipante}
                      style={{
                        borderBottom: '1px solid #1a2430',
                        background: idx % 2 === 0 ? '#0d1217' : '#11171e',
                        transition: 'background 0.15s',
                      }}
                    >
                      {/* Número Participante Destacado */}
                      <td style={{ padding: '10px 14px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            background: '#fac802',
                            color: '#000',
                            fontFamily: 'monospace, monospace',
                            fontSize: 15,
                            fontWeight: 900,
                            padding: '3px 8px',
                            borderRadius: 6,
                            letterSpacing: 1,
                          }}
                        >
                          {row.numeroParticipante}
                        </span>
                      </td>

                      {/* Folio Alfanumérico */}
                      <td style={{ padding: '10px 14px' }}>
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: 14,
                            color: '#ffffff',
                            letterSpacing: 0.5,
                          }}
                        >
                          {row.codigoAlfanumerico}
                        </span>
                      </td>

                      {/* Boleto Físico */}
                      <td style={{ padding: '10px 14px', color: '#a0aab0', fontSize: 13 }}>
                        #{row.folio}
                      </td>

                      {/* Las 5 combinaciones completas */}
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', alignItems: 'center' }}>
                          {row.combinacionesBoleto.map((num) => {
                            const isCurrent = num === row.numeroParticipante;
                            const isSearched = search.trim() && num.includes(search.trim());
                            return (
                              <span
                                key={num}
                                style={{
                                  background: isCurrent ? '#fac802' : isSearched ? '#e6af00' : '#1c2633',
                                  color: isCurrent || isSearched ? '#000' : '#8fa1b3',
                                  fontWeight: isCurrent || isSearched ? 900 : 600,
                                  fontSize: 12,
                                  padding: '2px 6px',
                                  borderRadius: 4,
                                  border: isCurrent || isSearched ? '1px solid #e0b402' : '1px solid #2a3848',
                                  fontFamily: 'monospace, monospace',
                                }}
                              >
                                {num}
                              </span>
                            );
                          })}
                        </div>
                      </td>

                      {/* Estado */}
                      <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                        {isPaid ? (
                          <span
                            style={{
                              background: '#194a2e',
                              color: '#4ade80',
                              fontSize: 11,
                              fontWeight: 800,
                              padding: '3px 8px',
                              borderRadius: 4,
                              textTransform: 'uppercase',
                              letterSpacing: 0.5,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Pagado
                          </span>
                        ) : isReserved ? (
                          <span
                            style={{
                              background: '#4a3b19',
                              color: '#fbbf24',
                              fontSize: 11,
                              fontWeight: 800,
                              padding: '3px 8px',
                              borderRadius: 4,
                              textTransform: 'uppercase',
                              letterSpacing: 0.5,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Apartado
                          </span>
                        ) : (
                          <span
                            style={{
                              background: '#1f2937',
                              color: '#9ca3af',
                              fontSize: 11,
                              fontWeight: 700,
                              padding: '3px 8px',
                              borderRadius: 4,
                              textTransform: 'uppercase',
                              letterSpacing: 0.5,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Disponible
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
