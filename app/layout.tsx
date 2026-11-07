import type { Metadata } from 'next';
import Link from 'next/link';
import { ClientProviders } from '@/components/client-providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rifa Entre Amigos | Bajaj Pulsar N250',
  description: 'Consulta de boletos y administración de rifa',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX">
      <body>
        <ClientProviders>
          <div className="wrap">
            <nav className="nav" aria-label="Navegación principal">
              <Link href="/" className="brand">
                RIFA <span>ENTRE AMIGOS</span>
              </Link>
              <div>
                <Link href="/boletos">Boletos</Link>
                <Link href="/admin">Administración</Link>
              </div>
            </nav>
            {children}
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
