import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import manifest from '@/public/tickets-manifest.json';

export type TicketState = 'available' | 'reserved' | 'paid' | 'reconciliation_hold' | 'blocked';

export type TicketItem = {
  id: string;
  folio: number;
  state: TicketState;
  ticket_numbers: { number: number }[];
  buyerName?: string;
  phone?: string;
  paymentMethod?: 'cash' | 'transfer';
  proofFile?: string; // Nombre del archivo o data URL
  termsAccepted?: boolean;
  updatedAt?: string;
};

type ReserveInput = {
  folios: number[];
  buyerName: string;
  phone: string;
  paymentMethod: 'cash' | 'transfer';
  proofFile?: string;
  termsAccepted?: boolean;
  markPaid?: boolean;
};

type TicketStoreContextType = {
  tickets: TicketItem[];
  reserveMultipleTickets: (data: ReserveInput) => { success: boolean; error?: string };
  reserveTicket: (folio: number, data: Omit<ReserveInput, 'folios'>) => { success: boolean; error?: string };
  markAsPaid: (folio: number) => { success: boolean; error?: string };
  releaseTicket: (folio: number) => { success: boolean; error?: string };
  getTicketByFolio: (folio: number) => TicketItem | undefined;
};

const TicketStoreContext = createContext<TicketStoreContextType | null>(null);

const STORAGE_KEY = 'rifa_tickets_store_v2';

export function TicketStoreProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<TicketItem[]>(() => {
    return manifest.tickets.map((t) => {
      const folioInt = parseInt(t.folio, 10);
      const isSold = folioInt === 3 || folioInt === 7;
      return {
        id: `ticket-${t.folio}`,
        folio: folioInt,
        state: (isSold ? 'paid' : 'available') as TicketState, // Vendido y liquidado
        ticket_numbers: t.numbers.map((n) => ({ number: parseInt(n, 10) })),
        buyerName: isSold ? (folioInt === 3 ? 'Carlos Mendoza' : 'Mariana López') : undefined,
        phone: isSold ? '4421941930' : undefined,
        paymentMethod: isSold ? 'transfer' : undefined,
        termsAccepted: isSold ? true : undefined,
        updatedAt: isSold ? new Date().toISOString() : undefined,
      };
    });
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === manifest.tickets.length) {
          setTickets(parsed);
        }
      }
    } catch (e) {
      console.error('Error al cargar tickets locales:', e);
    }
  }, []);

  const saveState = (updated: TicketItem[]) => {
    setTickets(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error al guardar tickets locales:', e);
    }
  };

  const reserveMultipleTickets = (data: ReserveInput) => {
    const foliosToReserve = data.folios;
    if (foliosToReserve.length === 0) return { success: false, error: 'No seleccionaste ningún boleto.' };

    for (const f of foliosToReserve) {
      const t = tickets.find((item) => item.folio === f);
      if (!t || t.state !== 'available') {
        return { success: false, error: `El boleto #${String(f).padStart(3, '0')} ya no está disponible.` };
      }
    }

    const nextState: TicketState = data.markPaid ? 'paid' : 'reconciliation_hold'; // Queda en validación de pago por defecto

    const updated = tickets.map((t) => {
      if (foliosToReserve.includes(t.folio)) {
        return {
          ...t,
          state: nextState,
          buyerName: data.buyerName.trim(),
          phone: data.phone.trim(),
          paymentMethod: data.paymentMethod,
          proofFile: data.proofFile,
          termsAccepted: data.termsAccepted,
          updatedAt: new Date().toISOString(),
        };
      }
      return t;
    });

    saveState(updated);
    return { success: true };
  };

  const reserveTicket = (folio: number, data: Omit<ReserveInput, 'folios'>) => {
    return reserveMultipleTickets({ ...data, folios: [folio] });
  };

  const markAsPaid = (folio: number) => {
    const target = tickets.find((t) => t.folio === folio);
    if (!target) return { success: false, error: 'Boleto no encontrado.' };

    const updated = tickets.map((t) => {
      if (t.folio === folio) {
        return {
          ...t,
          state: 'paid' as TicketState,
          updatedAt: new Date().toISOString(),
        };
      }
      return t;
    });

    saveState(updated);
    return { success: true };
  };

  const releaseTicket = (folio: number) => {
    const updated = tickets.map((t) => {
      if (t.folio === folio) {
        return {
          ...t,
          state: 'available' as TicketState,
          buyerName: undefined,
          phone: undefined,
          paymentMethod: undefined,
          proofFile: undefined,
          termsAccepted: undefined,
          updatedAt: new Date().toISOString(),
        };
      }
      return t;
    });

    saveState(updated);
    return { success: true };
  };

  const getTicketByFolio = (folio: number) => tickets.find((t) => t.folio === folio);

  return (
    <TicketStoreContext.Provider
      value={{
        tickets,
        reserveMultipleTickets,
        reserveTicket,
        markAsPaid,
        releaseTicket,
        getTicketByFolio,
      }}
    >
      {children}
    </TicketStoreContext.Provider>
  );
}

export function useTicketStore() {
  const ctx = useContext(TicketStoreContext);
  if (!ctx) {
    throw new Error('useTicketStore debe ser usado dentro de TicketStoreProvider');
  }
  return ctx;
}
