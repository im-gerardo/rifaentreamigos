import type { Metadata } from 'next';
import Link from 'next/link';
import { ClientProviders } from '@/components/client-providers';
import './globals.css';

const siteUrl = 'https://rifaentreamigos.ogba.space';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Rifa Entre Amigos | Bajaj Pulsar N250',
  description: 'Gran Rifa de una Motocicleta Bajaj Pulsar N250 mod. 2026. ¡Solo 200 boletos con 5 números de participación cada uno! Sorteo oficial con la Lotería Nacional del 12 de diciembre de 2026.',
  openGraph: {
    title: 'Rifa Entre Amigos | Bajaj Pulsar N250',
    description: 'Gran Rifa de una Bajaj Pulsar N250 mod. 2026. ¡Solo 200 boletos con 5 oportunidades de ganar! $250 MXN por boleto.',
    url: siteUrl,
    siteName: 'Rifa Entre Amigos',
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gran Rifa Entre Amigos - Motocicleta Bajaj Pulsar N250 Modelo 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rifa Entre Amigos | Bajaj Pulsar N250',
    description: 'Gran Rifa de una Bajaj Pulsar N250 mod. 2026. ¡200 boletos con 5 oportunidades de ganar! $250 MXN.',
    images: ['/og-image.jpg'],
  },
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
              <div className="navLinks">
                <Link href="/boletos">Boletos</Link>
                <Link href="/numeros">Números</Link>
                <Link href="/como-se-elige-al-ganador">¿Cómo se Gana?</Link>
                <Link href="/condiciones">Bases y Condiciones</Link>
              </div>
            </nav>
            {children}
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
