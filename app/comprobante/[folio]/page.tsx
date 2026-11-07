'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useTicketStore } from '@/lib/ticket-store';
import { getLetterFolio } from '@/lib/folio-letters';

export default function ComprobantePage({ params }: { params: Promise<{ folio: string }> }) {
  const resolvedParams = use(params);
  const folioNumber = parseInt(resolvedParams.folio, 10);
  const { getTicketByFolio } = useTicketStore();
  const ticket = getTicketByFolio(folioNumber);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  if (!ticket) {
    return (
      <main style={{ padding: '40px 16px', maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
        <h1>Boleto no encontrado</h1>
        <p style={{ color: '#888', marginTop: 12 }}>El folio #{resolvedParams.folio} no existe en la emisión oficial.</p>
        <p style={{ marginTop: 24 }}>
          <Link
            href="/boletos"
            style={{
              background: '#ffd21a',
              color: '#13140a',
              padding: '12px 20px',
              borderRadius: 8,
              fontWeight: 800,
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Ir a catálogo de boletos
          </Link>
        </p>
      </main>
    );
  }

  const letterFolio = getLetterFolio(ticket.folio);
  const isPaid = ticket.state === 'paid';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(currentUrl || `https://rifa-entre-amigos.com/comprobante/${ticket.folio}`)}`;

  const firstName = ticket.buyerName ? ticket.buyerName.trim().split(' ')[0] : 'Participante';
  const maskedPhone = ticket.phone
    ? ticket.phone.length === 10
      ? `${ticket.phone.slice(0, 3)} ••• •• ${ticket.phone.slice(-2)}`
      : '••• ••• ••••'
    : null;

  const whatsappMessage = encodeURIComponent(
    `Hola, tengo una consulta sobre mi boleto con Folio ${letterFolio} de la Rifa de la Pulsar N250.`,
  );

  return (
    <main style={{ padding: '32px 16px 80px', maxWidth: 480, margin: '0 auto' }}>
      <div style={{ marginBottom: 16 }}>
        <Link href="/boletos" style={{ color: '#8d9896', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
          ← Volver al catálogo de boletos
        </Link>
      </div>

      <div
        style={{
          background: '#141718',
          border: '1px solid #283233',
          borderRadius: 16,
          padding: 24,
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
        }}
      >
        <div style={{ textAlign: 'center', borderBottom: '1px solid #232829', paddingBottom: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#ffd21a', fontWeight: 800 }}>
            Rifa Entre Amigos 2026
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 900, margin: '6px 0', color: '#fff', letterSpacing: '-0.02em' }}>
            Comprobante de Boleto
          </h1>
          <div style={{ fontSize: 13, color: '#8d9896' }}>
            Premio: <strong style={{ color: '#d0d7d5' }}>Bajaj Pulsar N250 (Seminueva, mod. 2026)</strong>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <span style={{ fontSize: 11, color: '#7c8886', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Folio de Boleto
            </span>
            <div style={{ fontSize: 30, fontWeight: 900, color: '#ffd21a', letterSpacing: '0.04em', fontFamily: 'monospace' }}>
              {letterFolio}
            </div>
          </div>
          <div>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 12px',
                borderRadius: 9999,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                background: isPaid ? '#064e3b' : '#3d2e07',
                color: isPaid ? '#a7f3d0' : '#fde047',
                border: `1px solid ${isPaid ? '#059669' : '#ca8a04'}`,
              }}
            >
              {isPaid ? 'Boleto Liquidado' : 'Validación Pendiente'}
            </span>
          </div>
        </div>

        {/* Zona de números participantes */}
        <div style={{ marginBottom: 20, background: '#191f21', border: '1px solid #283436', padding: 16, borderRadius: 12 }}>
          <div style={{ fontSize: 11, color: '#ffd21a', marginBottom: 8, textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.04em' }}>
            Tus 5 Números Participantes en el Sorteo:
          </div>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 8 }}>
            {ticket.ticket_numbers?.map((n) => (
              <span
                key={n.number}
                style={{
                  background: '#0d1011',
                  border: '1px solid #334244',
                  padding: '8px 10px',
                  borderRadius: 6,
                  fontSize: 18,
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  color: '#fff',
                }}
              >
                {String(n.number).padStart(3, '0')}
              </span>
            ))}
          </div>
          <p style={{ margin: 0, fontSize: 11, color: '#889492', lineHeight: 1.4 }}>
            * Únicamente estos <strong>5 números</strong> juegan en el sorteo de la <strong>Lotería Nacional</strong>. El identificador <strong>{letterFolio}</strong> es exclusivamente la clave alfanumérica de tu boleto.
          </p>
        </div>

        {/* Datos protegidos */}
        {ticket.buyerName ? (
          <div style={{ marginBottom: 20, fontSize: 13, background: '#16191a', padding: 14, borderRadius: 10, border: '1px solid #232829' }}>
            <div style={{ color: '#7c8886', fontSize: 11, textTransform: 'uppercase', fontWeight: 700 }}>
              Titular Registrado (Privacidad Protegida):
            </div>
            <strong style={{ fontSize: 15, display: 'block', marginTop: 4, color: '#f3f5f3' }}>
              {firstName}
            </strong>
            {maskedPhone ? (
              <div style={{ color: '#aeb7b4', marginTop: 4, fontFamily: 'monospace', fontSize: 13 }}>
                Teléfono: {maskedPhone}
              </div>
            ) : null}
          </div>
        ) : null}

        {/* QR con marco nítido */}
        <div style={{ textAlign: 'center', marginBottom: 20, padding: 18, background: '#fff', borderRadius: 12, display: 'inline-block', width: '100%' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrUrl}
            alt={`QR Boleto ${letterFolio}`}
            width={160}
            height={160}
            style={{ display: 'block', margin: '0 auto' }}
          />
          <div style={{ color: '#1a1a1a', fontSize: 11, marginTop: 8, fontWeight: 700, letterSpacing: '0.04em' }}>
            Código QR de Autenticidad Oficial
          </div>
        </div>

        <div style={{ borderTop: '1px solid #232829', paddingTop: 16, fontSize: 12, color: '#889492', lineHeight: 1.5 }}>
          <div><strong>Sorteo oficial:</strong> 12 de Diciembre de 2026 (Lotería Nacional).</div>
          <div style={{ marginTop: 4 }}>
            <strong>Entrega:</strong> En León, Gto. Emplacamiento y cambio de placas a cargo del ganador.
          </div>
        </div>

        {/* BOTONES DE ACCIÓN: ALTO CONTRASTE */}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a
            href={`https://wa.me/524421941930?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: '#ffd21a',
              color: '#13140a',
              borderRadius: 10,
              padding: '13px',
              fontSize: 14,
              fontWeight: 900,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(255, 210, 26, 0.25)',
            }}
          >
            <span>💬</span> Contactar por WhatsApp (Solo mensajes)
          </a>

          {/* Botón de imprimir / guardar con estilo dark de alto contraste */}
          <button
            type="button"
            onClick={() => window.print()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: '#242d2f',
              color: '#f1f5f4',
              border: '1px solid #415053',
              borderRadius: 10,
              padding: '12px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <span>🖨️</span> Imprimir o Guardar Comprobante
          </button>
        </div>
      </div>
    </main>
  );
}
