
import { mostrarProductos } from './crud.js'; 
import { agregarPedido} from './caja.js';
import { mostrarTotal} from './caja.js';




console.log(`
        ********************************
            Bienvenidos a CAFEINABLE
        ********************************
`);


mostrarProductos();

while (true){

    console.log('¿Deseas agregar un producto?');
    if (confirm('¿Deseas agregar otro producto?')){
        agregarPedido();
    } else {
        console.log('Terminando compra... ');

        break;
    }


}
