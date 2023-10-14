if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready() {
    if (JSON.parse(localStorage.getItem("carrito")) == null) {
        localStorage.setItem("carrito", JSON.stringify([]))
    }
    if (JSON.parse(localStorage.getItem("wish")) == null) {
        localStorage.setItem("wish", JSON.stringify([]))
    }
    let tarjetasProdWish = document.querySelector(".whist");
    if (tarjetasProdWish) { crearListaWish(tarjetasProdWish); };
    let tarjetasProdCart = document.querySelector(".carrito-cont");
    if (tarjetasProdCart) { crearListaCart(tarjetasProdCart); };
    let checkout = document.querySelector("#left-col-cont");
    if (checkout) { irACheckout(checkout); };
}

function crearListaCart(contenedor) {
    let datosCart = JSON.parse(localStorage.getItem("carrito"));
    if (datosCart.length == 0) {
        contenedor.innerHTML = '<div class="vacio"><strong>Carrito Vacio</strong><a href="/products" > Ver Productos </a></div>';
    } else {
        contenedor.innerHTML = htmlHeadCart() + crearTarjetasCart(datosCart) + htmlFootCart();
    }
}

function crearTarjetasCart(productos) {
    let res = productos.reduce((html, p) => html + armarTarjetaCart(p), '');
    return res
}

function htmlHeadCart() {
    let html = '<section class="tarjetas-productos">';
    return html;
}

function htmlFootCart() {
    let datosCart = JSON.parse(localStorage.getItem("carrito"));
    let total = datosCart.reduce((t, p) => t + p.cantidad * p.precio, 0);
    let html = `</section>
    <section class="carrito-total-section">
        <div class="contenedor-total">
            <div class="carrito-seguir-comprar">
                <form action="/products" method="get">
                    <input type="submit" class="seguir-comprando" value="Seguir Comprando">
                </form>
            </div>
            <div class="carrito-total-boton">
                <div class="carrito-total">
                    <label>Total</label>
                    <label id="total">$${total}</label>
                </div>
                <div class="carrito-comprar">
                    <form action="/checkout" method="post">
                        <input type="submit" class="comprar" value="Comprar">
                    </form>
                </div>
            </div>
        </div>
    </section>`;
    return html;
}

function irACheckout(contenedor) {
    let datosCompra = JSON.parse(localStorage.getItem("carrito"));
    if(datosCompra.length!=0) {
        let total=0;
        let itemsHtml = '';
        datosCompra.forEach(function(p){
        itemsHtml += `<div class="item"><div class="img-col"><img src="/images/${p.imagen}" alt="" />
                    </div>
                        <div class="meta-col">
                            <h3> ${p.nombre}</h3>
                            <p class="price">${p.precio * p.cantidad}</p>
                        </div>
                    </div>`;
        total += p.cantidad * p.precio;
        });
        contenedor.innerHTML += itemsHtml+`<p id="total">Total</p><h4 id="total-price"><span>$</span> ${total}</h4>`
    };
}

function armarTarjetaCart(prod) {
    let html = `<article class="tarjeta-producto ${prod.id}">
    <i class="fa fa-trash tacho-basura" aria-hidden="true" onclick="quitarDeCarrito(${prod.id})"></i>
    <div class="tarjeta-producto-cabecera">
        <div class="tarjeta-producto-cabecera-imagen">
            <img src="/images/${prod.imagen}" alt="imagen-producto-1">
        </div>
        <div class="tarjeta-producto-titulo-descripcion">
            <legend>
            ${prod.nombre}
            </legend>
        </div>
    </div>
    <div class="tarjeta-producto-detalle">
        <div class="tarjeta-producto-detalles">
            <div class="tarjeta-producto-detalle-titulos">
                <div class="tarjeta-producto-detalle-item">
                    <label class="cantidad">Cantidad</label>
                    <div class="contador-cantidad">
                        <input type="button" class="contador-cantidad-menos" id="contador-cantidad-menos-${prod.id}"
                        onclick="restar('contador-cantidad-input-',${prod.id}, ${prod.precio})" value="-">
                        <input name="cantidad" type="text" class="contador-cantidad-input" id="contador-cantidad-input-${prod.id}" value="${prod.cantidad}">
                        <input type="button" class="contador-cantidad-mas" id="contador-cantidad-mas-${prod.id}"
                        onclick="sumar('contador-cantidad-input-',${prod.id}, ${prod.precio},${prod.stock})" value="+">
                    </div>
                </div>
                <div class="tarjeta-producto-detalle-item">
                    <label>Precio</label>
                    <label id="precio">
                        $${prod.precio}
                    </label>
                </div>
                <div class="tarjeta-producto-detalle-item">
                    <label>SubTotal</label>
                    <label id="precio" class="subtotal subtotal-${prod.id}">
                        $${prod.precio * prod.cantidad}
                    </label>
                </div>
            </div>
        </div>
    </div>
</article>`
    return html;
}

