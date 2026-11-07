'use client';

import { ReactNode } from 'react';
import { TicketStoreProvider } from '@/lib/ticket-store';
import { UserStoreProvider } from '@/lib/user-store';

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <TicketStoreProvider>
      <UserStoreProvider>{children}</UserStoreProvider>
    </TicketStoreProvider>
  );
}
