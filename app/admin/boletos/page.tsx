'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTicketStore } from '@/lib/ticket-store';
import { getLetterFolio } from '@/lib/folio-letters';

export default function AdminBoletosPage() {
  const { tickets, reserveMultipleTickets, markAsPaid, releaseTicket } = useTicketStore();
  const [search, setSearch] = useState('');
  const [filterState, setFilterState] = useState('all');

  // Modal de visualización de evidencia/comprobante de pago
  const [proofModalData, setProofModalData] = useState<{
    folioCode: string;
    buyerName: string;
    paymentMethod: 'cash' | 'transfer';
    proofFile?: string;
  } | null>(null);

  // Modal de venta presencial / administrativa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState('');
  const [selectedFolios, setSelectedFolios] = useState<number[]>([]);
  const [buyerName, setBuyerName] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer'>('cash');
  const [markPaidDirectly, setMarkPaidDirectly] = useState(true);
  const [proofFileName, setProofFileName] = useState('');
  const [formError, setFormError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  const availableTickets = tickets.filter((t) => t.state === 'available');

  const filtered = tickets.filter((t) => {
    const matchesState = filterState === 'all' || t.state === filterState;
    const letterCode = getLetterFolio(t.folio);
    const folioNumStr = String(t.folio);
    const numbersMatch = t.ticket_numbers?.some((n) =>
      String(n.number).padStart(3, '0').includes(search)
    );
    const buyerMatch =
      t.buyerName?.toLowerCase().includes(search.toLowerCase()) || t.phone?.includes(search);
    const matchesSearch =
      !search ||
      letterCode.toLowerCase().includes(search.toLowerCase()) ||
      folioNumStr.includes(search) ||
      numbersMatch ||
      buyerMatch;

    return matchesState && matchesSearch;
  });

  const availableCount = availableTickets.length;
  const reservedCount = tickets.filter((t) => t.state === 'reserved' || t.state === 'reconciliation_hold').length;
  const paidCount = tickets.filter((t) => t.state === 'paid').length;

  const modalFilteredTickets = availableTickets.filter((t) => {
    if (!modalSearch.trim()) return true;
    const letterCode = getLetterFolio(t.folio);
    const numMatch = t.ticket_numbers?.some((n) =>
      String(n.number).padStart(3, '0').includes(modalSearch.trim())
    );
    return (
      letterCode.toLowerCase().includes(modalSearch.trim().toLowerCase()) ||
      String(t.folio).includes(modalSearch.trim()) ||
      numMatch
    );
  });

  const handleOpenSaleModal = (initialFolio?: number) => {
    setModalSearch('');
    if (initialFolio) {
      setSelectedFolios([initialFolio]);
    } else {
      setSelectedFolios([]);
    }
    setBuyerName('');
    setPhone('');
    setPaymentMethod('cash');
    setMarkPaidDirectly(true);
    setProofFileName('');
    setFormError('');
    setActionSuccess('');
    setIsModalOpen(true);
  };

  const toggleModalFolio = (folio: number) => {
    setSelectedFolios((curr) =>
      curr.includes(folio) ? curr.filter((f) => f !== folio) : [...curr, folio]
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFolios([]);
    setBuyerName('');
    setPhone('');
    setProofFileName('');
    setFormError('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Guardar nombre y si es imagen generar base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofFileName(reader.result as string || file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFolios.length === 0) {
      setFormError('Por favor selecciona al menos un boleto para vender.');
      return;
    }

    if (!buyerName.trim() || buyerName.trim().length < 3) {
      setFormError('Por favor ingresa el nombre completo (como se muestra en su INE).');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Ingresa un teléfono válido de 10 dígitos.');
      return;
    }

    const res = reserveMultipleTickets({
      folios: selectedFolios,
      buyerName: buyerName.trim(),
      phone: cleanPhone,
      paymentMethod,
      proofFile: proofFileName || (paymentMethod === 'cash' ? 'Depósito en efectivo registrado en caja' : 'Transferencia SPEI confirmada'),
      termsAccepted: true,
      markPaid: markPaidDirectly,
    });

    if (!res.success) {
      setFormError(res.error || 'Ocurrió un error al registrar la venta.');
      return;
    }

    const codes = selectedFolios.map((f) => getLetterFolio(f)).join(', ');
    setActionSuccess(`¡Boleto(s) ${codes} registrado(s) con éxito!`);
    setTimeout(() => {
      handleCloseModal();
    }, 1200);
  };

  const selectedTicketObjects = tickets.filter((t) => selectedFolios.includes(t.folio));
  const totalPrice = selectedFolios.length * 250;
  const isMultiple = selectedFolios.length > 1;

  return (
    <main className="admin-boletos" style={{ padding: '24px 0 64px' }}>
      {/* Encabezado y acciones */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', margin: 0 }}>Gestión y Venta de Boletos</h1>
          <p style={{ color: 'var(--text-muted, #aaa)', margin: '6px 0 0' }}>
            Supervisa el inventario de 200 folios alfabéticos y registra ventas directas o en equipo.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => handleOpenSaleModal()}
            className="btn btn-primary"
            style={{ padding: '10px 18px', fontSize: 14 }}
          >
            + Vender Boleto(s)
          </button>
          <Link
            href="/como-se-elige-al-ganador"
            className="btn btn-quiet"
            style={{ padding: '10px 16px', fontSize: 13, textDecoration: 'none', color: '#ffd21a', borderColor: '#5a4b16' }}
          >
            🎯 Simulador para Clientes
          </Link>
          <a
            href="/boletos-emision-oficial.csv"
            download
            className="btn btn-quiet"
            style={{ padding: '10px 16px', fontSize: 13, textDecoration: 'none' }}
          >
            Descargar CSV (Imprenta)
          </a>
          <Link
            href="/admin"
            className="btn btn-quiet"
            style={{ padding: '10px 16px', fontSize: 13, textDecoration: 'none' }}
          >
            Volver al Panel
          </Link>
        </div>
      </div>

      {actionSuccess ? (
        <div style={{ background: '#064e3b', color: '#6ee7b7', padding: '14px 18px', borderRadius: 8, marginBottom: 20, fontWeight: 600 }}>
          {actionSuccess}
        </div>
      ) : null}

      {/* Métricas clave */}
      <div className="stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div className="card stat" style={{ padding: 16, background: '#1c1c1c', borderRadius: 8 }}>
          <span style={{ fontSize: 13, color: '#888' }}>Total Emisión</span>
          <strong style={{ fontSize: 24, display: 'block', marginTop: 4 }}>{tickets.length}</strong>
        </div>
        <div className="card stat" style={{ padding: 16, background: '#1c1c1c', borderRadius: 8 }}>
          <span style={{ fontSize: 13, color: '#888' }}>Disponibles</span>
          <strong style={{ fontSize: 24, color: '#4ade80', display: 'block', marginTop: 4 }}>{availableCount}</strong>
        </div>
        <div className="card stat" style={{ padding: 16, background: '#1c1c1c', borderRadius: 8 }}>
          <span style={{ fontSize: 13, color: '#888' }}>Apartados / En Revisión</span>
          <strong style={{ fontSize: 24, color: '#facc15', display: 'block', marginTop: 4 }}>{reservedCount}</strong>
        </div>
        <div className="card stat" style={{ padding: 16, background: '#1c1c1c', borderRadius: 8 }}>
          <span style={{ fontSize: 13, color: '#888' }}>Pagados / Liquidados</span>
          <strong style={{ fontSize: 24, color: '#60a5fa', display: 'block', marginTop: 4 }}>{paidCount}</strong>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          type="search"
          placeholder="Buscar por letra (ej. 1AAA, 1AAC), número (ej. 034) o comprador..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: 280,
            padding: '12px 14px',
            background: '#141414',
            border: '1px solid #333',
            color: '#fff',
            borderRadius: 8,
            fontSize: 14,
          }}
        />
        <select
          value={filterState}
          onChange={(e) => setFilterState(e.target.value)}
          style={{
            padding: '12px 14px',
            background: '#141414',
            border: '1px solid #333',
            color: '#fff',
            borderRadius: 8,
            fontSize: 14,
          }}
        >
          <option value="all">Todos los estados</option>
          <option value="available">Disponibles</option>
          <option value="reconciliation_hold">Apartados / En Revisión</option>
          <option value="paid">Pagados</option>
        </select>
      </div>

      {/* Grid de Boletos de Administración */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}
      >
        {filtered.map((t) => {
          const letterCode = getLetterFolio(t.folio);
          const isAvailable = t.state === 'available';
          const isHold = t.state === 'reserved' || t.state === 'reconciliation_hold';
          const isPaid = t.state === 'paid';

          return (
            <div
              key={t.id}
              className="card"
              style={{
                background: '#181b1c',
                border: `1px solid ${isPaid ? '#1e3a8a' : isHold ? '#635017' : '#283233'}`,
                borderRadius: 10,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 20, fontWeight: '900', color: '#ffd21a' }}>Folio {letterCode}</span>
                  <span
                    style={{
                      fontSize: 11,
                      padding: '3px 8px',
                      borderRadius: 9999,
                      background: isAvailable ? '#064e3b' : isPaid ? '#1e3a8a' : '#312914',
                      color: isAvailable ? '#6ee7b7' : isPaid ? '#93c5fd' : '#facc15',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {isAvailable ? 'Disponible' : isPaid ? 'Pagado' : 'Apartado'}
                  </span>
                </div>

                <div style={{ fontSize: 11, color: '#889492', textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 }}>
                  5 Números de participación:
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                  {t.ticket_numbers?.map((n) => (
                    <span
                      key={n.number}
                      style={{
                        background: '#0d1011',
                        border: '1px solid #333',
                        padding: '4px 6px',
                        borderRadius: 4,
                        fontSize: 13,
                        fontWeight: 'bold',
                        fontFamily: 'monospace',
                        color: '#fff',
                      }}
                    >
                      {String(n.number).padStart(3, '0')}
                    </span>
                  ))}
                </div>

                {t.buyerName ? (
                  <div style={{ borderTop: '1px solid #283233', paddingTop: 10, marginTop: 10, fontSize: 13 }}>
                    <div><strong>Cliente:</strong> {t.buyerName}</div>
                    <div style={{ color: '#aaa', marginTop: 2 }}><strong>Tel:</strong> {t.phone}</div>
                    <div style={{ color: '#888', marginTop: 2, fontSize: 12 }}>
                      Método: {t.paymentMethod === 'cash' ? 'Efectivo presencial' : 'Transferencia (SPEI)'}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Botonera de acciones */}
              <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {isAvailable ? (
                  <button
                    type="button"
                    onClick={() => handleOpenSaleModal(t.folio)}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '9px 12px', fontSize: 13 }}
                  >
                    Vender este boleto
                  </button>
                ) : (
                  <>
                    {/* Botón 1: "Detalle" (lleva a la vista de comprobante digital público) */}
                    <Link
                      href={`/comprobante/${t.folio}`}
                      target="_blank"
                      className="btn btn-quiet"
                      style={{ flex: 1, padding: '7px 8px', fontSize: 12, textAlign: 'center', textDecoration: 'none' }}
                      title="Ver detalle del boleto y números asignados"
                    >
                      Detalle
                    </Link>

                    {/* Botón 2: "Comprobante" (muestra el comprobante de transferencia o evidencia de depósito en efectivo) */}
                    <button
                      type="button"
                      onClick={() => {
                        setProofModalData({
                          folioCode: letterCode,
                          buyerName: t.buyerName || 'Cliente',
                          paymentMethod: t.paymentMethod || 'transfer',
                          proofFile: t.proofFile || (t.paymentMethod === 'cash' ? 'Depósito en efectivo registrado en caja' : 'Transferencia SPEI acreditada'),
                        });
                      }}
                      style={{
                        flex: 1,
                        padding: '7px 8px',
                        fontSize: 12,
                        background: '#242d2f',
                        color: '#f1f5f4',
                        border: '1px solid #415053',
                        borderRadius: 6,
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                      title="Ver comprobante de transferencia o depósito bancario"
                    >
                      📎 Comprobante
                    </button>

                    {!isPaid ? (
                      <button
                        type="button"
                        onClick={() => markAsPaid(t.folio)}
                        className="btn btn-primary"
                        style={{ flex: 1, padding: '7px 8px', fontSize: 12 }}
                      >
                        Aprobar
                      </button>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`¿Liberar el folio ${letterCode} para dejarlo disponible nuevamente?`)) {
                          releaseTicket(t.folio);
                        }
                      }}
                      className="btn btn-quiet"
                      style={{ padding: '7px 8px', fontSize: 12, color: '#f87171' }}
                      title="Liberar folio"
                    >
                      Liberar
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal para Ver Comprobante / Evidencia de Transferencia o Efectivo */}
      {proofModalData ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            zIndex: 100,
          }}
          onClick={() => setProofModalData(null)}
        >
          <div
            style={{
              background: '#16191a',
              border: '1px solid #364244',
              borderRadius: 16,
              maxWidth: 520,
              width: '100%',
              padding: 24,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #283233', paddingBottom: 12 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ffd21a' }}>
                  Evidencia de Pago Oficial
                </span>
                <h3 style={{ fontSize: 18, margin: '2px 0 0', color: '#fff', fontWeight: 900 }}>
                  Folio {proofModalData.folioCode} · {proofModalData.buyerName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setProofModalData(null)}
                style={{ background: 'transparent', border: 'none', color: '#888', fontSize: 24, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: '#aaa', marginBottom: 6 }}>
                Método registrado:{' '}
                <strong style={{ color: '#ffd21a' }}>
                  {proofModalData.paymentMethod === 'transfer' ? 'Transferencia SPEI' : 'Efectivo recibido / Depósito a cuenta'}
                </strong>
              </div>
            </div>

            <div
              style={{
                background: '#0d1011',
                borderRadius: 12,
                border: '1px solid #283233',
                padding: 18,
                textAlign: 'center',
                minHeight: 180,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {proofModalData.proofFile?.startsWith('data:image') || proofModalData.proofFile?.startsWith('http') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={proofModalData.proofFile}
                  alt={`Comprobante ${proofModalData.folioCode}`}
                  style={{ maxHeight: '55vh', maxWidth: '100%', objectFit: 'contain', borderRadius: 8 }}
                />
              ) : (
                <div>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>
                    {proofModalData.paymentMethod === 'transfer' ? '🏦' : '💵'}
                  </div>
                  <strong style={{ fontSize: 15, color: '#fff', display: 'block', marginBottom: 6 }}>
                    {proofModalData.paymentMethod === 'transfer'
                      ? 'Comprobante de Transferencia Bancaria'
                      : 'Evidencia de Depósito en Cuenta'}
                  </strong>
                  <p style={{ fontSize: 13, color: '#8d9896', maxWidth: 380, margin: '0 auto', lineHeight: 1.5 }}>
                    {proofModalData.proofFile || 'Pago liquidado y verificado en la cuenta receptora de la rifa.'}
                  </p>
                </div>
              )}
            </div>

            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button
                type="button"
                onClick={() => setProofModalData(null)}
                style={{
                  padding: '9px 18px',
                  borderRadius: 8,
                  background: '#242c2d',
                  color: '#cfd8d6',
                  border: '1px solid #3e4c4e',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Modal Completo de Venta Presencial (1 o Varios Boletos) */}
      {isModalOpen ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            zIndex: 100,
          }}
        >
          <div
            className="card"
            style={{
              background: '#16191a',
              border: '1px solid #333e40',
              borderRadius: 14,
              maxWidth: 500,
              width: '100%',
              padding: 24,
              maxHeight: '92vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 style={{ fontSize: 20, margin: 0, color: '#fff' }}>
                {isMultiple ? 'Venta de Boletos' : 'Venta de Boleto'}
              </h2>
              <button
                type="button"
                onClick={handleCloseModal}
                style={{ background: 'transparent', border: 'none', color: '#888', fontSize: 24, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <p style={{ color: '#889492', fontSize: 13, margin: '0 0 16px' }}>
              Registra la venta o apartado con los mismos controles y verificación que el portal público.
            </p>

            {formError ? (
              <div style={{ background: '#7f1d1d', color: '#fca5a5', padding: '10px 12px', borderRadius: 6, marginBottom: 16, fontSize: 13 }}>
                {formError}
              </div>
            ) : null}

            <form onSubmit={handleSubmitSale}>
              {/* Selector de boletos disponibles */}
              <div style={{ marginBottom: 16, background: '#111415', padding: 12, borderRadius: 8, border: '1px solid #283233' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#cfd8d6', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Seleccionar Boletos ({availableTickets.length} disponibles):</span>
                  {selectedFolios.length > 0 ? (
                    <strong style={{ color: '#ffd21a' }}>{selectedFolios.length} seleccionado(s)</strong>
                  ) : null}
                </div>

                {/* Buscador dentro del modal */}
                <div style={{ marginBottom: 10 }}>
                  <input
                    type="search"
                    placeholder="Filtrar por letra (ej. 1AAA, 1AAC) o número..."
                    value={modalSearch}
                    onChange={(e) => setModalSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: '#181b1c',
                      border: '1px solid #3d494a',
                      borderRadius: 6,
                      color: '#fff',
                      fontSize: 12,
                      outline: 'none',
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(58px, 1fr))',
                    gap: 6,
                    maxHeight: 140,
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                  }}
                >
                  {modalFilteredTickets.map((t) => {
                    const isSelected = selectedFolios.includes(t.folio);
                    return (
                      <button
                        key={t.folio}
                        type="button"
                        onClick={() => toggleModalFolio(t.folio)}
                        style={{
                          background: isSelected ? '#ffd21a' : '#1c2223',
                          color: isSelected ? '#111' : '#cfd8d6',
                          border: `1px solid ${isSelected ? '#ffd21a' : '#2d3536'}`,
                          padding: '6px 2px',
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 'bold',
                          cursor: 'pointer',
                        }}
                      >
                        {getLetterFolio(t.folio)}
                      </button>
                    );
                  })}
                </div>

                {selectedTicketObjects.length > 0 ? (
                  <div style={{ marginTop: 10, borderTop: '1px solid #23292a', paddingTop: 8 }}>
                    <div style={{ fontSize: 11, color: '#889492', textTransform: 'uppercase', marginBottom: 4 }}>
                      Números incluidos:
                    </div>
                    {selectedTicketObjects.map((t) => (
                      <div key={t.folio} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '2px 0' }}>
                        <span style={{ color: '#ffd21a', fontWeight: 'bold' }}>Folio {getLetterFolio(t.folio)}:</span>
                        <span style={{ fontFamily: 'monospace', color: '#fff' }}>
                          {t.ticket_numbers?.map((n) => String(n.number).padStart(3, '0')).join(' · ')}
                        </span>
                      </div>
                    ))}
                    <div style={{ marginTop: 6, fontSize: 13, fontWeight: 'bold', color: '#ffd21a', textAlign: 'right' }}>
                      Total: ${totalPrice} MXN
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Nombre con INE */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, marginBottom: 6, color: '#cfd8d6', fontWeight: 600 }}>
                  Nombre completo (como se muestra en su INE):
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nombre y Apellidos del comprador"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: '#1c2122',
                    border: '1px solid #374143',
                    color: '#fff',
                    borderRadius: 6,
                    fontSize: 14,
                  }}
                />
              </div>

              {/* WhatsApp */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, marginBottom: 6, color: '#cfd8d6', fontWeight: 600 }}>
                  Número de WhatsApp (10 dígitos):
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ej. 4421941930"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: '#1c2122',
                    border: '1px solid #374143',
                    color: '#fff',
                    borderRadius: 6,
                    fontSize: 14,
                  }}
                />
              </div>

              {/* Forma de pago */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, marginBottom: 6, color: '#cfd8d6', fontWeight: 600 }}>
                  Método de pago:
                </label>
                <div style={{ display: 'flex', gap: 10 }}>
                  <label
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      background: paymentMethod === 'cash' ? '#222b29' : '#171c1d',
                      border: `1px solid ${paymentMethod === 'cash' ? '#ffd21a' : '#333e40'}`,
                      padding: '10px 12px',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontSize: 13,
                      color: '#fff',
                    }}
                  >
                    <input
                      type="radio"
                      name="adminPaymentMethod"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      style={{ accentColor: '#ffd21a' }}
                    />
                    <span>Efectivo recibido</span>
                  </label>

                  <label
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      background: paymentMethod === 'transfer' ? '#222b29' : '#171c1d',
                      border: `1px solid ${paymentMethod === 'transfer' ? '#ffd21a' : '#333e40'}`,
                      padding: '10px 12px',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontSize: 13,
                      color: '#fff',
                    }}
                  >
                    <input
                      type="radio"
                      name="adminPaymentMethod"
                      value="transfer"
                      checked={paymentMethod === 'transfer'}
                      onChange={() => setPaymentMethod('transfer')}
                      style={{ accentColor: '#ffd21a' }}
                    />
                    <span>Transferencia SPEI</span>
                  </label>
                </div>
              </div>

              {/* Subida de comprobante siempre visible o destacada */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, marginBottom: 6, color: '#cfd8d6', fontWeight: 600 }}>
                  Comprobante o recibo (foto o captura de transferencia / ficha de depósito):
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    background: '#1c2122',
                    padding: '12px 14px',
                    borderRadius: 8,
                    border: '1px solid #374143',
                  }}
                >
                  <label
                    style={{
                      background: '#2a3536',
                      color: '#ffd21a',
                      border: '1px solid #485b5d',
                      padding: '8px 14px',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                    <span>📎 Seleccionar archivo</span>
                  </label>
                  <span
                    style={{
                      fontSize: 13,
                      color: proofFileName ? '#34d399' : '#889492',
                      fontWeight: proofFileName ? 600 : 400,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                    }}
                  >
                    {proofFileName ? '✓ Archivo adjuntado' : 'Ningún archivo seleccionado'}
                  </span>
                </div>
              </div>

              {/* Check de marcar pagado de inmediato */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', color: '#ddd' }}>
                  <input
                    type="checkbox"
                    checked={markPaidDirectly}
                    onChange={(e) => setMarkPaidDirectly(e.target.checked)}
                    style={{ accentColor: '#ffd21a', width: 16, height: 16 }}
                  />
                  <span>
                    Marcar como <strong>Pagado y Liquidado</strong> inmediatamente
                  </span>
                </label>
                <div style={{ fontSize: 11, color: '#889492', marginLeft: 24, marginTop: 2 }}>
                  * Si lo desmarcas, quedará como apartado pendiente de validación de pago.
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 24, paddingTop: 16, borderTop: '1px solid #283233' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: 8,
                    background: '#232a2b',
                    color: '#cfd8d6',
                    border: '1px solid #3d4a4c',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={selectedFolios.length === 0}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '12px', borderRadius: 8, fontSize: 14 }}
                >
                  {isMultiple ? `Confirmar (${selectedFolios.length} boletos)` : 'Confirmar Venta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
