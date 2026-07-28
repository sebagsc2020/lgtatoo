const CACHE_NAME = 'lgtattoo-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/images/LogoLGTatoo.png',
  '/images/1.webp', '/images/2.webp', '/images/3.webp',
  '/images/4.webp', '/images/5.webp', '/images/6.webp',
  '/images/7.webp', '/images/8.webp', '/images/9.webp',
  '/images/10.webp', '/images/11.webp', '/images/12.webp',
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => new Response('Offline - No se pudo cargar el contenido'))
  );
});
