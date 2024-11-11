// JavaScript to rotate the image on scroll
window.addEventListener("scroll", () => {
  const image = document.getElementById("rotateImage");
  const scrollPosition = window.scrollY; // Get the scroll position
  const rotationAngle = scrollPosition % 1240; // Limit the rotation to 360 degrees

  // Apply rotation to the image
  image.style.transform = `rotate(${rotationAngle}deg)`;
});
