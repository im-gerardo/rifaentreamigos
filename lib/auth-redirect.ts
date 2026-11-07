/** El login de equipo solo vuelve a rutas administrativas locales. */
export function safeAdminRedirect(value: string | undefined): string {
  if (!value || !/^\/admin(?:\/|\?|#|$)/.test(value)) return '/admin';
  try {
    const decoded = decodeURIComponent(value);
    if ([value, decoded].some(path => [...path].some(character =>
      character === '\\' || character.charCodeAt(0) <= 0x20 || character.charCodeAt(0) === 0x7f,
    ))) return '/admin';
    const url = new URL(value, 'https://app.example.invalid');
    return url.origin === 'https://app.example.invalid' ? url.pathname + url.search + url.hash : '/admin';
  } catch {
    return '/admin';
  }
}