function crearListaWish(contenedor) {
    let datosWish = JSON.parse(localStorage.getItem("wish"));
    if (datosWish.length == 0) {
        contenedor.innerHTML = htmlWishVacia();
    } else {
        contenedor.innerHTML = htmlHeadWish() + crearTarjetaswish(datosWish) + htmlFootWish();
    }
}

function crearTarjetaswish(productos) {
    let res = productos.reduce((html, p) => html + armarTarjetaWish(p), '');
    return res
}

function htmlHeadWish() {
    let html = '<section class="tarjetas-productos">';
    return html;
}

function htmlWishVacia() {
    let html = '<div class="vacio"><strong>Wishlist Vacia</strong><a href="/products" > Ver Productos </a></div>';
    html += '<section class="tarjetas-productos">';
    return html;
}

function htmlFootWish() {
    let html = '</section><section class="whislist-agregar-section"><div class="contenedor-agregar-todo">';
    html += `<input type="button" class="agregar-todo" onclick="agregarTodoAlCarrito()" value="Agregar Todo">`;
    html += '<i class="fa-solid fa-cart-shopping icon"></i></div></section>';
    return html;
}

function armarTarjetaWish(prod) {
    let html = `<article class="tarjeta-producto ${prod.id}">
    <i class="fa-solid fa-cart-shopping carrito-whislist" onclick="agregarItemDesdeWish(${prod.id})"></i>
    <i class="fa fa-trash tacho-basura" onclick="quitarDeWish(${prod.id})" aria-hidden="true"></i>
    <input type="hidden" name="idProducto" value="${prod.id}">
    <div class="tarjeta-producto-cabecera">
        <div class="tarjeta-producto-cabecera-imagen">
            <img src="/images/${prod.imagen}" alt="imagen-producto-1">
        </div>
        <div class="tarjeta-producto-titulo-descripcion">
            <legend>${prod.nombre}</legend>
            <p>${prod.descripcion}</p>
        </div>
    </div>
    <div class="tarjeta-producto-detalle">
        <div class="tarjeta-producto-detalles">
            <div class="tarjeta-producto-detalle-titulos">
                <div class="tarjeta-producto-detalle-item">
                    <label for="precio">Precio</label>
                    <label id="precio">$ ${prod.precio}</label>
                </div>
            </div>
        </div>
    </div>
</article>`
    return html;
}

function quitarElementoDeLocalStorage(idProd, cont) {
    let contenedor = (JSON.parse(localStorage.getItem(cont)));
    contenedor.forEach((e, i) => { if (e.id == idProd) { contenedor.splice(i, 1) } });
    localStorage.setItem(cont, JSON.stringify(contenedor))
    recargaDatosWishCart()
}

function modificarCantidadProdEnCarrito(idProd, cant) {
    let productosCart = (JSON.parse(localStorage.getItem("carrito")));
    let prodExiste = productosCart.find(p => p.id == idProd);
    if (prodExiste) {
        prodExiste.cantidad = parseInt(cant);
        prodExiste.subtotal = prodExiste.precio * prodExiste.cantidad
        localStorage.setItem("carrito", JSON.stringify(productosCart))
    }
    recargaDatosWishCart()
}

