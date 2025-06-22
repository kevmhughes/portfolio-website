  document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".project-image");
    const width = window.innerWidth;

    let eagerCount = 1; // default for mobile

    if (width >= 768 && width < 1024) {
      eagerCount = 4; // tablet
    } else if (width >= 1024) {
      eagerCount = 6; // desktop
    }

    images.forEach((img, index) => {
      if (index < eagerCount) {
        img.setAttribute("loading", "eager");
      } else {
        img.setAttribute("loading", "lazy");
      }
    });
  });
