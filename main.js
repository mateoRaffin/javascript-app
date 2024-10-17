//NavBar
const navbar = document.createElement("header");
navbar.id = "navBar"
navbar.innerHTML = `<a class="link-index" href="./index.html"><h1 class="titulo-nav">Mundo Gráfico</h1></a>
                    <button id="btnBag">
                    <img id="logoCarrito" src="./multimedia/carrito/carro-compras.png" alt="Logo Carrito de compras">
                    <span id="contadorCarrito"></span>
                    </button>`;
document.body.appendChild(navbar);

let carrito = [];
let total = 0;
//Crear Carrito
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

//Productos.json + fetch
const URL = "productos.json"
const cargarProductos = async () => {
     try {
          const resp = await fetch(URL);
          if (!resp.ok) {
               throw new Error("Error al cargar los productos.")
          }
          const productos = await resp.json();
          losProductos(productos);
     } catch (error) {
          Swal.fire({
               icon: "error",
               title: "Oops...",
               text: "Hubo un problema al cargar los productos. Inténtelo nuevamente."
          });
     } finally{contenedor.innerHTML};
};

function losProductos(productos) {
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
     }
};

//Agregar un producto al Carrito
function agregarProductoAlCarrito(producto) {
     carrito.push(producto);
     actualizarContador();
     const nuevoItem = document.createElement("li");
     nuevoItem.id = "nuevoItem";
     nuevoItem.innerText = `Producto: ${producto.nombre} | 
                            Precio: $${producto.precio}`;
     listaProductos.appendChild(nuevoItem);
     calcularTotal();
};

//Contador
let productosSeleccionados = 0;
const contadorCarrito = document.getElementById("contadorCarrito");
function actualizarContador() {
     productosSeleccionados++;
     contadorCarrito.textContent = productosSeleccionados;
};

//Calcular Total
const totalCompra = document.createElement("p");
     totalCompra.id = "totalCompra";
     totalCompra.innerText = "Total: $0";
     document.body.appendChild(totalCompra);
function calcularTotal() {
     total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
     totalCompra.innerText = `Total: $${total}`;
}

//Botón Comprar
const botonComprar = document.createElement("button");
botonComprar.id = "comprar";
botonComprar.innerText = "Comprar";
document.body.appendChild(botonComprar);

botonComprar.addEventListener("click", () => {
     if (carrito.length > 0) {
          localStorage.setItem("compras", JSON.stringify(carrito));
          Swal.fire({
               position: "top-end",
               icon: "success",
               title: "¡Gracias por su compra!",
               text: "El código de seguimiento, de su pedido, será enviado a su correo.",
               showConfirmButton: false,
               timer: 2500,
               timerProgressBar: true,
          }).then(setTimeout(() => {
               location.reload();
          }, 2500));
     } else {
          swal.fire({
               icon: "error",
               title: "Carrito vacío",
               text: "Por favor, selecciona los productos antes de realizar la compra",
               timer: 2500,
               timerProgressBar: true,
          });
     }
});
// Cargar los productos al cargar la página
window.onload = cargarProductos;