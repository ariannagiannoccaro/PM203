import { catalogo } from "./catalogo.js";

export function mostrarMenu() {
    console.table(catalogo);
}

export function obtenerProductosBaratos() {
    return catalogo.filter((p) => p.precio <= 5);
}

export function obtenerProductosCaros() {
    return catalogo.filter((p) => p.precio > 5);
}

export function obtenerBebidas() {
    return catalogo.filter((p) => p.categoria === "Bebida");
}

export function obtenerSnacks() {
    return catalogo.filter((p) => p.categoria === "Snack");
}

export function verificarIngredientes(nombreProducto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const producto = catalogo.find(p => p.nombre.toLowerCase() === nombreProducto.toLowerCase());

            if (!producto) {
                reject({
                    status: "cancelado",
                    tipoError: "falta_ingrediente",
                    mensaje: `Falta de ingrediente: "${nombreProducto}" no se encuentra en nuestro catálogo.`
                });
            } else if (!producto.Disponible) {
                reject({
                    status: "cancelado",
                    tipoError: "falta_ingrediente",
                    mensaje: `Falta de ingrediente: No hay stock o insumos disponibles para preparar "${producto.nombre}".`
                });
            } else {
                resolve({
                    status: "exito",
                    mensaje: `Verificación de ingredientes exitosa para "${producto.nombre}".`
                });
            }
        }, 1500);
    });
}

export function prepararCafe(nombreProducto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const hayFalloCocina = Math.random() < 0.15;

            if (hayFalloCocina) {
                reject({
                    status: "cancelado",
                    tipoError: "error_cocina",
                    mensaje: `Error de cocina: no se puede preparar "${nombreProducto}".`
                });
            } else {
                resolve({
                    status: "exito",
                    mensaje: `¡"${nombreProducto}" ha sido preparado a la perfección y está listo para servir!`
                });
            }
        }, 2500);
    });
}