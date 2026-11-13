import { requireRole } from '@/lib/auth';
import Link from 'next/link';

export default async function Admin() {
  let actor: Awaited<ReturnType<typeof requireRole>>;
  try {
    actor = await requireRole(['admin', 'seller']);
  } catch {
    return (
      <main style={{ padding: '40px 0' }}>
        <h1>Administración</h1>
        <p>Acceso restringido.</p>
      </main>
    );
  }

  const isAdmin = actor.role === 'admin';

  return (
    <main style={{ padding: '32px 0 80px', maxWidth: 1200, margin: '0 auto' }}>
      {/* HEADER SUPERIOR */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 20,
          marginBottom: 36,
          paddingBottom: 24,
          borderBottom: '1px solid #232829',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#ffd21a',
              }}
            >
              Panel de Control
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                background: '#191f20',
                color: '#9ba4a2',
                padding: '3px 10px',
                borderRadius: 9999,
                border: '1px solid #2b3536',
              }}
            >
              {isAdmin ? 'Administrador General' : 'Vendedor Autorizado'}
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              margin: '0 0 8px',
              color: '#f4f6f4',
            }}
          >
            Administración de la Rifa
          </h1>
          <p style={{ color: '#8d9896', margin: 0, fontSize: 14 }}>
            Sesión activa como: <strong style={{ color: '#d0d7d5' }}>{actor.user.email}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link
            href="/como-se-elige-al-ganador"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#242b1a',
              color: '#ffd21a',
              border: '1px solid #5a4b16',
              borderRadius: 10,
              padding: '11px 18px',
              fontSize: 13,
              fontWeight: 800,
              textDecoration: 'none',
              transition: 'background 0.15s ease',
            }}
          >
            🎯 Explicar al Cliente (Simulador)
          </Link>
          <Link
            href="/boletos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#191e1f',
              color: '#d0d7d5',
              border: '1px solid #313d3e',
              borderRadius: 10,
              padding: '11px 18px',
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'background 0.15s ease',
            }}
          >
            🌐 Ver Sitio Público
          </Link>
        </div>
      </div>

      {/* GRID DE MÓDULOS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
        }}
      >
        {/* 1. Gestión de Boletos */}
        <div
          style={{
            background: 'linear-gradient(180deg, #1b2021 0%, #151819 100%)',
            border: '1px solid #283233',
            borderRadius: 16,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'border-color 0.2s ease, transform 0.2s ease',
          }}
        >
          <div>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: '#242b26',
                border: '1px solid #33443a',
                color: '#ffd21a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                marginBottom: 16,
              }}
            >
              🎟️
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 8px', color: '#f4f6f4' }}>
              Gestión de Boletos
            </h2>
            <p style={{ fontSize: 13, color: '#8d9896', lineHeight: 1.5, margin: '0 0 24px' }}>
              Supervisa el inventario de 200 folios alfabéticos (1AAA a 2ADV), registra ventas presenciales en efectivo o transferencia y descarga el listado oficial para imprenta.
            </p>
          </div>

          <Link
            href="/admin/boletos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: '#ffd21a',
              color: '#13140a',
              border: 'none',
              borderRadius: 10,
              padding: '12px 16px',
              fontSize: 13,
              fontWeight: 900,
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(255, 210, 26, 0.2)',
            }}
          >
            Gestionar Boletos →
          </Link>
        </div>

        {/* 2. Gestión de Usuarios (Exclusivo Admin) */}
        {isAdmin ? (
          <div
            style={{
              background: 'linear-gradient(180deg, #1b2021 0%, #151819 100%)',
              border: '1px solid #283233',
              borderRadius: 16,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: '#192433',
                  border: '1px solid #273e5c',
                  color: '#60a5fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  marginBottom: 16,
                }}
              >
                👥
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 8px', color: '#f4f6f4' }}>
                Gestión de Usuarios
              </h2>
              <p style={{ fontSize: 13, color: '#8d9896', lineHeight: 1.5, margin: '0 0 24px' }}>
                Da de alta a vendedores de boletos, asigna co-administradores y supervisa el padrón oficial de compradores con enlace directo a WhatsApp y sus comprobantes.
              </p>
            </div>

            <Link
              href="/admin/usuarios"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                background: '#ffd21a',
                color: '#13140a',
                border: 'none',
                borderRadius: 10,
                padding: '12px 16px',
                fontSize: 13,
                fontWeight: 900,
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(255, 210, 26, 0.2)',
              }}
            >
              Gestionar Usuarios →
            </Link>
          </div>
        ) : null}

        {/* 3. Conciliación de Pagos (Exclusivo Admin) */}
        {isAdmin ? (
          <div
            style={{
              background: 'linear-gradient(180deg, #1b2021 0%, #151819 100%)',
              border: '1px solid #283233',
              borderRadius: 16,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: '#2d2516',
                  border: '1px solid #524020',
                  color: '#facc15',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  marginBottom: 16,
                }}
              >
                💳
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 8px', color: '#f4f6f4' }}>
                Conciliación de Pagos
              </h2>
              <p style={{ fontSize: 13, color: '#8d9896', lineHeight: 1.5, margin: '0 0 24px' }}>
                Bandeja de verificación de pagos SPEI y efectivo. Inspecciona el comprobante cargado, aprueba ingresos directos a cuenta bancaria o libera boletos no pagados.
              </p>
            </div>

            <Link
              href="/admin/pagos"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                background: '#242d2f',
                color: '#f1f5f4',
                border: '1px solid #415053',
                borderRadius: 10,
                padding: '12px 16px',
                fontSize: 13,
                fontWeight: 800,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              Revisar Pagos →
            </Link>
          </div>
        ) : null}

        {/* 4. Catálogo Público */}
        <div
          style={{
            background: 'linear-gradient(180deg, #1b2021 0%, #151819 100%)',
            border: '1px solid #283233',
            borderRadius: 16,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: '#191f21',
                border: '1px solid #2d3839',
                color: '#9ca3af',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                marginBottom: 16,
              }}
            >
              🔍
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 8px', color: '#f4f6f4' }}>
              Catálogo Público
            </h2>
            <p style={{ fontSize: 13, color: '#8d9896', lineHeight: 1.5, margin: '0 0 24px' }}>
              Consulta la vista del comprador tal como se muestra en la web pública para validar en tiempo real los boletos apartados, libres y la información de la motocicleta.
            </p>
          </div>

          <Link
            href="/boletos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: '#242d2f',
              color: '#f1f5f4',
              border: '1px solid #415053',
              borderRadius: 10,
              padding: '12px 16px',
              fontSize: 13,
              fontWeight: 800,
              textDecoration: 'none',
              transition: 'all 0.15s ease',
            }}
          >
            Ver Catálogo →
          </Link>
        </div>
      </div>
    </main>
  );
}
