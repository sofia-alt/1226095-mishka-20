const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');
const navList = document.querySelector('.main-nav__list');
const navLink = document.querySelectorAll('.main-nav__link-wrapper');

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
