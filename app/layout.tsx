import type { Metadata } from 'next';
import { ClientProviders } from '@/components/client-providers';
import { NavHeader } from '@/components/nav-header';
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
            <NavHeader />
            {children}
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
