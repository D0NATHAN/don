document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".hero");
    const heroContent = document.querySelector(".hero-content");
    const heroOverlay = document.querySelector(".hero-overlay");

    let position = 0;
    let direction = 1;

    function animateBackground() {
        position += direction * 0.3;
        hero.style.backgroundPosition = `${position}% 50%`;

        if (position >= 100 || position <= 0) {
            direction *= -1;
        }

        requestAnimationFrame(animateBackground);
    }

    const gradients = [
        {
            start: "rgba(10, 46, 56, 0.6)",
            end: "rgba(26, 83, 92, 0.8)",
            name: "deep-blue"
        },
        {
            start: "rgba(34, 177, 76, 0.6)",
            end: "rgba(78, 205, 196, 0.8)",
            name: "greenish-blue"
        },
        {
            start: "rgba(50, 50, 50, 0.7)",
            end: "rgba(0, 0, 0, 0.9)",
            name: "dark-pollution"
        }
    ];

    let currentGradientIndex = 0;
    let nextGradientIndex = 1;
    let transitionProgress = 0;
    let isTransitioning = false;

    function createGradientTransition() {
        const currentGradient = gradients[currentGradientIndex];
        const nextGradient = gradients[nextGradientIndex];

        const startColor = interpolateColors(currentGradient.start, nextGradient.start, transitionProgress);
        const endColor = interpolateColors(currentGradient.end, nextGradient.end, transitionProgress);

        heroOverlay.style.background = `linear-gradient(to right, ${startColor}, ${endColor})`;
    }

    function interpolateColors(color1, color2, progress) {

        const c1 = color1.match(/[\d.]+/g).map(Number);
        const c2 = color2.match(/[\d.]+/g).map(Number);

        const r = Math.round(c1[0] + (c2[0] - c1[0]) * progress);
        const g = Math.round(c1[1] + (c2[1] - c1[1]) * progress);
        const b = Math.round(c1[2] + (c2[2] - c1[2]) * progress);
        const a = c1[3] + (c2[3] - c1[3]) * progress;

        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    function animateGradientTransition() {
        if (!isTransitioning) {
            isTransitioning = true;
            transitionProgress = 0;
            heroOverlay.classList.add('active');
        }

        transitionProgress += 0.005;

        if (transitionProgress >= 1) {
            transitionProgress = 0;
            currentGradientIndex = nextGradientIndex;
            nextGradientIndex = (nextGradientIndex + 1) % gradients.length;
            isTransitioning = false;
        }

        createGradientTransition();
        requestAnimationFrame(animateGradientTransition);
    }

    animateGradientTransition();

    function animateHeroContent() {
        setTimeout(() => {
            heroContent.classList.add('visible');
        }, 500);
    }

    animateHeroContent();

    animateBackground();

    const gradients = [
        "linear-gradient(to right, rgba(10, 46, 56, 0.6), rgba(26, 83, 92, 0.8))", 
        "linear-gradient(to right, rgba(34, 177, 76, 0.6), rgba(78, 205, 196, 0.8))",
        "linear-gradient(to right, rgba(50, 50, 50, 0.7), rgba(0, 0, 0, 0.9))", 
    ];

    let index = 0;

    if (heroOverlay) {
        function changeGradient() {
            heroOverlay.style.background = gradients[index];
            index = (index + 1) % gradients.length;
        }

        setInterval(changeGradient, 5000);
    } else {
        console.error("Hero overlay element not found!");
    }

    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    let lastScroll = 0;
    let isScrolling = false;

    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    }

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    function handleMouseMove(e) {
        if (e.clientY < 100) {
            navbar.classList.remove('hidden');
        }
    }

    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
    }

    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    window.addEventListener('scroll', throttle(handleScroll, 100));
    window.addEventListener('mousemove', handleMouseMove);
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    handleScroll();
});