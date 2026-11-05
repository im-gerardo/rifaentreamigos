import IniciarSesionForm from './iniciar-sesion-form';

function safeRedirect(value: string | undefined) {
  return value?.startsWith('/') && !value.startsWith('//') ? value : '/admin';
}

export default async function IniciarSesionPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;
  return <IniciarSesionForm redirectTo={safeRedirect(redirect)} />;
}
