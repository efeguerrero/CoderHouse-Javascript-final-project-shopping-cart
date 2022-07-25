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

let selector; //selector de opciones del menu

/////////////////////////////////////////////////
//////////////DEFINICIÓN DE FUNCIONES///////////
///////////////////////////////////////////////

////////////////Función - Añadir items al carrito//////////////

//si el Item está presente en el carrito se le suma 1. Si no está presente se pushea sku(id) y cantidad 1
function sumarItem(sku) {
  //logica para saber si el item se encuentra en el carrito
  if (carrito.find((producto) => sku === producto.id)) {
    carrito[carrito.findIndex((producto) => producto.id === sku)].cantidad += 1;
  } else carrito.push({ id: sku, cantidad: 1 });
}

//////////////Función - Eliminación items del carrito//////////////////

//Si el item está en el carrito, se le resta 1 en cantidad. Si no está se avisa al usuario que no tiene ese item.
//items con cantidad 0 se eliminan del carrito

function quitarItem(sku) {
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

//////////////// Función - Mostrar catalogo --> Armado de array con productos + Cantidad seleccionada para mostrar mediante un Join en Menu de opciones////////////////////////////////////////////
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
    prompt(`Bienvenido a la Tienda de Alfombras!
Utilice el menu para agregar productos al carrito y finalizar su compra. Para remover un producto del carrito ingrese el código con un "-" adelante (ej:-1)

Carrito Actual = $${totalCarrito()}

Productos:
${mostrarCatalogo().join('\n')}

0. Salir (cancela compra)
9. Checkout
10. Limpiar Carrito
  `)
  );
  //Lógica de selección del usuario con las opciones del Menu.
  switch (selector) {
    case 0:
      //Cancelación de compra del usuario y sale del programa
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
      // revisamos si hay items en el carrito y cerramos la compra. Si se encuentra vacio devolvemos un error al usuario y volvemos al menu principal
      if (carrito.length > 0) {
        //Finalización de compra efectiva. Se muestra recibo final con productos y monto total.
        alert(`Gracias por su compra!
Su total es de $${totalCarrito()}

Productos:
${mostrarCatalogo().join('\n')}`);
      } else {
        alert(
          'Su carrito está vacio. Por favor agregue items para finalizar su compra o cancele la misma desde el menu.'
        );
        selector = 'error';
      }
      break;
    //borrado total del carrito
    case 10:
      borrarCarrito();
      break;
    default:
      //Mensaje de error para opciones de menu no validas
      alert(
        'Opción no valida. Por favor elija un item del Menu o finalice su compra'
      );
      break;
  }
} while (selector != 0 && selector != 9);

///////////////////////////////////////////////
////////////FUNCIONES MANIPULACIÓN DEL DOM////
/////////////////////////////////////////////

/////////////////Selección de nodos HTML/////////////////////////////////

const productContainer = document.querySelector('.productContainer');

////////////////Inserción HTML Catalogo///////////////////////////

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
