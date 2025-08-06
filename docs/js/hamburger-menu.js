const burger = document.getElementById('burger');
const navItems = document.getElementById('nav-items-mobile');
const html = document.documentElement;
const body = document.body;
const mobileNav = document.getElementById('nav-bar-mobile');

burger.addEventListener('click', () => {
  const isActive = navItems.classList.toggle('active');
  burger.classList.toggle('active');


  if (isActive) {
    // Lock scrolling
    html.classList.add('no-scroll');
    body.classList.add('no-scroll');
    // Add white background to mobile nav
    mobileNav.classList.add('white-bg');

  } else {
    // Unlock scrolling
    html.classList.remove('no-scroll');
    body.classList.remove('no-scroll');
    // Remove white background to mobile nav
    mobileNav.classList.remove('white-bg');
  }
});