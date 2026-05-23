import { catalogo } from './catalogo.js';
import { agregarPedido, mostrarPedidos, calcularTotales, reiniciarCaja } from './caja.js';
import { obtenerProductosBaratos, obtenerProductosCaros, obtenerBebidas, obtenerSnacks } from './crud.js';
import { createInterface } from 'readline';
import { mostrarMenu } from './crud.js';
import { prepararEnCocina } from './cocina.js';

const rl = createInterface({ input: process.stdin, output: process.stdout });
const preguntar = (msg) => new Promise(r => rl.question(msg, r));



export function mostrarPromociones() {
    console.log("\n=== PROMOCIONES DEL DÍA (20% OFF) ===");
    const promociones = catalogo.map(producto => {
        return {
            ...producto,
            precioPromocion: (producto.precio * 0.8).toFixed(2)
        };
    });

    promociones.forEach(promo => {
        console.log(`${promo.nombre}: Baja de $${promo.precio} a SOLO $${promo.precioPromocion}`);
    });
    console.log("=====================================\n");
}

export function mostrarDisponibles() {
    console.log("\n=== PRODUCTOS DISPONIBLES ===");
    const disponibles = catalogo.filter(producto => producto.Disponible === true);

    disponibles.forEach(producto => {
        console.log(`${producto.nombre} - $${producto.precio} (${producto.categoria})`);
    });
    console.log("=============================\n");
}

async function menuFiltros() {
    console.log("\n=== SELECCIONE UN FILTRO ===");
    console.log("1. Productos Baratos (<= $5)");
    console.log("2. Productos Caros (> $5)");
    console.log("3. Bebidas");
    console.log("4. Snacks");
    console.log("5. Regresar al menú principal");

    let op = await preguntar("Seleccione una opción de filtro: ");
    let filtrados = [];
    let titulo = "";

    switch (op) {
        case '1':
            filtrados = obtenerProductosBaratos();
            titulo = "PRODUCTOS BARATOS (<= $5)";
            break;
        case '2':
            filtrados = obtenerProductosCaros();
            titulo = "PRODUCTOS CAROS (> $5)";
            break;
        case '3':
            filtrados = obtenerBebidas();
            titulo = "CATEGORÍA: BEBIDAS";
            break;
        case '4':
            filtrados = obtenerSnacks();
            titulo = "CATEGORÍA: SNACKS";
            break;
        case '5':
            return;
        default:
            console.log("Opción no válida.");
            return;
    }

    console.log(`\n=== ${titulo} ===`);
    if (filtrados.length === 0) {
        console.log("No se encontraron productos.");
    } else {
        filtrados.forEach(p => {
            const estado = p.Disponible ? "Disponible" : "Agotado";
            console.log(`[${p.id}] ${p.nombre} - $${p.precio} (${estado})`);
        });
    }
    console.log("=====================\n");
}

async function estadoPedido() {
    console.log("\n[Cliente] Pedido recibido. Enviando a cocina...");

    try {
        setTimeout(() => {
            console.log("[Sistema] Estado actualizado: Preparando...");
        }, 1500);
        
        setTimeout(() => {
            console.log("[Sistema] Estado actualizado: Empacando...");
        }, 3000);

        const resultado = await prepararEnCocina([{ nombre: 'Pedido actual' }]);
        
        console.log(`\n[Cliente] Éxito: ${resultado.mensaje}`);
        console.log("[Cliente] Pedido entregado al cliente.");
    } catch (error) {
        console.log(`\n[Error] Ocurrió un problema: ${error.message}`);
        console.log("[Cliente] Pedido cancelado.");
    }
}

async function main() {
    console.log(`
        ********************************
            Bienvenidos a CAFEINABLE
        ********************************
    `);
    console.log("=== MENÚ PRINCIPAL ===");
    mostrarMenu();
    console.log("Otras Opciones:")
    let salir = false;
    while (!salir) {

        console.log("1. Ver productos disponibles");
        console.log("2. Ver promociones del día");
        console.log("3. Filtrar productos");
        console.log("4. Agregar producto al pedido");
        console.log("5. Ver pedido y calcular totales");
        console.log("6. Reiniciar pedido");
        console.log("7. Salir");

        let opcion = await preguntar("Seleccione una opción: ");
        switch (opcion) {
            case '1':
                mostrarDisponibles();
                break;
            case '2':
                mostrarPromociones();
                break;
            case '3':
                await menuFiltros();
                break;
            case '4':
                let id = parseInt(await preguntar("ID del producto: "));
                let cant = parseInt(await preguntar("Cantidad: "));
                if (isNaN(id) || isNaN(cant) || cant <= 0) {
                    console.log("Error: ID o Cantidad inválidos.");
                } else {
                    agregarPedido(id, cant);
                }
                break;
            case '5':
                mostrarPedidos();
                calcularTotales();
                await estadoPedido();
                break;
            case '6':
                reiniciarCaja();
                break;
            case '7':
                salir = true;
                break;
            default:
                console.log("Opción no válida. Intente de nuevo.");
                break;
        }
        console.log("");
    }
    rl.close();
}

main();