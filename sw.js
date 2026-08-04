// ============ SERVICE WORKER ============
const CACHE_NAME = 'lgtattoo-v2';
// SOLO LOS ARCHIVOS VITALES. NADA DE IMÁGENES NI FUENTES AQUÍ.
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/images/LogoLGTatoo.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// ============ INSTALACIÓN ============
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cacheando assets críticos');
        return cache.addAll(CRITICAL_ASSETS).catch(err => {
          console.warn('Error cacheando assets críticos:', err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// ============ ACTIVACIÓN ============
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Eliminando caché antigua:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// ============ INTERCEPCIÓN DE SOLICITUDES (ESTRATEGIA CACHE PRIMERO) ============
self.addEventListener('fetch', event => {
  // Solo interceptar peticiones GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Si está en caché, lo devolvemos
        if (cachedResponse) return cachedResponse;

        // Si no está en caché, lo pedimos a la red y lo guardamos
        return fetch(event.request).then(response => {
          // Solo guardar respuestas exitosas
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        }).catch(() => {
          // Si falla todo, devolver algo genérico
          return new Response('Offline', { status: 503 });
        });
      })
  );
});
