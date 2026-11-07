import IniciarSesionForm from './iniciar-sesion-form';
import { safeAdminRedirect } from '@/lib/auth-redirect';

export default async function IniciarSesionPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;
  return <IniciarSesionForm redirectTo={safeAdminRedirect(redirect)} />;
}
