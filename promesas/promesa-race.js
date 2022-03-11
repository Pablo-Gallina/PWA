const sumarLento = num => 
    new Promise((resolve, reject) => 
        setTimeout(() =>
            resolve(num + 1) 
        , 800));

const sumarRapido = num => 
    new Promise((resolve, reject) => 
        setTimeout(() =>
            resolve(num + 1) 
        , 300));

// Recibe un arreglo, este arreglo contiene las promesas a colocar a carrera
Promise.race([sumarLento(5), sumarRapido(6)]) // retorna el que se ejecuta mas rapido, y en caso de que ambos finalizen igual, retorna el de la izquierda
    .then(console.log) //retorna un array
    .catch(console.log); //en caso de que una promesa finaliza mas rapido que la otra, y la otra este con error, el catch no se ejecuta, pero si la promesa que finaliza mas rapido tiene algun error, el catch se ejecuta, y la otra promesa aunque este bien no se ejecuta y termina el proceso