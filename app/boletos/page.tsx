'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTicketStore } from '@/lib/ticket-store';
import { getLetterFolio } from '@/lib/folio-letters';
import styles from './boletos.module.css';

export default function Boletos() {
  const { tickets } = useTicketStore();
  const [filter, setFilter] = useState<'all' | 'available' | 'reserved' | 'paid'>('all');
  const [search, setSearch] = useState('');

  const visible = tickets.filter((ticket) => {
    const matchesFilter = filter === 'all' || ticket.state === filter;
    const folioStr = String(ticket.folio).padStart(3, '0');
    const letterFolio = getLetterFolio(ticket.folio);
    const matchesSearch =
      !search ||
      folioStr.includes(search) ||
      letterFolio.toLowerCase().includes(search.toLowerCase()) ||
      ticket.ticket_numbers?.some((n) => String(n.number).padStart(3, '0').includes(search));
    return matchesFilter && matchesSearch;
  });

  const availableCount = tickets.filter((t) => t.state === 'available').length;
  const reservedCount = tickets.filter((t) => t.state === 'reserved').length;
  const paidCount = tickets.filter((t) => t.state === 'paid').length;

  return (
    <main className={styles.page}>
      <header className={styles.heroHeader}>
        <p className="route-label">Edición Oficial 2026</p>
        <h1>Catálogo de Boletos</h1>
        <p className={styles.summary}>
          200 boletos numerados con <strong>5 oportunidades de ganar</strong> cada uno con la <strong>Lotería Nacional</strong> (12 de diciembre de 2026). Selecciona tu folio preferido y apártalo en línea.
        </p>
        <Link href="/checkout" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }}>
          Apartar un Boleto ($250 MXN)
        </Link>

        {/* Banner de datos bancarios para depósito */}
        <div
          style={{
            marginTop: 24,
            background: '#15191d',
            border: '1px solid #283442',
            borderRadius: 12,
            padding: '16px 20px',
            textAlign: 'left',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  background: 'rgba(255, 210, 26, 0.12)',
                  color: '#ffd21a',
                  fontSize: 16,
                }}
              >
                💳
              </span>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#7e8b9b', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block' }}>
                  Cuenta Oficial para Depósito o Transferencia ($250 MXN)
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 3, flexWrap: 'wrap' }}>
                  <span style={{ color: '#fff', fontSize: 14 }}>
                    Tarjeta (Klar):{' '}
                    <strong
                      style={{
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        fontSize: 17,
                        color: '#ffd21a',
                        letterSpacing: '0.06em',
                      }}
                    >
                      5401 0402 2126 5895
                    </strong>
                  </span>
                  <span style={{ color: '#445160' }}>·</span>
                  <span style={{ color: '#aeb7b4', fontSize: 13 }}>
                    Dudas o confirmación vía WhatsApp: <strong style={{ color: '#e6eceb' }}>442 194 1930</strong>
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              style={{
                background: '#ffd21a',
                color: '#121415',
                padding: '10px 18px',
                borderRadius: 7,
                fontWeight: 800,
                fontSize: 13,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'background 0.15s ease',
              }}
            >
              Apartar y Subir Comprobante →
            </Link>
          </div>
        </div>
      </header>

      {/* Barra de Filtros y Búsqueda */}
      <section className={styles.controlBar} aria-label="Filtros de búsqueda">
        <div className={styles.searchBox}>
          <span className={styles.searchIcon} aria-hidden="true">🔍</span>
          <input
            type="search"
            placeholder="Buscar por folio (ej. 001) o por número..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <button
            type="button"
            className={`${styles.filterChip} ${filter === 'all' ? styles.filterChipActive : ''}`}
            onClick={() => setFilter('all')}
          >
            Todos ({tickets.length})
          </button>
          <button
            type="button"
            className={`${styles.filterChip} ${filter === 'available' ? styles.filterChipActive : ''}`}
            onClick={() => setFilter('available')}
          >
            Disponibles ({availableCount})
          </button>
          <button
            type="button"
            className={`${styles.filterChip} ${filter === 'reserved' ? styles.filterChipActive : ''}`}
            onClick={() => setFilter('reserved')}
          >
            Apartados ({reservedCount})
          </button>
          <button
            type="button"
            className={`${styles.filterChip} ${filter === 'paid' ? styles.filterChipActive : ''}`}
            onClick={() => setFilter('paid')}
          >
            Pagados ({paidCount})
          </button>
        </div>
      </section>

      {/* Grid de Boletos */}
      {visible.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No se encontraron folios con este criterio de búsqueda</h3>
          <p>Intenta con otro número de 3 dígitos o borra el filtro de búsqueda.</p>
        </div>
      ) : (
        <section className={styles.ticketGrid} aria-label="Lista de boletos">
          {visible.map((ticket) => {
            const folioStr = String(ticket.folio).padStart(3, '0');
            const isAvailable = ticket.state === 'available';

            return (
              <article key={ticket.id} className={styles.ticketCard}>
                <div className={styles.ticketHeader}>
                  <span className={styles.folioNumber}>FOLIO {getLetterFolio(ticket.folio)}</span>
                  <span
                    className={`${styles.badge} ${
                      ticket.state === 'available'
                        ? styles.badgeAvailable
                        : ticket.state === 'paid'
                        ? styles.badgePaid
                        : styles.badgeReserved
                    }`}
                  >
                    {ticket.state === 'available' ? 'Disponible' : ticket.state === 'paid' ? 'Pagado' : 'Apartado'}
                  </span>
                </div>

                <div className={styles.ticketBody}>
                  <div className={styles.numbersLabel}>5 Números de participación:</div>
                  <div className={styles.numbersRow}>
                    {ticket.ticket_numbers?.map((n) => (
                      <span key={n.number} className={styles.numberPill}>
                        {String(n.number).padStart(3, '0')}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.ticketFooter}>
                  {isAvailable ? (
                    <Link
                      href={`/checkout?folio=${ticket.folio}`}
                      className={`${styles.actionButton} ${styles.btnApartar}`}
                    >
                      Quiero este boleto →
                    </Link>
                  ) : (
                    <Link
                      href={`/comprobante/${ticket.folio}`}
                      className={`${styles.actionButton} ${styles.btnConsultar}`}
                    >
                      Ver Comprobante Digital
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}
