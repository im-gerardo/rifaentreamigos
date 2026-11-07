'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUserStore } from '@/lib/user-store';
import { useTicketStore } from '@/lib/ticket-store';
import { getLetterFolio } from '@/lib/folio-letters';

export default function AdminUsuariosClient() {
  const { users, addUser, toggleUserStatus, deleteUser } = useUserStore();
  const { tickets } = useTicketStore();

  const [activeTab, setActiveTab] = useState<'team' | 'buyers'>('team');
  const [roleFilter, setRoleFilter] = useState<'all' | 'seller' | 'admin'>('all');
  const [search, setSearch] = useState('');

  // Formulario para nuevo vendedor/admin
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRole, setNewRole] = useState<'seller' | 'admin'>('seller');
  const [formError, setFormError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState<{
    name: string;
    email: string;
    password: string;
    role: string;
  } | null>(null);

  // Compradores derivados de tickets vendidos o apartados
  const buyerMap = new Map<string, {
    name: string;
    phone: string;
    folios: { folio: number; code: string; state: string }[];
    totalSpent: number;
    lastDate?: string;
  }>();

  tickets.forEach((t) => {
    if (t.buyerName && t.phone) {
      const key = `${t.buyerName.trim().toLowerCase()}_${t.phone.trim()}`;
      const existing = buyerMap.get(key) || {
        name: t.buyerName,
        phone: t.phone,
        folios: [],
        totalSpent: 0,
        lastDate: t.updatedAt,
      };

      existing.folios.push({
        folio: t.folio,
        code: getLetterFolio(t.folio),
        state: t.state,
      });

      if (t.state === 'paid') {
        existing.totalSpent += 250;
      }

      buyerMap.set(key, existing);
    }
  });

  const buyerList = Array.from(buyerMap.values());

  // Filtros equipo
  const filteredUsers = users.filter((u) => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.phone.includes(q);
  });

  // Filtros compradores
  const filteredBuyers = buyerList.filter((b) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const foliosMatch = b.folios.some((f) => f.code.toLowerCase().includes(q));
    return b.name.toLowerCase().includes(q) || b.phone.includes(q) || foliosMatch;
  });

  const sellersCount = users.filter((u) => u.role === 'seller').length;
  const adminsCount = users.filter((u) => u.role === 'admin').length;

  const handleOpenAddModal = (roleDefault: 'seller' | 'admin' = 'seller') => {
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setNewRole(roleDefault);
    setFormError('');
    setActionSuccess('');
    setCreatedCredentials(null);
    setIsModalOpen(true);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || newName.trim().length < 3) {
      setFormError('Ingresa el nombre completo del usuario.');
      return;
    }
    if (!newEmail.trim() || !newEmail.includes('@')) {
      setFormError('Ingresa un correo electrónico válido.');
      return;
    }
    const cleanPhone = newPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Ingresa un número telefónico de al menos 10 dígitos.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      // Llamar a la API para crear usuario en Supabase Auth y Profiles
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          phone: cleanPhone,
          role: newRole,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || 'Error al dar de alta el usuario.');
        setIsSubmitting(false);
        return;
      }

      // Sincronizar en el store local
      addUser({
        name: newName,
        email: newEmail,
        phone: cleanPhone,
        role: newRole,
        active: true,
      });

      // Mostrar las credenciales generadas para que el admin las copie
      setCreatedCredentials({
        name: newName,
        email: newEmail.trim().toLowerCase(),
        password: data.generatedPassword,
        role: newRole === 'seller' ? 'Vendedor' : 'Administrador',
      });
      setActionSuccess(`¡Usuario ${newName} creado exitosamente en Supabase!`);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Error de conexión con el servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ padding: '28px 0 80px', maxWidth: 1200, margin: '0 auto' }}>
      {/* HEADER SUPERIOR */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 20,
          marginBottom: 32,
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
              Control de Accesos
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
              Gestión de Cuentas
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
            Gestión de Usuarios
          </h1>
          <p style={{ color: '#8d9896', margin: 0, fontSize: 14, maxWidth: 640, lineHeight: 1.5 }}>
            Administra a tu equipo de vendedores de boletos, co-administradores y supervisa el padrón oficial de compradores con sus participaciones.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => handleOpenAddModal('seller')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#ffd21a',
              color: '#13140a',
              border: 'none',
              borderRadius: 10,
              padding: '12px 22px',
              fontSize: 14,
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(255, 210, 26, 0.25)',
              transition: 'all 0.15s ease',
            }}
          >
            <span>+</span> Dar de Alta Vendedor
          </button>
          <Link
            href="/admin"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#191e1f',
              color: '#d0d7d5',
              border: '1px solid #313d3e',
              borderRadius: 10,
              padding: '12px 18px',
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Volver al Panel
          </Link>
        </div>
      </div>

      {actionSuccess ? (
        <div
          style={{
            background: 'rgba(6, 78, 59, 0.6)',
            border: '1px solid #059669',
            color: '#a7f3d0',
            padding: '14px 20px',
            borderRadius: 12,
            marginBottom: 24,
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          {actionSuccess}
        </div>
      ) : null}

      {/* STATS CARDS PREMIUM */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 18,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            background: 'linear-gradient(180deg, #1b2021 0%, #141718 100%)',
            border: '1px solid #2a3334',
            borderRadius: 14,
            padding: '20px 22px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: '#ffd21a',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Vendedores Activos
            </span>
            <span style={{ fontSize: 18 }}>💼</span>
          </div>
          <strong style={{ fontSize: 36, display: 'block', color: '#fff', margin: '8px 0 4px', fontWeight: 900 }}>
            {sellersCount}
          </strong>
          <span style={{ fontSize: 12, color: '#7c8886' }}>Venta y cobro presencial</span>
        </div>

        <div
          style={{
            background: 'linear-gradient(180deg, #1b2021 0%, #141718 100%)',
            border: '1px solid #2a3334',
            borderRadius: 14,
            padding: '20px 22px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: '#60a5fa',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Administradores
            </span>
            <span style={{ fontSize: 18 }}>🛡️</span>
          </div>
          <strong style={{ fontSize: 36, display: 'block', color: '#fff', margin: '8px 0 4px', fontWeight: 900 }}>
            {adminsCount}
          </strong>
          <span style={{ fontSize: 12, color: '#7c8886' }}>Acceso total y conciliación</span>
        </div>

        <div
          style={{
            background: 'linear-gradient(180deg, #1b2021 0%, #141718 100%)',
            border: '1px solid #2a3334',
            borderRadius: 14,
            padding: '20px 22px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: '#4ade80',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Compradores Registrados
            </span>
            <span style={{ fontSize: 18 }}>🎟️</span>
          </div>
          <strong style={{ fontSize: 36, display: 'block', color: '#4ade80', margin: '8px 0 4px', fontWeight: 900 }}>
            {buyerList.length}
          </strong>
          <span style={{ fontSize: 12, color: '#7c8886' }}>Participantes en el sorteo</span>
        </div>
      </div>

      {/* PESTAÑAS SEGMENTADAS */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          background: '#121516',
          padding: 6,
          borderRadius: 12,
          border: '1px solid #23292a',
          width: 'fit-content',
          marginBottom: 24,
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('team')}
          style={{
            padding: '10px 22px',
            borderRadius: 9,
            fontSize: 13,
            fontWeight: 800,
            border: 'none',
            cursor: 'pointer',
            background: activeTab === 'team' ? '#ffd21a' : 'transparent',
            color: activeTab === 'team' ? '#111' : '#8d9896',
            boxShadow: activeTab === 'team' ? '0 2px 8px rgba(255, 210, 26, 0.2)' : 'none',
            transition: 'all 0.15s ease',
          }}
        >
          👥 Equipo (Vendedores y Admins)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('buyers')}
          style={{
            padding: '10px 22px',
            borderRadius: 9,
            fontSize: 13,
            fontWeight: 800,
            border: 'none',
            cursor: 'pointer',
            background: activeTab === 'buyers' ? '#ffd21a' : 'transparent',
            color: activeTab === 'buyers' ? '#111' : '#8d9896',
            boxShadow: activeTab === 'buyers' ? '0 2px 8px rgba(255, 210, 26, 0.2)' : 'none',
            transition: 'all 0.15s ease',
          }}
        >
          🎟️ Padrón de Compradores ({buyerList.length})
        </button>
      </div>

      {/* TOOLBAR CON BUSCADOR Y FILTROS */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          marginBottom: 24,
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#15191a',
          padding: '12px 16px',
          borderRadius: 12,
          border: '1px solid #262e30',
        }}
      >
        <div style={{ flex: 1, minWidth: 260, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#687472', fontSize: 14 }}>
            🔍
          </span>
          <input
            type="search"
            placeholder={
              activeTab === 'team'
                ? 'Buscar por nombre, correo o WhatsApp...'
                : 'Buscar por comprador, teléfono o folio (ej. 1AAA)...'
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              background: '#0d1011',
              border: '1px solid #2a3436',
              borderRadius: 8,
              color: '#fff',
              fontSize: 13,
              outline: 'none',
            }}
          />
        </div>

        {activeTab === 'team' ? (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setRoleFilter('all')}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                border: '1px solid',
                borderColor: roleFilter === 'all' ? '#ffd21a' : '#2b3536',
                background: roleFilter === 'all' ? '#ffd21a' : '#101314',
                color: roleFilter === 'all' ? '#111' : '#9ca6a4',
                cursor: 'pointer',
              }}
            >
              Todos ({users.length})
            </button>
            <button
              type="button"
              onClick={() => setRoleFilter('seller')}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                border: '1px solid',
                borderColor: roleFilter === 'seller' ? '#ffd21a' : '#2b3536',
                background: roleFilter === 'seller' ? '#ffd21a' : '#101314',
                color: roleFilter === 'seller' ? '#111' : '#9ca6a4',
                cursor: 'pointer',
              }}
            >
              Vendedores ({sellersCount})
            </button>
            <button
              type="button"
              onClick={() => setRoleFilter('admin')}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                border: '1px solid',
                borderColor: roleFilter === 'admin' ? '#ffd21a' : '#2b3536',
                background: roleFilter === 'admin' ? '#ffd21a' : '#101314',
                color: roleFilter === 'admin' ? '#111' : '#9ca6a4',
                cursor: 'pointer',
              }}
            >
              Admins ({adminsCount})
            </button>
          </div>
        ) : null}
      </div>

      {/* VISTA 1: LISTADO DE EQUIPO */}
      {activeTab === 'team' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filteredUsers.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: '#141718',
                border: '1px solid #232829',
                borderRadius: 14,
              }}
            >
              <p style={{ color: '#cfd8d6', fontSize: 15, fontWeight: 700, margin: 0 }}>
                No se encontraron usuarios del equipo con ese filtro.
              </p>
            </div>
          ) : (
            filteredUsers.map((user) => {
              const isAdmin = user.role === 'admin';
              return (
                <div
                  key={user.id}
                  style={{
                    background: '#161a1b',
                    border: '1px solid #262f30',
                    borderRadius: 14,
                    padding: '18px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 18,
                    transition: 'border-color 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: isAdmin ? '#172554' : '#1e2925',
                        border: `1px solid ${isAdmin ? '#2563eb' : '#059669'}`,
                        color: isAdmin ? '#93c5fd' : '#6ee7b7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 22,
                        flexShrink: 0,
                      }}
                    >
                      {isAdmin ? '🛡️' : '💼'}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <strong style={{ fontSize: 16, color: '#f3f5f3', letterSpacing: '-0.01em' }}>
                          {user.name}
                        </strong>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            letterSpacing: '0.04em',
                            padding: '3px 9px',
                            borderRadius: 6,
                            background: isAdmin ? '#1e3a8a' : '#064e3b',
                            color: isAdmin ? '#bfdbfe' : '#a7f3d0',
                            border: `1px solid ${isAdmin ? '#3b82f6' : '#10b981'}`,
                            textTransform: 'uppercase',
                          }}
                        >
                          {isAdmin ? 'Administrador' : 'Vendedor de Boletos'}
                        </span>
                        {!user.active && (
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              background: '#451a1a',
                              color: '#f87171',
                              padding: '2px 8px',
                              borderRadius: 4,
                              border: '1px solid #7f1d1d',
                              textTransform: 'uppercase',
                            }}
                          >
                            Inactivo
                          </span>
                        )}
                      </div>

                      <div
                        style={{
                          fontSize: 13,
                          color: '#8d9896',
                          marginTop: 6,
                          display: 'flex',
                          gap: 14,
                          flexWrap: 'wrap',
                          alignItems: 'center',
                        }}
                      >
                        <span>
                          Correo: <strong style={{ color: '#d0d7d5' }}>{user.email}</strong>
                        </span>
                        <span style={{ color: '#444' }}>•</span>
                        <span>
                          Teléfono:{' '}
                          <a
                            href={`https://wa.me/52${user.phone}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: '#ffd21a', fontWeight: 600, textDecoration: 'none' }}
                          >
                            {user.phone}
                          </a>
                        </span>
                        <span style={{ color: '#444' }}>•</span>
                        <span style={{ fontSize: 12, color: '#6a7674' }}>
                          Alta: {new Date(user.createdAt).toLocaleDateString('es-MX')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BOTONES CON ALTO CONTRASTE */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => toggleUserStatus(user.id)}
                      style={{
                        padding: '9px 16px',
                        fontSize: 13,
                        fontWeight: 700,
                        borderRadius: 8,
                        background: '#242d2f',
                        color: '#f1f5f4',
                        border: '1px solid #415053',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease',
                      }}
                    >
                      {user.active ? 'Desactivar' : 'Activar'}
                    </button>

                    {user.email !== 'og.barrios@gmail.com' ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`¿Eliminar la cuenta de ${user.name}?`)) {
                            deleteUser(user.id);
                          }
                        }}
                        style={{
                          padding: '9px 16px',
                          fontSize: 13,
                          fontWeight: 700,
                          borderRadius: 8,
                          background: '#5c1d1d',
                          color: '#fecaca',
                          border: '1px solid #991b1b',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease',
                        }}
                      >
                        Eliminar
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* VISTA 2: PADRÓN DE COMPRADORES */}
      {activeTab === 'buyers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filteredBuyers.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: '#141718',
                border: '1px solid #232829',
                borderRadius: 14,
              }}
            >
              <p style={{ color: '#cfd8d6', fontSize: 15, fontWeight: 700, margin: 0 }}>
                No hay compradores registrados con ese criterio.
              </p>
            </div>
          ) : (
            filteredBuyers.map((buyer, idx) => (
              <div
                key={`${buyer.phone}_${idx}`}
                style={{
                  background: '#161a1b',
                  border: '1px solid #262f30',
                  borderRadius: 14,
                  padding: '18px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 18,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: '#1f2526',
                      border: '1px solid #334042',
                      color: '#ffd21a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22,
                      flexShrink: 0,
                    }}
                  >
                    👤
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: 17, color: '#f4f6f4' }}>{buyer.name}</strong>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          background: '#102a20',
                          color: '#4ade80',
                          border: '1px solid #059669',
                          padding: '3px 8px',
                          borderRadius: 6,
                        }}
                      >
                        {buyer.folios.length} boleto(s) asignado(s)
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: 13,
                        color: '#8d9896',
                        marginTop: 6,
                        display: 'flex',
                        gap: 14,
                        flexWrap: 'wrap',
                        alignItems: 'center',
                      }}
                    >
                      <span>
                        WhatsApp:{' '}
                        <a
                          href={`https://wa.me/52${buyer.phone}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: '#ffd21a', fontWeight: 700, textDecoration: 'none' }}
                        >
                          {buyer.phone}
                        </a>
                      </span>
                      <span style={{ color: '#444' }}>•</span>
                      <span>
                        Total pagado:{' '}
                        <strong style={{ color: '#4ade80', fontSize: 14 }}>
                          ${buyer.totalSpent.toLocaleString('es-MX')} MXN
                        </strong>
                      </span>
                    </div>

                    {/* Chips de folios */}
                    <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {buyer.folios.map((f) => (
                        <Link
                          key={f.code}
                          href={`/comprobante/${f.folio}`}
                          target="_blank"
                          style={{
                            fontSize: 12,
                            padding: '4px 10px',
                            borderRadius: 6,
                            background: f.state === 'paid' ? '#064e3b' : '#3d2e07',
                            color: f.state === 'paid' ? '#a7f3d0' : '#fde047',
                            border: `1px solid ${f.state === 'paid' ? '#059669' : '#ca8a04'}`,
                            fontWeight: 800,
                            fontFamily: 'monospace',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          Folio {f.code} {f.state === 'paid' ? '✓' : '●'}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/52${buyer.phone}?text=${encodeURIComponent(
                    `Hola ${buyer.name}, te contactamos de la Rifa Entre Amigos sobre tus boletos (${buyer.folios.map((f) => f.code).join(', ')}).`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: '#192420',
                    color: '#4ade80',
                    border: '1px solid #059669',
                    borderRadius: 8,
                    padding: '10px 16px',
                    fontSize: 13,
                    fontWeight: 800,
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <span>💬</span> Contactar WhatsApp
                </a>
              </div>
            ))
          )}
        </div>
      )}

      {/* MODAL PARA DAR DE ALTA USUARIO */}
      {isModalOpen ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            zIndex: 100,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              background: '#16191a',
              border: '1px solid #364244',
              borderRadius: 16,
              maxWidth: 480,
              width: '100%',
              padding: 26,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 22, margin: 0, color: '#fff', fontWeight: 900, letterSpacing: '-0.02em' }}>
                Dar de Alta Usuario
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#8d9896',
                  fontSize: 24,
                  cursor: 'pointer',
                  padding: 4,
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ color: '#8d9896', fontSize: 13, margin: '0 0 18px', lineHeight: 1.5 }}>
              Registra un nuevo miembro del equipo. Los vendedores podrán ingresar con su correo para registrar ventas y apartados con trazabilidad.
            </p>

            {formError ? (
              <div
                style={{
                  background: 'rgba(127, 29, 29, 0.5)',
                  border: '1px solid #dc2626',
                  color: '#fca5a5',
                  padding: '10px 14px',
                  borderRadius: 8,
                  marginBottom: 16,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {formError}
              </div>
            ) : null}

            {createdCredentials ? (
              <div style={{ background: '#121e18', border: '1px solid #059669', borderRadius: 12, padding: 18, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 20 }}>🎉</span>
                  <strong style={{ color: '#6ee7b7', fontSize: 16 }}>Usuario Creado en Supabase</strong>
                </div>
                <p style={{ color: '#a7f3d0', fontSize: 13, margin: '0 0 14px', lineHeight: 1.4 }}>
                  Copia y comparte estas credenciales con <strong>{createdCredentials.name}</strong> para que pueda ingresar al panel:
                </p>

                <div style={{ background: '#0a0d0c', border: '1px solid #1e3a2f', borderRadius: 8, padding: 14, fontFamily: 'monospace', fontSize: 13, color: '#f3f4f6', marginBottom: 16 }}>
                  <div><strong>Rol:</strong> {createdCredentials.role}</div>
                  <div style={{ marginTop: 6 }}><strong>Link de acceso:</strong> https://rifaentreamigos.ogba.space/iniciar-sesion</div>
                  <div style={{ marginTop: 6 }}><strong>Correo:</strong> {createdCredentials.email}</div>
                  <div style={{ marginTop: 6 }}><strong>Contraseña:</strong> <span style={{ color: '#ffd21a', fontWeight: 'bold' }}>{createdCredentials.password}</span></div>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => {
                      const text = `Hola ${createdCredentials.name}! Ya tienes acceso a la plataforma de la Rifa:\n\n🔗 Link: https://rifaentreamigos.ogba.space/iniciar-sesion\n✉️ Usuario: ${createdCredentials.email}\n🔑 Contraseña: ${createdCredentials.password}\n\nIngresa para registrar tus ventas de boletos.`;
                      navigator.clipboard.writeText(text);
                      alert('¡Credenciales copiadas al portapapeles!');
                    }}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      background: '#059669',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    📋 Copiar para WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      padding: '10px 16px',
                      background: '#242c2d',
                      color: '#cfd8d6',
                      border: '1px solid #3e4c4e',
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            ) : (
            <form onSubmit={handleCreateUser}>
              {/* Rol */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#d0d7d5', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Rol en el sistema:
                </label>
                <div style={{ display: 'flex', gap: 10 }}>
                  <label
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      background: newRole === 'seller' ? '#212d28' : '#121617',
                      border: `1px solid ${newRole === 'seller' ? '#ffd21a' : '#2b3638'}`,
                      padding: '12px 14px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 700,
                      color: newRole === 'seller' ? '#ffd21a' : '#8d9896',
                    }}
                  >
                    <input
                      type="radio"
                      name="modalRole"
                      value="seller"
                      checked={newRole === 'seller'}
                      onChange={() => setNewRole('seller')}
                      style={{ accentColor: '#ffd21a' }}
                    />
                    <span>💼 Vendedor</span>
                  </label>

                  <label
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      background: newRole === 'admin' ? '#182740' : '#121617',
                      border: `1px solid ${newRole === 'admin' ? '#60a5fa' : '#2b3638'}`,
                      padding: '12px 14px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 700,
                      color: newRole === 'admin' ? '#93c5fd' : '#8d9896',
                    }}
                  >
                    <input
                      type="radio"
                      name="modalRole"
                      value="admin"
                      checked={newRole === 'admin'}
                      onChange={() => setNewRole('admin')}
                      style={{ accentColor: '#60a5fa' }}
                    />
                    <span>🛡️ Administrador</span>
                  </label>
                </div>
              </div>

              {/* Nombre */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#d0d7d5', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Nombre completo:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Roberto Martínez"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: '#0e1213',
                    border: '1px solid #2e3a3c',
                    color: '#fff',
                    borderRadius: 8,
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>

              {/* Correo */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#d0d7d5', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Correo electrónico:
                </label>
                <input
                  type="email"
                  required
                  placeholder="vendedor@amigos.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: '#0e1213',
                    border: '1px solid #2e3a3c',
                    color: '#fff',
                    borderRadius: 8,
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>

              {/* WhatsApp */}
              <div style={{ marginBottom: 22 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#d0d7d5', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  WhatsApp / Celular (10 dígitos):
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ej. 4421941930"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: '#0e1213',
                    border: '1px solid #2e3a3c',
                    color: '#fff',
                    borderRadius: 8,
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 12, paddingTop: 16, borderTop: '1px solid #23292a' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: 8,
                    background: '#242c2d',
                    color: '#cfd8d6',
                    border: '1px solid #3e4c4e',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: 8,
                    background: isSubmitting ? '#a18816' : '#ffd21a',
                    color: '#13140a',
                    border: 'none',
                    fontSize: 14,
                    fontWeight: 900,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isSubmitting ? 'Creando en Supabase...' : 'Guardar y Generar Clave'}
                </button>
              </div>
            </form>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}
