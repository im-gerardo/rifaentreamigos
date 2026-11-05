'use client';

import Image from 'next/image';
import { PointerEvent, useRef, useState } from 'react';
import styles from './moto-explorer.module.css';

const stops = [
  {
    id: 'premio',
    label: 'Premio',
    title: 'Bajaj Pulsar N250',
    description: 'Modelo 2026, color amarillo y condición seminueva.',
  },
  {
    id: 'emision',
    label: 'Emisión',
    title: '200 folios, 1,000 números',
    description: 'Cada folio tendrá cinco números distintos dentro del rango 000 a 999.',
  },
  {
    id: 'entrega',
    label: 'Entrega',
    title: 'León, Guanajuato',
    description: 'La entrega será en un lugar acordado. El cambio de propietario corresponde al ganador.',
  },
] as const;

export default function MotoExplorer() {
  const [activeId, setActiveId] = useState<(typeof stops)[number]['id']>('premio');
  const visualRef = useRef<HTMLDivElement>(null);
  const activeStop = stops.find((stop) => stop.id === activeId) ?? stops[0];

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const element = visualRef.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    element.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    element.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
  }

  return (
    <section className={styles.explorer} aria-label="Explora los datos confirmados de la rifa">
      <div
        className={styles.visual}
        ref={visualRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => visualRef.current?.style.removeProperty('--pointer-x')}
      >
        <Image
          src="/moto.jpg"
          width={1040}
          height={940}
          priority
          sizes="(max-width: 760px) 100vw, 54vw"
          alt="Motocicleta Bajaj Pulsar N250 amarilla, premio de Rifa Entre Amigos"
        />
        <span className={`${styles.hotspot} ${styles.hotspotOne}`} aria-hidden="true" />
        <span className={`${styles.hotspot} ${styles.hotspotTwo}`} aria-hidden="true" />
        <span className={`${styles.hotspot} ${styles.hotspotThree}`} aria-hidden="true" />
        <div className={styles.machineIndex} aria-hidden="true">N250</div>
        <p className={styles.hint}>Mueve el cursor sobre la moto</p>
      </div>

      <div className={styles.panel}>
        <div className={styles.tabs} role="tablist" aria-label="Datos de la rifa">
          {stops.map((stop) => (
            <button
              key={stop.id}
              type="button"
              role="tab"
              aria-selected={activeId === stop.id}
              className={activeId === stop.id ? styles.activeTab : undefined}
              onClick={() => setActiveId(stop.id)}
            >
              {stop.label}
            </button>
          ))}
        </div>
        <div className={styles.readout} role="tabpanel" aria-live="polite">
          <span>Dato confirmado</span>
          <strong>{activeStop.title}</strong>
          <p>{activeStop.description}</p>
        </div>
      </div>
    </section>
  );
}
