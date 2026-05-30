/**
 * Central API config — one source of truth for the backend URL.
 *
 * Why this file exists:
 *  1. Every API call across the app reads from here, so swapping the backend
 *     URL (e.g. after deploying to a new Vercel project, or when migrating to
 *     a custom domain like api.devinstratus.com) is a single env-var change.
 *  2. When this React app migrates to Next.js later, this is the ONLY file
 *     that needs touching for the API layer — change REACT_APP_API_BASE to
 *     NEXT_PUBLIC_API_BASE and we're done.
 *
 * Local dev:
 *   Create a `.env.local` at the React project root with:
 *     REACT_APP_API_BASE=http://localhost:4000
 *   …and restart `npm start`. That points the frontend at your local backend
 *   (`npm run dev` inside devinstratus-api).
 *
 * Production:
 *   Set REACT_APP_API_BASE in your Vercel project env vars (Project →
 *   Settings → Environment Variables → Production). Falls back to the
 *   deployed backend URL below if unset, so the site keeps working.
 */

export const API_BASE =
  process.env.REACT_APP_API_BASE ||
  'https://devin-startus-full-stack.vercel.app'

/** Are we pointed at a real backend? (Used by some pages to show demo-mode hints.) */
export const HAS_API = Boolean(API_BASE)

/** Build a full API URL: api('/api/contact/availability') → '<base>/api/contact/availability' */
export function api(path) {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE}${p}`
}
