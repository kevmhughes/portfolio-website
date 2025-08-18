class Carousel {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.track = this.container.querySelector(".carousel-track");
    this.prevBtn = this.container.querySelector(".carousel-btn.prev");
    this.nextBtn = this.container.querySelector(".carousel-btn.next");
    this.cards = this.container.querySelectorAll(".project-card");
    this.barContainer = document.getElementById("indicators");

    this.cardWidth = 0;
    this.cardsPerView = this.getCardsPerView();
    this.totalSlides = this.cards.length;
    this.currentIndex = 0;

    // Swipe state
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.swipeThreshold = 50;

    this.init();
  }

  getCardsPerView() {
    const width = window.innerWidth;
    if (width < 1024) return 1;
    if (width < 1700) return 2;
    return 3;
  }

  updateCardWidth() {
    this.cardWidth = this.cards[0].offsetWidth + 32; // include margin/gap
  }

  createIndicatorBars() {
    this.barContainer.innerHTML = "";
    this.cardsPerView = this.getCardsPerView();
    const numBars = Math.ceil(this.totalSlides / this.cardsPerView);

    for (let i = 0; i < numBars; i++) {
      const bar = document.createElement("span");
      bar.className = "bar";
      bar.addEventListener("click", () => {
        this.currentIndex = i * this.cardsPerView;
        this.updateCarousel();
      });
      this.barContainer.appendChild(bar);
    }
  }

  updateIndicator() {
    const bars = this.barContainer.querySelectorAll(".bar");
    const activeBar = Math.floor(this.currentIndex / this.cardsPerView);
    bars.forEach((bar, i) => {
      bar.classList.toggle("active", i === activeBar);
    });
  }

  updateCarousel() {
    this.cardsPerView = this.getCardsPerView();
    this.updateCardWidth();

    const maxIndex = Math.max(0, this.totalSlides - this.cardsPerView);
    this.currentIndex = Math.min(this.currentIndex, maxIndex);

    this.track.style.transform = `translateX(-${this.cardWidth * this.currentIndex}px)`;

    this.createIndicatorBars();
    this.updateIndicator();
  }

  next() {
    this.currentIndex += this.cardsPerView;
    if (this.currentIndex >= this.totalSlides) {
      this.currentIndex = 0;
    }
    this.updateCarousel();
  }

  prev() {
    this.currentIndex -= this.cardsPerView;
    if (this.currentIndex < 0) {
      this.currentIndex = Math.max(0, this.totalSlides - this.cardsPerView);
    }
    this.updateCarousel();
  }

  handleSwipe(diffX, diffY) {
    if (Math.abs(diffX) > this.swipeThreshold && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        this.prev();
      } else {
        this.next();
      }
    }
  }

  addEventListeners() {
    this.nextBtn.addEventListener("click", () => this.next());
    this.prevBtn.addEventListener("click", () => this.prev());

    // Touch events on the whole container
    this.container.addEventListener("touchstart", (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
      this.touchStartY = e.changedTouches[0].screenY;
    });

    this.container.addEventListener("touchend", (e) => {
      const diffX = e.changedTouches[0].screenX - this.touchStartX;
      const diffY = e.changedTouches[0].screenY - this.touchStartY;
      this.handleSwipe(diffX, diffY);
    });

    window.addEventListener("resize", () => this.updateCarousel());
  }

  init() {
    this.updateCarousel();
    this.addEventListeners();
  }
}

// Initialize carousel
document.addEventListener("DOMContentLoaded", () => {
  new Carousel(".carousel-container");
});
