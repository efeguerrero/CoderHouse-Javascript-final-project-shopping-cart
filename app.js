/////////////////////////////////////////////////
//////////////DEFINICIÓN DE VARIABLES///////////
///////////////////////////////////////////////

const catalogo = [
  {
    id: 1,
    nombre: 'Alfombra Circular al Telar',
    precio: 2600,
    img_src: './img/productos/item_1.jpeg',
    categoria: 'Alfombras',
  },
  {
    id: 2,
    nombre: 'Alfombra Trama 2x1',
    precio: 4300,
    img_src: './img/productos/item_2.jpeg',
    categoria: 'Alfombras',
  },
  {
    id: 3,
    nombre: 'Alfombra Hello 0.8x0.5',
    precio: 1500,
    img_src: './img/productos/item_3.jpeg',
    categoria: 'Alfombras',
  },
  {
    id: 4,
    nombre: 'Alfombra Recepción Lisa 0.8x0.5',
    precio: 1500,
    img_src: './img/productos/item_4.jpeg',
    categoria: 'Alfombras',
  },
  {
    id: 5,
    nombre: 'Mochila Blanca',
    precio: 3500,
    img_src: './img/productos/item_5.jpeg',
    categoria: 'Mochilas',
  },
  {
    id: 6,
    nombre: 'Mochila Roja',
    precio: 3500,
    img_src: './img/productos/item_6.jpeg',
    categoria: 'Mochilas',
  },
  {
    id: 7,
    nombre: 'Mochila Gris',
    precio: 3500,
    img_src: './img/productos/item_7.jpeg',
    categoria: 'Mochilas',
  },
  {
    id: 8,
    nombre: 'Mochila Azul Oscuro',
    precio: 3500,
    img_src: './img/productos/item_8.jpeg',
    categoria: 'Mochilas',
  },
  {
    id: 9,
    nombre: 'Mochila Azul y Marron',
    precio: 3500,
    img_src: './img/productos/item_9.jpeg',
    categoria: 'Mochilas',
  },
  {
    id: 10,
    nombre: 'Bolso London',
    precio: 7500,
    img_src: './img/productos/item_10.jpeg',
    categoria: 'Bolsos',
  },
  {
    id: 11,
    nombre: 'Tote Bag',
    precio: 3500,
    img_src: './img/productos/item_11.jpeg',
    categoria: 'Carteras',
  },
  {
    id: 12,
    nombre: 'Sombrero Piluso',
    precio: 2600,
    img_src: './img/productos/item_12.jpeg',
    categoria: 'Sombreros',
  },
];

let carrito = [];

/////////////////////////////////////////////////
//////////////DEFINICIÓN DE FUNCIONES///////////
///////////////////////////////////////////////

////////////////Función - Actualizar carrito (añadir y remover items) //////////////