//Carrito
function calcularTotal() {
    const subtotales = [...document.getElementsByClassName("subtotal")];
    const total = document.getElementById('total');

    let totales = subtotales.reduce((tot, ele) => tot + parseFloat(ele.textContent.replace('$', '')), 0)
    total.innerHTML = '$' + totales;
}

function agregarACart(prod, cont) {
    console.log(prod)
    let productoAgregado = {
        id: prod.id,
        nombre: prod.name,
        descripcion: prod.description,
        precio: (typeof prod.price == "string") ? parseFloat(prod.price.replace('$', '')) : prod.price,
        imagen: (prod.image) ? prod.image.replace("/images", "") : prod.imagen.replace("/images", ""),
        cantidad: 1,
        stock: prod.stock,
        subtotal: prod.price
    }
    cont.push(productoAgregado)
    localStorage.setItem("carrito", JSON.stringify(cont))
    console.log("agregarACart ", productoAgregado);
}

//Boton Agregar a carrito
function agregarItemACarritoDesdeWish(prod) {
    console.log("agregarItemACarritoDesdeWish ", prod)
    var productosCart = (JSON.parse(localStorage.getItem("carrito")));
    var prodExiste = productosCart.find(p => p.id == prod.id);
    if (prodExiste) {
        if (prodExiste.stock > prodExiste.cantidad) {
            console.log("agregarItemACarritoDesdeWish EXISTE ", prodExiste)
            prodExiste.cantidad += 1;
            prodExiste.subtotal = prod.precio * prodExiste.cantidad
            localStorage.setItem("carrito", JSON.stringify(productosCart))
        }
    } else {
        console.log("agregarItemACarritoDesdeWish NO EXISTE ", prod);
        let productoAgregado = {
            id: prod.id,
            name: prod.nombre,
            description: prod.descripcion,
            price: (typeof prod.precio == "string") ? parseFloat(prod.precio.replace('$', '')) : prod.precio,
            imagen: prod.imagen.replace("/images", ""),
            cantidad: 1,
            stock: prod.stock,
            subtotal: prod.precio
        }
        agregarACart(productoAgregado, productosCart)
    }
    recargaDatosWishCart()
}

//Boton Agregar a carrito
function agregarItemACarritoDesdeBoton(prod) {
    var productosCart = (JSON.parse(localStorage.getItem("carrito")));
    var prodExiste = productosCart.find(p => p.id == prod.id);
    if (prodExiste) {
        if (prodExiste.stock > prodExiste.cantidad) {
            prodExiste.cantidad += 1;
            prodExiste.subtotal = prod.price * prodExiste.cantidad
            localStorage.setItem("carrito", JSON.stringify(productosCart))
        }
    } else {
        agregarACart(prod, productosCart)
    }
    recargaDatosWishCart()
}

//Icono tacho basura carrito
function quitarDeCarrito(idProd) {
    const element = document.getElementsByClassName(idProd);
    element[0].remove();
    if (document.getElementsByClassName("tarjeta-producto").length === 0) {
        document.getElementsByClassName("carrito-total-section")[0].remove();
        document.getElementsByClassName("tarjetas-productos")[0].innerHTML = `<div class="vacio"><strong>Carrito Vacio</strong>
        <a href="/products" > Ver Productos </a></div>`;
        document.getElementsByClassName("tarjetas-productos")[0].style.flexFlow = "row";
        document.getElementsByClassName("tarjetas-productos")[0].style.fontSize = "24px"
    }
    quitarElementoDeLocalStorage(idProd, "carrito")
    calcularTotal()
    recargaDatosWishCart()
}

//Icono sumar unidad a producto
function sumar(inputId, id, precio, stock) {
    const input = document.getElementById(inputId + id);
    var value = input.value;
    const label = document.getElementsByClassName("subtotal-" + id)[0];
    if(value < stock) {
        value++;
        input.value = value;
        label.innerHTML = "$" + value * precio;
        modificarCantidadProdEnCarrito(id, value);
        calcularTotal()
        recargaDatosWishCart()
    }
    // value++;
    // input.value = value;
    // label.innerHTML = "$" + value * precio;
    // modificarCantidadProdEnCarrito(id, value);
    // calcularTotal()
    // recargaDatosWishCart()
}

