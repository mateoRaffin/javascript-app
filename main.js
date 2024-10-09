let productos = [{
     id: 1,
     nombre: "Resmas",
     precio: 50000,
     boton: "Agregar al carrito",
}, {
     id: 2,
     nombre: "Cuadernos",
     precio: 11700,
     boton: "Agregar al carrito",
}, {
     id: 3,
     nombre: "Tazas",
     precio: 8500,
     boton: "Agregar al carrito",
}, {
     id: 4,
     nombre: "Agendas",
     precio: 7500,
     boton: "Agregar al carrito",
}, {
     id: 5,
     nombre: "Sellos",
     precio: 9000,
     boton: "Agregar al carrito",
},]

for (const producto of productos) {
     let contenedor = document.createElement("div")
     contenedor.id = "contProductos";
     contenedor.innerHTML = `<h1 class="titleProd"> ${producto.nombre} </h1>
                             <p class="valueProd"> Valor: ${producto.precio} </p>
                             <button class="buttonProd"> ${producto.boton} </button>`;

     let boton = contenedor.querySelector("button");
     boton.addEventListener("click", () => {
          agregarProductoAlCarrito(producto);
     });
     document.body.appendChild(contenedor);
}
//Contenedor btn ver carrito
let contieneBtn = document.createElement("div")
// contieneBtn.style.display = "flex";
// contieneBtn.style.justifyContent = "center";

contieneBtn.innerHTML = `<button id="listaCarrito"> Ver Carrito </button>`;
document.body.appendChild(contieneBtn);

//Botón del carrito
const botonCarrito = document.getElementById("listaCarrito");

//Lista oculta
const listaProductos = document.createElement("ul");
listaProductos.id = "listaProductos";
// listaProductos.style.display = "none";
// listaProductos.style.textAlign = "left";
// listaProductos.style.fontSize = "18px";
// listaProductos.style.color = "#333";
// listaProductos.style.marginTop = "20px";
// listaProductos.style.padding = "10px";

document.body.appendChild(listaProductos);
//Mostrar/ocultar lista
function mostrarOcultarLista() {
     const lista = document.getElementById("listaProductos");
     // lista.style.display = lista.style.display === "none" ? "block" : "none";
}

//Mostrar el total
const totalElement = document.createElement("p");
totalElement.id = "total";
// totalElement.style.textAlign = "left";
// totalElement.style.marginTop = "20px";
// totalElement.style.padding = "10px";
// totalElement.style.fontSize = "18px";
// totalElement.style.color = "#333";
document.body.appendChild(totalElement);

//Evento mostrar/ocultar lista
botonCarrito.addEventListener("click", mostrarOcultarLista);

let total = 0;
//Agregar un producto al Carrito
function agregarProductoAlCarrito(producto) {
     const nuevoItem = document.createElement("li");
     nuevoItem.innerText = `Producto: ${producto.nombre} | Precio: $${producto.precio}`;
     // nuevoItem.style.listStyle = "none";
     // nuevoItem.style.textAlign = "left";
     // nuevoItem.style.marginTop = "5px";
     // nuevoItem.style.padding = "5px";
     // nuevoItem.style.fontSize = "18px";

     listaProductos.appendChild(nuevoItem);
     listaProductos.style.textAlign = "left";

     calcularTotal();
}
//Calcular total
function calcularTotal() {
     total = 0;
     const items = listaProductos.querySelectorAll('li');

     items.forEach(item => {
          const precioStr = item.innerText.match(/\d+(\.\d+)?/);
          if (precioStr) {
               total += parseFloat(precioStr[0]);
          }
     });
     totalElement.innerText = `Total: $${total.toFixed(2)}`;
}

//Botón Comprar
const botonComprar = document.createElement("button");
// botonComprar.innerText = "Comprar";
// botonComprar.style.display = "flex";
// botonComprar.style.justifyContent = "center";
// botonComprar.style.width = "10%";
// botonComprar.style.backgroundColor = "#C6A05A";
// botonComprar.style.color = "white";
// botonComprar.style.padding = "10px 15px";
// botonComprar.style.borderRadius = "10px";
// botonComprar.style.fontSize = "18px";
// botonComprar.style.marginTop = "20px";
document.body.appendChild(botonComprar);

//LocalStorage
function guardarEnLocalStorage() {
     const listaItems = listaProductos.querySelectorAll("li");
     localStorage.clear();

     listaItems.forEach((item, index) => {
          const producto = item.innerText.split(' - ')[0].replace("Producto: ", "");
          const precioStr = item.innerText.match(/\d+(\.\d+)?/);
          const precio = parseFloat(precioStr[0]);

          localStorage.setItem(`producto_${index}`, `${producto}: ${precio}`);
     })
}

botonComprar.addEventListener("click", () => {
     guardarEnLocalStorage();
     listaProductos.innerHTML = "";
     totalElement.innerText = "Total: $0.00";
});