function actualizarCarrito(sku, cantidad) {
  //logica para saber si el item se encuentra en el carrito
  if (carrito.find((producto) => sku === producto.id)) {
    carrito[carrito.findIndex((producto) => producto.id === sku)].cantidad =
      cantidad;
  } else carrito.push({ id: sku, cantidad: cantidad });
  //Elimina del carrito items con cantidad 0
  carrito = carrito.filter((producto) => producto.cantidad > 0);
  //Guardado del carrito en el Local Storage
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

////////////////Función - Borrado total del carrito//////////////////

function borrarCarrito() {
  carrito = [];
  //Guardado del carrito en el Local Storage
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

//////////////// Función - Buscar Precio/Nombre/Img_src desde el Catalogo según id de producto deseado////////////////

function buscarPrecio(sku) {
  const precioSku =
    catalogo[catalogo.findIndex((producto) => producto.id === sku)].precio;
  return precioSku;
}

function buscarNombre(sku) {
  const nombreSku =
    catalogo[catalogo.findIndex((producto) => producto.id === sku)].nombre;
  return nombreSku;
}

function buscarImgsrc(sku) {
  const imgsrc =
    catalogo[catalogo.findIndex((producto) => producto.id === sku)].img_src;
  return imgsrc;
}

//////////////////// Función -  Buscar cantidad de items en carrito según id de producto////////////

function buscarCantidad(sku) {
  //Primero vemos que el item este en el carrito y si está traemos la cantidad ya agregada. De lo contrario devolvemos 0
  if (carrito[carrito.findIndex((producto) => producto.id === sku)]) {
    cantidadSku =
      carrito[carrito.findIndex((producto) => producto.id === sku)].cantidad;
  } else cantidadSku = 0;
  return cantidadSku;
}

////////////////Función - Calcular monto total Carrito/////////////////////////////////////////

//Para cada item del carrito busco su precio en el catalogo mediante la función y luego multiplico por la cantidad total del carrito

function totalCarrito() {
  const total = carrito.reduce(
    (acc, item) => (acc += item.cantidad * buscarPrecio(item.id)),
    0
  );
  return total;
}

////////////Función - Calcular cantidad de items en el carrito//////////////

function itemsEnCarrito() {
  const total = carrito.reduce((acc, item) => (acc += item.cantidad), 0);
  return total;
}

//////////////// Función - Mostrar catalogo --> Armado de array con productos + Cantidad seleccionada para mostrar mediante un Join al finalizar la compra (SACAR EN PROXIMAS ENTREGAS)///////////////////////////////////////

function mostrarCatalogo() {
  const mostrarCatalogo = catalogo.map(
    (item) =>
      `${item.id}. ${item.nombre} - $${
        item.precio
      } - Cantidad seleccionada: ${buscarCantidad(item.id)}`
  );
  return mostrarCatalogo;
}

///////////////////////////////////////////////
////////////NAVEGACIÓN////////////////////////
/////////////////////////////////////////////

//Selección de Elementos para Navegación

const cart_shadow = document.querySelector('.cart_shadow');

const cart_icon = document.querySelector('.navbar_cart_icon');

const cart_close = document.querySelector('.cart_close_icon');

const cart_siderbar = document.querySelector('.cart_sidebar');

//Funciones para agregar/quitar clases para mostrar sidebar con Carrito

function mostrarCartito() {
  cart_shadow.classList.toggle('cart_shadow_show');
  cart_siderbar.classList.toggle('cart_sidebar_show');
}

//Eventos para agregar/quitar clases para mostrar sidebar

cart_icon.addEventListener('click', function () {
  mostrarCartito();
});

cart_close.addEventListener('click', function () {
  mostrarCartito();
});

///////////////////////////////////////////////
////////////FUNCIONES MANIPULACIÓN DEL DOM////
/////////////////////////////////////////////

////Lógica de Inserción de Productos del Catalogo//////

const products_container = document.querySelector('.products_container');

for (const producto of catalogo) {
  const indiv_product = document.createElement('div');
  indiv_product.classList.add('indiv_product');
  indiv_product.innerHTML = `<div class="indiv_product_img_container">
            <img
              src="${producto.img_src}"
              class="indiv_product_img"
              alt="Product Image"
            />
          </div>
          <div class="indiv_product_info">
            <h2 class="indiv_product_title">${producto.nombre}</h2>
            <h3 class="indiv_product_price">$${producto.precio}</h3>
            <div class="indiv_product_buy" data-id="${producto.id}">
              <img
                src="./icons/add_shopping_cart_black_24dp.svg"
                alt="Shopping Cart"
                class="indiv_product_buy_img"
              />
              <span class="indiv_product_buy_text">Comprar</span>
            </div>
          </div>`;

  products_container.appendChild(indiv_product);
}

//////// Inserción de Carrito en Sidebar//////////////////

const cart_products_list = document.querySelector('.cart_products_list');

function insertarCarrito() {
  //Vacio primero container de carrito para no insertar sobre lo existente
  //Luego inserto iterando sobre carrito con un for of e insertando dinamicanete lo items. En todos los tags agrego data-id=item.id para luego poder armar la opción de modificar las cantidades directamente en el carrito, identificando con esto que item estoy modificando.
  cart_products_list.innerHTML = '';
  for (const item of carrito) {
    const cart_product = document.createElement('li');
    cart_product.classList.add('cart_product');
    cart_product.innerHTML = `<img
                src="${buscarImgsrc(item.id)}"
                alt=""
                class="cart_product_img"
                data-id="${item.id}"
              />
              <div class="cart_product_info">
                <h2 class="cart_product_name" data-id="${
                  item.id
                }">${buscarNombre(item.id)}</h2>
                <h2 class="cart_product_price" data-id="${
                  item.id
                }">$${buscarPrecio(item.id)}</h2>
              </div>
              <div class="cart_product_inputContainer">
                <img
                  src="./icons/chevron_up_24dp.svg"
                  alt=""
                  class="cart_product_inputUp"
                  data-id="${item.id}"
                />
                <h3 class="cart_product_input" data-id="${item.id}">${
      item.cantidad
    }</h3>
                <img
                  src="./icons/chevron_down_24dp.svg"
                  alt=""
                  class="cart_product_inputDown"
                  data-id="${item.id}"
                />
              </div>`;
    cart_products_list.appendChild(cart_product);
  }
  //Vuelvo a insertar monto total del carrito en cada inserción
  insertarTotal();
  //Actualizo el counter de items que va al navbar
  cartCounter();
}

//////Lógica - Agregar Producto por primera vez al Carrito/////

//Selecciono todos los botones de los productos

const buy_btns = document.querySelectorAll('.indiv_product_buy');

//Coloco dinamicamente un eventlistener en cada boton y en el clickeado ejecuto la función Actualizar Carrito con la cantidad 1

buy_btns.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    //convertiro a nro el data id porque sino viene string!
    const sku = parseInt(e.currentTarget.getAttribute('data-id'));
    actualizarCarrito(sku, 1);
    insertarCarrito();
    mostrarCartito();
  });
});

