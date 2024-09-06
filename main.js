// Declaración de variables globales
let totalGastos = 0;
let listaGastos = []; // Array para almacenar los gastos
let presupuesto = parseFloat(prompt("Por favor, ingresá tu presupuesto mensual:"));

// Función para agregar un gasto
function agregarGasto() {
    const monto = parseFloat(prompt("Ingresá el monto del gasto:"));

    if (!isNaN(monto) && monto > 0) {
        totalGastos += monto;
        listaGastos.push(monto); // Agregar el gasto al array
    } else {
        alert("Monto inválido. Intenta otra vez.");
    }
}

// Función para verificar si se ha excedido el presupuesto
function verificarPresupuesto() {
    if (totalGastos > presupuesto) {
        alert("¡Alerta! Has excedido tu presupuesto.\nPresupuesto: " + presupuesto + "\nTotal Gastado: " + totalGastos);
    } else {
        alert("Te mantienes dentro del presupuesto.\nPresupuesto: " + presupuesto + "\nTotal Gastado: " + totalGastos);
    }
}

// Función para mostrar el resumen
function mostrarResumen() {
    alert("Presupuesto: " + presupuesto + "\nTotal Gastado: " + totalGastos);
    console.log("Lista de gastos:", listaGastos); // Mostrar los gastos en la consola
}

// Función principal que maneja el flujo de la aplicación
function menuOpciones() {
    let continuar = true;

    while (continuar) {
        let opcion = prompt("Elige una opción:\n1. Agregar gasto\n2. Verificar presupuesto\n3. Mostrar resumen\n4. Salir");

        switch (opcion) {
            case '1':
                agregarGasto();
                break;
            case '2':
                verificarPresupuesto();
                break;
            case '3':
                mostrarResumen();
                break;
            case '4':
                continuar = false;
                alert("¡Gracias por usar la calculadora de gastos!");
                break;
            default:
                alert("Opción inválida. Intenta de nuevo.");
        }
    }
}

// Validación inicial del presupuesto
if (isNaN(presupuesto) || presupuesto <= 0) {
    alert("Ingresaste algún dato no válido. Intentemos nuevamente.");
} else {
    menuOpciones(); // Se llama a la función principal si el presupuesto es válido
}
