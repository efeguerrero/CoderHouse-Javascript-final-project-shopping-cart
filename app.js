/////////////////////////////////////////////////////////////
//////////////DEFINICIÓN DE VARIABLES////////////////////////
/////////////////////////////////////////////////////////////

let catalogo = [];

let carrito = [];

//////////////////////////////////////////////////////////////////////////////
//////////////DEFINICIÓN DE FUNCIONES DE LÓGICA DE CARRITO/CATALOGO///////////
/////////////////////////////////////////////////////////////////////////////

////////////////Función - Actualizar carrito (añadir y remover items) ////////////////

//Si el item se encuentra en el carrito, a la cantidad ya existente le sumamos el nuevo input (hoy limitado a incrementos de a 1 )
//Si el item no está en el carrito pusheamos id y cantidad

function actualizarCarrito(sku, cantidad) {
  //logica para saber si el item se encuentra en el carrito y ejecutar según.
  carrito.find((producto) => sku === producto.id)
    ? (carrito[carrito.findIndex((producto) => producto.id === sku)].cantidad +=
        cantidad)
    : carrito.push({ id: sku, cantidad: cantidad });
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

////////////////Función - Calcular monto total Carrito////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////
////////////NAVEGACIÓN ////////////////////////
///////////////////////////////////////////////////////////////////////////////////

///////////////MOSTRAR Y CERRAR CARRITO EN SIDEBAR////////////

//Selección de Elementos para Navegación

const cart_shadow = document.querySelector('.cart_shadow');
const cart_icon = document.querySelector('.navbar_cart_icon');
const cart_close = document.querySelector('.cart_close_icon');
const cart_siderbar = document.querySelector('.cart_sidebar');

//Funciones para agregar/quitar clases para mostrar sidebar con Carrito

function mostrarCarrito() {
  cart_shadow.classList.toggle('cart_shadow_show');
  cart_siderbar.classList.toggle('cart_sidebar_show');
  //Cuando se abre sideBar no permitimos scroll
  document.body.classList.toggle('no_scroll');
}

//Eventos para agregar/quitar clases para mostrar sidebar

cart_icon.addEventListener('click', function () {
  mostrarCarrito();
});

cart_close.addEventListener('click', function () {
  mostrarCarrito();
});

//////////////MOSTRAR Y CERRAR MENU DE FILTROS///////////////////

//Selección de Elementos

const filter_shadow = document.querySelector('.filter_shadow');
const menuIcon = document.querySelector('.navbar_menu');
const filterContainer = document.querySelector('.filtersContainer');
const filter_close = document.querySelector('.filtersContainer_close');

//Funciones para agregar/quitar clases para mostrar Menu de Filtrado

function mostrarMenu() {
  filterContainer.classList.toggle('filtersContainer_show');
  filter_shadow.classList.toggle('filter_shadow_show');
  //Cuando se abre sideBar no permitimos scroll
  document.body.classList.toggle('no_scroll');
}

//Eventos para agregar/quitar clases para mostrar sidebar

menuIcon.addEventListener('click', function () {
  mostrarMenu();
});

filter_close.addEventListener('click', function () {
  mostrarMenu();
});

////////////////////////////////////////////////////////////////////////////
////////////CARGA DE DATA EXTERNA (archivo local JSON)//////////////////////
///////////////////////////////////////////////////////////////////////////

async function cargarCatalogo() {
  const response = await fetch('./data/catalogo.json');
  catalogo = await response.json();
}

///////////////////////////////////////////////////////
////////////FUNCIONES MANIPULACIÓN DEL DOM/////////////
///////////////////////////////////////////////////////

////////////////Carga Inicial de Web y datos - Catalogo desde API - Insertar Catalogo en HTML - Carrito desde Local Storage///////////////

//Para asegurar la carga del catalogo antes de la inserción tengo que usar async/await (por más que la función cargarCatalogo losea) porque sino se ejecuta insertarCatalogo antes de que se llegue a cargar y la inserción queda vacia.

window.addEventListener('DOMContentLoaded', async () => {
  await cargarCatalogo();
  insertarCatalogo(catalogo);
  carritoStorage();
  crearFiltros();
  rangoPrecios();
});

///////////////Lógica de Inserción de Productos del Catalogo///////////

const products_container = document.querySelector('.products_container');

//Asigno dinamicanete data-id = producto.id para despues identificar que producto estoy agregando al carrito con cada click

//La función ahora posee argumento para insertar tanto el catalogo madre como el filtrado

function insertarCatalogo(arrayProductos) {
  // Antes de insertar vacío lo que ya existe en HTML para no duplicar inserción
  products_container.innerHTML = '';

  if (arrayProductos.length == 0) {
    //Si el array que voy a insertar está vacío por los filtros muestro mensaje de busqueda sin resltados
    const errorBusqueda = document.createElement('h3');
    errorBusqueda.classList.add('errorBusqueda');
    errorBusqueda.innerText = 'Su busqueda no arrojó resultados';
    products_container.appendChild(errorBusqueda);
  } else {
    for (const producto of arrayProductos) {
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
            <h3 class="indiv_product_price">$${producto.precio.toLocaleString(
              'es-AR'
            )}</h3>
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
  }
}
//////// Inserción de Carrito en Sidebar//////////////////

const cart_products_list = document.querySelector('.cart_products_list');

function insertarCarrito() {
  //Luego inserto iterando sobre carrito con un for of e insertando dinamicanete los items. En todos los tags agrego data-id=item.id para luego poder armar la opción de modificar las cantidades directamente en el carrito, identificando con esto que item estoy modificando.

  //Vacio primero container de carrito para no insertar sobre lo existente
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
                }">$${buscarPrecio(item.id).toLocaleString('es-AR')}</h2>
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

//////////Lógica - Agregar Producto desde vista de Catalogo/////////

//Al insertar el catalogo con info traida con fetch y el DOMContentLoaded no puedo seleccionar los btns insertados porque el nodelist viene vacio. Uso delegación de eventos para buscar clicks en products_container y solo tomar en cuenta aquellos hechos sobre el boton. En caso de hacer click en el icono o texto del boton, targeteo el parentNode para tener la funcionalidad correcta.

products_container.addEventListener('click', (e) => {
  //Solo ejecuto si el click es hecho sobre el boton o sobre el icono/texto dentro del boton
  if (
    e.target.classList.contains('indiv_product_buy') ||
    e.target.parentNode.classList.contains('indiv_product_buy')
  ) {
    //Sku se asigna con un operador [OR] según si hice click en el boton o sobre algun child
    const sku =
      parseInt(e.target.getAttribute('data-id')) ||
      parseInt(e.target.parentNode.getAttribute('data-id'));
    actualizarCarrito(sku, 1);
    insertarCarrito();
    cartToast();
  }
});

/////////////////////Modificacion de cantidades de producto desde Carrito///////////////////

//Mediante delegación de eventos aplicada con un listener en el contenedor de la lista de productos en carrito, escucho por clicks en cada +/- de cada producto (identificado con el data-id) y según eso sumo o resto cantidades

cart_products_list.addEventListener('click', function (e) {
  const sku = parseInt(e.target.getAttribute('data-id'));
  //Solo ejecuto funciones si el click se dá sobre los botones que contienen estas clases
  if (e.target.classList.contains('cart_product_inputUp')) {
    actualizarCarrito(sku, 1);
    insertarCarrito();
  } else {
    if (e.target.classList.contains('cart_product_inputDown')) {
      actualizarCarrito(sku, -1);
      insertarCarrito();
    }
  }
});

//////////////// Inserción HTML del Monto Total de Carrito//////////////////

const cart_total = document.querySelector('.cart_total');
function insertarTotal() {
  cart_total.innerHTML = `Total: $ ${totalCarrito().toLocaleString('es-AR')}`;
}

/////////////////////// Borrado del Carrito//////////////////////

const cart_reset = document.querySelector('.cart_btns_reset');

cart_reset.addEventListener('click', function () {
  borrarCarrito();
  insertarCarrito();
  //Cuando borro el carrito desde el mismo cierro el sidebar
  mostrarCarrito();
});

////////////////////// Finalización de Compra/////////////////////

const checkout = document.querySelector('.cart_btns_buy');
const cart_title = document.querySelector('.cart_title');

//Si hay items en el carrito doy mensaje de compra finalizada durante 2 segundos y luego borramos carrito y cerramos sidebar

checkout.addEventListener('click', function () {
  //Notificación al usuario con compra finalizada y mostrando el total gastado
  checkoutToast(totalCarrito());
  //Función a ejecutra luego de 2.5s para borrar el carrito y cerrar el sidebar una vez finalizada la compra
  setTimeout(function () {
    borrarCarrito();
    insertarCarrito();
    mostrarCarrito();
  }, 2500);
});

/////////////////Inserción Contador de Productos en Carrito NavBar/////////////////

const cart_counter = document.querySelector('.navbar_cart_counter');

function cartCounter() {
  if (itemsEnCarrito() > 0) {
    cart_counter.classList.add('navbar_cart_counter_show');
    cart_counter.innerHTML = `<h2 class="navbar_cart_counter_text">${itemsEnCarrito()}</h2>`;
  } else {
    cart_counter.classList.remove('navbar_cart_counter_show');
  }
}

////////////// Carga de Local Storage al inicio de la aplicación///////////////////

//Si cuando cargo la web hay items en el carrito, entonces asignar storage a carrito. Si no existe en storage ,carrito queda como array vación.

function carritoStorage() {
  const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
  carrito = carritoStorage || [];
  insertarCarrito();
}

////////////// Creación e Insecrión de Filtros de Categorias de Producto///////////////

//A partir del catalogo creamos un array de las categorias, sin repetir, para luego insertarlo

//Creación del Array de Categorias únicas (la llamo una vez cargado el DOM y el catalogo desde API local)

function crearFiltros() {
  const filtrosCategorias = [
    'Todas',
    ...new Set(catalogo.map((item) => item.categoria)),
  ];
  insertarFiltros(filtrosCategorias);
}

//Función para insertar HTML

const filterCategoria = document.querySelector('.filterCategoria');

function insertarFiltros(array) {
  for (const item of array) {
    const filterBtn = document.createElement('button');
    filterBtn.classList.add('filterCategoria_indiv');
    filterBtn.innerText = item;
    filterCategoria.appendChild(filterBtn);
  }
}

//////////////// Rango de slider de precios de productos////////////////////////

//Calculo el precio maximo dentro de mi catalogo para establecer el final del rango y luego agrego el atributo al slider como max y valor por defecto

const rangoPrecio = document.querySelector('.filterPrice_bar');
const filterPrice_value = document.querySelector('.filterPrice_value');

function rangoPrecios() {
  const precioMax = Math.max(...catalogo.map((item) => item.precio));
  rangoPrecio.setAttribute('max', `${precioMax}`);
  rangoPrecio.setAttribute('value', `${precioMax}`);
  filterPrice_value.innerText = `$${precioMax.toLocaleString('es-AR')}`;
  return precioMax;
}

/////////////// Selección de Filtros de Categoria, Precio y Ordenamiento///////////////////

//Evento para filtrar Categoria. Escucho por delegación de eventos los clicks en botones y guardo la categoria seleccionada

let categoriaSeleccionada;
let precioSeleccionado;
let ordenar;

filterCategoria.addEventListener('click', (e) => {
  if (e.target.classList.contains('filterCategoria_indiv')) {
    categoriaSeleccionada = e.target.innerText;
  }
  filtrarCatalogo(categoriaSeleccionada, precioSeleccionado);
});

//Selecciono precio a filtrar, guardando el valor en variable y también inserto valor en HTML

rangoPrecio.addEventListener('input', (e) => {
  //Convierto a numero el precio del slider ya que viene como string
  precioSeleccionado = parseInt(e.target.value);
  filterPrice_value.innerText = `$${precioSeleccionado.toLocaleString(
    'es-AR'
  )}`;
  filtrarCatalogo(categoriaSeleccionada, precioSeleccionado);
});

////////////////// Funcionabilidad de Filtrado de Catalogo, Ordenamiento e Inserción/////////////////////

//Creación de array de productos filtrado

//Para poder filtrar con más de una variable, utilizó las variables de filtro guardadas anterioremente en cada evento y las aplico a una misma función para filtrar el Catalogo

function filtrarCatalogo(categoria, precio) {
  //Si la categoria o el precio no se filtraron, asignar los valores por defecto que son "Todas" y el precio maximo de mis productos.
  categoria = categoria || 'Todas';
  precio = precio || parseInt(rangoPrecio.value);
  //Agrego condicional ya que si la categoria no se filtró, entonces solamente voy a filtra por precio.
  if (categoria != 'Todas') {
    const catalogoFiltrado = catalogo.filter(
      (item) => item.categoria == categoria && item.precio <= precio
    );
    insertarCatalogo(catalogoFiltrado);
  } else {
    const catalogoFiltrado = catalogo.filter((item) => item.precio <= precio);
    insertarCatalogo(catalogoFiltrado);
  }
}

/////////////////////////////////////////////////////
//////// NOTIFICACIONES PARA EL USUARIO//////////////
/////////////////////////////////////////////////////

/////////Toast para item en cart////////////////////

function cartToast() {
  Toastify({
    text: `Item agregado al carrito`,
    duration: 2000,
    gravity: 'top', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    className: 'cartToast',
    onClick: function () {
      mostrarCarrito();
    },
  }).showToast();
}

///////////Toast para CheckOut////////////////////////////////

function checkoutToast(total) {
  Toastify({
    text: `Gracias por su compra! Su total ha sido de $${total.toLocaleString(
      'es-AR'
    )}`,
    duration: 3500,
    gravity: 'top', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    className: 'checkoutToast',
  }).showToast();
}
