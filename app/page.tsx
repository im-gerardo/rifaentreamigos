import Link from 'next/link';
import MotoExplorer from '@/components/moto-explorer';
import TicketCalculator from '@/components/ticket-calculator';

const facts = [
  ['200', 'folios en esta emisión'],
  ['5', 'números por boleto'],
  ['$250', 'precio por boleto'],
  ['20 nov.', 'fecha prevista de sorteo'],
];

export default function Home() {
  return (
    <main className="landing">
      <section className="hero-machine" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="route-label">Rifa Entre Amigos, edición prevista 2026</p>
          <h1 id="hero-title">La siguiente vuelta puede ser en una Pulsar N250.</h1>
          <p className="hero-summary">
            Bajaj Pulsar N250 amarilla, modelo 2026 y seminueva. La rifa está en preparación mientras
            se completan las bases y la autorización correspondiente.
          </p>

          <div className="hero-actions">
            <Link className="btn btn-primary" href="/boletos">
              Consultar los folios
            </Link>
            <a className="btn btn-quiet" href="tel:+524772879564">
              Llamar para informes
            </a>
          </div>

          <p className="sales-lock" role="status">
            <span aria-hidden="true">●</span> Ventas públicas deshabilitadas durante la preparación.
          </p>
        </div>

        <MotoExplorer />
      </section>

      <section className="fact-strip" aria-label="Datos principales de la emisión">
        {facts.map(([value, label]) => (
          <div className="fact" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="landing-grid">
        <article className="prize-note">
          <p className="route-label">El premio</p>
          <h2>Una moto para usarla, no para verla guardada.</h2>
          <p>
            Se entregará en León, Guanajuato, en un lugar acordado. La factura será endosada y el
            cambio de propietario corresponde a quien resulte ganador.
          </p>
          <dl className="spec-list">
            <div>
              <dt>Condición</dt>
              <dd>Seminueva</dd>
            </div>
            <div>
              <dt>Kilometraje</dt>
              <dd>Por confirmar</dd>
            </div>
            <div>
              <dt>Documentación</dt>
              <dd>Se verificará antes de publicar</dd>
            </div>
          </dl>
        </article>

        <TicketCalculator />
      </section>

      <section className="details-section" aria-labelledby="details-title">
        <div>
          <p className="route-label">Antes de participar</p>
          <h2 id="details-title">Información clara antes de abrir la rifa.</h2>
        </div>
        <div className="detail-list">
          <details open>
            <summary>¿Cómo está planeada la emisión?</summary>
            <p>
              Son 200 folios. Cada uno tendrá cinco números distintos dentro del rango 000 a 999. La
              correspondencia final se cotejará con los boletos físicos antes de publicarse.
            </p>
          </details>
          <details>
            <summary>¿Cuándo será el sorteo?</summary>
            <p>
              La fecha propuesta es el 20 de noviembre de 2026. La mecánica y la fecha definitiva se
              publicarán únicamente al contar con las bases autorizadas.
            </p>
          </details>
          <details>
            <summary>¿Puedo apartar o pagar ahora?</summary>
            <p>
              No. El catálogo es consultivo mientras se completa la preparación legal y operativa. No
              se solicitan transferencias desde este sitio.
            </p>
          </details>
        </div>
      </section>

      <section className="contact-band">
        <div>
          <p className="route-label">Informes</p>
          <h2>¿Tienes una duda concreta?</h2>
        </div>
        <a href="tel:+524772879564" className="phone-link" aria-label="Llamar al 477 287 9564">
          477 287 9564
        </a>
      </section>
    </main>
  );
}
