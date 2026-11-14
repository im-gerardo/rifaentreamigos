'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './nav-header.module.css';

const NAV_ITEMS = [
  { href: '/boletos', label: 'Boletos', icon: '🎟️' },
  { href: '/numeros', label: 'Números', icon: '🔢' },
  { href: '/como-se-elige-al-ganador', label: '¿Cómo se Gana?', icon: '🎯' },
  { href: '/condiciones', label: 'Bases y Condiciones', icon: '📜' },
];

export function NavHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Cerrar el drawer al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Evitar scroll del fondo cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Cerrar al presionar Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className={styles.navbar}>
      <Link href="/" className={styles.brand} onClick={() => setIsOpen(false)}>
        RIFA <span>ENTRE AMIGOS</span>
      </Link>

      {/* Enlaces en Escritorio */}
      <nav className={styles.desktopLinks} aria-label="Navegación principal">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.desktopLink} ${isActive ? styles.activeLink : ''}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Botón Hamburguesa Accesible */}
      <button
        type="button"
        className={styles.burgerBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-drawer"
      >
        <span className={styles.burgerIcon} aria-hidden="true">
          <span className={`${styles.line} ${isOpen ? styles.lineOpen1 : ''}`} />
          <span className={`${styles.line} ${isOpen ? styles.lineOpen2 : ''}`} />
          <span className={`${styles.line} ${isOpen ? styles.lineOpen3 : ''}`} />
        </span>
      </button>

      {/* Backdrop oscuro para móvil */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Móvil */}
      <div
        id="mobile-navigation-drawer"
        className={`${styles.mobileDrawer} ${isOpen ? styles.mobileDrawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <div className={styles.drawerHeader}>
          <div className={styles.brand}>
            RIFA <span>ENTRE AMIGOS</span>
          </div>
          <button
            type="button"
            className={styles.drawerCloseBtn}
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>

        <nav className={styles.mobileNavList} aria-label="Navegación móvil">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span className={styles.linkIcon} aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.drawerFooter}>
          <div className={styles.prizePill}>
            <span>Premio Oficial:</span>
            <strong>Bajaj Pulsar N250 mod. 2026</strong>
            <span style={{ fontSize: 11, color: '#7c8e8b', marginTop: 4 }}>
              Sorteo Lotería Nacional · 12 Dic 2026
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
