//Definición de Variables y Productos

const catalogo = [
  { id: 1, nombre: 'Alfombra Lisa 1x1', precio: 1500 },
  { id: 2, nombre: 'Alfombra Trama 1x', precio: 2300 },
  { id: 3, nombre: 'Alfombra Rayas 1x0.5', precio: 1500 },
  { id: 4, nombre: 'Alfombra Negra 2x2', precio: 3500 },
];

let carrito = [{ id: 1, cantidad: 2 }];

let selector; //selector de opciones del menu

////////////////Función - Adición items al carrito//////////////
do {
  selector = parseInt(prompt('ingrese codigo del 1 al 4  y 0 para salir'));

  function sumarItem(sku) {
    if (carrito.find((producto) => sku === producto.id)) {
      carrito[
        carrito.findIndex((producto) => producto.id === sku)
      ].cantidad += 1;
    } else carrito.push({ id: sku, cantidad: 1 });
  }

  sumarItem(selector);
  console.log(carrito);

  //////////////Función - Eliminación items del carrito//////////////////
  function quitarItem(sku) {
    if (carrito.find((producto) => sku === producto.id)) {
      carrito[
        carrito.findIndex((producto) => producto.id === sku)
      ].cantidad -= 1;
    } else carrito.push({ id: sku, cantidad: 1 });
  }
  ////////////////Función - Borrado total del carrito//////////////////

  ////////////////Función - Monto total Carrito//////////////////////
} while (selector != 0);
