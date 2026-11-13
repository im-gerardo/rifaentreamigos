'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import invertedManifest from '@/public/relacion_numeros_a_boletos.json';
import { useTicketStore } from '@/lib/ticket-store';

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
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px 80px' }}>
      {/* Cabecera */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span
            style={{
              background: '#fac802',
              color: '#000',
              fontWeight: 800,
              fontSize: 12,
              padding: '4px 10px',
              borderRadius: 6,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            Guía Oficial Ascendente
          </span>
          <span style={{ color: '#8d9896', fontSize: 13 }}>
            Sorteo 12 de diciembre de 2026 · Lotería Nacional
          </span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 900, margin: '0 0 8px', color: '#fff' }}>
          Relación de Números a Boletos (000 al 999)
        </h1>
        <p style={{ margin: 0, color: '#a0aab0', fontSize: 15, lineHeight: 1.5 }}>
          Localiza de forma inmediata en qué boleto físico y folio alfanumérico se encuentra cada uno de los 1,000 números participantes, en estricto orden ascendente.
        </p>
      </div>

      {/* Controles de Búsqueda */}
      <div
        style={{
          background: '#131920',
          border: '1px solid #24303c',
          borderRadius: 12,
          padding: '20px',
          marginBottom: 24,
        }}
      >
        <div style={{ position: 'relative' }}>
          <label
            htmlFor="search-number"
            style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#fac802', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}
          >
            Buscar por número o folio
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="search-number"
              type="text"
              placeholder="Ej: 000, 043, 344, 777, 1AAA, 2ADV o 156..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                background: '#0a0d11',
                border: '1px solid #324354',
                borderRadius: 8,
                padding: '12px 16px',
                color: '#fff',
                fontSize: 15,
                outline: 'none',
                boxSizing: 'border-box',
              }}
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
                  fontSize: 14,
                  fontWeight: 'bold',
                }}
              >
                ✕ Limpiar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Pestañas de Filtrado Rápido por Centena */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#8d9896', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Filtrar por bloque de números:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {CENTENAS.map((c, idx) => {
            const isActive = selectedCentena === (c.min !== undefined ? c.min : null);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedCentena(c.min !== undefined ? c.min : null);
                }}
                style={{
                  background: isActive ? '#fac802' : '#17202a',
                  color: isActive ? '#000' : '#c9d1d9',
                  border: `1px solid ${isActive ? '#fac802' : '#273544'}`,
                  borderRadius: 6,
                  padding: '6px 12px',
                  fontSize: 12,
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contador de resultados */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: '#8d9896' }}>
          Mostrando <strong style={{ color: '#fff' }}>{filteredEntries.length}</strong> de 1,000 números
        </span>
        <Link
          href="/boletos"
          style={{ fontSize: 13, color: '#fac802', textDecoration: 'none', fontWeight: 600 }}
        >
          ← Ir a la cuadrícula de Boletos
        </Link>
      </div>

      {/* Tabla Oficial de Relación */}
      <div
        style={{
          background: '#0d1217',
          border: '1px solid #24303c',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#161f28', borderBottom: '2px solid #2e3e4e' }}>
                <th style={{ padding: '14px 18px', color: '#fac802', fontSize: 13, fontWeight: 800, width: 120 }}>
                  NÚMERO
                </th>
                <th style={{ padding: '14px 18px', color: '#fff', fontSize: 13, fontWeight: 800, width: 140 }}>
                  FOLIO
                </th>
                <th style={{ padding: '14px 18px', color: '#fff', fontSize: 13, fontWeight: 800, width: 120 }}>
                  BOLETO
                </th>
                <th style={{ padding: '14px 18px', color: '#fff', fontSize: 13, fontWeight: 800 }}>
                  TODAS LAS COMBINACIONES DEL BOLETO
                </th>
                <th style={{ padding: '14px 18px', color: '#fff', fontSize: 13, fontWeight: 800, textAlign: 'right', width: 120 }}>
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
                      <td style={{ padding: '12px 18px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            background: '#fac802',
                            color: '#000',
                            fontFamily: 'monospace, monospace',
                            fontSize: 16,
                            fontWeight: 900,
                            padding: '4px 10px',
                            borderRadius: 6,
                            letterSpacing: 1,
                          }}
                        >
                          {row.numeroParticipante}
                        </span>
                      </td>

                      {/* Folio Alfanumérico */}
                      <td style={{ padding: '12px 18px' }}>
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: 15,
                            color: '#ffffff',
                            letterSpacing: 0.5,
                          }}
                        >
                          {row.codigoAlfanumerico}
                        </span>
                      </td>

                      {/* Boleto Físico */}
                      <td style={{ padding: '12px 18px', color: '#a0aab0', fontSize: 14 }}>
                        #{row.folio}
                      </td>

                      {/* Las 5 combinaciones completas */}
                      <td style={{ padding: '12px 18px' }}>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
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
                                  fontSize: 13,
                                  padding: '3px 8px',
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
                      <td style={{ padding: '12px 18px', textAlign: 'right' }}>
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
