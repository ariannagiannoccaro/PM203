//vista del lado del servidor
console.log("Hola Mundo js desde el servidor");

//medir el tiempo del proceso
console.time("miProceso");

for(let i =0; i < 1000000; i++){}

console.timeEnd("miProceso");


//objetos tipo tabla
let usuarios = [
    {nombre: "Arianna", edad: 21},
    {nombre: "Tatis", edad: 23},
];

console.table(usuarios); //muestra la informacion como tabla
    
