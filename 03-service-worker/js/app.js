

// Detectar si podemos usar Service Workers
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js')
    .then( reg => { // Promesa de instalcion del sw
        // * Registro de una tarea asincrona cuando no tenemos internet
        // setTimeout(() => {
        // ? Cuando se recupere la conexiona a internet, realiza la peticion
        // emular una peticion sincrona
        //     reg.sync.register('posteo-gatitos'); // Cuando recuperamos la conexion se hace el posteo (sin conexion esto no se ejecuta y pasa al siguiente)
        //     console.log('Se enviaron fotos de gatitos al server');

        // }, 3000);

        // Ejemplo de un push notification
        Notification.requestPermission().then( result => {
    
            console.log(result);
            reg.showNotification('Hola Mundo!');
            
    
        });

    });
}

fetch('https://reqres.in/api/users/2')
    .then( res => res.text())
    .then( console.log );