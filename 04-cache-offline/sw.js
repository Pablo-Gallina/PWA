// *Responder un mensaje personalizado cuando no hay conexion a internet
self.addEventListener('fetch', event => {
    // ?Crear una respuesta personalizada


    // TODO respuesta personalizada html (no recomendable mandarlo asi, pero es funcional)
    const offlineResp = new Response(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Mi PWA</title>

    </head>
    <body class="container p-3">
    
    <h1>Offline Mode</h1>
    
    </body>
    </html>
    `, {
        headers: {
            'Content-Type':'text/html'
        }
    });


    // const offlineResp = fetch( 'pages/offline.html' ); // respondera mal, porque debe de hacer un fetch, solucion, guardarlo en el cache

    const resp = fetch(event.request)
                    .catch( () => offlineResp ); // si el fetch falla, retornar una respuesta

    event.respondWith( resp  ); // responder con la respuesta

});