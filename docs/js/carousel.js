const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const cards = document.querySelectorAll(".project-card");
const barContainer = document.getElementById("indicators");

let cardWidth = cards[0].offsetWidth + 32;
let cardsPerView = getCardsPerView();
const totalSlides = cards.length;
let currentIndex = 0;

function getCardsPerView() {
    const width = window.innerWidth;
    if (width < 1024) return 1;
    if (width < 1700) return 2;
    return 3;
}

function updateCardWidth() {
    cardWidth = cards[0].offsetWidth + 32; // include margin/gap if needed
}

function createIndicatorBars() {
    barContainer.innerHTML = ""; // Clear old bars
    cardsPerView = getCardsPerView(); // Make sure we're calculating with updated value
    const numBars = Math.ceil(totalSlides / cardsPerView);

    for (let i = 0; i < numBars; i++) {
        const bar = document.createElement("span");
        bar.className = "bar";
        bar.addEventListener("click", () => {
            currentIndex = i * cardsPerView;
            updateCarousel();
        });
        barContainer.appendChild(bar);
    }
}

function updateIndicator(index) {
    const bars = barContainer.querySelectorAll(".bar");
    const activeBar = Math.floor(index / cardsPerView);
    bars.forEach((bar, i) => {
        bar.classList.toggle("active", i === activeBar);
    });
}

function updateCarousel() {
    cardsPerView = getCardsPerView();
    updateCardWidth();

    const maxIndex = Math.max(0, totalSlides - cardsPerView);
    currentIndex = Math.min(currentIndex, maxIndex);

    track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;

    createIndicatorBars(); // recreate indicators if screen size changed
    updateIndicator(currentIndex); // only one bar gets "active"
}

nextBtn.addEventListener("click", () => {
    currentIndex += cardsPerView;
    if (currentIndex >= totalSlides) {
        currentIndex = 0; // loop to start
    }
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    currentIndex -= cardsPerView;
    if (currentIndex < 0) {
        currentIndex = Math.max(0, totalSlides - cardsPerView); // loop to end
    }
    updateCarousel();
});

// --- Touch Swipe Support ---

let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50; // Minimum px distance to qualify as a swipe

track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const diffX = touchEndX - touchStartX;
    if (Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
            // Swipe right -> previous
            currentIndex -= cardsPerView;
            if (currentIndex < 0) {
                currentIndex = Math.max(0, totalSlides - cardsPerView);
            }
            updateCarousel();
        } else {
            // Swipe left -> next
            currentIndex += cardsPerView;
            if (currentIndex >= totalSlides) {
                currentIndex = 0;
            }
            updateCarousel();
        }
    }
}

window.addEventListener("resize", () => {
    updateCarousel();
});

// Initialize carousel on load
updateCarousel();

