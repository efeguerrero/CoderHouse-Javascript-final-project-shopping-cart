/////////////////////////////////////////////////
//////////////DEFINICIÓN DE VARIABLES///////////
///////////////////////////////////////////////

const catalogo = [
  { id: 1, nombre: 'Alfombra Lisa 1x1', precio: 1500 },
  { id: 2, nombre: 'Alfombra Trama 1x1', precio: 2300 },
  { id: 3, nombre: 'Alfombra Rayas 1x0.5', precio: 1500 },
  { id: 4, nombre: 'Alfombra Negra 2x2', precio: 3500 },
];

let carrito = [
  { id: 1, cantidad: 2 },
  { id: 2, cantidad: 3 },
];

let selector; //selector de opciones del menu

/////////////////////////////////////////////////
//////////////DEFINICIÓN DE FUNCIONES///////////
///////////////////////////////////////////////

////////////////Función - Añadir items al carrito//////////////

//si el Item está presente en el carrito se le suma 1. Si no está presente se pushea sku y cantidad 1
function sumarItem(sku) {
  if (carrito.find((producto) => sku === producto.id)) {
    carrito[carrito.findIndex((producto) => producto.id === sku)].cantidad += 1;
  } else carrito.push({ id: sku, cantidad: 1 });
}

//////////////Función - Eliminación items del carrito//////////////////

function quitarItem(sku) {
  //si el item está en el carrito, se le resta 1 en cantidad. Si no está se avisa al usuario que no tiene ese item.
  //items con cantidad 0 se eliminan del carrito
  if (carrito.find((producto) => sku === producto.id)) {
    carrito[carrito.findIndex((producto) => producto.id === sku)].cantidad -= 1;
  } else alert('No tiene ese item en el carrito');
  //Elimina del carrito items con cantidad 0
  carrito = carrito.filter((producto) => producto.cantidad > 0);
}

////////////////Función - Borrado total del carrito//////////////////

function borrarCarrito() {
  carrito = [];
}

//////////////// Función - Buscar Precio/Nombre desde el Catalogo según id de producto////////////////

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

//////////////////// Función -  Buscar cantidad de productos en carrito según id de producto////////////

function buscarCantidad(sku) {
  //Primero vemos que el item este en el carrito y si está traemos la cantidad ya agregada. De lo contrario devolvemos 0
  if (carrito[carrito.findIndex((producto) => producto.id === sku)]) {
    cantidadSku =
      carrito[carrito.findIndex((producto) => producto.id === sku)].cantidad;
  } else cantidadSku = 0;
  return cantidadSku;
}

////////////////Función - Monto total Carrito/////////////////////////////////////////

function totalCarrito() {
  const total = carrito.reduce(
    (acc, item) => (acc += item.cantidad * buscarPrecio(item.id)),
    0
  );
  return total;
}

//////////////// Función - Mostrar catalogo + Cantidad seleccionada para mostrar en Menu de opciones////////////////////////////////////////////
//usar For Of al momento de ir a DOM?/////////
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
////////////LÓGICA INTERACCIÓN USUARIO////////
/////////////////////////////////////////////

do {
  selector = parseInt(
    prompt(`Utilice el menu para agregar productos al carrito y finalizar su compra. Para remover un producto del carrito ingrese el código con un "-" adelante (ej:-1)

Carrito Actual = $${totalCarrito()}

Productos:
${mostrarCatalogo().join('\n')}

0. Salir
9. Checkout
10. Limpiar Carrito
  `)
  );
  //Lógica de selección del usuario con las opciones del Menu.
  switch (selector) {
    case 0:
      //Cancelación de compra del usuario
      alert('Ha cancelado su compra. Gracias. Vuelva Pronto');
      break;
    //agregado de productos al carito
    case 1:
    case 2:
    case 3:
    case 4:
      sumarItem(selector);
      break;
    //quita de productos del carito
    case -1:
    case -2:
    case -3:
    case -4:
      quitarItem(Math.abs(selector));
      break;
    case 9:
      //Finalización de compra efectiva. Se muestra recibo final con productos y monto total.
      alert(`Gracias por su compra!
      Su total es de $${totalCarrito()}

      Productos:
      ${mostrarCatalogo().join('\n')}`);
      break;
    //borado total del carrito
    case 10:
      borrarCarrito();
      break;
    default:
      alert(
        'Opción no valida. Por favor elija un item del Menu o finalice su compra'
      );
      break;
  }
} while (selector != 0 && selector != 9);
