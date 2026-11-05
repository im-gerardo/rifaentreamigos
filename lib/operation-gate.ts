/**
 * Contención de Fase 0. No existe interruptor por entorno para abrir operaciones.
 * Solo retirar tras completar y verificar autorización, RLS y controles del plan.
 * Mantiene el código recuperado detrás del bloqueo para revisión posterior.
 */
export function operationalBlockResponse(): Response | null {
  return Response.json(
    {
      error: 'Operación deshabilitada durante la auditoría de seguridad.',
      code: 'OPERATIONS_DISABLED',
    },
    { status: 503, headers: { 'Cache-Control': 'no-store' } },
  );
}
