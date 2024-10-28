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

let productos = [];

async function fetchProducts() {
    try {
        const response = await fetch('./productos.json');
        if (!response.ok) throw new Error('Error al cargar los productos');
        productos = await response.json();
        displayProducts(productos);
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}
fetchProducts();

//Mostrar productos
function displayProducts(productos) {
    contenedorProductos.innerHTML = "";
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

//Agregar productos al carrito
function agregarAlCarrito(productoId) {
    const productoExistente = carrito.find(item => item.id === productoId);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        const producto = productos.find(item => item.id === productoId);
        if (producto) carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarContadorCarrito();
    Swal.fire({
        icon: "success",
        title: "Producto agregado",
        text: "El producto ha sido agregado al carrito.",
        timer: 1200,
        timerProgressBar: true,
        showConfirmButton: false
    });
}

//Botón+
function aumentarCantidad(productoId) {
    const producto = carrito.find(item => item.id === productoId);
    if (producto) {
        producto.cantidad += 1;
        actualizarContadorCarrito();
        mostrarProductosEnCarrito();
    }
}
//Botón-
function disminuirCantidad(productoId) {
    const producto = carrito.find(item => item.id === productoId);
    if (producto) {
        if (producto.cantidad > 1) {
            producto.cantidad -= 1;
        } else {
            eliminarProducto(productoId);
        }
        actualizarContadorCarrito();
        mostrarProductosEnCarrito();
    }
}

//Eliminar un producto del carrito
function eliminarProducto(productoId) {
    const index = carrito.findIndex(item => item.id === productoId);
    if (index > -1) {
        carrito.splice(index, 1);
        actualizarContadorCarrito();
        mostrarProductosEnCarrito();
    }
}

//Contador del carrito
function actualizarContadorCarrito() {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.getElementById("contadorCarrito").textContent = totalCantidad;
}

//Mostrar productos en el carrito
function mostrarProductosEnCarrito() {
    let htmlCarrito = '';
    let total = 0;
    if (carrito.length === 0) {
        htmlCarrito += "<p>Tu carrito está vacío.</p>";
    } else {
        carrito.forEach((producto) => {
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;
            htmlCarrito += `
                <div id="car-Cont">
                    <span id="car-Prod">${producto.nombre} - $${producto.precio} - Cantidad: ${producto.cantidad} - <br>Subtotal: $${subtotal.toFixed(2)}</span>
                    <div id="cont-Mod">
                        <button id="car-menos" onclick="disminuirCantidad(${producto.id})">-</button>
                        <button id="car-mas" onclick="aumentarCantidad(${producto.id})">+</button>
                        <button id="car-delete" onclick="eliminarProducto(${producto.id})">Eliminar</button>
                    </div>
                </div>
            `;
        });
        htmlCarrito += `<h4>Total: $${total.toFixed(2)}</h4>`;
    }
    Swal.fire({
        title: "Tu Carrito",
        html: htmlCarrito,
        showCancelButton: true,
        confirmButtonText: "Comprar",
        cancelButtonText: "Seguir Comprando",
        focusConfirm: false,
    }).then((result) => {
        if (result.isConfirmed) {
            mostrarModalCompra();
        }
    });
}

const logoCarrito = document.getElementById("logoCarrito");
logoCarrito.addEventListener("click", mostrarProductosEnCarrito);
//Carrito vacío
document.getElementById("btnBag").addEventListener("click", () => {
    mostrarProductosEnCarrito();
    if (carrito.length === 0) {
        Swal.fire({
            icon: "info",
            title: "Carrito vacío",
            text: "No tienes productos en el carrito"
        });
        return;
    }
});

//Remover un producto
function removerDelCarrito(productoId) {
    carrito = carrito.filter(producto => producto.id !== productoId);
    actualizarContadorCarrito();
    mostrarProductosEnCarrito();
}

//Botón de comprar
const comprarButton = document.createElement("button");
comprarButton.id = "comprarButton";
comprarButton.textContent = "Comprar";
document.body.appendChild(comprarButton);
comprarButton.addEventListener("click", mostrarModalCompra);

function mostrarModalCompra() {
    if (carrito.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Carrito vacío",
            text: "No tienes productos en el carrito para comprar."
        });
        return;
    }
    let resumen = carrito.map(item => `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`).join("<br>");
    const total = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0).toFixed(2);
    Swal.fire({
        title: "Completa tus datos",
        html: `
            <input id="nombreUsuario" class="swal2-input" placeholder="Nombre">
            <input id="emailUsuario" class="swal2-input" placeholder="Email">
            <input id="numeroUsuario" class="swal2-input" placeholder="Número de Teléfono">
            <input id="direccionUsuario" class="swal2-input" placeholder="Dirección">
            <input id="codigoPostalUsuario" class="swal2-input" placeholder="Código Postal">
        `,
        showCancelButton: true,
        confirmButtonText: "Confirmar compra",
        preConfirm: () => {
            const nombre = Swal.getPopup().querySelector("#nombreUsuario").value;
            const email = Swal.getPopup().querySelector("#emailUsuario").value;
            const numero = Swal.getPopup().querySelector("#numeroUsuario").value;
            const direccion = Swal.getPopup().querySelector("#direccionUsuario").value;
            const codigoPostal = Swal.getPopup().querySelector("#codigoPostalUsuario").value;
            if (!nombre || !email || !numero || !direccion || !codigoPostal) {
                Swal.showValidationMessage("Por favor, completa todos los campos");
                return false;
            }
            return { nombre, email, numero, direccion, codigoPostal };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Compra realizada",
                html: `
                    <p id="p-Thanks">¡Gracias por tu compra, ${result.value.nombre}!</p>
                    <h4 id="resumen">Resumen de tu compra:</h4>
                    ${resumen}
                    <h4 id="total-Car">Total: $${total}</h4>
                    <p id="p-Cods">"El código de seguimiento será enviado a tu correo."</p>
                `,
                icon: "success"
            });
            carrito.length = 0;
            actualizarContadorCarrito();
        }
    });
}