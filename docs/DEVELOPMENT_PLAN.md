# Rifa Entre Amigos — Plan maestro de desarrollo para Codex

**Versión:** 1.0 · **Estado:** plan de implementación, NO certificación de producción  
**Repositorio:** raíz del proyecto que contiene `README.md`, `app/`, `lib/`, `supabase/`, `tests/`.  
**Instrucción de arranque:** lee primero `README.md`, después este archivo, y finalmente inspecciona TODO el código y las migraciones. El README describe el esqueleto actual; **este documento es el backlog y los criterios de aceptación**. Ante discrepancias, conserva las garantías de seguridad y consistencia más estrictas, documenta la decisión y no inventes requisitos legales.

## 0. Misión y modo de trabajo de Codex

Implementa de principio a fin un MVP verificable para una rifa con venta mixta: vendedores registran ventas presenciales; compradores pueden explorar y, cuando se habilite legalmente, solicitar reservas digitales; un administrador verifica pagos y controla inventario. Trabaja en iteraciones pequeñas, ejecuta pruebas, corrige fallos y registra evidencia. **No marques una fase terminada por crear archivos.** No solicites confirmación por cada archivo; sí detente cuando falten credenciales, información bancaria, autorización oficial o una decisión de negocio que afecte dinero o elegibilidad.

1. Audita el repositorio y crea `docs/IMPLEMENTATION_STATUS.md` con inventario `funcional / parcial / no implementado / bloqueado`, hallazgos y comandos realmente ejecutados.
2. Define un plan de cambios incremental y aplica migraciones **aditivas** cuando sea posible; nunca borres datos existentes sin respaldo y autorización.
3. Para cada fase: implementa UI, lógica servidor, esquema/RLS, pruebas unitarias, integración y E2E apropiadas; ejecuta `npm run build`, `npm test`, `npm run test:e2e` y validaciones SQL donde el entorno lo permita.
4. Si una prueba no puede ejecutarse por falta de infraestructura, indícalo expresamente como **no verificado**, con pasos reproducibles. No declares éxito ficticio.
5. Actualiza README, este plan y el estado al terminar cada fase. Usa commits pequeños y descriptivos si el entorno Git está disponible.
6. Nunca publiques secretos, PII, capturas de transferencias o claves de servicio. No desactives RLS ni las verificaciones de permisos para hacer pasar pruebas.

### Definición de terminado (aplica a cada historia)
- Interfaz responsive con estados de carga, vacío, error y éxito; accesibilidad básica y textos en español.
- Validación en servidor con Zod y autorización explícita; no confiar en datos o importes enviados por cliente.
- Transacciones y restricciones de BD para cambios que afecten inventario o dinero; auditoría inmutable.
- Pruebas de éxito, fallo, permisos y concurrencia cuando aplique.
- Build, lint, typecheck, tests y documentación actualizados; ningún error crítico conocido sin registrar.

## 1. Configuración de negocio inicial

| Campo | Valor inicial |
|---|---|
| Nombre comercial | Rifa Entre Amigos |
| Premio | Bajaj Pulsar N250, modelo 2026, amarilla, seminueva, poco más de 3,000 km |
| Descripción | Papeles en regla, lista para plaquear; verificar documentación antes de publicar |
| Folios | 001 a 200 |
| Participaciones | 5 números distintos por boleto; universo 000 a 999, sin repetición global |
| Precio | MXN $250.00 = 25,000 centavos |
| Recaudación objetivo | MXN $50,000.00 |
| Fecha propuesta | 20 noviembre 2026; zona `America/Mexico_City`; pendiente verificar sorteo y mecánica |
| Pago máximo | 17 noviembre 2026, hora por definir explícitamente |
| Apartado | 24 horas, sin exceder la fecha/hora límite de pago |
| Métodos | Transferencia y efectivo |
| Roles | `admin` y `seller`; comprador público sin cuenta en primera versión |
| Entrega | León, Guanajuato; lugar por acordar; factura endosada; cambio de propietario a cargo del ganador |
| Contacto | 4772879564 |
| Venta total | Condición propuesta; aplazamiento/cancelación y mayoría de compradores sujetos a bases y autorización aplicable |
| Estado inicial | `draft`; ventas públicas y cobros deshabilitados hasta aprobación legal/operativa |

