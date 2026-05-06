const mainNav = document.querySelector('.navbar');
const navToggle = document.querySelector('.navbar__toggle');

if (mainNav && navToggle) {
  navToggle.addEventListener('click', () => {
    if (mainNav.classList.contains('navbar--opened')) {
      mainNav.classList.remove('navbar--opened');
      navToggle.setAttribute('aria-expanded', 'false');
    } else {
      mainNav.classList.add('navbar--opened');
      navToggle.setAttribute('aria-expanded', 'true');
    }
  });
}
