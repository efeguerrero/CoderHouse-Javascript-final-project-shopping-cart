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

//////////////// Función - Buscar Precio/Nombre desde el Catalogo según id de producto deseado////////////////

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
////////////FUNCIONES MANIPULACIÓN DEL DOM////
/////////////////////////////////////////////

/////////////////Selección de elementos/////////////////////////////////

const products_container = document.querySelector('.products_container');

////Lógica de Inserción de Productos del Catalogo//////

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
