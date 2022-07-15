//Definición de Variables y Productos
const productoA = 'Alfombra Lisa 1x1';
const precioA = 1500;
let contadorA = 0;

const productoB = 'Alfombra Trama 1x1';
const precioB = 2300;
let contadorB = 0;

const productoC = 'Alfombra Rayas 1x0.5';
const precioC = 1500;
let contadorC = 0;

const productoD = 'Alfombra Negra 2x2';
const precioD = 3500;
let contadorD = 0;

let monto = 0; //monto total a pagar por usuario
let selector; //selector de opciones del menu
//////////////////////////////

do {
  //Prompt de Menu para usuario con selector de productos, cancelación de compra y finalización.
  //En cada Iteración también mostramos cuanto lleva de $ en el carrito acual e items elegidos
  selector = parseInt(
    prompt(`Utilice el menu para agregar productos al carrito y finalizar su compra. 

 Carrito Actual = $${monto}
  
  1. ${productoA} - $${precioA} - Cantidad seleccionada: ${contadorA}
  2.${productoB} - $${precioB} - Cantidad seleccionada: ${contadorB}
  3.${productoC} - $${precioC} - Cantidad seleccionada: ${contadorC}
  4.${productoD} - $${precioD} - Cantidad seleccionada: ${contadorD}
  0. Cancelar Compra
  9. Finalizar Compra
  `)
  );
  //Lógica de selección del usuario con las opciones del Menu.
  switch (selector) {
    case 1:
      monto += precioA;
      contadorA++;
      break;
    case 2:
      monto += precioB;
      contadorB++;
      break;
    case 3:
      monto += precioC;
      contadorC++;
      break;
    case 4:
      monto += precioD;
      contadorD++;
      break;
    case 0:
      //Cancelación de compra del usuario
      alert('Ha cancelado su compra. Gracias. Vuelva Pronto');
      //Reseteo de variables cuando el usuario cancela su compra
      monto = 0;
      contadorA = 0;
      contadorB = 0;
      contadorC = 0;
      contadorD = 0;
      break;
    case 9:
      //Finalización de compra efectiva. Se muestra recibo final con productos y monto total.
      alert(`Gracias por su compra!

      Su total es de $${monto}

      Productos:
      ${productoA} - Cantidad: ${contadorA}
      ${productoB} - Cantidad: ${contadorB}
      ${productoC} - Cantidad: ${contadorC}
      ${productoD} - Cantidad: ${contadorD}
      `);
      break;
    default:
      alert(
        'Opción no valida. Por favor elija un item del Menu o finalice su compra'
      );
      break;
  }
} while (selector != 0 && selector != 9);
