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
  const [proofFileName, setProofFileName] = useState('');
  const [proofFileData, setProofFileData] = useState<string>('');
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
  const hasProof = Boolean(proofFileName || proofFileData);

  const isFormValid =
    selectedFolios.length > 0 &&
    buyerName.trim().length >= 3 &&
    cleanPhone.length >= 10 &&
    hasProof && // Comprobante obligatorio para el público
    termsAccepted;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofFileData(reader.result as string || file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasProof) {
      setError('Es obligatorio adjuntar la foto o captura de tu comprobante de pago/transferencia para apartar.');
      return;
    }
    if (!isFormValid) return;

    const res = reserveMultipleTickets({
      folios: selectedFolios,
      buyerName: buyerName.trim(),
      phone: cleanPhone,
      paymentMethod: 'transfer', // Exclusivo transferencia SPEI para el portal público
      proofFile: proofFileData || proofFileName,
      termsAccepted,
      markPaid: false, // Queda en validación de pago
    });

    if (!res.success) {
      setError(res.error || 'Ocurrió un error al reservar los boletos.');
      return;
    }

    setSuccessReserved(selectedFolios);
  };

  const isMultiple = selectedFolios.length > 1;
  const buttonMainText = isMultiple ? 'Apartar estos boletos' : 'Apartar este boleto';
  const totalPrice = selectedFolios.length * 250;

  if (successReserved) {
    const isMultipleSuccess = successReserved.length > 1;
    return (
      <main style={{ padding: '60px 16px', maxWidth: 540, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ background: '#132e22', border: '1px solid #235d45', borderRadius: 16, padding: '32px 24px', marginBottom: 24 }}>
          <div style={{ fontSize: 42, marginBottom: 12 }}>🎉</div>
          <h1 style={{ fontSize: 24, margin: '0 0 10px', color: '#6ee7b7' }}>
            {isMultipleSuccess ? '¡Comprobante Recibido y Boletos Apartados!' : '¡Comprobante Recibido y Boleto Apartado!'}
          </h1>
          <p style={{ color: '#d1fae5', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            {isMultipleSuccess ? 'Tus boletos con folio ' : 'Tu boleto con folio '}
            <strong>{successReserved.map((f) => getLetterFolio(f)).join(', ')}</strong>{' '}
            {isMultipleSuccess ? 'han quedado apartados con tu comprobante.' : 'ha quedado apartado con tu comprobante.'}
            <br />
            La administración verificará el ingreso en la cuenta para confirmarlo formalmente.
          </p>
        </div>

        <div style={{ background: '#1c2223', padding: 20, borderRadius: 12, marginBottom: 24, textAlign: 'left', fontSize: 13, border: '1px solid #282f30' }}>
          <div style={{ color: '#889492', marginBottom: 8, fontWeight: 700, textTransform: 'uppercase' }}>Resumen de Apartado:</div>
          <div style={{ padding: '4px 0' }}><strong>Total a liquidar:</strong> ${totalPrice} MXN ({successReserved.length} × $250)</div>
          <div style={{ padding: '4px 0' }}><strong>Comprador:</strong> {buyerName}</div>
          <div style={{ padding: '4px 0' }}><strong>WhatsApp:</strong> {phone}</div>
          <div style={{ padding: '4px 0' }}><strong>Comprobante adjuntado:</strong> {proofFileName || 'Archivo recibido ✓'}</div>
          <div style={{ marginTop: 10, padding: '8px 12px', background: '#252110', border: '1px solid #635017', borderRadius: 6, color: '#facc15' }}>
            Estado: <strong>Pendiente de conciliación bancaria</strong>
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
            <p className="route-label">Proceso de Selección y Apartado</p>
            <h1>{isMultiple ? 'Apartar estos boletos' : 'Apartar este boleto'}</h1>
            <div className={styles.priceTag}>
              $250 MXN por boleto · 5 oportunidades por cada boleto con Lotería Nacional
            </div>
          </div>

          {error ? (
            <div style={{ background: '#7f1d1d', color: '#fca5a5', padding: '12px 14px', borderRadius: 8, marginBottom: 20, fontSize: 13, border: '1px solid #dc2626' }}>
              ⚠️ {error}
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

                  return (
                    <button
                      key={t.folio}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => isAvailable && toggleFolioSelection(t.folio)}
                      title={!isAvailable ? `Folio ${getLetterFolio(t.folio)} (Vendido/Apartado)` : `Folio ${getLetterFolio(t.folio)}`}
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
                    Total a pagar: ${totalPrice} MXN
                  </div>
                </div>
              ) : null}
            </div>

            {/* Datos del Comprador */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="buyerName">
                2. Nombre completo (como se muestra en tu INE):
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
                3. Número de WhatsApp (10 dígitos):
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

            {/* Subida forzosa de comprobante */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>
                4. Comprobante de pago o transferencia SPEI <strong style={{ color: '#f87171' }}>(Obligatorio)</strong>:
              </label>
              <div
                style={{
                  background: '#191f21',
                  border: `1px solid ${hasProof ? '#059669' : '#ca8a04'}`,
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <label
                    style={{
                      background: '#ffd21a',
                      color: '#13140a',
                      padding: '10px 18px',
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <input
                      type="file"
                      required
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                    <span>📎 Subir Comprobante (Foto/PDF)</span>
                  </label>
                  <span
                    style={{
                      fontSize: 13,
                      color: hasProof ? '#4ade80' : '#cfd8d6',
                      fontWeight: hasProof ? 700 : 400,
                    }}
                  >
                    {proofFileName ? `✓ ${proofFileName}` : 'Ningún archivo seleccionado todavía'}
                  </span>
                </div>
                <p style={{ margin: '10px 0 0', fontSize: 12, color: '#8d9896', lineHeight: 1.5 }}>
                  Para apartar tus boletos a través de la web es obligatorio adjuntar la captura de tu transferencia o depósito bancario. La administración cotejará el ingreso en cuenta antes de aprobar.
                </p>
              </div>
            </div>

            {/* Check de términos y condiciones */}
            <label className={styles.termsCheckLabel} style={{ marginTop: 20 }}>
              <input
                type="checkbox"
                required
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span>
                He leído y acepto las{' '}
                <Link href="/condiciones" target="_blank" style={{ color: '#ffd21a', textDecoration: 'underline' }}>
                  bases y condiciones generales de la rifa
                </Link>
                , la fecha oficial del 12 de diciembre de 2026 y que el boleto debe estar liquidado al 100% 24 horas antes del sorteo.
              </span>
            </label>

            {/* Botón de envío dinámico */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`${styles.submitBtn} ${!isFormValid ? styles.submitBtnDisabled : ''}`}
            >
              {selectedFolios.length === 0
                ? 'Selecciona al menos un boleto'
                : !hasProof
                ? 'Sube tu comprobante para apartar'
                : !isFormValid
                ? 'Completa los campos requeridos'
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
                <strong>Premio Oficial:</strong> Motocicleta Bajaj Pulsar N250, modelo 2026, color amarillo, seminueva (+3,000 km). Factura original endosada al ganador.
              </div>
            </div>

            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>✦</span>
              <div className={styles.ruleContent}>
                <strong>Participación:</strong> Emisión de 200 folios únicos (series 1AAA y 2AAA). Cada boleto confiere <strong>5 números únicos de 3 cifras</strong> (cobertura total 000 al 999 sin duplicados).
              </div>
            </div>

            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>✦</span>
              <div className={styles.ruleContent}>
                <strong>Fecha y Sorteo:</strong> Se llevará a cabo el <strong>12 de diciembre de 2026</strong> en combinación con las últimas 3 cifras del Primer Premio de la <strong>Lotería Nacional</strong>.
              </div>
            </div>

            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>✦</span>
              <div className={styles.ruleContent}>
                <strong>Plazo Límite de Liquidación:</strong> Boletos liquidados al 100% a más tardar <strong>24 horas antes del sorteo</strong> (11 de diciembre de 2026 a las 20:00 hrs).
              </div>
            </div>

            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>✦</span>
              <div className={styles.ruleContent}>
                <strong>Entrega del Vehículo y Trámites:</strong> Se entrega físicamente en León, Guanajuato. <strong>Emplacamiento, alta vehicular y cambio de propietario a cargo del ganador</strong>.
              </div>
            </div>

            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>✦</span>
              <div className={styles.ruleContent}>
                <strong>Informes y Atención Oficial:</strong> Únicamente por mensaje de <strong>WhatsApp al 442 194 1930</strong> (No se reciben llamadas).
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
