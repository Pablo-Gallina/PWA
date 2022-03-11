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

// Ejecuta 2do
sumarLento(5)
    .then(console.log);
//Ejecuta 1ro
sumarRapido(7)
    .then(console.log); 

// Recibe un arreglo, este arreglo puede contener cualquier tipo de variable(int, string, funcion, etc...)
Promise.all([sumarLento(5), sumarRapido(7)]) //Ejecuta en orden, aunque el sumarLento tarde mas que el sumar rapido, este siempre ejecutara, segun le mandemos
    .then(console.log) // Retornara un arreglo
    .catch(console.log); // Si x-1 promesas se resolvieron pero solo 1 no, se ejecuta la exepcion y termina el proceso