'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTicketStore } from '@/lib/ticket-store';
import { getLetterFolio } from '@/lib/folio-letters';

export default function AdminPagosClient() {
  const { tickets, markAsPaid, releaseTicket } = useTicketStore();
  const [filter, setFilter] = useState<'all' | 'reconciliation_hold' | 'paid'>('all');
  const [search, setSearch] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Tickets que tienen datos de compra / apartado o pago
  const relevantTickets = tickets.filter(
    (t) => t.state === 'reconciliation_hold' || t.state === 'paid' || t.buyerName
  );

  const filteredTickets = relevantTickets.filter((t) => {
    if (filter === 'reconciliation_hold' && t.state !== 'reconciliation_hold') return false;
    if (filter === 'paid' && t.state !== 'paid') return false;

    if (!search.trim()) return true;
    const query = search.trim().toLowerCase();
    const folioCode = getLetterFolio(t.folio).toLowerCase();
    const buyer = (t.buyerName || '').toLowerCase();
    const phone = (t.phone || '').toLowerCase();

    return folioCode.includes(query) || buyer.includes(query) || phone.includes(query);
  });

  const pendingCount = tickets.filter((t) => t.state === 'reconciliation_hold').length;
  const paidCount = tickets.filter((t) => t.state === 'paid').length;
  const totalRecaudado = paidCount * 250;

  const handleApprove = (folio: number) => {
    const code = getLetterFolio(folio);
    if (confirm(`¿Confirmas que el pago de $250 MXN para el Folio ${code} ya ingresó a tu cuenta bancaria o caja?`)) {
      markAsPaid(folio);
    }
  };

  const handleReject = (folio: number) => {
    const code = getLetterFolio(folio);
    if (confirm(`¿Deseas RECHAZAR y LIBERAR el Folio ${code}? El boleto volverá a estar disponible para el público.`)) {
      releaseTicket(folio);
    }
  };

  return (
    <main style={{ padding: '24px 0 64px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24, borderBottom: '1px solid #283233', paddingBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ffd21a' }}>
              Módulo de Finanzas
            </span>
            <span style={{ fontSize: 11, background: '#1c2223', color: '#889492', padding: '2px 8px', borderRadius: 9999, border: '1px solid #333e40' }}>
              Verificación Manual
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', margin: 0 }}>Conciliación de Pagos</h1>
          <p style={{ color: '#889492', margin: '6px 0 0', maxWidth: 650, fontSize: 14 }}>
            Verifica el ingreso real en tu cuenta bancaria o en efectivo antes de acreditar. La imagen o comprobante por sí sola no garantiza fondos.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link
            href="/admin/boletos"
            className="btn btn-quiet"
            style={{ padding: '10px 16px', fontSize: 13, textDecoration: 'none' }}
          >
            ← Ir a Boletos
          </Link>
          <Link
            href="/admin"
            className="btn btn-quiet"
            style={{ padding: '10px 16px', fontSize: 13, textDecoration: 'none' }}
          >
            Volver al Panel
          </Link>
        </div>
      </div>

      {/* Métricas clave */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#181b1c', border: '1px solid #635017', borderRadius: 10, padding: 18 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#facc15', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Pendientes por Validar
          </span>
          <strong style={{ fontSize: 32, display: 'block', color: '#fde047', marginTop: 4 }}>{pendingCount}</strong>
          <span style={{ fontSize: 12, color: '#889492', marginTop: 4, display: 'block' }}>
            ${(pendingCount * 250).toLocaleString('es-MX')} MXN por conciliar
          </span>
        </div>

        <div style={{ background: '#181b1c', border: '1px solid #14532d', borderRadius: 10, padding: 18 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Pagos Acreditados
          </span>
          <strong style={{ fontSize: 32, display: 'block', color: '#4ade80', marginTop: 4 }}>{paidCount}</strong>
          <span style={{ fontSize: 12, color: '#889492', marginTop: 4, display: 'block' }}>
            Boletos 100% liquidados
          </span>
        </div>

        <div style={{ background: '#181b1c', border: '1px solid #283233', borderRadius: 10, padding: 18 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#cfd8d6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Total Recaudado (Caja Real)
          </span>
          <strong style={{ fontSize: 32, display: 'block', color: '#ffd21a', marginTop: 4 }}>
            ${totalRecaudado.toLocaleString('es-MX')} MXN
          </strong>
          <span style={{ fontSize: 12, color: '#889492', marginTop: 4, display: 'block' }}>
            De 200 folios ($50,000 MXN máx.)
          </span>
        </div>
      </div>

      {/* Controles y Búsqueda */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', background: '#141718', padding: 14, borderRadius: 10, border: '1px solid #283233' }}>
        <input
          type="search"
          placeholder="Buscar por folio (ej. 1AAA), comprador o teléfono..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: 280,
            padding: '10px 14px',
            background: '#1a1e20',
            border: '1px solid #333e40',
            color: '#fff',
            borderRadius: 8,
            fontSize: 14,
            outline: 'none',
          }}
        />

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setFilter('all')}
            style={{
              padding: '8px 14px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 700,
              background: filter === 'all' ? '#ffd21a' : '#1f2526',
              color: filter === 'all' ? '#111' : '#cfd8d6',
              border: `1px solid ${filter === 'all' ? '#ffd21a' : '#333e40'}`,
              cursor: 'pointer',
            }}
          >
            Todos ({relevantTickets.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('reconciliation_hold')}
            style={{
              padding: '8px 14px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 700,
              background: filter === 'reconciliation_hold' ? '#facc15' : '#1f2526',
              color: filter === 'reconciliation_hold' ? '#111' : '#cfd8d6',
              border: `1px solid ${filter === 'reconciliation_hold' ? '#facc15' : '#333e40'}`,
              cursor: 'pointer',
            }}
          >
            Por Conciliar ({pendingCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('paid')}
            style={{
              padding: '8px 14px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 700,
              background: filter === 'paid' ? '#4ade80' : '#1f2526',
              color: filter === 'paid' ? '#111' : '#cfd8d6',
              border: `1px solid ${filter === 'paid' ? '#4ade80' : '#333e40'}`,
              cursor: 'pointer',
            }}
          >
            Acreditados ({paidCount})
          </button>
        </div>
      </div>

      {/* Lista de Registros */}
      {filteredTickets.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#16191a', border: '1px solid #283233', borderRadius: 10 }}>
          <p style={{ color: '#cfd8d6', fontSize: 16, fontWeight: 700, margin: 0 }}>
            No se encontraron pagos ni apartados con este criterio.
          </p>
          <p style={{ color: '#889492', fontSize: 13, marginTop: 6 }}>
            {pendingCount === 0
              ? '¡Excelente! No tienes solicitudes pendientes de validación en este momento.'
              : 'Prueba cambiando los filtros o el término de búsqueda.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredTickets.map((ticket) => {
            const folioCode = getLetterFolio(ticket.folio);
            const isPending = ticket.state === 'reconciliation_hold';
            const isPaid = ticket.state === 'paid';

            return (
              <div
                key={ticket.id}
                style={{
                  background: '#181b1c',
                  border: `1px solid ${isPending ? '#ca8a04' : '#283233'}`,
                  borderRadius: 10,
                  padding: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 16,
                }}
              >
                {/* Info del Boleto y Comprador */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div
                    style={{
                      background: '#111415',
                      border: '1px solid #333e40',
                      padding: '8px 14px',
                      borderRadius: 8,
                      textAlign: 'center',
                      minWidth: 80,
                    }}
                  >
                    <span style={{ fontSize: 10, textTransform: 'uppercase', color: '#889492', display: 'block', fontWeight: 700 }}>
                      Folio
                    </span>
                    <strong style={{ fontSize: 20, color: '#ffd21a', fontFamily: 'monospace' }}>{folioCode}</strong>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: 16, color: '#fff' }}>
                        {ticket.buyerName || 'Sin nombre registrado'}
                      </strong>
                      {isPending && (
                        <span
                          style={{
                            fontSize: 11,
                            padding: '3px 8px',
                            borderRadius: 9999,
                            background: '#312914',
                            color: '#facc15',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            border: '1px solid #854d0e',
                          }}
                        >
                          ● Pendiente de Conciliación
                        </span>
                      )}
                      {isPaid && (
                        <span
                          style={{
                            fontSize: 11,
                            padding: '3px 8px',
                            borderRadius: 9999,
                            background: '#064e3b',
                            color: '#6ee7b7',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                          }}
                        >
                          ✓ Pago Acreditado
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: 13, color: '#aaa', marginTop: 4, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <span>
                        WhatsApp:{' '}
                        <a
                          href={`https://wa.me/52${ticket.phone || ''}?text=${encodeURIComponent(
                            `Hola ${ticket.buyerName || ''}, te contacto de la Rifa Entre Amigos sobre tu Folio ${folioCode}.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: '#ffd21a', textDecoration: 'underline' }}
                        >
                          {ticket.phone || 'No registrado'}
                        </a>
                      </span>
                      <span>·</span>
                      <span>
                        Método: <strong style={{ color: '#fff' }}>{ticket.paymentMethod === 'transfer' ? 'Transferencia SPEI' : 'Efectivo presencial'}</strong>
                      </span>
                      <span>·</span>
                      <span>
                        Monto: <strong style={{ color: '#ffd21a' }}>$250 MXN</strong>
                      </span>
                    </div>

                    <div style={{ fontSize: 11, color: '#889492', marginTop: 4 }}>
                      5 Oportunidades:{' '}
                      <span style={{ fontFamily: 'monospace', color: '#cfd8d6' }}>
                        {ticket.ticket_numbers.map((n) => String(n.number).padStart(3, '0')).join(' · ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Acciones y Comprobante */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  {ticket.proofFile ? (
                    <button
                      type="button"
                      onClick={() => setPreviewImage(ticket.proofFile || null)}
                      className="btn btn-quiet"
                      style={{ padding: '8px 12px', fontSize: 12 }}
                    >
                      📎 Ver Comprobante
                    </button>
                  ) : (
                    <span style={{ fontSize: 12, color: '#666', fontStyle: 'italic', padding: '0 8px' }}>
                      Sin comprobante
                    </span>
                  )}

                  {isPending && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleReject(ticket.folio)}
                        style={{
                          padding: '8px 14px',
                          fontSize: 12,
                          fontWeight: 700,
                          borderRadius: 6,
                          background: '#451a1a',
                          color: '#f87171',
                          border: '1px solid #7f1d1d',
                          cursor: 'pointer',
                        }}
                      >
                        Rechazar / Liberar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApprove(ticket.folio)}
                        className="btn btn-primary"
                        style={{ padding: '8px 16px', fontSize: 12 }}
                      >
                        ✓ Aprobar Pago
                      </button>
                    </>
                  )}

                  {isPaid && (
                    <Link
                      href={`/comprobante/${ticket.folio}`}
                      target="_blank"
                      className="btn btn-quiet"
                      style={{ padding: '8px 12px', fontSize: 12, textDecoration: 'none' }}
                    >
                      Ver Comprobante Público →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Preview Comprobante */}
      {previewImage ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            zIndex: 100,
          }}
          onClick={() => setPreviewImage(null)}
        >
          <div
            style={{
              background: '#16191a',
              border: '1px solid #333e40',
              borderRadius: 14,
              maxWidth: 500,
              width: '100%',
              padding: 20,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, margin: 0, color: '#fff' }}>Comprobante Cargado</h3>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                style={{ background: 'transparent', border: 'none', color: '#888', fontSize: 22, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ background: '#0e1111', borderRadius: 8, padding: 24, textAlign: 'center', border: '1px solid #283233' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📄</div>
              <div style={{ fontSize: 14, color: '#ffd21a', fontWeight: 'bold', wordBreak: 'break-all' }}>
                {previewImage}
              </div>
              <div style={{ fontSize: 12, color: '#889492', marginTop: 8 }}>
                Archivo adjuntado durante el registro del comprador.
              </div>
            </div>

            <div style={{ marginTop: 20, textAlign: 'right' }}>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="btn btn-quiet"
                style={{ padding: '8px 16px', fontSize: 13 }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
