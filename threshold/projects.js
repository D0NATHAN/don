document.addEventListener('DOMContentLoaded', function() {
    const projectImages = {
        'threshold-plaza': [
            '/path/to/threshold-plaza-1.jpg',
        ],
        'mabushi': [
            '/path/to/mabushi-1.jpg',
        ],
        'apo-gudu': [
            '/path/to/mabushi-1.jpg',
        ], 
        'area-1': [
            '/path/to/mabushi-1.jpg',
        ], 
        'gwarinpa': [
            '/path/to/mabushi-1.jpg',
        ],
    };

    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        const sliderContainer = card.querySelector('.slider-container');
        const dotsContainer = card.querySelector('.dots');
        let currentSlide = 0;

        const images = Array(5).fill(null).map((_, i) => {
            const img = document.createElement('img');
            img.src = `/api/placeholder/800/600`;
            img.style.position = 'absolute';
            img.style.left = `${i * 100}%`;
            img.style.transition = 'transform 0.3s ease-in-out';
            return img;
        });
        
        images.forEach(img => sliderContainer.appendChild(img));

        images.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
        
        function goToSlide(slideIndex) {
            images.forEach(img => {
                img.style.transform = `translateX(-${slideIndex * 100}%)`;
            });

            dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === slideIndex);
            });
            
            currentSlide = slideIndex;
        }

        setInterval(() => {
            currentSlide = (currentSlide + 1) % images.length;
            goToSlide(currentSlide);
        }, 5000);
    });
});