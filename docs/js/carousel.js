// Carousel class to manage sliding cards, indicators, and swipe gestures
class Carousel {
    constructor(containerSelector) {
        // Get carousel container and essential elements
        this.container = document.querySelector(containerSelector);
        this.track = this.container.querySelector(".carousel-track");
        this.prevBtn = this.container.querySelector(".carousel-btn.prev");
        this.nextBtn = this.container.querySelector(".carousel-btn.next");
        this.cards = this.container.querySelectorAll(".project-card");
        this.barContainer = document.getElementById("indicators");

        // State variables
        this.cardWidth = 0;
        this.cardsPerView = this.getCardsPerView(); // Number of visible cards based on screen width
        this.totalSlides = this.cards.length;
        this.currentIndex = 0;

        // Swipe state
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.swipeThreshold = 50; // Minimum px distance to consider a swipe

        this.init(); // Initialize carousel
    }

    // Preload the first few images to prevent delay on first slide
    preloadImages(preloadCount = 6) {
        const images = this.container.querySelectorAll("img[loading='lazy']");
        images.forEach((img, i) => {
            if (i < preloadCount) {
                img.setAttribute("loading", "eager");
            }
        });
    }

    // Determine how many cards fit in the view depending on screen width
    getCardsPerView() {
        const width = window.innerWidth;
        if (width < 1024) return 1;
        if (width < 1700) return 2;
        return 3;
    }

    // Update the width of a single card including margin/gap
    updateCardWidth() {
        this.cardWidth = this.cards[0].offsetWidth + 32; // adjust 32px if your gap changes
    }

    // Create clickable indicator bars below the carousel
    createIndicatorBars() {
        this.barContainer.innerHTML = ""; // clear old bars
        this.cardsPerView = this.getCardsPerView(); 
        const numBars = Math.ceil(this.totalSlides / this.cardsPerView);

        for (let i = 0; i < numBars; i++) {
            const bar = document.createElement("span");
            bar.className = "bar";
            // Clicking a bar jumps to that group of cards
            bar.addEventListener("click", () => {
                this.currentIndex = i * this.cardsPerView;
                this.updateCarousel();
            });
            this.barContainer.appendChild(bar);
        }
    }

    // Highlight the active indicator bar
    updateIndicator() {
        const bars = this.barContainer.querySelectorAll(".bar");
        const activeBar = Math.floor(this.currentIndex / this.cardsPerView);
        bars.forEach((bar, i) => {
            bar.classList.toggle("active", i === activeBar);
        });
    }

    // Main function to update carousel position
    updateCarousel() {
        this.cardsPerView = this.getCardsPerView();
        this.updateCardWidth();

        const maxIndex = Math.max(0, this.totalSlides - this.cardsPerView);
        this.currentIndex = Math.min(this.currentIndex, maxIndex);

        // Slide the track
        this.track.style.transform = `translateX(-${this.cardWidth * this.currentIndex}px)`;

        this.createIndicatorBars(); // refresh indicators
        this.updateIndicator();     // update active bar
    }

    // Move to next slide group
    next() {
        this.currentIndex += this.cardsPerView;
        if (this.currentIndex >= this.totalSlides) {
            this.currentIndex = 0; // loop to start
        }
        this.updateCarousel();
    }

    // Move to previous slide group
    prev() {
        this.currentIndex -= this.cardsPerView;
        if (this.currentIndex < 0) {
            this.currentIndex = Math.max(0, this.totalSlides - this.cardsPerView); // loop to end
        }
        this.updateCarousel();
    }

    // Handle swipe gestures
    handleSwipe(diffX, diffY) {
        // Only consider horizontal swipes exceeding threshold
        if (Math.abs(diffX) > this.swipeThreshold && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) {
                this.prev(); // swipe right
            } else {
                this.next(); // swipe left
            }
        }
    }

    // Add button clicks, touch gestures, and resize listeners
    addEventListeners() {
        this.nextBtn.addEventListener("click", () => this.next());
        this.prevBtn.addEventListener("click", () => this.prev());

        // Touch events for swipe
        this.container.addEventListener("touchstart", (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
            this.touchStartY = e.changedTouches[0].screenY;
        });

        this.container.addEventListener("touchend", (e) => {
            const diffX = e.changedTouches[0].screenX - this.touchStartX;
            const diffY = e.changedTouches[0].screenY - this.touchStartY;
            this.handleSwipe(diffX, diffY);
        });

        // Recalculate cards and width on window resize
        window.addEventListener("resize", () => this.updateCarousel());
    }

    // Initialize carousel: preload images, render first slide, add listeners
    init() {
        this.preloadImages(6); 
        this.updateCarousel();
        this.addEventListeners();
    }
}

// Initialize the carousel once DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    new Carousel(".carousel-container");
});
