

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}

// validacion si el cache funcina, normalmente si el sw paso, este tambien, asi que esta validacion se puede saltar
if ( window.caches ) {
    // funcion propia de window y no del sw
    caches.open('prueba-1'); // Guardando / generando cache
    caches.has('prueba-2').then(console.log) // Verificar si existe el cache prueba-2, TRUE o FALSE
    caches.delete('prueba-2').then(console.log) // Eliminar el cache
    
    // * usar / abrir cache, para poder trabajar con el cache
    caches.open('cache-v1.1').then(cache => {
        // cache.add('/index.html'); // agregar el archivo index.html al cache-v1.1

        // almacenar varios archivos en el cache
        cache.addAll([
            '/index.html',
            '/css/style.css',
            '/img/main.jpg',
        ]).then( () => {
                // retorna una promesa, despues de grabar todo, aca podemos eliminar el cache o buscar ciertos archivos, etc...

                //? remplazar un archivo del cache por otro
                cache.put('index.html', new Response('Hola mundo')); // sustituyendo el archivo index.html por Hola mundo
            }
        )

        cache.match('index.html')
            .then(res => {
                res.text().then( console.log);
            })
    })
}

// * retorna todos los caches que existen
caches.keys()
    .then(console.log);