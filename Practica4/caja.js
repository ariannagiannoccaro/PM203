import { catalogo } from "./catalogo.js"

let total = 0
let pedidos = []


export function agregarPedido(id, cantidad) {
    let producto = catalogo.find(p => p.id === id)
    
    
    if (!producto) {
        console.log("Error: Producto no encontrado")
        return
    }

    
    if (producto.Disponible === false) {
        console.log("Error: El producto " + producto.nombre + " no esta disponible (Agotado).")
        return
    }

    let subtotal = producto.precio * cantidad
    total += subtotal

    const pedido = {
        id: pedidos.length + 1,
        nombre: producto.nombre,
        cantidad: cantidad,
        subtotal: subtotal
    }

    pedidos.push(pedido)
    console.log("Agregado: " + producto.nombre + " x" + cantidad + " - $" + subtotal)
}

export function obtenerPedidos() {
    return pedidos;
}

function notificarPedidoListo(pedido) {
    console.log("\nNOTIFICACION: El pedido #" + pedido.id + " (" + pedido.nombre + ") ESTA LISTO")
}


export function cancelarPedido(idPedido, callback) {
    const index = pedidos.findIndex(p => p.id === idPedido)

    if (index !== -1) {
        const pedidoCancelado = pedidos[index]
        pedidos.splice(index, 1)
        total -= pedidoCancelado.subtotal

        console.log("Pedido #" + idPedido + " ha sido cancelado")

        if (callback) {
            callback(pedidoCancelado)
        }
    } else {
        console.log("Error: Pedido no encontrado")
    }
}


function notificarPedidoCancelado(pedido) {
    console.log("NOTIFICACION: El pedido #" + pedido.id + " (" + pedido.nombre + ") fue CANCELADO")
}


export function mostrarPedidos() {
    if (pedidos.length === 0) {
        console.log("No hay pedidos aun.")
        return
    }
    console.log("=== LISTA DE PEDIDOS ===")
    pedidos.forEach((p, i) => {
        console.log((i + 1) + ". " + p.nombre + " x" + p.cantidad + " - $" + p.subtotal)
    })
}


export function calcularTotales() {
    const subtotal = pedidos.reduce((acum, pedido) => {
        return acum + pedido.subtotal
    }, 0)

    const iva = subtotal * 0.16
    const totalFinal = subtotal + iva

    const { subtotal: sub, iva: impuesto, total: totalConiva } = {
        subtotal,
        iva,
        total: totalFinal
    }

    console.log("\n=== TOTALES ===")
    console.log("Subtotal: $" + sub.toFixed(2))
    console.log("IVA: $" + impuesto.toFixed(2))
    console.log("Total: $" + totalConiva.toFixed(2))
    console.log("===============")
}


export function reiniciarCaja() {
    pedidos = []
    total = 0
    console.log("Caja reiniciada.")
}