**No inventes** número de permiso, nombre de sorteo oficial, resultado ganador, banco, CLABE, titular, hora límite, fecha nueva, ni condiciones de devolución. Mantén esas opciones como campos pendientes en admin y bloquea la apertura hasta que se completen y verifiquen. El uso de la expresión «entre amigos» no exime automáticamente de requisitos legales.

## 2. Stack y convenciones

- Next.js App Router + React + TypeScript estricto; estilos coherentes negro/amarillo/blanco; reutilizar `public/moto.jpg` y la identidad del boleto.
- Supabase Auth, PostgreSQL, Storage privado; `@supabase/ssr` con sesión por cookies para navegador y validación del usuario en servidor.
- Zod para entradas y respuestas; Vitest para unitarias, Playwright para E2E; agregar pruebas de integración SQL/RPC y herramientas de lint/typecheck.
- Importes en centavos enteros; fechas `timestamptz` en UTC almacenadas y mostradas con zona explícita; teléfonos normalizados, sin exponerlos públicamente.
- La clave `SUPABASE_SERVICE_ROLE_KEY` **solo en servidor**, nunca en variables `NEXT_PUBLIC_*`, bundles o logs. Preferir cliente ligado a usuario y RLS; si se usa service role, cada endpoint debe autenticar y autorizar primero.
- Crear `.env.example` sin secretos reales; no subir `.env.local`.
- Separar `app/` (rutas), `components/`, `lib/` (dominio/servicios/validación), `supabase/migrations/`, `tests/`, `docs/`.

## 3. Fases y entregables obligatorios

### Fase 0 — Auditoría y estabilización [P0]
- [x] Inspeccionar dependencias, código, SQL, API, UI y tests actuales; contrastar README con implementación real.
- [x] Ejecutar instalación, build, typecheck y pruebas; registrar versiones y errores reproducibles.
- [x] Revisar específicamente `reserve_tickets` y `review_payment` para autenticación, `SECURITY DEFINER`, permisos de ejecución, carreras, liberación, sobrepagos y estados inconsistentes.
- [x] Configurar ESLint, scripts `lint`, `typecheck`, `.env.example` y CI básica.
- [x] Crear `docs/IMPLEMENTATION_STATUS.md`, registrar deuda técnica y riesgos.
**Aceptación:** baseline reproducible o bloqueos explícitos, sin afirmar que el esqueleto está listo para producción.

**Evidencia Fase 0, 2026-11-05:** baseline Git `04c78d0` (hash vigente tras F0-P02), sin certificar; correcciones locales de compilación/contención/QA/dependencias con commits atómicos. Lint/typecheck/build, 28 unitarias y 10 smoke E2E pasan; auditoría de paquetes sin avisos conocidos. Revisión SQL solo de lectura: `001–006` aplicadas localmente, `007` pendiente y defectuosa, grants críticos ausentes y dos tablas sin RLS. **No se verificaron migraciones desde cero, RPC, concurrencia, login real ni CI remota.** Las casillas indican auditoría/configuración ejecutadas, no corrección/certificación de operaciones. Ventas, cobros y escrituras operativas permanecen bloqueadas. Evidencia y continuación en `IMPLEMENTATION_STATUS.md` y `F0_AUDIT.md`. Ninguna casilla de fases posteriores se da por completada.

**Cierre del bloqueo F0-P01 mediante F0-P02:** el usuario autorizó la depuración local. Identificador conocido retirado de SQL y author/committer en los ocho commits de recuperación, sin perder commits/mensajes/fechas ni alterar código actual. Ausencia verificada en todos los objetos/metadatos Git; objetos commit originales no recuperables desde el repositorio. Original y bundle privado conservados fuera de versionado: **no compartir `.local-recovery/` ni todo el directorio de trabajo**. Este control de Fase 0 queda resuelto en su alcance; no certifica toda PII, producción ni autoriza publicar. Evidencia y mapa de hashes en `GIT_PRIVACY_RECOVERY.md`; siguiente F1-I01 sin retirar bloqueos operativos.

