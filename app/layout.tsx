import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rifa Entre Amigos | Bajaj Pulsar N250',
  description: 'Consulta de boletos y administración de rifa',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX">
      <body>
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
      </body>
    </html>
  );
}
