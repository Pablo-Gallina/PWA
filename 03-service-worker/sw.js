
// Ciclo de vida del SW

//* Cuando el service worker se installa
self.addEventListener('install', e => {
    // el evento install, se dispara cada vez que exista algun cambio
    // se usa para, descargar assets, crear un cache, etc...
    console.log("SW Instalando...");

    // que el sw se active y no lo tengamos que hacer manualmente
    // todo no recomendable
    // self.skipWaiting();

    // * Esperar a que se termine de instalar / configurar x procesos
    const instalacion = new Promise( (resolve, reject) => {
        setTimeout(() => {
            console.log('SW: Instalaciones terminadas');
            self.skipWaiting();
            resolve();
        }, 1);

    });
    // hasta que no se terminen las instalaciones, el sw no se activa
    e.waitUntil(instalacion); // Resibe una promesa
})

//* Cuando el service worker toma el control de la aplicación (instala)
self.addEventListener('activate', e => {
    // el evento install, se dispara cada vez que exista algun cambio
    // se usa para, borrar cache viejo
    console.log("Activo para tomar el control de la app");
})

// * FETCH: Manejo de peticiones HTTP / manipular el fetch
self.addEventListener('fetch', event => {

    // // Aplicar estrategias del cache
    // console.log( 'SW:', event.request.url );
    // // modificar un fetch en especifico
    // if ( event.request.url.includes('https://reqres.in/') ) {
    //     const resp = new Response(`'{ ok: false, mensaje: 'jajaja'}`);
    //     event.respondWith( resp );

    // }

});

// * SYNC: Recuperamos la conexión a internet
self.addEventListener('sync', event => {
    // se ejecuta cuando recuperamos la conexión
    console.log('Tenemos conexión!');
    console.log(event);
    // tag es lo que posteamos cuando, index db, (si hacemos una peticion y no tenemos conexion, aca pasa todo eso)
    console.log(event.tag);

});

// * PUSH: Manejar las push notifications
self.addEventListener('push', event => {
    // se ejecuta cada vez que recibamos alguna notificacino
    console.log('Notificacion recibida');


});
