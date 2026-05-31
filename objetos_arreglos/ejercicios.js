//notas de arrays


//array.pop() eliminar el ultimo elemento y lo guarda en una variable
//array.push() agregar elementos al ultimo
//array.shift() elimina el primer elemento y lo guarda en una variable
//array.unshift() agrega elementos al inicio
//array.forEach() recorre todo el array con la sintaxis (elemento, index, array) => {}
//array.filter() recorre todo el array y solo regresa los elementos que cumplan con la condicion, sintaxis (elemento, index, array) => {}
//array.map() recorre todo el array y devuelve un nuevo array con los elementos transformados, sintaxis (elemento, index, array) => {}
//array.find() recorre todo el array y devuelve el primer elemento que cumpla con la condicion, sintaxis (elemento, index, array) => {}
//array.reduce() recorre todo el array y devuelve un valor acumulado, sintaxis (acumulador, elemento, index, array) => {return acumulador + elemento}, valor inicial



/*
a.
1. Tienes el siguiente objeto persona.
2. Extrae los valores de nombre, edad y ciudad usando destructuración.
3. Luego, muestra un mensaje como: "Me llamo Ivan Isay, tengo 37 años y vivo en Qro."

*/
const persona = {
    nombre: "Ivan Isay",
    edad: 37,
    direccion: {
        ciudad: "Qro.",
        pais: "MX"
    }
}; 
//desctructuracion es declarar, luego {}, ponemos las propiedades, y si hay una dentro de otra se 
// toma como otro objeto y pones la propiedad dos puntos y otras {}
const {nombre, edad, direccion:{ciudad}} = persona;
console.log('me llamo '+nombre+', tengo '+ edad + ' años y vivo en ' + ciudad);


/*
b.
Con el siguiente arreglo de productos, realiza lo siguiente:
1. Filtra los productos cuyo precio sea mayor a 1000.
2. Usa .map() para convertir el resultado en un nuevo arreglo con solo los nombres de
esos productos.
*/

const productos = [
    {nombre: 'Laptop', precio: 12000},
    {nombre: 'Mouse', precio: 250},
    {nombre: 'Teclado', precio: 750},
    {nombre: 'Monitor', precio: 3000}
];

const nombres = productos.filter((p)=> p.precio>1000).map((p)=> p.nombre);

console.log(nombres); //laptop y monitor

/*
c.
Ahora con un arreglo de personas, realiza lo siguiente:
1. Usa .find() para buscar a la persona con nombre "Luis".
2. Usa .forEach() para imprimir el nombre de cada persona con su edad.
3. Usa .reduce() para sumar todas las edades y obtener un total.
*/ 


const personas =[
    {nombre:"ana", edad: 22},
    {nombre:"Luis", edad: 35},
    {nombre:"maria", edad: 28}
];

const buscar = personas.find((p) => p.nombre === "Luis");
console.log(buscar);

personas.forEach((p) => console.log('nombre: ' + p.nombre + ', edad: ' + p.edad));


const sumaedades = personas.reduce((acumulador, p) => {return acumulador + p.edad},0);
console.log(sumaedades);