### Fase 1 — Infraestructura, autenticación y autorización [P0]
- [ ] Configurar Supabase local o proyecto de desarrollo, migraciones versionadas y seed de DEMO sin datos reales.
- [ ] Login/logout de admin/vendedor, protección de rutas `/admin/**`, recuperación de sesión y manejo de errores.
- [ ] Perfil de usuario activo y roles aplicados en API y BD. Vendedor solo ve órdenes asignadas; admin ve todas.
- [ ] Políticas RLS y Storage; permisos mínimos; revocar acceso público a RPC privilegiadas; pruebas de acceso cruzado.
- [ ] Auditoría de acciones sensibles con actor real de sesión, no un `seller_id` arbitrario enviado por cliente.
**Aceptación:** usuario anónimo no accede a datos sensibles; vendedor no aprueba pagos ni accede a otros vendedores; administrador sí puede gestionar.

### Fase 2 — Rifas, reglas y emisión de boletos [P0]
- [ ] CRUD administrativo de rifas, imágenes, condiciones y reglas versionadas; una rifa activa inicialmente, esquema preparado para múltiples.
- [ ] Generador determinista/auditado de permutación de `000..999`: 200 folios × 5 números, cero duplicados; formato siempre de tres dígitos.
- [ ] Exportar CSV/JSON de correspondencia folio→números con checksum SHA-256 y fecha de emisión; importar/comparar archivo maestro del PDF impreso.
- [ ] No regenerar ni editar números de emisión publicada o con órdenes; bloqueo en servidor/BD.
- [ ] Inventario `/admin/boletos`: búsqueda, filtros, detalle, estado, entrega física y eventos.
- [ ] Publicación de bases con versión y aceptación por orden; checklist de apertura (permiso, reglas, calendario/mecánica, datos bancarios si se usa transferencia).
**Aceptación:** 200 boletos y 1,000 números exactos, cobertura total sin repetidos; la emisión impresa y digital coinciden mediante verificación explícita.

### Fase 3 — Compradores, órdenes, reservas y ventas presenciales [P0]
- [ ] CRUD de compradores con nombre, teléfono normalizado, consentimiento/aviso de privacidad y deduplicación asistida (sin fusionar automáticamente).
- [ ] Orden con varios boletos, precio congelado, origen `seller`/`public`, vendedor, expiración, saldo y reglas aceptadas.
- [ ] Reserva transaccional con bloqueo de filas, orden consistente de locks, idempotency key y único vínculo activo por boleto.
- [ ] 24 h de reserva o hasta deadline, lo que ocurra primero; no crear reservas expiradas.
- [ ] Expiración mediante job programado y función idempotente; **si hay comprobante o pago en revisión, poner en retención de conciliación y no liberar a ciegas**.
- [ ] Venta presencial desde panel: elegir folios, registrar comprador, recibir efectivo o registrar transferencia, confirmar entrega de boleto/talón.
- [ ] Cancelación con motivo, auditoría y reembolso cuando proceda; nunca reutilizar boleto con pago confirmado sin proceso administrativo explícito.
**Aceptación:** dos sesiones simultáneas no pueden apartar el mismo boleto; reservas vencidas se procesan una vez; ningún boleto aparece pagado sin saldo conciliado.

