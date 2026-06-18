export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'https://app.flockpilot.com';

/** Build an absolute signup URL on the unified app, forwarding query params. */
export function appSignupUrl(search?: string): string {
  const qs = search && search.length > 0 ? (search.startsWith('?') ? search : `?${search}`) : '';
  return `${APP_URL}/signup${qs}`;
}
