import Link from 'next/link';
import MotoExplorer from '@/components/moto-explorer';
import TicketCalculator from '@/components/ticket-calculator';

const keyMetrics = [
  { value: '200', label: 'Folios en emisión', sub: '1AAA a 2ADV sin duplicados' },
  { value: '5', label: 'Oportunidades x boleto', sub: '5 números de 3 cifras' },
  { value: '$250', label: 'Precio por boleto', sub: 'Costo fijo en MXN' },
  { value: '12 Dic', label: 'Sorteo Oficial 2026', sub: 'Con Lotería Nacional' },
];

export default function Home() {
  return (
    <main className="landing" style={{ paddingBottom: 96, maxWidth: 1240, margin: '0 auto' }}>
      {/* HERO SECTION */}
      <section
        className="hero-machine"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'center',
          padding: '48px 0 64px',
        }}
        aria-labelledby="hero-title"
      >
        <div className="hero-copy" style={{ maxWidth: 580 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1c2223', border: '1px solid #313d3f', padding: '4px 12px', borderRadius: 9999, marginBottom: 20 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ffd21a' }}>
              Rifa Entre Amigos 2026
            </span>
          </div>

          <h1
            id="hero-title"
            style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
              margin: '0 0 20px',
              color: '#f4f6f4',
            }}
          >
            Tu próxima vuelta es en una <span style={{ color: '#ffd21a' }}>Pulsar N250</span>.
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
              color: '#8d9896',
              lineHeight: 1.6,
              margin: '0 0 28px',
            }}
          >
            Motocicleta Bajaj Pulsar N250 amarilla, seminueva (+3,000 km), papeles en regla y factura endosada a tu nombre. Entrega directa en León, Gto.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 24 }}>
            <Link
              href="/boletos"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                background: '#ffd21a',
                color: '#13140a',
                borderRadius: 10,
                padding: '14px 28px',
                fontSize: 15,
                fontWeight: 900,
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(255, 210, 26, 0.3)',
              }}
            >
              <span>🎟️</span> Escoger mi Boleto ($250 MXN)
            </Link>

            <a
              href="https://wa.me/524421941930?text=Hola,%20deseo%20informes%20de%20la%20Rifa%20de%20la%20Pulsar%20N250"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
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
              <span>💬</span> WhatsApp Informes
            </a>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 13,
              color: '#889492',
              borderTop: '1px solid #23292a',
              paddingTop: 16,
            }}
          >
            <span style={{ color: '#ffd21a', fontSize: 16 }}>🔒</span>
            <span>200 boletos únicos con 5 números de 3 dígitos (cobertura total 000 a 999).</span>
          </div>
        </div>

        <MotoExplorer />
      </section>

      {/* METRICS STRIP */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          margin: '32px 0 64px',
        }}
        aria-label="Cifras clave del sorteo"
      >
        {keyMetrics.map((m) => (
          <div
            key={m.label}
            style={{
              background: 'linear-gradient(180deg, #181c1d 0%, #121516 100%)',
              border: '1px solid #283233',
              borderRadius: 14,
              padding: '20px 22px',
            }}
          >
            <strong
              style={{
                fontSize: 34,
                fontWeight: 900,
                color: '#ffd21a',
                display: 'block',
                lineHeight: 1,
                fontFamily: 'monospace',
                letterSpacing: '-0.03em',
              }}
            >
              {m.value}
            </strong>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#f3f5f3', display: 'block', marginTop: 8 }}>
              {m.label}
            </span>
            <span style={{ fontSize: 12, color: '#7c8886', display: 'block', marginTop: 2 }}>
              {m.sub}
            </span>
          </div>
        ))}
      </section>

      {/* DETALLES DEL PREMIO Y CALCULADORA */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 32,
          alignItems: 'start',
          margin: '64px 0',
        }}
      >
        <article
          style={{
            background: 'linear-gradient(180deg, #1b2021 0%, #141718 100%)',
            border: '1px solid #283233',
            borderRadius: 18,
            padding: '32px',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffd21a', marginBottom: 8 }}>
            Especificaciones y Garantías
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, color: '#fff', margin: '0 0 16px', letterSpacing: '-0.03em' }}>
            Una máquina lista para rodar.
          </h2>
          <p style={{ color: '#8d9896', fontSize: 14, lineHeight: 1.6, margin: '0 0 24px' }}>
            La motocicleta se entregará físicamente en León, Guanajuato en un punto céntrico acordado. Se entrega con factura original endosada a favor de la persona ganadora.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 16,
              background: '#0e1213',
              padding: 20,
              borderRadius: 12,
              border: '1px solid #252e30',
              marginBottom: 24,
            }}
          >
            <div>
              <div style={{ fontSize: 11, textTransform: 'uppercase', color: '#7c8886', fontWeight: 700 }}>Modelo</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginTop: 2 }}>2026 (Seminueva)</div>
            </div>
            <div>
              <div style={{ fontSize: 11, textTransform: 'uppercase', color: '#7c8886', fontWeight: 700 }}>Kilometraje</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#ffd21a', marginTop: 2 }}>+3,000 km</div>
            </div>
            <div>
              <div style={{ fontSize: 11, textTransform: 'uppercase', color: '#7c8886', fontWeight: 700 }}>Documentación</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#4ade80', marginTop: 2 }}>Factura endosada</div>
            </div>
          </div>

          <div style={{ background: 'rgba(250, 204, 21, 0.08)', border: '1px solid rgba(250, 204, 21, 0.25)', padding: '14px 16px', borderRadius: 10 }}>
            <span style={{ fontSize: 12, color: '#fde047', lineHeight: 1.5, display: 'block' }}>
              ⚠️ <strong>Trámite vehicular:</strong> Los costos y gestiones de alta de placas, cambio de propietario y tarjeta de circulación corren exclusivamente por cuenta del ganador.
            </span>
          </div>
        </article>

        <TicketCalculator />
      </section>

      {/* PREGUNTAS FRECUENTES Y REGLAS */}
      <section style={{ margin: '80px 0', borderTop: '1px solid #232829', paddingTop: 64 }}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
          <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ffd21a' }}>
            Transparencia Total
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, color: '#fff', margin: '8px 0 12px', letterSpacing: '-0.03em' }}>
            Bases formales del sorteo
          </h2>
          <p style={{ color: '#8d9896', fontSize: 14 }}>
            Todo lo que necesitas saber antes y después de apartar tus folios.
          </p>
        </div>

        <div style={{ maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <details
            open
            style={{
              background: '#15191a',
              border: '1px solid #283234',
              borderRadius: 12,
              padding: '18px 24px',
            }}
          >
            <summary style={{ fontSize: 16, fontWeight: 800, color: '#f4f6f4', cursor: 'pointer' }}>
              ¿Cómo se determina al ganador?
            </summary>
            <p style={{ color: '#8d9896', fontSize: 14, lineHeight: 1.6, margin: '14px 0 0' }}>
              El sorteo se realizará el <strong>12 de diciembre de 2026</strong> en combinación directa con el <strong>Premio Mayor de la Lotería Nacional</strong> (tomando las últimas tres cifras). Como cada uno de los 200 folios cuenta con 5 números únicos, se garantiza una cobertura matemática del 100% de los números del 000 al 999 sin colisiones ni números desiertos.
            </p>
          </details>

          <details
            style={{
              background: '#15191a',
              border: '1px solid #283234',
              borderRadius: 12,
              padding: '18px 24px',
            }}
          >
            <summary style={{ fontSize: 16, fontWeight: 800, color: '#f4f6f4', cursor: 'pointer' }}>
              ¿Cuál es la fecha límite para liquidar los boletos apartados?
            </summary>
            <p style={{ color: '#8d9896', fontSize: 14, lineHeight: 1.6, margin: '14px 0 0' }}>
              Para tener derecho al premio, el boleto debe estar liquidado al 100% a más tardar <strong>24 horas antes del sorteo</strong> (11 de diciembre de 2026 a las 20:00 hrs). Los boletos no liquidados serán liberados para venta inmediata.
            </p>
          </details>

          <details
            style={{
              background: '#15191a',
              border: '1px solid #283234',
              borderRadius: 12,
              padding: '18px 24px',
            }}
          >
            <summary style={{ fontSize: 16, fontWeight: 800, color: '#f4f6f4', cursor: 'pointer' }}>
              ¿Cómo recibo mi comprobante de participación?
            </summary>
            <p style={{ color: '#8d9896', fontSize: 14, lineHeight: 1.6, margin: '14px 0 0' }}>
              Una vez realizado tu apartado o pago, se genera un comprobante digital oficial con tu <strong>Folio Alfanumérico</strong>, tus <strong>5 números asignados</strong>, tus datos protegidos y un código QR de autenticidad verificable.
            </p>
          </details>
        </div>
      </section>

      {/* BANDA DE CONTACTO DIRECTO */}
      <section
        style={{
          background: 'linear-gradient(180deg, #1b2021 0%, #121516 100%)',
          border: '1px solid #283233',
          borderRadius: 20,
          padding: '36px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 24,
        }}
      >
        <div>
          <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ffd21a' }}>
            Atención Personalizada
          </span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: '#fff', margin: '6px 0 8px', letterSpacing: '-0.02em' }}>
            ¿Dudas o apartado directo?
          </h2>
          <p style={{ color: '#8d9896', fontSize: 14, margin: 0 }}>
            Escríbenos directamente por WhatsApp. Únicamente respondemos mensajes (no se reciben llamadas).
          </p>
        </div>

        <a
          href="https://wa.me/524421941930?text=Hola,%20deseo%20informes%20de%20la%20Rifa%20de%20la%20Pulsar%20N250"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            background: '#ffd21a',
            color: '#13140a',
            borderRadius: 12,
            padding: '16px 28px',
            fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
            fontWeight: 900,
            textDecoration: 'none',
            fontFamily: 'monospace',
            boxShadow: '0 6px 20px rgba(255, 210, 26, 0.3)',
          }}
        >
          <span>💬</span> 442 194 1930
        </a>
      </section>
    </main>
  );
}