### Fase 4 — Pagos, comprobantes y conciliación [P0]
- [ ] Registrar pagos parciales y completos por orden, solo `transfer` y `cash`.
- [ ] Transferencia: referencia, importe, fecha declarada y comprobante JPG/PNG/PDF; upload autenticado/autorizado, límites de tamaño, MIME real, hash y Storage privado.
- [ ] Comprobantes no equivalen a ingreso confirmado: admin aprueba/rechaza tras conciliación externa; registrar revisor, hora, motivo, historial y prevenir doble aprobación.
- [ ] Efectivo: vendedor registra recepción con evidencia operativa; admin confirma o concilia según política configurable; no otorgar al vendedor privilegios de aprobación bancaria.
- [ ] Cálculo de `paid_cents`, `balance_cents`, `refunded_cents` desde movimientos aprobados; rechazar sobrepago o gestionarlo mediante flujo explícito; no confiar en total del frontend.
- [ ] Detección de referencia/hash duplicados, revisión de inconsistencias y archivos sospechosos; descarga privada con URL temporal.
- [ ] Bandeja `/admin/pagos` con filtros y acciones, historial y exportación conciliable.
**Aceptación:** $100 aprobados sobre orden $250 dejan $150 pendientes; rechazo no incrementa cobrado; comprobante duplicado genera alerta; roles respetados.

### Fase 5 — Portal público y comprobante digital [P1; activación condicionada]
- [ ] Home con moto, datos verificables, condiciones, progreso y contacto; accesible en móvil.
- [ ] `/boletos`: cuadrícula 001–200, estado agregado sin nombres/teléfonos, selección múltiple, cinco números por folio.
- [ ] `/checkout`: captura de nombre/teléfono, consentimiento, resumen, solicitud de reserva; usar tokens antiabuso/rate limits; **mantener botón de compra deshabilitado en `draft`**.
- [ ] Página privada de consulta mediante token de alta entropía con vencimiento/revocación, sin usar folio o teléfono como único secreto.
- [ ] Comprobante PDF con folios, números, precio, versión de bases, estado de pago y QR que abra verificación privada segura; no confundir reserva con boleto válido.
- [ ] WhatsApp mediante enlace prellenado, sin automatización de mensajes sin consentimiento.
**Aceptación:** navegación responsive, no hay filtración de PII; no se aceptan reservas públicas si no se habilitó la rifa; comprobantes reflejan datos reales.

### Fase 6 — Reportes, control físico, cierre y resultado [P1]
- [ ] Dashboard con total, disponibles, apartados, pagados, retenidos, ingresos confirmados, pendientes y ventas por vendedor.
- [ ] Reportes CSV por fecha, vendedor, folio, método y estado; exportación protegida y auditada.
- [ ] Control físico: impreso, entregado, talón recibido, reemplazado, extraviado; eventos trazables.
- [ ] Cierre: bloquear nuevas ventas, conciliar pendientes, verificar reglas y generar snapshot inmutable (boletos, números, pagos, hash, fecha, usuario).
- [ ] Módulo de resultado **manual y sujeto a mecánica autorizada**: almacenar fuente oficial, evidencia, número premiado, cálculo verificable y aprobación administrativa; no inventar algoritmo del sorteo.
- [ ] Si quedan boletos sin vender, seguir exclusivamente procedimiento legal y bases autorizadas; no realizar aplazamiento automático ni votación con efectos vinculantes sin definición aprobada.
**Aceptación:** resultado reproducible con evidencia; snapshot y auditoría conservados; no existe adjudicación sobre reglas no aprobadas.

### Fase 7 — Endurecimiento, QA y despliegue [P0 antes de producción]
- [ ] Pruebas unitarias, integración BD/RPC, E2E, permisos/RLS, concurrencia, expiración, idempotencia, cargas, exportaciones y restauración de backups.
- [ ] Protección CSRF cuando corresponda, rate limiting, cabeceras seguras, validación de uploads, manejo de secretos y monitoreo.
- [ ] CI en GitHub Actions: lint, typecheck, unit, build, E2E y pruebas SQL en entorno de pruebas; impedir deploy con fallos.
- [ ] Ambientes dev/staging/prod separados; migraciones, backup y rollback documentados; logs sin PII.
- [ ] Checklist de aceptación UAT y evidencia de ejecución; guía de operación, conciliación y soporte.
**Aceptación:** pruebas críticas pasan en entorno representativo, controles de acceso validados, plan de recuperación ensayado; apertura pública requiere aprobación humana y legal independiente.

## 4. Modelo de datos objetivo

