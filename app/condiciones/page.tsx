import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './condiciones.module.css';

export const metadata: Metadata = {
  title: 'Bases y Condiciones Generales | Rifa Entre Amigos 2026',
  description:
    'Reglamento oficial, mecánica de premiación con Lotería Nacional, entrega y condiciones de la Rifa de la motocicleta Bajaj Pulsar N250.',
};

export default function BasesYCondicionesPage() {
  return (
    <main className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.badge}>
          <span className={styles.badgeText}>
            Documento Oficial
          </span>
        </div>
        <h1 className={styles.title}>
          Bases y Condiciones Generales
        </h1>
        <p className={styles.subtitle}>
          Rifa Entre Amigos · Motocicleta Bajaj Pulsar N250 (Seminueva, mod. 2026).
        </p>
      </div>

      <div className={styles.sectionsList}>
        {/* 1. Objeto y Premio */}
        <section className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <span style={{ fontSize: 20 }}>🏍️</span>
            <h2 className={styles.sectionTitle}>
              1. Objeto y Descripción del Premio
            </h2>
          </div>
          <p className={styles.content}>
            El premio objeto del presente sorteo es una motocicleta <strong>Bajaj Pulsar N250</strong>, color amarillo con negro, modelo <strong>2026</strong>, en condición <strong>seminueva</strong> (+3,000 km recorridos comprobables). Se entrega con su factura original endosada a favor de la persona ganadora.
          </p>
        </section>

        {/* 2. Emisión y Cobertura */}
        <section className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <span style={{ fontSize: 20 }}>🎟️</span>
            <h2 className={styles.sectionTitle}>
              2. Emisión, Folios y Cobertura Matemática
            </h2>
          </div>
          <div className={styles.content}>
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
        <section className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <span style={{ fontSize: 20 }}>💰</span>
            <h2 className={styles.sectionTitle}>
              3. Costo del Boleto y Plazo Límite de Pago
            </h2>
          </div>
          <div className={styles.content}>
            <p style={{ margin: '0 0 10px' }}>
              El costo de aportación por cada boleto (folio) es de <strong>$250.00 MXN</strong> (doscientos cincuenta pesos mexicanos).
            </p>
            <p style={{ margin: 0 }}>
              <strong style={{ color: '#fde047' }}>Plazo perentorio de liquidación:</strong> Para que cualquier boleto apartado tenga derecho a participar en el sorteo, debe estar <strong>liquidado al 100%</strong> y verificado por la administración a más tardar <strong>24 horas antes del sorteo</strong> (es decir, el <strong>11 de diciembre de 2026 a las 20:00 hrs</strong>). Los boletos no liquidados en dicho plazo serán liberados y reasignados.
            </p>
          </div>
        </section>

        {/* 4. Sorteo de Referencia y Determinación del Ganador */}
        <section className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <span style={{ fontSize: 20 }}>🎰</span>
            <h2 className={styles.sectionTitle}>
              4. Sorteo Oficial de Referencia y Determinación del Ganador
            </h2>
          </div>
          <div className={styles.content}>
            <p style={{ margin: '0 0 10px' }}>
              La persona ganadora se determinará con base en los resultados del <strong>Sorteo Especial No. 319</strong> de la <strong>Lotería Nacional para la Asistencia Pública</strong> de México, a celebrarse el día <strong>sábado 12 de diciembre de 2026 a las 20:00 hrs</strong> (tiempo del centro de México).
            </p>
            <p style={{ margin: '0 0 10px' }}>
              <strong>Mecánica estricta de premiación:</strong>
            </p>
            <ul style={{ margin: '0 0 12px', paddingLeft: 24, color: '#8d9896' }}>
              <li>
                El boleto ganador será aquel que contenga entre sus 5 combinaciones asignadas las <strong>últimas 3 cifras</strong> del número premiado con el <strong>Premio Mayor</strong> de la Lotería Nacional.
              </li>
              <li>
                <em>Ejemplo demostrativo:</em> Si el número ganador del Premio Mayor de la Lotería Nacional resulta ser el <strong>34827</strong>, el número premiado de nuestra rifa será el <strong>827</strong>. El poseedor legítimo y verificado del folio que contenga el 827 será declarado ganador oficial.
              </li>
              <li>
                El sorteo es transparente y puede ser verificado en vivo a través de la transmisión pública oficial en el canal de YouTube de la Lotería Nacional y su pizarra electrónica oficial.
              </li>
            </ul>
          </div>
        </section>

        {/* 5. Regla de Pospuesta por Emisión Incompleta */}
        <section className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <span style={{ fontSize: 20 }}>⚠️</span>
            <h2 className={styles.sectionTitle}>
              5. Regla de Pospuesta por Porcentaje Mínimo de Emisión Vendida
            </h2>
          </div>
          <div className={styles.content}>
            <p style={{ margin: '0 0 10px' }}>
              Para garantizar la viabilidad y entrega efectiva del premio pactado, la rifa se encuentra <strong>sujeta a la venta y liquidación de al menos el 80% de los boletos emitidos (160 de 200 folios)</strong> antes del 11 de diciembre de 2026.
            </p>
            <p style={{ margin: 0 }}>
              En caso de no alcanzarse dicho porcentaje mínimo en la fecha fijada, el sorteo <strong>se pospondrá para el sorteo mayor inmediato posterior de la Lotería Nacional</strong>, notificando a todos los participantes registrados mediante WhatsApp y correo electrónico. <strong>Ningún boleto pagado pierde su validez ni sus números asignados</strong>.
            </p>
          </div>
        </section>

        {/* 6. Entrega del Premio y Requisitos */}
        <section className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <span style={{ fontSize: 20 }}>🏆</span>
            <h2 className={styles.sectionTitle}>
              6. Reclamación y Entrega del Premio
            </h2>
          </div>
          <div className={styles.content}>
            <p style={{ margin: '0 0 10px' }}>
              Para la entrega física y legal de la motocicleta, la persona ganadora deberá cumplir con los siguientes requisitos indispensables:
            </p>
            <ol style={{ margin: '0 0 12px', paddingLeft: 24, color: '#8d9896' }}>
              <li>Presentar <strong>identificación oficial vigente con fotografía</strong> (INE o Pasaporte mexicano).</li>
              <li>Presentar el <strong>comprobante oficial digital del boleto</strong> emitido en esta plataforma con su folio alfanumérico correspondiente.</li>
              <li>Acreditar la titularidad de la línea telefónica y/o comprobante bancario con el que se liquidó el boleto.</li>
            </ol>
            <p style={{ margin: 0 }}>
              La entrega se realizará de forma presencial acordando el punto con la persona ganadora. Los gastos de traslado fuera de la entidad organizadora o trámite de alta de placas correrán por cuenta de la persona ganadora.
            </p>
          </div>
        </section>

        {/* 7. Contacto y Aclaraciones */}
        <section className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <span style={{ fontSize: 20 }}>📱</span>
            <h2 className={styles.sectionTitle}>
              7. Atención y Canales Oficiales
            </h2>
          </div>
          <div className={styles.content}>
            <p style={{ margin: '0 0 16px' }}>
              Cualquier duda, solicitud de aclaración sobre folios o envío de comprobantes de pago debe canalizarse exclusivamente a través del canal oficial de atención al participante:
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/5217772151603?text=Hola,%20tengo%20una%20duda%20sobre%20las%20bases%20de%20la%20Rifa%20Entre%20Amigos"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#25D366',
                  color: '#000',
                  padding: '10px 18px',
                  borderRadius: 8,
                  fontWeight: 800,
                  fontSize: 14,
                  textDecoration: 'none',
                  minHeight: 44,
                }}
              >
                <span>💬</span> Contactar por WhatsApp Oficial
              </a>
              <Link
                href="/boletos"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#1f2526',
                  color: '#fff',
                  border: '1px solid #3d4a4c',
                  padding: '10px 18px',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: 'none',
                  minHeight: 44,
                }}
              >
                Ver Boletos Disponibles →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
