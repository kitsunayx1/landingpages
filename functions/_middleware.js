/**
 * Cloudflare Pages middleware — subdomain routing
 *
 * Routes each product subdomain to its HTML file:
 *   council.gil.consulting  →  /council.html
 *   carbon.gil.consulting   →  /carbon.html
 *   ...etc
 *
 * Root domain (gil.consulting, www.gil.consulting) → /index.html
 * Unknown subdomain → /index.html fallback
 */

// Explicit subdomain → file mapping (covers non-obvious names)
const SUBDOMAIN_MAP = {
  'veritas-platform': 'veritas-platform.html',
  'veritas':          'veritas.html',
  'maker':            'maker.html',
  'ghost':            'ghost.html',
  'galley':           'galley.html',
  'charter':          'charter.html',
  'carbon':           'carbon.html',
  'council':          'council.html',
  'shipdeck':         'shipdeck.html',
  'calldesk':         'calldesk.html',
  'sentri':           'sentri.html',
  'hephaestus':       'hephaestus.html',
  'preflight':        'preflight.html',
  'chronicle':        'chronicle.html',
  'civibridge':       'civibridge.html',
  'umbra':            'umbra.html',
  'pulse':            'pulse.html',
  'beacon':           'beacon.html',
  'familycare':       'familycare.html',
  'teachingcraft':    'teachingcraft.html',
  'bifrost':          'bifrost.html',
  'vouch':            'vouch.html',
  'meridian':         'meridian.html',
  'zanshin':          'zanshin.html',
};

export async function onRequest({ request, next, env }) {
  const url  = new URL(request.url);
  const host = url.hostname;           // e.g. council.gil.consulting
  const parts = host.split('.');

  // Only intercept root path requests (let /static/, /og/ etc. pass through)
  const isRootRequest = url.pathname === '/' || url.pathname === '';
  if (!isRootRequest) return next();

  // Extract subdomain (anything before the last two parts: gil.consulting)
  const isSubdomain = parts.length >= 3 && parts[0] !== 'www';

  if (isSubdomain) {
    const sub  = parts[0].toLowerCase();
    const file = SUBDOMAIN_MAP[sub] ?? `${sub}.html`;
    const assetUrl = new URL(request.url);
    assetUrl.pathname = `/${file}`;
    const response = await env.ASSETS.fetch(assetUrl);
    // If file not found, fall back to index
    if (response.status === 404) {
      const fallback = new URL(request.url);
      fallback.pathname = '/index.html';
      return env.ASSETS.fetch(fallback);
    }
    return response;
  }

  // Root domain or www → index
  const indexUrl = new URL(request.url);
  indexUrl.pathname = '/index.html';
  return env.ASSETS.fetch(indexUrl);
}
