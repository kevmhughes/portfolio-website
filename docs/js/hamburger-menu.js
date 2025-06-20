const burger = document.getElementById('burger');
const navItems = document.getElementById('nav-items-mobile'); 
const html = document.documentElement;
const body = document.body;

burger.addEventListener('click', () => {
  const isActive = navItems.classList.toggle('active');
  burger.classList.toggle('active');

  // Lock or unlock scrolling
  if (isActive) {
    html.classList.add('no-scroll');
    body.classList.add('no-scroll');
  } else {
    html.classList.remove('no-scroll');
    body.classList.remove('no-scroll');
  }
});