// self = this, apunta al serviceWorker
self.addEventListener('fetch', e => {
    // fetch, captura todas las peticiones http al servidor (imagenes, css, etc...)
    console.log(e);

    // * Capturando si el evento, es el archivo style.css
    // if (e.request.url.includes('style.css')) {
    //     // lanzar aproposito un error
    //     e.respondWith(null)
    // } else {
    //     // guardar en el sw y realizar le peticion
    //     e.respondWith(fetch(e.request))
    // }

    //* modificando la respuesta de la peticion / modifcando el css
    // if (e.request.url.includes('style.css')) {
    //     // Objeto response, objeto que realiza un fetch
    //     const respuesta = new Response(`
    //         body{
    //             background-color : skyblue;
    //             color: pink;
    //         }
    //     `, {
    //         headers: {
    //             'Content-Type': 'text/css'
    //         }
    //     });

    //     // interceptando el css y respondiendo con el nuevo css
    //     e.respondWith(respuesta)
    // }

    // * interceptando la imagen y cambiandolo por otro
    // if (e.request.url.includes('main.jpg')) {
    //     const nueva_imagen = fetch('/02-service-worker/img/main-patas-arriba.jpg');
    //     e.respondWith(nueva_imagen);
    // }

    // * Manejo de errores
    const resp = fetch( e.request )
        .then( resp => {
            // Ojo, solo en archivos .jpg, si es un css, tambien le enviara el jpg
            return resp.ok ? resp : fetch('/02-service-worker/img/main.jpg');
        });

    
    e.respondWith(resp);
})