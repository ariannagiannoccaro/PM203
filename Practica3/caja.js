// this is my part jij

import { catalogo } from "./catalogo.js";

let total = 0;
let pedidos = [];

// Agregar Pedido (tu codigo original con verificacion de disponibilidad)
export function agregarPedido(id, cantidad) {
    let producto = catalogo.find(p => p.id === id);
    if (producto) {
        if (producto.Disponible === false) {
            console.log(`Error: El producto "${producto.nombre}" no está disponible (Agotado).`);
            return;
        }
        let subtotal = producto.precio * cantidad;
        total += subtotal;
        pedidos.push({ nombre: producto.nombre, cantidad, subtotal });
        console.log(`Agregado: ${producto.nombre} x${cantidad} - $${subtotal}`);
    } else {
        console.log("Error: Producto no encontrado");
    }
}

// Mostrar Pedidos (tu codigo original)
export function mostrarPedidos() {
    if (pedidos.length === 0) {
        console.log("No hay pedidos aun.");
        return;
    }
    
    console.log("=== LiSTA DE PEDiDOS ===");
    pedidos.forEach((p, i) => {
        console.log(`${i + 1}. ${p.nombre} x${p.cantidad} - $${p.subtotal}`);
    });
}

// Nueva funcion para calcular subtotal, iVA y total (segun tu diapositiva)
export function calcularTotales() {
    // Usando reduce() para calcular subtotal
    const subtotal = pedidos.reduce((acum, pedido) => {
        return acum + pedido.subtotal;
    }, 0);//

    const iva = subtotal * 0.16
    const totalFinal = subtotal + iva

    // Destructuring
    const { subtotal: sub, iva: impuesto, total: totalConiva } = { 
        subtotal, 
        iva, 
        total: totalFinal 
    };

    console.log("\n=== TOTALES ===")
    console.log("Subtotal: $" + sub.toFixed(2))
    console.log("iVA:      $" + impuesto.toFixed(2))
    console.log("Total:    $" + totalConiva.toFixed(2))
    console.log("===============")
}

// Funcion para reiniciar (util)
export function reiniciarCaja() {
    pedidos = []
    total = 0
    console.log("Caja reiniciada.")
}