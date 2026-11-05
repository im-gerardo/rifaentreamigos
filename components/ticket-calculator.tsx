'use client';

import Link from 'next/link';
import { useState } from 'react';

const pricePerTicket = 250;

export default function TicketCalculator() {
  const [quantity, setQuantity] = useState(1);
  const total = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(quantity * pricePerTicket);

  return (
    <aside className="ticket-calculator" aria-labelledby="calculator-title">
      <div className="calculator-topline">
        <span>Calcula tu participación</span>
        <strong>{quantity.toString().padStart(2, '0')}</strong>
      </div>
      <h2 id="calculator-title">¿Cuántos folios te interesan?</h2>
      <p>Mueve el control para calcular el importe. Esto no crea una reservación.</p>

      <label className="range-label" htmlFor="ticket-quantity">
        <span>Folios</span>
        <output htmlFor="ticket-quantity">{quantity}</output>
      </label>
      <input
        id="ticket-quantity"
        className="ticket-range"
        type="range"
        min="1"
        max="20"
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      />

      <div className="calculator-total" aria-live="polite">
        <span>Importe estimado</span>
        <strong>{total}</strong>
        <small>{quantity * 5} números en total</small>
      </div>

      <Link className="catalog-link" href="/boletos">
        Ver el catálogo de folios
      </Link>
    </aside>
  );
}
