document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const successMessage = document.querySelector('.success-message');
            const errorMessage = document.querySelector('.error-message');
            const submitBtn = document.querySelector('.submit-btn');

            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';

            setTimeout(() => {
                const success = Math.random() > 0.5;
                
                if (success) {
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                    this.reset();
                } else {
                    successMessage.style.display = 'none';
                    errorMessage.style.display = 'block';
                }
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';

                setTimeout(() => {
                    successMessage.style.display = 'none';
                    errorMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

        document.querySelectorAll('.info-card').forEach((el) => observer.observe(el));

        document.addEventListener('DOMContentLoaded', function () {
            const searchInput = document.getElementById('search');
            const suggestionsList = [
                'Real Estate Properties in Abuja',
                'LPG Services',
                'Weighbridge Solutions',
                'Property Investment',
                'Gas Supply',
                'Weight Measurement'
            ];
        
            const suggestionsContainer = document.getElementById('suggestions');
        
            searchInput.addEventListener('input', function (e) {
                const value = e.target.value.toLowerCase();
                if (value.length > 2) {
                    const matches = suggestionsList.filter(suggestion => suggestion.toLowerCase().includes(value));
                    displaySuggestions(matches);
                } else {
                    suggestionsContainer.innerHTML = '';
                }
            });
        
            function displaySuggestions(matches) {
                suggestionsContainer.innerHTML = '';
                matches.forEach(match => {
                    const div = document.createElement('div');
                    div.className = 'suggestion-item';
                    div.textContent = match;
                    div.addEventListener('click', () => {
                        searchInput.value = match;
                        suggestionsContainer.innerHTML = '';
                    });
                    suggestionsContainer.appendChild(div);
                });
            }

            const shareButtons = document.querySelectorAll('.share-btn');
            shareButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const dropdown = this.nextElementSibling;
                    dropdown.classList.toggle('active');
                });
            });
        
            const video = document.querySelector('.background-video');
        
            if (video) {
                video.play().catch(error => console.log("Video play failed:", error));
        
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            video.play();
                        } else {
                            video.pause();
                        }
                    });
                }, { threshold: 0.5 });
        
                observer.observe(video);
        
                video.addEventListener('error', function () {
                    const videoContainer = document.querySelector('.video-container');
                    videoContainer.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/path/to/fallback-image.jpg")';
                    video.style.display = 'none';
                });
            }
        });
        
        function showMenu() {
            document.getElementById("navLinks").classList.add("active");
            document.body.style.overflow = 'hidden';
        }
        
        function closeMenu() {
            document.getElementById("navLinks").classList.remove("active");
            document.body.style.overflow = '';
        }