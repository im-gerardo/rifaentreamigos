'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function IniciarSesionForm({ redirectTo }: { redirectTo: string }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/dev-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        window.location.href = data.redirect || redirectTo || '/admin';
        return;
      } else {
        setError(data.error || 'Credenciales inválidas.');
      }
    } catch {
      setError('Error de conexión al autenticar.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-layout">
      <section className="auth-intro" aria-labelledby="login-title">
        <p className="tag">Acceso Exclusivo de Equipo</p>
        <h1 id="login-title">Administración de la Rifa</h1>
        <p>
          Panel de control para supervisión de inventario de 200 folios, validación de pagos SPEI y entrega de talones.
        </p>
        <Link href="/" className="text-link">
          ← Volver al sitio público
        </Link>
      </section>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="tu-correo@ejemplo.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="password">Contraseña</label>
          <div className="password-control">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              aria-pressed={showPassword}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        {error ? <p className="field-error" role="alert" style={{ color: '#f87171' }}>⚠️ {error}</p> : null}

        <button className="btn" type="submit" disabled={!email.trim() || !password || isSubmitting}>
          {isSubmitting ? 'Verificando credenciales…' : 'Iniciar Sesión'}
        </button>
      </form>
    </main>
  );
}
