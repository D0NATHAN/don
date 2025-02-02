const slides = document.querySelectorAll('.slide');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

setInterval(nextSlide, 5000);

function showMenu() {
    document.getElementById("navLinks").classList.add("active");
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    document.getElementById("navLinks").classList.remove("active");
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.client-track');
    const slides = Array.from(track.children);

    const slidesToShow = window.innerWidth > 768 ? 3 : 1;
    const slideWidth = (window.innerWidth - (120 + (slidesToShow + 1) * 30)) / slidesToShow;
    const moveSpeed = 0.5; // pixels per frame
    let currentPosition = 0;
    
    slides.forEach(slide => {
        slide.style.width = `${slideWidth}px`;
    });

    const slidesToClone = slidesToShow * 2;
    
    for (let i = 0; i < slidesToClone; i++) {
        const clone = slides[i].cloneNode(true);
        track.insertBefore(clone, track.firstChild);
    }

    slides.forEach((slide, index) => {
        if (index < slidesToClone) {
            const clone = slide.cloneNode(true);
            track.appendChild(clone);
        }
    });
    
    track.style.transition = 'none';
    
    function moveCarousel() {
        currentPosition -= moveSpeed;
        const maxOffset = -(slides.length + slidesToClone) * (slideWidth + 30);

        if (currentPosition <= maxOffset) {
            currentPosition = -slidesToClone * (slideWidth + 30);
        }
        
        track.style.transform = `translateX(${currentPosition}px)`;
        requestAnimationFrame(moveCarousel);
    }

    requestAnimationFrame(moveCarousel);

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            location.reload();
        }, 250);
    });
});