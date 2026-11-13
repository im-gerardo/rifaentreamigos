import fs from 'fs';
import path from 'path';

export default function ImprimirPage() {
  return (
    <div style={{ padding: '24px 16px', background: '#0d1117', minHeight: '100vh', color: '#fff' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#ffd21a', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Emisión Oficial Para Imprenta
          </span>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#fff', margin: '4px 0 0' }}>
            Planilla de Boletos (200 Boletos)
          </h1>
          <p style={{ margin: '4px 0 0', color: '#8d9896', fontSize: 13 }}>
            50 Hojas tamaño Carta (4 boletos por hoja • Frente y Reverso alineados)
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <a
            href="/boletos-oficiales-200.pdf"
            download="boletos-oficiales-200.pdf"
            target="_blank"
            rel="noreferrer"
            style={{
              background: '#ffd21a',
              color: '#000',
              padding: '12px 20px',
              borderRadius: 8,
              fontWeight: 900,
              fontSize: 14,
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(255, 210, 26, 0.3)',
            }}
          >
            📥 Descargar PDF Completo (47 MB)
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 1040, margin: '0 auto', background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.6)' }}>
        <iframe
          src="/boletos-print-temp.html"
          style={{ width: '100%', height: '82vh', border: 'none' }}
          title="Vista Previa de Boletos"
        />
      </div>
    </div>
  );
}
