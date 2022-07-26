/////////////////////////////////////////////////
//////////////DEFINICIÓN DE VARIABLES///////////
///////////////////////////////////////////////

const catalogo = [
  { id: 1, nombre: 'Alfombra Lisa 1x1', precio: 1600 },
  { id: 2, nombre: 'Alfombra Trama 1x1', precio: 2300 },
  { id: 3, nombre: 'Alfombra Rayas 1x0.5', precio: 1500 },
  { id: 4, nombre: 'Alfombra Negra 2x2', precio: 3500 },
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
}

////////////////Función - Borrado total del carrito//////////////////

function borrarCarrito() {
  carrito = [];
}

//////////////// Función - Buscar Precio/Nombre desde el Catalogo según id de producto deseado////////////////

function buscarPrecio(sku) {
  console.log(typeof sku);
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

const productContainer = document.querySelector('.productContainer');
const formContainer = document.querySelector('.formContainer');
const montoTotal = document.querySelector('.monto');
const btnComprar = document.querySelector('.btn_submit');
const btnReset = document.querySelector('.btn_reset');

////////////////Inserción dinámica HTML del menu de productos desde el catalogo///////////////

//creamos un id dinámico para el input de cada producto para saber luego cual estoy modificando cuando utilice el eventlistener

for (const producto of catalogo) {
  const indivProduct = document.createElement('div');
  indivProduct.classList.add('indivProduct');
  indivProduct.innerHTML = `<label id="${producto.id}" class="indivProduct_name"
              >${producto.nombre} - $${producto.precio}</label>
            <input
              type="number"
              name="${producto.nombre}"
              id="${producto.id}"
              min="0"
              class="indivProduct_quantity"
              placeholder="0"
            />`;
  productContainer.appendChild(indivProduct);
}

/////////////// Función - Inserción dinámica HTML de Monto Total a Pagar por cliente////////////

function insertarTotal() {
  montoTotal.innerHTML = `Total a Pagar: $${totalCarrito()}`;
}

/////////////// Capturar [id] y [cantidad] del input del Menu de productos al modificarlo////////////

//listener en contenedor del form para mediante burbujeo capturar en que input estoy realizando modificaciones. Con e.target identifico [input] que se modifico y tomo valores

formContainer.addEventListener('input', function (e) {
  //si el campo del input está vacío lo hago valer 0
  if (!e.target.value) {
    e.target.value == 0;
  }
  //Actualizo carrito según valores del input que modifique con id (sku) y cantidad.
  actualizarCarrito(parseInt(e.target.id), parseInt(e.target.value));
  //Llamo función para insertar valor total a pagar en HTML
  insertarTotal();
});

////////////////Evento -  Finalización de Compra///////////////////////////

btnComprar.addEventListener('click', function (e) {
  e.preventDefault();
  // revisamos si hay items en el carrito y cerramos la compra. Si se encuentra vacio devolvemos un error al usuario y volvemos al menu principal
  if (carrito.length > 0) {
    //Finalización de compra efectiva. Se muestra recibo final con productos y monto total.
    alert(`Gracias por su compra!
  Su total es de $${totalCarrito()}
  Productos:
  ${mostrarCatalogo().join('\n')}`);
  } else {
    alert(
      'Su carrito está vacio. Por favor agregue items para finalizar su compra.'
    );
  }
});

////////////////Evento - Borrado de Carrito y Formulario///////////////////////////

btnReset.addEventListener('click', function () {
  borrarCarrito();
  insertarTotal();
});
