//NavBar
const navbar = document.createElement("header");
navbar.id = "navBar"
navbar.innerHTML = `<a class="link-index" href="./index.html"><h1 class="titulo-nav">Mundo Gráfico</h1></a>
                    <button id="btnBag">
                    <img id="logoCarrito" src="./multimedia/carrito/carro-compras.png" alt="Logo Carrito de compras">
                    <span id="contadorCarrito"></span>
                    </button>`;
document.body.appendChild(navbar);
