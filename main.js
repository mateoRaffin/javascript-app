//NavBar
const navbar = document.createElement("header");
navbar.id = "navBar"
navbar.innerHTML = `<a class="link-index" href="./index.html">
                        <h1 class="titulo-nav">Mundo Gráfico</h1>
                    </a>
                    <button id="btnBag">
                    <img id="logoCarrito" src="./multimedia/carrito/carro-compras.png" alt="Logo Carrito de compras">
                    <span id="contadorCarrito"></span>
                    </button>`;
document.body.appendChild(navbar);

// Función para cargar productos desde el archivo JSON
async function fetchProducts() {
    try {
        const response = await fetch('./productos.json');
        if (!response.ok) throw new Error('Error al cargar los productos');

        const productos = await response.json();
        displayProducts(productos); // Mostrar productos en la página
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}
// Llamamos a la función al iniciar la página
fetchProducts();

// Función para mostrar productos en la página
function displayProducts(productos) {
    contenedorProductos.innerHTML = ""; // Limpiar el contenedor antes de mostrar los productos

    productos.forEach(producto => {
        const productoElement = document.createElement("div");
        productoElement.classList.add("producto");
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
        `;

        const addButton = document.createElement("button");
        addButton.textContent = "Agregar al carrito";
        addButton.addEventListener("click", () => agregarAlCarrito(producto.id));
        productoElement.appendChild(addButton);

        contenedorProductos.appendChild(productoElement);
    });
}

// Crear el contenedor de productos
const contenedorProductos = document.createElement("section");
contenedorProductos.id = "contenedorProductos";
document.body.appendChild(contenedorProductos);

const carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(productoId) {
    const productoExistente = carrito.find(item => item.id === productoId);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        const producto = productos.find(item => item.id === productoId); // Asumimos que 'productos' está en el alcance global
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarContadorCarrito();
    SweetAlert.fire({
        icon: "success",
        title: "Producto agregado",
        text: "El producto ha sido agregado al carrito.",
        timer: 1500,
        showConfirmButton: false
    });
}

function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById("contadorCarrito");
    const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contadorCarrito.textContent = totalProductos > 0 ? totalProductos : "";
}

// Botón de comprar
const comprarButton = document.createElement("button");
comprarButton.id = "comprarButton";
comprarButton.textContent = "Comprar";
comprarButton.addEventListener("click", mostrarModalCompra);
document.body.appendChild(comprarButton);

function mostrarModalCompra() {
    if (carrito.length === 0) {
        SweetAlert.fire({
            icon: "error",
            title: "Carrito vacío",
            text: "No tienes productos en el carrito para comprar."
        });
        return;
    }

    let resumen = carrito.map(item => `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`).join("\n");

    SweetAlert.fire({
        title: "Completa tus datos",
        html: `<input id="nombreUsuario" class="swal2-input" placeholder="Nombre">
               <input id="emailUsuario" class="swal2-input" placeholder="Email">`,
        showCancelButton: true,
        confirmButtonText: "Confirmar compra",
        preConfirm: () => {
            const nombre = SweetAlert.getPopup().querySelector("#nombreUsuario").value;
            const email = SweetAlert.getPopup().querySelector("#emailUsuario").value;
            if (!nombre || !email) {
                SweetAlert.showValidationMessage("Por favor, completa ambos campos");
                return false;
            }
            return { nombre, email };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            SweetAlert.fire({
                title: "Compra realizada",
                text: `Gracias por tu compra, ${result.value.nombre}!\nResumen de tu compra:\n${resumen}`,
                icon: "success"
            });
            carrito.length = 0; // Vaciar el carrito
            actualizarContadorCarrito();
        }
    });
}

// Escuchar el botón del carrito para mostrar el contenido
document.getElementById("btnBag").addEventListener("click", () => {
    if (carrito.length === 0) {
        SweetAlert.fire({
            icon: "info",
            title: "Carrito vacío",
            text: "No tienes productos en el carrito"
        });
        return;
    }

    // Crear una lista de los productos en el carrito
    let carritoHTML = carrito.map(item => `
        <div class="carrito-item">
            <p>${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}</p>
            <button onclick="eliminarProducto(${item.id})">Eliminar</button>
        </div>
    `).join("");

    SweetAlert.fire({
        title: "Tu carrito",
        html: carritoHTML,
        showCancelButton: true,
        confirmButtonText: "Comprar",
        cancelButtonText: "Seguir comprando"
    });
});

function eliminarProducto(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    actualizarContadorCarrito();
}

