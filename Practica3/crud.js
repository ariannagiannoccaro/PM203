import { catalogo } from "./catalogo.js";

export function agregarProducto() {
    catalogo.push(producto);
}

export function mostrarProductos() {
    console.table(catalogo);
}

export function eliminarProducto(id) {
    const index = catalogo.findIndex(p => p.id === id);
    if (index !== -1) {
        catalogo.splice(index, 1);
    }

}
