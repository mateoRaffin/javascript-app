document.body.style.backgroundColor = "#E5E4DF";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";

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
     contenedor.id = "miContenedor";
     contenedor.style.display = "flex";
     contenedor.style.justifyContent = "space-around";
     contenedor.style.alignItems = "center";
     contenedor.style.padding = "25px";

     contenedor.innerHTML = `<h1> ${producto.nombre} </h3>
                             <p> Valor: ${producto.precio} </p>
                             <button> ${producto.boton} </button>`;

     let boton = contenedor.querySelector("button");
     boton.style.backgroundColor = "#4D7766";
     boton.style.color = "white";
     boton.style.padding = "5px 7px";
     boton.style.borderRadius = "10px";
     boton.style.fontSize = "15px";

     boton.addEventListener("click", () => {
          agregarProductoAlCarrito(producto);
     });

     document.body.appendChild(contenedor);
}

//Creo la lista
let contieneBtn = document.createElement("div")
contieneBtn.id = "listCarrito";
contieneBtn.style.display = "flex";
contieneBtn.style.justifyContent = "center";

contieneBtn.innerHTML = `<button id="listaCarrito"> Ver Carrito </button>`;
document.body.appendChild(contieneBtn);

//Botón del carrito
const botonCarrito = document.getElementById("listaCarrito");
botonCarrito.style.backgroundColor = "#C6A05A";
botonCarrito.style.fontSize = "15px";

//Lista oculta
const listaProductos = document.createElement("ul");
listaProductos.id = "listaProductos";
listaProductos.style.display = "none";
listaProductos.style.textAlign = "left";
listaProductos.style.fontSize = "18px";
listaProductos.style.color = "#333";
listaProductos.style.marginTop = "20px";
listaProductos.style.padding = "10px";

document.body.appendChild(listaProductos);
//Mostrar/ocultar lista
function mostrarOcultarLista() {
     const lista = document.getElementById("listaProductos");
     lista.style.display = lista.style.display === "none" ? "block" : "none";
}

//Mostrar el total
const totalElement = document.createElement("p");
totalElement.id = "total";
totalElement.style.textAlign = "left";
totalElement.style.marginTop = "20px";
totalElement.style.padding = "10px";
totalElement.style.fontSize = "18px";
totalElement.style.color = "#333";
document.body.appendChild(totalElement);

//Evento mostrar/ocultar lista
botonCarrito.addEventListener("click", mostrarOcultarLista);

let total = 0;
//Agregar un producto al Carrito
function agregarProductoAlCarrito(producto) {
     const nuevoItem = document.createElement("li");
     nuevoItem.innerText = `Producto: ${producto.nombre} | Precio: ${producto.precio}`;
     nuevoItem.style.listStyle = "none";
     nuevoItem.style.textAlign = "left";
     nuevoItem.style.marginTop = "5px";
     nuevoItem.style.padding = "5px";
     nuevoItem.style.fontSize = "18px";

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
