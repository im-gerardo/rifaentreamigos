'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleLogout() {
    setIsLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: signOutError } = await supabase.auth.signOut({
        scope: 'local',
      });

      if (signOutError) {
        throw signOutError;
      }

      router.replace('/iniciar-sesion');
      router.refresh();
    } catch {
      setError('Se produjo un error al cerrar la sesión. Inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="logout-container">
      {error && <p role="alert" className="field-error">{error}</p>}
      <button
        onClick={handleLogout}
        disabled={isLoading}
        type="button"
        className="btn"
      >
        {isLoading ? 'Cerrando sesión…' : 'Cerrar sesión'}
      </button>
    </div>
  );
}
