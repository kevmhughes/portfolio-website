const burger = document.getElementById("burger");
const navItems = document.getElementById("nav-items-mobile");
const body = document.body;

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navItems.classList.toggle("active");
  body.classList.toggle("no-scroll");
});
