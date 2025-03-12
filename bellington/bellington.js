// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide navbar on scroll down, show on scroll up
    if (scrollTop > lastScrollTop) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    // Update last scroll position
    lastScrollTop = Math.max(0, lastScrollTop);
});

// Testimonial Carousel
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonials = document.querySelectorAll('.testimonial-card');
let currentIndex = 0;
const testimonialWidth = 300 + 32; // card width + margin

function updateTestimonialPosition() {
    testimonialTrack.style.transform = `translateX(-${currentIndex * testimonialWidth}px)`;
}

// Auto-advance testimonials
setInterval(() => {
    currentIndex = (currentIndex + 1) % (testimonials.length - 2);
    updateTestimonialPosition();
}, 5000);

// Service Cards Animation
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', '100');
});

// Mission & Vision Animation
const missionVisionSections = document.querySelectorAll('.mission, .vision');
missionVisionSections.forEach((section, index) => {
    section.setAttribute('data-aos', 'fade-right');
    section.setAttribute('data-aos-delay', `${index * 200}`);
});

// Mobile Navigation Toggle
const createMobileNav = () => {
    const navbar = document.querySelector('.navbar');
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'mobile-nav-toggle';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-nav';
    mobileMenu.innerHTML = document.querySelector('.nav-links').innerHTML;
    
    navbar.appendChild(hamburger);
    navbar.appendChild(mobileMenu);
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        hamburger.innerHTML = mobileMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    });
};

// Initialize mobile nav if screen width is below 768px
if (window.innerWidth <= 768) {
    createMobileNav();
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Footer Year Update
document.querySelector('.current-year').textContent = new Date().getFullYear();