////Modificacion de cantidades de producto desde Carrito/////////////

//Mediante delegación de eventos apliacda con un listener en el contenedor de la lista de productos en carrito, escucho por clicks en cada +/- de cada producto (identificado con el data-id) y según eso sumo o resto cantidades

cart_products_list.addEventListener('click', function (e) {
  const sku = parseInt(e.target.getAttribute('data-id'));
  let nuevaCantidad;
  if (e.target.classList.contains('cart_product_inputUp')) {
    nuevaCantidad = buscarCantidad(sku) + 1;
    actualizarCarrito(sku, nuevaCantidad);
    insertarCarrito();
  } else {
    if (e.target.classList.contains('cart_product_inputDown')) {
      nuevaCantidad = buscarCantidad(sku) - 1;
      actualizarCarrito(sku, nuevaCantidad);
      insertarCarrito();
    }
  }
});

//////////////// Inserción de Monto Total de Carrito/////////////

const cart_total = document.querySelector('.cart_total');
function insertarTotal() {
  cart_total.innerHTML = `Total: $ ${totalCarrito()}`;
}

//////// Borrado del Carrito//////////

const cart_reset = document.querySelector('.cart_btns_reset');

cart_reset.addEventListener('click', function () {
  borrarCarrito();
  insertarCarrito();
  mostrarCartito();
});

//////// Finalización de Compra////////

const checkout = document.querySelector('.cart_btns_buy');
const cart_title = document.querySelector('.cart_title');

//Si hay items en el carrito doy mensaje de compra finalizada durante 2 segundos y luego borramos carrito y cerramos sidebar

checkout.addEventListener('click', function () {
  if (carrito.length > 0) {
    const checkout_msg = document.createElement('h2');
    checkout_msg.classList.add('checkout_msg');
    checkout_msg.innerHTML = ` Gracias por su compra!`;
    cart_siderbar.insertBefore(checkout_msg, cart_title);
  }
  setTimeout(function () {
    const checkout_msg = document.querySelector('.checkout_msg');
    checkout_msg.remove();
    borrarCarrito();
    insertarCarrito();
    mostrarCartito();
  }, 2500);
});

//////////Inserción Contador de Productos en Carrito NavBar//////

const cart_counter = document.querySelector('.navbar_cart_counter');

function cartCounter() {
  if (itemsEnCarrito() > 0) {
    cart_counter.classList.add('navbar_cart_counter_show');
    cart_counter.innerHTML = `<h2 class="navbar_cart_counter_text">${itemsEnCarrito()}</h2>`;
  } else {
    cart_counter.classList.remove('navbar_cart_counter_show');
  }
}
