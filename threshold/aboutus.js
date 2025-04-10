const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.mission-card').forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
});
function showMenu() {
    document.getElementById("navLinks").classList.add("active");
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    document.getElementById("navLinks").classList.remove("active");
    document.body.style.overflow = '';
}