//Icono sumar unidad a producto
function restar(inputId, id, precio) {
    const input = document.getElementById(inputId + id);
    var value = input.value;
    const label = document.getElementsByClassName("subtotal-" + id)[0];
    if (value > 1) {
        value--;
    }
    input.value = value;
    label.innerHTML = "$" + value * precio;
    modificarCantidadProdEnCarrito(id, value);
    calcularTotal()
    recargaDatosWishCart()
}

//WishList
function agregarAWish(prod, cont) {
    console.log(prod)
    console.log(cont)
    let productoAgregado = {
        id: prod.id,
        nombre: prod.name,
        descripcion: prod.description,
        precio: prod.price,
        stock: prod.stock,
        imagen: prod.image,
    }
    console.log(productoAgregado)
    cont.push(productoAgregado)
    localStorage.setItem("wish", JSON.stringify(cont))
    recargaDatosWishCart()
}
//Icono Corazon
function agregarItemAWishDesdeIcono(prod) {
    console.log("agregarItemWish ", prod)
    let productosWish = (JSON.parse(localStorage.getItem("wish")));
    let prodExiste = productosWish.find(p => p.id == prod.id);
    if (!prodExiste) { agregarAWish(prod, productosWish) }
}

//Icono tacho basura WishList
function quitarDeWish(idProd) {
    quitarElementoDeLocalStorage(idProd, "wish")
    const element = document.getElementsByClassName(idProd);
    element[0].remove();
    if ((JSON.parse(localStorage.getItem("wish"))).length === 0) {
        document.getElementsByClassName("whislist-agregar-section")[0].remove();
        document.getElementsByClassName("tarjetas-productos")[0].innerHTML = `<div class="vacio" ><strong>Wihslist Vacia</strong><a href="/products" > Ver Productos </a></div>`;
        document.getElementsByClassName("tarjetas-productos")[0].style.flexFlow = "row";
        document.getElementsByClassName("tarjetas-productos")[0].style.fontSize = "24px"
    }
    recargaDatosWishCart()
}

function agregarItemDesdeWish(idProd) {
    let productosWish = (JSON.parse(localStorage.getItem("wish")));
    let prodExiste = productosWish.find(p => p.id == idProd);
    if (prodExiste) {
        prodExiste.cantidad = 1;
        console.log("agregarItemDesdeWish ", prodExiste);
        agregarItemACarritoDesdeWish(prodExiste);
        quitarDeWish(idProd)
    }
}

//Boton Agregar todo
function agregarTodoAlCarrito() {
    [...document.getElementsByClassName("tarjeta-producto")].forEach(element => { agregarItemACarritoDesdeWish(crearProd(element)); quitarDeWish(element.classList[1]) });
    document.getElementsByClassName("whislist-agregar-section")[0].remove();
    document.getElementsByClassName("tarjetas-productos")[0].innerHTML = `<div class="vacio><strong>Wishlist Vacia</strong> <a href="/products" > Ver Productos </a></div>`;
    document.getElementsByClassName("tarjetas-productos")[0].style.flexFlow = "row";
    document.getElementsByClassName("tarjetas-productos")[0].style.fontSize = "24px"
}

function crearProd(e) {
    let productosWish = (JSON.parse(localStorage.getItem("wish")));
    let prodExiste = productosWish.find(p => p.id == e.classList[1]);
    prodExiste.cantidad = 1;
    // let prod = {
    //     id: e.classList[1],
    //     nombre: e.querySelector(".tarjeta-producto-titulo-descripcion legend").innerText,
    //     descripcion: e.querySelector(".tarjeta-producto-titulo-descripcion p").innerText,
    //     precio: e.querySelector("#precio").innerText,
    //     imagen: e.querySelector(".tarjeta-producto-cabecera-imagen img").getAttribute("src"),

    //     cantidad: 1
    // }
    return prodExiste
}