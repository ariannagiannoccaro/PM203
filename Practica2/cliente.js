import { mostrarProductos } from './crud.js';
import { agregarPedido, mostrarPedidos } from './caja.js';
import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });
const preguntar = (msg) => new Promise(r => rl.question(msg, r));

console.log(`
        ********************************
            Bienvenidos a CAFEINABLE
        ********************************
`);

mostrarProductos();

while (true) {
    let resp = await preguntar('¿Agregar producto? (s/n): ');
    if (resp === 's') {
        let id = parseInt(await preguntar('ID del producto: '));
        let cant = parseInt(await preguntar('Cantidad: '));
        agregarPedido(id, cant);
    } else {
        mostrarPedidos();
        break;
    }
}
rl.close();