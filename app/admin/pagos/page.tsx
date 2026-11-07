import { requireRole } from '@/lib/auth';
import AdminPagosClient from './admin-pagos-client';

export default async function Page() {
  try {
    await requireRole(['admin']);
  } catch {
    return <p className="p-8 text-neutral-400">Acceso exclusivo del administrador.</p>;
  }

  return <AdminPagosClient />;
}
