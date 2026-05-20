import { catalogo } from "./catalogo.js";

let total = 0;
let pedidos = [];

export function agregarPedido(id, cantidad) {
    let producto = catalogo.find(p => p.id === id);
    if (producto) {
        let subtotal = producto.precio * cantidad;
        total += subtotal;
        pedidos.push({ nombre: producto.nombre, cantidad, subtotal });
        console.log(`Agregado: ${producto.nombre} x${cantidad} - $${subtotal}`);
    }
}

export function mostrarPedidos() {
    console.log("=== LISTA DE PEDIDOS ===");
    pedidos.forEach((p, i) => console.log(`${i + 1}. ${p.nombre} x${p.cantidad} - $${p.subtotal}`));
    console.log("TOTAL: $" + total);
}