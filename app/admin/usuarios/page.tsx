import { requireRole } from '@/lib/auth';
import AdminUsuariosClient from './admin-usuarios-client';

export default async function Page() {
  try {
    await requireRole(['admin']);
  } catch {
    return (
      <main style={{ padding: '40px 0' }}>
        <h1>Acceso denegado</h1>
        <p>Solo los administradores pueden gestionar usuarios.</p>
      </main>
    );
  }

  return <AdminUsuariosClient />;
}
