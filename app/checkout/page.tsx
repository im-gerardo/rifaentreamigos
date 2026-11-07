'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useTicketStore } from '@/lib/ticket-store';
import { getLetterFolio } from '@/lib/folio-letters';
import styles from './checkout.module.css';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const initialFolioParam = searchParams.get('folio');

  const { tickets, reserveMultipleTickets } = useTicketStore();
  const availableTickets = tickets.filter((t) => t.state === 'available');

  const [selectedFolios, setSelectedFolios] = useState<number[]>([]);
  const [buyerName, setBuyerName] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'cash'>('transfer');
  const [proofFileName, setProofFileName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [successReserved, setSuccessReserved] = useState<number[] | null>(null);

  // Preseleccionar folio recibido por URL (ej. /checkout?folio=4)
  useEffect(() => {
    if (initialFolioParam) {
      const folioNum = parseInt(initialFolioParam, 10);
      if (!isNaN(folioNum) && availableTickets.some((t) => t.folio === folioNum)) {
        setSelectedFolios((prev) => (prev.includes(folioNum) ? prev : [...prev, folioNum]));
      }
    }
  }, [initialFolioParam]);

  const toggleFolioSelection = (folio: number) => {
    setSelectedFolios((current) =>
      current.includes(folio) ? current.filter((f) => f !== folio) : [...current, folio]
    );
  };

  const cleanPhone = phone.replace(/\D/g, '');
  const isFormValid =
    selectedFolios.length > 0 &&
    buyerName.trim().length >= 3 &&
    cleanPhone.length >= 10 &&
    termsAccepted;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const res = reserveMultipleTickets({
      folios: selectedFolios,
      buyerName: buyerName.trim(),
      phone: cleanPhone,
      paymentMethod,
      proofFile: proofFileName,
      termsAccepted,
      markPaid: false,
    });

    if (!res.success) {
      setError(res.error || 'Ocurrió un error al reservar los boletos.');
      return;
    }

    setSuccessReserved(selectedFolios);
  };

  const isMultiple = selectedFolios.length > 1;
  const buttonMainText = isMultiple ? 'Quiero estos boletos' : 'Quiero este boleto';
  const totalPrice = selectedFolios.length * 250;

  if (successReserved) {
    const isMultipleSuccess = successReserved.length > 1;
    return (
      <main style={{ padding: '60px 16px', maxWidth: 540, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ background: '#132e22', border: '1px solid #235d45', borderRadius: 16, padding: '32px 24px', marginBottom: 24 }}>
          <div style={{ fontSize: 42, marginBottom: 12 }}>🎉</div>
          <h1 style={{ fontSize: 24, margin: '0 0 10px', color: '#6ee7b7' }}>
            {isMultipleSuccess ? '¡Boletos Apartados con Éxito!' : '¡Boleto Apartado con Éxito!'}
          </h1>
          <p style={{ color: '#d1fae5', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            {isMultipleSuccess ? 'Tus boletos con folio ' : 'Tu boleto con folio '}
            <strong>{successReserved.map((f) => getLetterFolio(f)).join(', ')}</strong>{' '}
            {isMultipleSuccess ? 'han sido apartados.' : 'ha sido apartado.'}
            <br />
            Un administrador o vendedor verificará tu pago para confirmarlo formalmente.
          </p>
        </div>

        <div style={{ background: '#1c2223', padding: 20, borderRadius: 12, marginBottom: 24, textAlign: 'left', fontSize: 13, border: '1px solid #282f30' }}>
          <div style={{ color: '#889492', marginBottom: 8, fontWeight: 700, textTransform: 'uppercase' }}>Resumen de Reserva:</div>
          <div style={{ padding: '4px 0' }}><strong>Total a liquidar:</strong> ${totalPrice} MXN ({successReserved.length} × $250)</div>
          <div style={{ padding: '4px 0' }}><strong>Comprador:</strong> {buyerName}</div>
          <div style={{ padding: '4px 0' }}><strong>WhatsApp:</strong> {phone}</div>
          <div style={{ marginTop: 10, padding: '8px 12px', background: '#252110', border: '1px solid #635017', borderRadius: 6, color: '#facc15' }}>
            Estado: <strong>Pendiente de validación de pago</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Link
            href={`/comprobante/${successReserved[0]}`}
            className="btn btn-primary"
            style={{ textDecoration: 'none', padding: '14px', fontSize: 15 }}
          >
            Ver Mi Boleto Digital y QR
          </Link>
          <Link href="/boletos" className="btn btn-quiet" style={{ textDecoration: 'none', padding: '12px' }}>
            Volver al catálogo
          </Link>
        </div>
      </main>
    );
  }

  const selectedTicketObjects = tickets.filter((t) => selectedFolios.includes(t.folio));

  return (
    <div className={styles.checkoutLayout}>
      {/* Columna Izquierda: Formulario */}
      <div>
        <Link href="/boletos" className={styles.backLink}>
          ← Volver a la lista de boletos
        </Link>

        <section className={styles.formCard}>
          <div className={styles.formHeader}>
            <p className="route-label">Proceso de Selección</p>
            <h1>{isMultiple ? 'Quiero estos boletos' : 'Quiero este boleto'}</h1>
            <div className={styles.priceTag}>
              $250 MXN por boleto · 5 oportunidades por cada boleto con Lotería Nacional
            </div>
          </div>

          {error ? (
            <div style={{ background: '#7f1d1d', color: '#fca5a5', padding: '10px 14px', borderRadius: 8, marginBottom: 20, fontSize: 13 }}>
              {error}
            </div>
          ) : null}

          <form onSubmit={handleSubmit}>
            {/* Selección múltiple táctil / visual */}
            <div className={styles.ticketSelectorBox}>
              <div className={styles.selectorTitle}>
                <span>1. Elige uno o varios boletos ({availableTickets.length} disponibles):</span>
                {selectedFolios.length > 0 ? (
                  <strong style={{ color: '#ffd21a' }}>{selectedFolios.length} seleccionado(s)</strong>
                ) : null}
              </div>

              <div className={styles.ticketMiniGrid}>
                {tickets.map((t) => {
                  const isAvailable = t.state === 'available';
                  const isSelected = selectedFolios.includes(t.folio);
                  const isSold = t.state === 'paid' || t.state === 'reconciliation_hold' || t.state === 'reserved';

                  return (
                    <button
                      key={t.folio}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => isAvailable && toggleFolioSelection(t.folio)}
                      title={!isAvailable ? `Folio ${getLetterFolio(t.folio)} (Vendido)` : `Folio ${getLetterFolio(t.folio)}`}
                      className={`${styles.ticketMiniChip} ${
                        isSelected ? styles.ticketMiniChipSelected : ''
                      } ${!isAvailable ? styles.ticketMiniChipDisabled : ''}`}
                    >
                      {getLetterFolio(t.folio)}
                    </button>
                  );
                })}
              </div>

              {/* Vista previa de los 5 números de cada boleto seleccionado */}
              {selectedTicketObjects.length > 0 ? (
                <div className={styles.selectedDetailsBox}>
                  <div style={{ fontSize: 11, color: '#889492', textTransform: 'uppercase', marginBottom: 8, fontWeight: 700 }}>
                    Números de participación incluidos:
                  </div>
                  {selectedTicketObjects.map((t) => (
                    <div key={t.folio} className={styles.selectedTicketRow}>
                      <strong style={{ color: '#fff', fontSize: 12 }}>
                        Folio {getLetterFolio(t.folio)}:
                      </strong>
                      <div className={styles.numbersMiniRow}>
                        {t.ticket_numbers?.map((n) => (
                          <span key={n.number} className={styles.numberTag}>
                            {String(n.number).padStart(3, '0')}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 10, fontSize: 14, textAlign: 'right', color: '#ffd21a', fontWeight: 800 }}>
                    Total a liquidar: ${totalPrice} MXN
                  </div>
                </div>
              ) : null}
            </div>

            {/* Datos del Comprador */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="buyerName">
                Nombre completo (como se muestra en tu INE):
              </label>
              <input
                id="buyerName"
                className={styles.textInput}
                type="text"
                required
                placeholder="Nombre(s) y Apellidos idénticos a identificación"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
              />
              <p className={styles.hint}>
                * Indispensable para cotejar y reclamar la motocicleta en caso de resultar ganador.
              </p>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="phone">
                Número de WhatsApp (10 dígitos):
              </label>
              <input
                id="phone"
                className={styles.textInput}
                type="tel"
                required
                placeholder="Ej. 4421941930"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <p className={styles.hint}>Recibirás la confirmación de validación a este número.</p>
            </div>

            {/* Método de pago */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Forma de pago:</label>
              <div style={{ display: 'flex', gap: 12 }}>
                <label
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: paymentMethod === 'transfer' ? '#222b29' : '#171c1d',
                    border: `1px solid ${paymentMethod === 'transfer' ? '#ffd21a' : '#333e40'}`,
                    padding: '12px 14px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontSize: 13,
                    color: '#fff',
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transfer"
                    checked={paymentMethod === 'transfer'}
                    onChange={() => setPaymentMethod('transfer')}
                    style={{ accentColor: '#ffd21a', width: 16, height: 16 }}
                  />
                  <span>Transferencia (SPEI)</span>
                </label>

                <label
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: paymentMethod === 'cash' ? '#222b29' : '#171c1d',
                    border: `1px solid ${paymentMethod === 'cash' ? '#ffd21a' : '#333e40'}`,
                    padding: '12px 14px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontSize: 13,
                    color: '#fff',
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    style={{ accentColor: '#ffd21a', width: 16, height: 16 }}
                  />
                  <span>Efectivo presencial</span>
                </label>
              </div>
            </div>

            {/* Adjuntar comprobante rediseñado, limpio y claro */}
            {paymentMethod === 'transfer' ? (
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>
                  Comprobante de pago (opcional ahora o después por WhatsApp):
                </label>
                <div className={styles.uploadContainer}>
                  <div className={styles.uploadActionRow}>
                    <label className={styles.uploadButton}>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                      />
                      <span>📎 Adjuntar Archivo</span>
                    </label>
                    {proofFileName ? (
                      <span className={styles.uploadFileName}>✓ {proofFileName}</span>
                    ) : (
                      <span className={styles.uploadPlaceholder}>
                        Ningún archivo seleccionado (JPG, PNG, PDF)
                      </span>
                    )}
                  </div>
                  <p className={styles.hint} style={{ marginTop: 8 }}>
                    Si no lo tienes a la mano, puedes apartar y enviarlo después al WhatsApp 442 194 1930.
                  </p>
                </div>
              </div>
            ) : null}

            {/* Check de términos y condiciones */}
            <label className={styles.termsCheckLabel}>
              <input
                type="checkbox"
                required
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span>
                He leído y acepto las <strong>condiciones generales de la rifa</strong>, la fecha oficial del 12 de diciembre de 2026 y que el boleto debe estar liquidado al 100% 24 horas antes del sorteo.
              </span>
            </label>

            {/* Botón de envío dinámico singular / plural */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`${styles.submitBtn} ${!isFormValid ? styles.submitBtnDisabled : ''}`}
            >
              {selectedFolios.length === 0
                ? 'Selecciona al menos un boleto'
                : !isFormValid
                ? 'Completa los datos para continuar'
                : `${buttonMainText} (${selectedFolios.length} × $250 = $${totalPrice} MXN)`}
            </button>
          </form>
        </section>
      </div>

      {/* Columna Derecha: Moto y Reglas de la Rifa */}
      <aside className={styles.rulesSidebar}>
        {/* Foto de la Moto */}
        <div className={styles.motoCard}>
          <Image
            src="/moto.jpg"
            alt="Bajaj Pulsar N250 Modelo 2026 Amarilla"
            width={480}
            height={260}
            className={styles.motoImage}
          />
          <div className={styles.motoDetails}>
            <h2 className={styles.motoTitle}>Bajaj Pulsar N250</h2>
            <div className={styles.motoSub}>Modelo 2026 · Seminueva (+3,000 km)</div>
            <p style={{ fontSize: 12, color: '#889492', margin: '8px 0 0', lineHeight: 1.5 }}>
              Papeles en regla y factura original endosada. <strong>El trámite de placas y alta a nombre del nuevo propietario corre exclusivamente por cuenta y costo del ganador</strong> en León, Guanajuato.
            </p>
          </div>
        </div>

        {/* Bases y Reglas Formales y Legibles */}
        <div className={styles.rulesCard}>
          <div className={styles.rulesHeader}>
            <span style={{ fontSize: 20 }}>📜</span>
            <h3 className={styles.rulesTitle}>Bases y Reglas Oficiales</h3>
          </div>

          <div>
            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>✦</span>
              <div className={styles.ruleContent}>
                <strong>Premio Oficial:</strong> Motocicleta Bajaj Pulsar N250, modelo 2026, color amarillo, seminueva con poco más de 3,000 km. Documentación en regla lista para emplacar.
              </div>
            </div>

            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>✦</span>
              <div className={styles.ruleContent}>
                <strong>Participación:</strong> Emisión limitada de 200 boletos (folios 001 al 200). Cada boleto cuenta con <strong>5 números únicos de 3 cifras</strong> (del 000 al 999).
              </div>
            </div>

            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>✦</span>
              <div className={styles.ruleContent}>
                <strong>Fecha y Sorteo:</strong> Se llevará a cabo el <strong>12 de diciembre de 2026</strong> tomando como referencia las últimas 3 cifras del Primer Premio de la <strong>Lotería Nacional</strong>.
              </div>
            </div>

            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>✦</span>
              <div className={styles.ruleContent}>
                <strong>Plazo Límite de Liquidación:</strong> Todo boleto debe estar liquidado al 100% a más tardar <strong>24 horas antes del sorteo</strong> (11 de diciembre de 2026). Boletos con pagos no confirmados serán liberados.
              </div>
            </div>

            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>✦</span>
              <div className={styles.ruleContent}>
                <strong>Conciliación y Validación:</strong> Todo apartado queda en estado <em>Pendiente de Validación</em> hasta que el organizador confirme la recepción del pago vía SPEI o en efectivo.
              </div>
            </div>

            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>✦</span>
              <div className={styles.ruleContent}>
                <strong>Entrega del Vehículo y Trámites:</strong> Se entrega físicamente en León, Guanajuato con factura endosada a favor del ganador. <strong>El trámite de emplacamiento, cambio de propietario y pago de derechos vehiculares corren única y exclusivamente por cuenta del ganador</strong>.
              </div>
            </div>

            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>✦</span>
              <div className={styles.ruleContent}>
                <strong>Informes y Atención Oficial:</strong> Únicamente por mensaje de <strong>WhatsApp al 442 194 1930</strong> (No se reciben llamadas telefónicas).
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<p style={{ padding: 40, textAlign: 'center' }}>Cargando selección...</p>}>
      <CheckoutContent />
    </Suspense>
  );
}