Conservar y evolucionar las tablas existentes: `profiles`, `raffles`, `raffle_rules`, `tickets`, `ticket_numbers`, `buyers`, `orders`, `order_items`, `payments`, `payment_evidence`, `ticket_events`, `audit_logs`, `raffle_closures`.

Extender según necesidad con: `order_consents` (versión aceptada, fecha, evidencia), `idempotency_keys`, `payment_reviews`/movimientos de conciliación, `refunds`, `physical_ticket_events`, `raffle_documents`, `draw_results`, `system_settings`, `seller_assignments`. No crear tablas redundantes sin justificación.

**Invariantes de BD:**
- `UNIQUE(raffle_id,folio)`; `UNIQUE(raffle_id,number)`; cada número pertenece a boleto de la misma rifa; exactamente cinco números al publicar.
- Índice único parcial de `order_items(ticket_id)` mientras `released_at IS NULL`; usar transacciones para cambiar estados relacionados.
- `orders.total_cents = suma de order_items.price_cents` al confirmar; pagos aprobados y reembolsos determinan saldo.
- Reglas de transición de estados explícitas; ninguna escritura arbitraria desde cliente; eventos append-only para auditoría.
- `SECURITY DEFINER` con `search_path` controlado, `EXECUTE` restringido, verificación del actor en función/servidor y locks apropiados.
- Política de retención y borrado de PII/comprobantes definida; sin borrado físico que destruya trazabilidad contable necesaria.

## 5. Contratos API mínimos

Reutiliza rutas existentes cuando sea compatible. Define schemas Zod, ejemplos y errores en `docs/API.md`.

| Método | Ruta | Acceso | Resultado |
|---|---|---|---|
| GET | `/api/raffle` | Público | Información publicable, bases y estado |
| GET | `/api/tickets` | Público | Folios, cinco números, disponibilidad agregada |
| POST | `/api/reservations` | Admin/vendedor; público solo si habilitado | Reserva atómica, idempotente |
| GET | `/api/admin/orders` | Admin/vendedor asignado | Órdenes filtradas |
| POST | `/api/admin/orders` | Admin/vendedor | Venta presencial |
| GET/POST | `/api/admin/buyers` | Admin/vendedor autorizado | Buscar/registrar comprador |
| POST | `/api/payments` | Admin/vendedor autorizado o titular con token | Registrar pago pendiente |
| POST | `/api/payments/evidence` | Actor autorizado | Upload seguro de comprobante |
| GET | `/api/admin/payments` | Admin | Conciliación |
| PATCH | `/api/admin/payments` | Admin | Aprobar/rechazar transaccionalmente |
| GET | `/api/admin/reports` | Admin | Reportes protegidos |
| POST | `/api/admin/raffles/:id/close` | Admin | Snapshot tras validaciones |
| GET | `/api/orders/:token` | Titular por token válido | Consulta limitada de orden |

Errores estables: `UNAUTHORIZED` 401, `FORBIDDEN` 403, `VALIDATION_ERROR` 400, `TICKET_UNAVAILABLE` 409, `RESERVATION_EXPIRED` 409, `PAYMENT_REVIEW_REQUIRED` 409, `RAFFLE_NOT_OPEN` 409, `RATE_LIMITED` 429. Nunca devolver trazas, claves ni datos de otros compradores.

## 6. Pruebas automatizadas obligatorias

**Unitarias:** numeración exacta y padding; precio y sumas; fechas y zona horaria; transición de estados; expiración; validaciones Zod; sanitización de entradas.

**Integración PostgreSQL/Supabase:** RLS por rol; RPC no invocable anónimamente; doble reserva concurrente (una sola gana); reserva idempotente; bloqueo de inventario; revisión doble de pago; sobrepago; saldo parcial; cancelación/reembolso; expiración con evidencia en revisión; consistencia de 200×5; migraciones desde cero.

**E2E Playwright:** login, logout, restricciones; inventario; reserva presencial; registro de comprador; pago en efectivo; transferencia con comprobante; aprobación/rechazo; búsqueda; reporte; portal público bloqueado en `draft`; visualización móvil; checkout habilitado solo en estado autorizado.

