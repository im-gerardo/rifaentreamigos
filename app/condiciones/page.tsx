import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bases y Condiciones Generales | Rifa Entre Amigos 2026',
  description:
    'Reglamento oficial, mecánica de premiación con Lotería Nacional, entrega y condiciones de la Rifa de la motocicleta Bajaj Pulsar N250.',
};

export default function BasesYCondicionesPage() {
  return (
    <main style={{ padding: '32px 0 96px', maxWidth: 880, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32, borderBottom: '1px solid #283233', paddingBottom: 24 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#191f20', border: '1px solid #2b3536', padding: '4px 12px', borderRadius: 9999, marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ffd21a' }}>
            Documento Oficial
          </span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 10px', color: '#f4f6f4' }}>
          Bases y Condiciones Generales
        </h1>
        <p style={{ color: '#8d9896', fontSize: 15, margin: 0, lineHeight: 1.5 }}>
          Rifa Entre Amigos · Motocicleta Bajaj Pulsar N250 (Seminueva, mod. 2026).
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* 1. Objeto y Premio */}
        <section
          style={{
            background: 'linear-gradient(180deg, #181c1d 0%, #131617 100%)',
            border: '1px solid #262e30',
            borderRadius: 14,
            padding: '24px 28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 20 }}>🏍️</span>
            <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: '#ffd21a' }}>
              1. Objeto y Descripción del Premio
            </h2>
          </div>
          <p style={{ color: '#c7d0ce', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            El premio objeto del presente sorteo es una motocicleta <strong>Bajaj Pulsar N250</strong>, color amarillo con negro, modelo <strong>2026</strong>, en condición <strong>seminueva</strong> (+3,000 km recorridos comprobables). Se entrega con su factura original endosada a favor de la persona ganadora.
          </p>
        </section>

        {/* 2. Emisión y Cobertura */}
        <section
          style={{
            background: 'linear-gradient(180deg, #181c1d 0%, #131617 100%)',
            border: '1px solid #262e30',
            borderRadius: 14,
            padding: '24px 28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 20 }}>🎟️</span>
            <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: '#ffd21a' }}>
              2. Emisión, Folios y Cobertura Matemática
            </h2>
          </div>
          <div style={{ color: '#c7d0ce', fontSize: 14, lineHeight: 1.7 }}>
            <p style={{ margin: '0 0 10px' }}>
              La emisión oficial está conformada por <strong>200 folios alfanuméricos únicos</strong> organizados en dos series:
            </p>
            <ul style={{ margin: '0 0 12px', paddingLeft: 24, color: '#8d9896' }}>
              <li><strong style={{ color: '#fff' }}>Serie 1:</strong> del folio <strong>1AAA</strong> al <strong>1ADV</strong> (primeros 100 boletos).</li>
              <li><strong style={{ color: '#fff' }}>Serie 2:</strong> del folio <strong>2AAA</strong> al <strong>2ADV</strong> (siguientes 100 boletos).</li>
            </ul>
            <p style={{ margin: 0 }}>
              Cada folio confiere <strong>5 números de 3 cifras</strong> para participar. La asignación cubre exactamente el universo de combinaciones del <strong>000 al 999</strong> (1,000 números en total), garantizando cero colisiones y que no habrá números desiertos en el sorteo.
            </p>
          </div>
        </section>

        {/* 3. Costo y Plazos */}
        <section
          style={{
            background: 'linear-gradient(180deg, #181c1d 0%, #131617 100%)',
            border: '1px solid #262e30',
            borderRadius: 14,
            padding: '24px 28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 20 }}>💰</span>
            <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: '#ffd21a' }}>
              3. Costo del Boleto y Plazo Límite de Pago
            </h2>
          </div>
          <div style={{ color: '#c7d0ce', fontSize: 14, lineHeight: 1.7 }}>
            <p style={{ margin: '0 0 10px' }}>
              El costo de aportación por cada boleto (folio) es de <strong>$250.00 MXN</strong> (doscientos cincuenta pesos mexicanos).
            </p>
            <p style={{ margin: 0 }}>
              <strong style={{ color: '#fde047' }}>Plazo perentorio de liquidación:</strong> Para que cualquier boleto apartado tenga derecho a participar en el sorteo, debe estar <strong>liquidado al 100%</strong> y verificado por la administración a más tardar <strong>24 horas antes del sorteo</strong> (es decir, el <strong>11 de diciembre de 2026 a las 20:00 hrs</strong>). Los boletos no liquidados en dicho plazo serán liberados y reasignados.
            </p>
          </div>
        </section>

        {/* 4. Mecánica del Sorteo */}
        <section
          style={{
            background: 'linear-gradient(180deg, #181c1d 0%, #131617 100%)',
            border: '1px solid #262e30',
            borderRadius: 14,
            padding: '24px 28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 20 }}>🎰</span>
            <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: '#ffd21a' }}>
              4. Determinación del Ganador (Lotería Nacional)
            </h2>
          </div>
          <p style={{ color: '#c7d0ce', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            El sorteo se celebrará el día <strong>12 de diciembre de 2026</strong>. El número ganador se determinará de forma pública e inapelable en combinación con las <strong>últimas 3 cifras del Primer Premio (Premio Mayor)</strong> del sorteo oficial de la <strong>Lotería Nacional</strong> celebrado en dicha fecha.
          </p>
        </section>

        {/* 5. Entrega y Trámites */}
        <section
          style={{
            background: 'linear-gradient(180deg, #181c1d 0%, #131617 100%)',
            border: '1px solid #262e30',
            borderRadius: 14,
            padding: '24px 28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 20 }}>📍</span>
            <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: '#ffd21a' }}>
              5. Lugar de Entrega y Trámites Vehiculares
            </h2>
          </div>
          <div style={{ color: '#c7d0ce', fontSize: 14, lineHeight: 1.7 }}>
            <p style={{ margin: '0 0 10px' }}>
              La entrega física de la motocicleta se llevará a cabo en la ciudad de <strong>León, Guanajuato</strong>, en un punto público y seguro previamente acordado con el ganador.
            </p>
            <div style={{ background: 'rgba(250, 204, 21, 0.08)', border: '1px solid rgba(250, 204, 21, 0.25)', padding: '14px 16px', borderRadius: 8, marginTop: 12 }}>
              <span style={{ fontSize: 13, color: '#fde047', lineHeight: 1.5, display: 'block' }}>
                ⚠️ <strong>Cláusula vehicular indispensable:</strong> Los gastos, pagos de derechos, alta de placas nuevas, cambio de propietario y tarjeta de circulación ante las autoridades de tránsito corren exclusivamente por cuenta y costo de la persona ganadora.
              </span>
            </div>
          </div>
        </section>

        {/* 6. Contacto y Aclaraciones */}
        <section
          style={{
            background: 'linear-gradient(180deg, #181c1d 0%, #131617 100%)',
            border: '1px solid #262e30',
            borderRadius: 14,
            padding: '24px 28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 20 }}>💬</span>
            <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: '#ffd21a' }}>
              6. Canal Único de Atención y Aclaraciones
            </h2>
          </div>
          <p style={{ color: '#c7d0ce', fontSize: 14, lineHeight: 1.7, margin: '0 0 14px' }}>
            Para dudas sobre reservaciones, comprobantes de pago o estatus de folios, el único canal oficial de atención es vía mensaje de WhatsApp al número <strong>442 194 1930</strong>.
          </p>
          <p style={{ color: '#8d9896', fontSize: 13, margin: 0 }}>
            * No se atienden llamadas telefónicas para mantener registro escrito y trazabilidad de cada consulta.
          </p>
        </section>
      </div>

      {/* CTA inferior */}
      <div style={{ marginTop: 40, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
        <Link
          href="/boletos"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#ffd21a',
            color: '#13140a',
            borderRadius: 10,
            padding: '14px 28px',
            fontSize: 14,
            fontWeight: 900,
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(255, 210, 26, 0.25)',
          }}
        >
          <span>🎟️</span> Ir a Elegir Boletos ($250 MXN)
        </Link>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: '#191f21',
            color: '#d0d7d5',
            border: '1px solid #334042',
            borderRadius: 10,
            padding: '14px 22px',
            fontSize: 14,
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Volver a la Página Principal
        </Link>
      </div>
    </main>
  );
}
