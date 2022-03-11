const CACHE_NAME = 'cache-1';
const CACHE_STATIC_NAME  = 'static-v2'; // Lo del app sell
const CACHE_DYNAMIC_NAME = 'dynamic-v1'; // Contenido dinamico
const CACHE_INMUTABLE_NAME = 'inmutable-v1'; // Lo que nunca va a cambiar

const CACHE_DYNAMIC_LIMIT = 1;

// Limpoiar el cache y dejarlo con un limite de elementos a cachear
function limpiarCache( cacheName, numeroItems ) {
    // Abrir el cacheName
    caches.open( cacheName )  //retorna una promesa
        .then( cache => {

            return cache.keys()
                .then( keys => {
                    // Si en el cache existen mas de "numeroItems", entonces elimina los restantes
                    if ( keys.length > numeroItems ) {
                        // Eliminar el cache
                        cache.delete( keys[0] )
                            .then( limpiarCache(cacheName, numeroItems) ); // Volver a ejecutra la funcion hasta que hallas eliminado todos los excedentes
                    }
                });

            
        });
}
// * Guardando el app sell (lo que la pagina necesita para que funcione)
self.addEventListener('install', event => {
    // ? Almacenar / grabar archivos en el cache
    const saveCacheStatic = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/pages/offline.html',
                '/css/style.css',
                '/img/main.jpg',
                '/img/no-img.jpg',
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

//* Eliminar el cache viejo cuando exista uno nuevo
self.addEventListener('activate', e => {
    // activate se dispara cuando la instalacion termine (waitUntil termine)
    const respuesta = caches.keys().then( keys => { // Verific ar si algun cache ya existe
        // recorrer todos los caches
        keys.forEach( key => {
            // solo limpiar el cache CACHE_STATIC_NAME
            // si el key es diferente del CACHE_STATIC_NAME e incluye la palabra static, sino borrara los demas caches
            if (  key !== CACHE_STATIC_NAME && key.includes('static') ) {
                return caches.delete(key); // eliminar el cache que viejo
            }
        });
    });
    e.waitUntil( respuesta );
});

/* // * --------------- 2 Estrategias del cache: Cache with network fallback
    Intenta primero el cache, y si no encuentras el archivo en el cache, ve al internet
*/

self.addEventListener('fetch', e => {
    // 1 Primero verificar si el archivo existe en el cache
    const respuesta = caches.match(e.request)
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
                            limpiarCache( CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT );
                        })
                    
                    return newResponse.clone();
                })
                // Manejar el error fetch, si lo buscado no esta en el cache y no se pude acceder a la web
                .catch( err => {
                    // si es una pagina web (con el "acept" se comprueba eso, con esto podemos comprobar si es css, img, etc...)
                    if ( e.request.headers.get('accept').includes('text/html') ) {
                        return caches.match('/pages/offline.html');
                    }
                });
    
        });
    e.respondWith(respuesta);
})

//!Problemas con el Cache with network fallback, las peticiones (archivos dinamicos) se mesclan con el app Shell, Solucion: separar el caches