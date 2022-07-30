//Selección de Elementos para Navegación

const cart_shadow = document.querySelector('.cart_shadow');

const cart_icon = document.querySelector('.navbar_cart_icon');

const cart_close = document.querySelector('.cart_close_icon');

const cart_siderbar = document.querySelector('.cart_sidebar');

//Lógica para agregar/quitar clases para mostrar sidebar

cart_icon.addEventListener('click', function () {
  cart_shadow.classList.toggle('cart_shadow_show');
  cart_siderbar.classList.toggle('cart_sidebar_show');
});

cart_close.addEventListener('click', function (e) {
  cart_shadow.classList.toggle('cart_shadow_show');
  cart_siderbar.classList.toggle('cart_sidebar_show');
});
