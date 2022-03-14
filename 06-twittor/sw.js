importScripts('js/sw-utils.js');

const CACHE_STATIC_NAME  = 'static-v1'; // Lo del app sell
const CACHE_DYNAMIC_NAME = 'dynamic-v1'; // Contenido dinamico
const CACHE_INMUTABLE_NAME = 'inmutable-v1'; // Lo que nunca va a cambiar

const APP_SHELL = [
    '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js',
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    // 'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js',
];

self.addEventListener('install', e => {
    const cacheStatic = caches.open( CACHE_STATIC_NAME ).then(cache => 
        cache.addAll( APP_SHELL ));
    const cacheInmutable = caches.open( CACHE_INMUTABLE_NAME ).then(cache => 
        cache.addAll( APP_SHELL_INMUTABLE ));

    e.waitUntil( Promise.all([ cacheStatic, cacheInmutable ])  );
});

self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if (  key !== CACHE_STATIC_NAME && key.includes('static') ) {
                return caches.delete(key);
            }

            // if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
            //     return caches.delete(key);
            // }

        });

    });

    e.waitUntil( respuesta );

});

// Cache only
self.addEventListener( 'fetch', e => {
    const respuesta = caches.match( e.request ).then( res => {
        if ( res ) {
            return res;
        } else {
            return fetch( e.request ).then( newRes => {
                return actualizaCacheDinamico( CACHE_DYNAMIC_NAME, e.request, newRes );
            });
        }
    });

    e.respondWith( respuesta );
});