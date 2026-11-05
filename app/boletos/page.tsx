'use client';

import { useEffect, useState } from 'react';
import styles from './boletos.module.css';

type Ticket = {
  id: string;
  folio: number;
  state: 'available' | 'reserved' | 'reconciliation_hold' | 'paid' | 'blocked';
  ticket_numbers: { number: number }[];
};

export default function Boletos() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'empty' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTickets() {
      try {
        const response = await fetch('/api/tickets');
        const data = await response.json();

        if (!response.ok || data.error) {
          setError('Los folios todavía no se han publicado. Vuelve más tarde para consultar la emisión verificada.');
          setStatus('error');
          return;
        }

        setTickets(data.tickets);
        setStatus(data.tickets.length ? 'ready' : 'empty');
      } catch {
        setError('No fue posible consultar el inventario en este momento.');
        setStatus('error');
      }
    }

    void loadTickets();
  }, []);

  const visible = tickets.filter((ticket) => filter === 'all' || ticket.state === filter);

  function toggleTicket(ticketId: string) {
    setSelected((current) =>
      current.includes(ticketId) ? current.filter((id) => id !== ticketId) : [...current, ticketId],
    );
  }

  return (
    <main className={`${styles.page} ticket-page`}>
      <p className="route-label">Catálogo consultivo</p>
      <h1>Consulta los folios de la emisión.</h1>
      <p className="ticket-page-summary">
        Las ventas públicas todavía no están habilitadas. Aquí aparecerán los números una vez que se
        cotejen con los boletos físicos.
      </p>

      {status === 'loading' ? (
        <section className="inventory-state" aria-live="polite">
          <span className="inventory-spinner" aria-hidden="true" />
          <div>
            <h2>Consultando la emisión</h2>
            <p>Estamos verificando los folios disponibles.</p>
          </div>
        </section>
      ) : null}

      {status === 'empty' || status === 'error' ? (
        <section className="inventory-state inventory-empty" aria-live="polite">
          <span className="inventory-index" aria-hidden="true">000</span>
          <div>
            <h2>La emisión aún no está publicada</h2>
            <p>{error || 'Aún no hay folios verificados para mostrar.'}</p>
          </div>
        </section>
      ) : null}

      {status === 'ready' ? (
        <>
          <div className="toolbar">
            <span>{tickets.length} folios registrados</span>
            <label className="filter-control">
              <span>Mostrar</span>
              <select aria-label="Filtrar estado" value={filter} onChange={(event) => setFilter(event.target.value)}>
                <option value="all">Todos</option>
                <option value="available">Disponibles</option>
                <option value="reserved">Apartados</option>
                <option value="reconciliation_hold">En revisión</option>
                <option value="paid">Pagados</option>
              </select>
            </label>
          </div>

          {visible.length ? (
            <div className="ticket-grid">
              {visible.map((ticket) => (
                <button
                  key={ticket.id}
                  className={`ticket ${ticket.state}${selected.includes(ticket.id) ? ' selected' : ''}`}
                  disabled={ticket.state !== 'available'}
                  onClick={() => toggleTicket(ticket.id)}
                >
                  <strong>{String(ticket.folio).padStart(3, '0')}</strong>
                  <small>{ticket.state === 'available' ? 'Disponible' : ticket.state === 'paid' ? 'Pagado' : 'No disponible'}</small>
                  <span className="ticket-numbers">
                    {ticket.ticket_numbers.map((number) => String(number.number).padStart(3, '0')).join(' · ')}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <section className="inventory-state inventory-empty">
              <div>
                <h2>No hay folios con ese estado</h2>
                <p>Cambia el filtro para ver otros folios.</p>
              </div>
            </section>
          )}

          <div className="bottom">
            <div>
              {selected.length} seleccionados · <b>${selected.length * 250} MXN</b>
            </div>
            <button className="btn" disabled>
              Reservar próximamente
            </button>
          </div>
        </>
      ) : null}
    </main>
  );
}
