const sumarUno = (numero) => {
    const promesa = new Promise((reslove, reject) => {
        console.log(numero);
        if (numero > 7) {
            reject("el numero es demasiado grande")
        }
        setTimeout(() => {
            reslove(numero + 1);
        }, 800);
    });

    return promesa;
};

sumarUno(5)
    .then(sumarUno) //6
    .then(sumarUno) //7 error
    .then(sumarUno) //8
    .then(sumarUno) //9
    .catch(e => console.error(e))