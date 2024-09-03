const presupuesto = parseFloat(prompt("Por favor, ingresá tu presupuesto mensual:"));
if (isNaN(presupuesto) || presupuesto <= 0) {
    alert("Ingresaste algún dato no válido. Intentemos nuevamente.");
} else {
    let totalGastos = 0;

    function agregarGasto() {
        const monto = parseFloat(prompt("Ingresá el monto del gasto:"));

        if (!isNaN(monto) && monto > 0) {
            totalGastos += monto;
            verificarPresupuesto();
        } else {
            alert("Monto inválido. Intenta otra vez.");
        }
    }

    function verificarPresupuesto() {
        if (totalGastos > presupuesto) {
            alert("¡Alerta! Has excedido tu presupuesto.\nPresupuesto: " + presupuesto + "\nTotal Gastado: " + totalGastos);
        } else {
            alert("Te mantienes dentro del presupuesto.\nPresupuesto: " + presupuesto + "\nTotal Gastado: " + totalGastos);
        }
    }

    function mostrarResumen() {
        alert("Presupuesto: " + presupuesto + "\nTotal Gastado: " + totalGastos);
    }

    let continuar = true;
    while (continuar) {
        agregarGasto();
        continuar = confirm("¿Quieres agregar otro gasto?");
    }

    mostrarResumen();
}
