'use client';

import Link from 'next/link';
import { useState } from 'react';

const pricePerTicket = 250;

export default function TicketCalculator() {
  const [quantity, setQuantity] = useState(1);
  const total = quantity * pricePerTicket;

  return (
    <aside
      style={{
        background: 'linear-gradient(180deg, #1b2022 0%, #141718 100%)',
        border: '1px solid #2d383a',
        borderRadius: 18,
        padding: '28px 24px',
        boxShadow: '0 12px 36px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      aria-labelledby="calculator-title"
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ffd21a' }}>
            Calculadora Oficial
          </span>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 16,
              fontWeight: 900,
              background: '#0d1011',
              color: '#ffd21a',
              border: '1px solid #3d4a4d',
              padding: '2px 10px',
              borderRadius: 6,
            }}
          >
            {quantity} {quantity === 1 ? 'Folio' : 'Folios'}
          </span>
        </div>

        <h2 id="calculator-title" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 900, margin: '0 0 8px', color: '#fff', letterSpacing: '-0.02em' }}>
          Simula tus oportunidades
        </h2>
        <p style={{ color: '#8d9896', fontSize: 13, lineHeight: 1.5, margin: '0 0 20px' }}>
          Cada folio cuenta con <strong>5 números de 3 cifras</strong> válidos con el 1er premio de la Lotería Nacional.
        </p>

        {/* Range control estilizado */}
        <div style={{ marginBottom: 24, background: '#0e1213', padding: 16, borderRadius: 12, border: '1px solid #242f31' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#cfd8d6' }}>Cantidad de folios</span>
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#ffd21a',
                color: '#111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: 14,
              }}
            >
              {quantity}
            </span>
          </div>

          <input
            id="ticket-quantity"
            type="range"
            min="1"
            max="20"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{
              width: '100%',
              accentColor: '#ffd21a',
              cursor: 'pointer',
              height: 6,
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: '#687573', fontWeight: 600 }}>
            <span>1 folio (5 números)</span>
            <span>20 folios (100 números)</span>
          </div>
        </div>
      </div>

      <div>
        <div
          style={{
            background: 'rgba(255, 210, 26, 0.05)',
            border: '1px solid rgba(255, 210, 26, 0.2)',
            borderRadius: 14,
            padding: '16px 20px',
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <div>
            <span style={{ fontSize: 11, textTransform: 'uppercase', color: '#9ba4a2', fontWeight: 700, display: 'block' }}>
              Inversión total
            </span>
            <span style={{ fontSize: 12, color: '#ffd21a', fontWeight: 700 }}>
              {quantity * 5} números en juego
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <strong style={{ fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', fontFamily: 'monospace' }}>
              ${total.toLocaleString('es-MX')}
            </strong>
            <span style={{ fontSize: 12, color: '#7c8886', display: 'block' }}>MXN</span>
          </div>
        </div>

        <Link
          href="/boletos"
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
          <span>🎟️</span> Escoger mis boletos ahora →
        </Link>
      </div>
    </aside>
  );
}