**Seguridad:** IDOR (acceso a órdenes ajenas), elevación vendedor→admin, upload de MIME falso, URL de Storage pública, fuga de service role, enumeración de tokens, CSRF/rate limit, exposición de PII en errores y logs.

**Datos de prueba:** compradores ficticios y pagos simulados; jamás usar comprobantes reales en tests ni modificar una rifa productiva.

## 7. Prioridad, hitos y dependencias

1. **Hito A — Base segura:** Fases 0–1 completas, auth/RLS y CI verificadas.
2. **Hito B — Inventario inmutable:** Fase 2 completa y cotejo del PDF impreso.
3. **Hito C — Venta presencial controlada:** Fases 3–4 completas, pagos conciliados y pruebas de concurrencia.
4. **Hito D — Experiencia pública:** Fase 5 completa en staging, venta aún bloqueada sin autorización.
5. **Hito E — Cierre auditable:** Fase 6 completa con reglas oficiales verificadas.
6. **Hito F — Release:** Fase 7 y UAT aprobados, checklist legal y operativo firmado.

No fijes estimaciones de días sin evaluar baseline y disponibilidad del entorno. Trabaja en orden P0 antes de P1, sin saltar controles de seguridad.

## 8. Decisiones pendientes (bloqueantes para operación real)

- Permiso y bases de la rifa; fecha, nombre, modalidad y mecánica del sorteo de Lotería Nacional; correspondencia entre resultado oficial y números 000–999.
- Regla autorizada ante boletos no vendidos, aplazamiento, cancelación y reembolso; cómo se contabiliza y verifica la «mayoría de compradores» si legalmente procede.
- Hora exacta del límite de pago del 17/11/2026 y de corte operativo; qué hacer con transferencias en tránsito.
- Datos bancarios reales, titular y mecanismo de conciliación; no poner valores ficticios visibles a compradores.
- Aviso de privacidad, política de conservación de comprobantes, términos aceptados y tratamiento de datos personales.
- Archivo maestro de folios/números para garantizar correspondencia con los boletos físicos ya impresos.
- Evidencia de titularidad/documentación de la moto y procedimiento de entrega.

**Regla de seguridad de producto:** hasta resolver los puntos aplicables, permitir desarrollo y demostración con datos simulados, pero mantener `raffles.status='draft'`, sin cobrar ni habilitar checkout público.

## 9. Documentación a mantener

- `README.md`: instalación, variables, comandos, enlaces, estado real.
- `docs/IMPLEMENTATION_STATUS.md`: matriz por historia, commit, pruebas ejecutadas y bloqueos.
- `docs/ARCHITECTURE.md`: componentes, decisiones y amenazas.
- `docs/DATABASE.md`: ERD, constraints, RLS, migraciones y RPC.
- `docs/API.md`: contratos, autenticación, códigos y ejemplos.
- `docs/BUSINESS_RULES.md`: estados, invariantes y bases versionadas.
- `docs/TEST_PLAN.md`: matriz QA, fixtures, CI y evidencias.
- `docs/DEPLOYMENT.md`: entornos, backup, rollback, alertas y operación.

## 10. Prompt de ejecución para Codex

> Lee `README.md` y `docs/DEVELOPMENT_PLAN.md`. Audita el proyecto real antes de modificarlo. Implementa progresivamente todas las fases P0 y después P1, con migraciones seguras, interfaces completas, APIs, RLS y pruebas. Mantén actualizado `docs/IMPLEMENTATION_STATUS.md`. Ejecuta y corrige build, typecheck, lint, Vitest, Playwright y pruebas SQL; documenta cualquier bloqueo verificable. No inventes autorizaciones, resultados, datos bancarios ni éxito de pruebas. No actives ventas públicas hasta cumplir los requisitos legales y el checklist de apertura. Continúa de forma autónoma hasta completar lo que permita el entorno, y entrega al final un reporte preciso de funcionalidades terminadas, pruebas y decisiones pendientes.
