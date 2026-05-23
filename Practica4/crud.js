import { catalogo } from "./catalogo.js";

export function agregarProducto() {
    catalogo.push(producto);
}

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