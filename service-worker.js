const APP_VERSION = "0.3.0";
const CACHE_NAME = `daruchini-cache-${APP_VERSION}`;
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./jspdf.umd.min.js",
  "./manifest.json",
  "./pwa-72x72.png",
  "./pwa-96x96.png",
  "./pwa-128x128.png",
  "./pwa-144x144.png",
  "./pwa-152x152.png",
  "./pwa-180x180.png",
  "./pwa-192x192.png",
  "./pwa-256x256.png",
  "./pwa-384x384.png",
  "./pwa-512x512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

