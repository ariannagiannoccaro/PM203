// a. corregir el de abajo para usar let y const en lugar de var y que no se reasignen de no ser necesario
/*
var nombre = "Armando";
var edad = 25;

nombre = "Ana María";

var saludo = "hola, " + nombre + ". Tienes " + edad + "años.";
*/

let nombre1 = "Armando";
const edad = 25;

let nombre2 = "Ana María";

let saludo = "hola, " + nombre1 + ". Tienes " + edad + " años";
console.log(saludo);


//b. Convierte esta función tradicional a una arrow function que haga exactamente lo mismo

/*
function cuadrado(numero){
    return numero*numero;
}       
console.log(cuadrado(5));
*/ 

let cuadrado = numero => numero *numero;
console.log('funcion flecha de cuadrado: ' +cuadrado(5));

/* Crear una arrow function llamada saludoPersonalizado que reciba dos parametros
nombre y edad y que retorne una cadena como la siguiente 
hola me llamo isay y tengo 37 años
*/ 

let saludoPersonalizado = (nombre, edad) => 'hola me llamo '+ nombre + ' y tengo ' + edad + ' años';
console.log(saludoPersonalizado('Arianna', 21))

