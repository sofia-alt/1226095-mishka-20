const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');
const navList = document.querySelector('.main-nav__list');
const navLink = document.querySelectorAll('.main-nav__link-wrapper');
const modalCart = document.querySelector('.modal-cart');
const productWeekBtn = document.querySelector('.product-week__button');
const cartBtn = document.querySelectorAll('.product__button-cart');

document.addEventListener("DOMContentLoaded", function () {
  navToggle.classList.remove('main-nav__toggle_invisible');
  navList.classList.add('main-nav__list_invisible');
  navLink.forEach(elem => elem.classList.add('main-nav__link_invisible'));
});

navToggle.addEventListener('click', function () {
  if (navToggle.classList.contains('main-nav__toggle_closed')) {
    navToggle.classList.remove('main-nav__toggle_closed');
    navList.classList.add('main-nav__list_invisible');
    navLink.forEach(elem => elem.classList.add('main-nav__link_invisible'));
  } else {
    navToggle.classList.add('main-nav__toggle_closed');
    navList.classList.remove('main-nav__list_invisible');
    navLink.forEach(elem => elem.classList.remove('main-nav__link_invisible'));
  }
});

function addModal() {
  modalCart.classList.remove('modal-cart_invisible');
}

addEventListener("keydown", function (e) {
  if (e.keyCode === 27) {
    e.preventDefault();
    if (!modalCart.classList.contains("modal-cart_invisible")) {
      modalCart.classList.add("modal-cart_invisible");
    }
  }
});

if (productWeekBtn) {
  productWeekBtn.addEventListener('click', function () {
    addModal();
  });
}

cartBtn.forEach(elem => elem.addEventListener('click', function () {
  addModal();
}))

