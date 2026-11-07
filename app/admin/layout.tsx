import { redirect } from 'next/navigation';
import { requireRole } from '@/lib/auth';
import { LogoutButton } from '@/components/auth/logout-button';
import type { ReactNode } from 'react';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  try {
    await requireRole(['admin', 'seller']);
  } catch {
    redirect('/iniciar-sesion?reason=access_denied');
  }

  return (
    <div className="admin-layout">
      <header className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <strong>Acceso de equipo</strong>
        <LogoutButton />
      </header>
      {children}
    </div>
  );
}
