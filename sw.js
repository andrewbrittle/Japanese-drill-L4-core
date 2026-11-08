// Service worker for the Japanese Drill app - opt-in only, via the "Work
// offline" setting in the app itself (see syncServiceWorkerRegistration() in
// index.html). Never registers itself; the app registers/unregisters it.
//
// Strategy: network-first, cache-fallback, for every GET request. Online
// users always get the freshest version (this app's biggest strength has
// always been instant reload-to-see-changes, and this preserves that) -
// the cache is only ever used when the network request actually fails,
// i.e. genuinely offline.
//
// IMPORTANT: CACHE_VERSION must be bumped every time the app's own version
// stamp (in index.html) is bumped, so old cached files get cleared out and
// replaced next time an offline-enabled user is back online. Forgetting
// this is exactly how a PWA ends up stuck showing someone a stale version.
// LEVEL 4 APP: its own cache prefix, jpl4-. The Level 3 app (same web
// address) deletes every cache starting jp-drill- except its own, and this
// app deletes only jpl4- ones, so neither clears the other's offline copy.
const CACHE_VERSION = 'jpl4-core-v261106-001-2611080038';

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './core/core.js',
  './core/questions.js',
  './core/text.js',
  './ja/app.js',
  './ja/grammar.js',
  './ja/kana-strokes.js',
  './ja/legacy.js',
  './ja/vocab.js',
  './lang/ja.js',
  './ui/en.js',
  './changelog.html',
  './instructions.html',
  './japanese-vs-english-notes.html',
  './sentence-structure-notes.html',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512-maskable.png',
  './icons/icon-512.png',
  './fonts/BizUDPGothic-Regular.ttf',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      // Cache each URL independently rather than cache.addAll(), which is
      // all-or-nothing - if even one asset fails (a 404, not deployed yet,
      // momentarily flaky signal), addAll rejects and NOTHING gets cached,
      // not even index.html. That silently defeats the entire feature.
      // Caching one at a time means a single bad asset can't take index.html
      // down with it.
      Promise.all(
        // { cache: 'reload' } (2026-10-24, from the Portuguese app): GitHub
        // Pages lets browsers reuse a file for 10 minutes, so a plain add()
        // straight after a release could fill the NEW cache with OLD files.
        PRECACHE_URLS.map((url) => cache.add(new Request(url, { cache: 'reload' })).catch(() => {
          // This one asset didn't cache - the fetch handler below still
          // opportunistically caches things as they're actually used, so
          // partial coverage is better than none.
        }))
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names
          .filter((name) => name.startsWith('jpl4-core-') && name !== CACHE_VERSION)
          .map((name) => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

// Network-first still means "wait for the network" by default, and a
// connection that's merely slow/lossy (weak signal on a train, one bar in a
// station) rather than cleanly offline can leave a plain fetch() hanging for
// a long time before the browser's own timeout gives up and lets the catch()
// below run. Racing every fetch against a short timeout means a bad-but-not-
// dead connection still falls back to the cached version quickly, instead of
// the app just sitting there loading.
const NETWORK_TIMEOUT_MS = 3000;

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Always check with the server (2026-10-11). A plain fetch could be
  // answered from the browser's own HTTP cache (GitHub Pages lets it keep a
  // file ~10 minutes), so a phone could get a new index.html with the old
  // vocab.js. 'no-cache' revalidates every file - usually a tiny "not
  // modified" reply - so the files always match. Navigations can't be
  // re-made with options, so those are fetched by URL.
  const sameOrigin = new URL(event.request.url).origin === self.location.origin;
  const fresh = !sameOrigin ? event.request
    : event.request.mode === 'navigate' ? new Request(event.request.url, { cache: 'no-cache', credentials: 'same-origin' })
    : new Request(event.request, { cache: 'no-cache' });
  const networkFetch = fetch(fresh).then((response) => {
    // Only cache genuinely successful responses. Opaque cross-origin
    // responses (status 0) are also cached best-effort - the Google
    // Font request falls in this category on some browsers - since a
    // stale font is a much smaller problem than a missing one offline.
    if (response && (response.ok || response.type === 'opaque')) {
      const copy = response.clone();
      caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy)).catch(() => {});
    }
    return response;
  });
  // If the timeout below wins the race, this fetch is still left running in
  // the background (not cancelled) so a slow-but-eventually-successful
  // response still updates the cache for next time. That means it can go on
  // to reject on its own after the race is already settled - swallow that
  // here so it doesn't show up as an unhandled rejection; the user's already
  // been served from cache by then.
  networkFetch.catch(() => {});

  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('network-timeout')), NETWORK_TIMEOUT_MS);
  });

  event.respondWith(
    Promise.race([networkFetch, timeout]).catch(() => caches.match(event.request).then((cached) => {
      if (cached) return cached;
      // No exact match cached - if this was a page navigation (not an
      // image/font/etc.), fall back to the cached app shell rather than
      // showing the browser's own offline error page.
      // Nothing cached: keep waiting for the network rather than failing
      // straight away (2026-10-25, from the Portuguese app - a slow but
      // working connection mid-update showed "vocab.js didn't load").
      if (event.request.mode === 'navigate') return caches.match('./index.html').then((shell) => shell || networkFetch);
      return networkFetch;
    }))
  );
});
