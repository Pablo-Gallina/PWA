const CACHE_NAME = 'cache-1';
const CACHE_STATIC_NAME  = 'static-v1'; // Lo del app sell
const CACHE_DYNAMIC_NAME = 'dynamic-v1'; // Contenido dinamico
const CACHE_INMUTABLE_NAME = 'inmutable-v1'; // Lo que nunca va a cambiar
// * Guardando el app sell (lo que la pagina necesita para que funcione)
self.addEventListener('install', event => {
    // ? Almacenar / grabar archivos en el cache
    const saveCacheStatic = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/img/main.jpg',
                '/js/app.js',
            ])
        })
    
    // CACHE_INMUTABLE_NAME
    const saveCacheInmutable = caches.open(CACHE_INMUTABLE_NAME)
        .then(cache => {
            return cache.addAll([
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
            ])
        })
    
    event.waitUntil(Promise.all([saveCacheInmutable, saveCacheStatic])); // esperar a que guarde todo, de lo contrario si necesitamos hacer uso de ejemplo, css, podria tirar error porque aun la promesa no ha terminado
});


/* // * --------------- 1 Estrategias del cache: Cache only 
    una vez hagamos la instalacion y tengamos los recursos que la pagina web necesita, entonces jamas regresa a la web (!peticiones)
*/

// self.addEventListener('fetch', e => {
//     // lo que este pidiendo en el fetch, responder con
//     e.respondWith(caches.match(e.request)); // si en el cache, encuentra un arachivo que sea igual a la peticion, entonces retorna ese
// })

//!Problemas con el cache only, si no se cambia el sw, el cache jamas se actualizara


/* // * --------------- 2 Estrategias del cache: Cache with network fallback
    Intenta primero el cache, y si no encuentras el archivo en el cache, ve al internet
*/

self.addEventListener('fetch', e => {
    // 1 Primero verificar si el archivo existe en el cache
    caches.match(e.request)
        .then(res => {
            // Si el archivo existe en el cache, reotrnalo
            if (res) return res;

            // No existe el archivo, buscalo en la web
            return fetch(e.request)
                .then(newResponse => {
                    // todas las peticiones que no esten en la app shell, quedaran en el CACHE_DYNAMIC_NAME
                    caches.open(CACHE_DYNAMIC_NAME)
                        .then(cache => {
                            cache.put(e.request, newResponse); // 1 solicitud, 2 lo que contiene la respuesta
                        })
                    
                    return newResponse.clone();
                })
        });
})

//!Problemas con el Cache with network fallback, las peticiones (archivos dinamicos) se mesclan con el app Shell