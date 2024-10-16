const navbar = document.createElement("header");
navbar.id = "navBar"
navbar.innerHTML = `<h1 class="titulo-nav">Mundo Gráfico</h1>
                    <button id="btnBag">
                    <img id="logoCarrito" src="./multimedia/carrito/bag-smile-white.svg" alt="Logo Carrito de compras">
                    <span id="contadorCarrito"></span>
                    </button>`;
document.body.appendChild(navbar);

//Lista del Carrito
const listaProductos = document.createElement("ul");
listaProductos.id = "listaProductos";
document.body.appendChild(listaProductos);

//Mostrar/Ocultar carrito
btnBag.addEventListener("click", () => {
     if (listaProductos.style.display === "none") {
          listaProductos.style.display = "block";
          botonComprar.style.display = "flex";
     } else {
          listaProductos.style.display = "none";
          botonComprar.style.display = "none";
     }
});

//Mostrar el total
const totalCompra = document.createElement("p");
totalCompra.id = "total";
document.body.appendChild(totalCompra);

//Botón Comprar
const botonComprar = document.createElement("button");
botonComprar.id = "comprar";
botonComprar.innerText = "Comprar";
document.body.appendChild(botonComprar);

let productos = [
     { id: 1, nombre: "Resmas", precio: 50000, boton: "Agregar", imagen: "./multimedia/img/punax.png" },
     { id: 2, nombre: "Almanaques", precio: 10500, boton: "Agregar", imagen: "./multimedia/img/almanaque.jpeg" },
     { id: 3, nombre: "Tazas", precio: 8500, boton: "Agregar", imagen: "./multimedia/img/tazas-sinfondo-mg.png" },
     { id: 4, nombre: "Bolsas", precio: 7500, boton: "Agregar", imagen: "./multimedia/img/bolsas.png" },
     { id: 5, nombre: "Sellos", precio: 7000, boton: "Agregar", imagen: "./multimedia/img/sello-automatico.png" },
];
for (const producto of productos) {
     let contenedor = document.createElement("div");
     contenedor.id = "contProductos";
     contenedor.innerHTML = `<img src="${producto.imagen}" alt="${producto.nombre}">
                             <h1 class="titleProd"> ${producto.nombre} </h1>
                             <p class="valueProd"> Valor: $${producto.precio} </p>
                             <button class="buttonProd"> ${producto.boton} </button>`;
     let boton = contenedor.querySelector("button");
     boton.addEventListener("click", () => {
          agregarProductoAlCarrito(producto);
     });
     document.body.appendChild(contenedor);
};

let total = 0;
//Agregar un producto al Carrito
function agregarProductoAlCarrito(producto) {
     const nuevoItem = document.createElement("li");
     nuevoItem.id = "nuevoItem";
     nuevoItem.innerText = `Producto: ${producto.nombre} | 
                            Precio: $${producto.precio}`;
     listaProductos.appendChild(nuevoItem);
     listaProductos.style.textAlign = "left";
     calcularTotal();
};

//Contador
let productosSeleccionados = 0;
const contadorCarrito = document.getElementById("contadorCarrito");
function actualizarContador() {
     productosSeleccionados++;
     contadorCarrito.textContent = productosSeleccionados;
};
document.querySelectorAll(".buttonProd").forEach(boton => {
     boton.addEventListener('click', () => {
          actualizarContador();
          Swal.fire({
               text: 'Has agregado un producto al carrito!',
               icon: 'success',
               timer: 800
          });
     });
});

//Calcular Total

botonComprar.addEventListener("click", () => {
     Swal.fire({
          position: "top-end",
          icon: "success",
          title: "¡Gracias por su compra!",
          text: "El código de seguimiento, de su pedido, será enviado a su correo.",
          showConfirmButton: false,
          timer: 3500,
          timerProgressBar: true
     });
});
