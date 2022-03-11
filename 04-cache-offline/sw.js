// * Guardando el app sell (lo que la pagina necesita para que funcione)
self.addEventListener('install', event => {
    // ? Almacenar / grabar archivos en el cache
    const saveCache = caches.open('cache-1')
        .then(cache => {
            return cache.addAll([
                '/index.html',
                '/css/style.css',
                '/img/main.jpg',
                '/js/app.js',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
            ])
        })
    
    event.waitUntil(saveCache); // esperar a que guarde todo, de lo contrario si necesitamos hacer uso de ejemplo, css, podria tirar error porque aun la promesa no ha terminado
});
