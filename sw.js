const CACHE_NAME = 'lgtattoo-v2'; // ← Cambia la versión para forzar actualización

// Solo cachea recursos críticos que no fallen
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/images/LogoLGTatoo.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Las imágenes se cachean bajo demanda (cuando se visitan), no en la instalación
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Solo cachea assets críticos, NO las imágenes de una vez
        return cache.addAll(CRITICAL_ASSETS).catch(err => {
          console.warn('Algunos assets no se pudieron cachear:', err);
        });
      })
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
  // Solo intercepta peticiones GET
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Devuelve del caché si existe
        if (cachedResponse) return cachedResponse;
        
        // Si no está en caché, va a la red y la guarda para después
        return fetch(event.request).then(response => {
          // No cachear respuestas que no sean OK
          if (!response || response.status !== 200) return response;
          
          // Clonar la respuesta para guardarla en caché
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          
          return response;
        }).catch(() => {
          // Si falla la red y es una imagen, podrías devolver un placeholder
          // return caches.match('/images/placeholder.webp');
        });
      })
  );
});
