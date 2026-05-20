import { catalogo } from './catalogo.js';

console.log(`
        ********************************
            Bienvenidos a CAFEINABLE
        ********************************
`);

export function mostrarMenu() {
    console.log("=== MENÚ COMPLETO ===");
    catalogo.forEach(producto => {
        const estado = producto.disponible ? "Disponible" : "Agotado";
        console.log(`[${producto.categoria}] ${producto.nombre} - $${producto.precio} (${estado})`);
    });
    console.log("=====================\\n");
}

export function mostrarPromociones() {
    console.log("=== PROMOCIONES DEL DÍA (20% OFF) ===");

    // map() retorna un NUEVO arreglo
    const promociones = catalogo.map(producto => {
        return {
            ...producto, // Spread operator para copiar propiedades
            precioPromocion: (producto.precio * 0.8).toFixed(2)
        };
    });

    promociones.forEach(promo => {
        console.log(`${promo.nombre}: Baja de $${promo.precio} a SOLO $${promo.precioPromocion}`);
    });
    console.log("=====================================\\n");
}
export function mostrarDisponibles() {
    console.log("=== PRODUCTOS DISPONIBLES ===");

    const disponibles = catalogo.filter(producto => producto.disponible === true);

    disponibles.forEach(producto => {
        console.log(`${producto.nombre} - $${producto.precio} (${producto.categoria})`);
    });
    console.log("=============================\\n");
}
mostrarMenu();
mostrarPromociones();
mostrarDisponibles();
