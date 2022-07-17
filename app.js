//Definición de Variables y Productos

const catalogo = [
  { id: 1, nombre: "Alfombra Lisa 1x1", precio: 1500 },
  { id: 2, nombre: "Alfombra Trama 1x", precio: 2300 },
  { id: 3, nombre: "Alfombra Rayas 1x0.5", precio: 1500 },
  { id: 4, nombre: "Alfombra Negra 2x2", precio: 3500 },
];

let carrito = [
  { id: 1, cantidad: 2 },
  { id: 2, cantidad: 3 },
];

let selector; //selector de opciones del menu

////////////////Función - Añadir items al carrito//////////////
do {
  selector = parseInt(prompt("ingrese codigo del 1 al 4  y 0 para salir"));
  //si el Item está presente en el carrito se le suma 1. Si no está presente se pushea sku y cantidad 1
  function sumarItem(sku) {
    if (carrito.find((producto) => sku === producto.id)) {
      carrito[
        carrito.findIndex((producto) => producto.id === sku)
      ].cantidad += 1;
    } else carrito.push({ id: sku, cantidad: 1 });
  }

  //////////////Función - Eliminación items del carrito//////////////////

  function quitarItem(sku) {
    //si el item está en el carrito, se le resta 1 en cantidad
    if (carrito.find((producto) => sku === producto.id)) {
      carrito[
        carrito.findIndex((producto) => producto.id === sku)
      ].cantidad -= 1;
    } else alert("No tiene ese item en el carrito");
    //Elimina del carrito items con cantidad 0
    carrito = carrito.filter((producto) => producto.cantidad > 0);
  }

  ////////////////Función - Borrado total del carrito//////////////////

  function borrarCarrito() {
    carrito = [];
  }

  ////////////////Función - Monto total Carrito/////////////////////////////////////////

  function totalCarrito() {
    const total = carrito.reduce(
      (acc, item) => (acc += item.cantidad * buscarPrecio(item.id)),
      0
    );
  }

  ////////////////// Función - Buscar Precio-Nombre de Catalogo según id de carrito///////////////////

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
} while (selector != 0);
