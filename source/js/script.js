const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');
const navList = document.querySelector('.main-nav__list');
const navLink = document.querySelectorAll('.main-nav__link-wrapper');
const modalCart = document.querySelector('.modal-cart');
const productWeekBtn = document.querySelector('.product-week__button');
const cartBtn = document.querySelectorAll('.product__button-cart');

document.addEventListener("DOMContentLoaded", function () {
  navToggle.classList.remove('main-nav__invisible');
  navList.classList.add('main-nav__invisible', 'main-nav__invisible_list');
  navLink.forEach(elem => elem.classList.add('main-nav__invisible', 'main-nav__invisible_link'));
});

navToggle.addEventListener('click', function () {
  if (navToggle.classList.contains('main-nav__toggle_closed')) {
    navToggle.classList.remove('main-nav__toggle_closed');
    navList.classList.add('main-nav__invisible');
    navLink.forEach(elem => elem.classList.add('main-nav__invisible'));
  } else {
    navToggle.classList.add('main-nav__toggle_closed');
    navList.classList.remove('main-nav__invisible');
    navLink.forEach(elem => elem.classList.remove('main-nav__invisible'));
  }
});

function addModal(params) {
  modalCart.classList.remove('modal-cart__invisible');
}

addEventListener("keydown", function (e) {
  if (e.keyCode === 27) {
    e.preventDefault();
    if (!modalCart.classList.contains("modal-cart__invisible")) {
      modalCart.classList.add("modal-cart__invisible");
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

