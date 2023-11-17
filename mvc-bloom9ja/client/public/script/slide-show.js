const slideshowContainer = document.getElementById('slideshow-container');
const contentItems = document.querySelectorAll('.slideshow-content');

let currentIndex = 0;

function startSlideshow() {
    setInterval(() => {
        currentIndex = (currentIndex + 1) % contentItems.length;
        const offset = -currentIndex * 100;
        slideshowContainer.style.transform = `translateX(${offset}%)`;
    }, 3000); // Change content every 3 seconds (adjust as needed)
}

startSlideshow();