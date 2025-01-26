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

            if (typeof google !== 'undefined') {
                initMap();
            } else {
                console.error('Google Maps API not loaded');
            }
        
            function initMap() {
                const mapStyles = [
                    { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
                    { featureType: 'transit', elementType: 'labels', stylers: [{ visibility: 'off' }] }
                ];
        
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: 9.0765, lng: 7.3986 },
                    zoom: 12,
                    styles: mapStyles,
                    mapTypeControl: true,
                    streetViewControl: true,
                    fullscreenControl: true
                });
        
                const icons = {
                    'real-estate': { url: '/images/markers/real-estate.png', scaledSize: new google.maps.Size(32, 32) },
                    'lpg': { url: '/images/markers/lpg.png', scaledSize: new google.maps.Size(32, 32) },
                    'weighbridge': { url: '/images/markers/weighbridge.png', scaledSize: new google.maps.Size(32, 32) }
                };
        
                const locations = [
                    { title: 'Real Estate Office', position: { lat: 9.0765, lng: 7.3986 }, type: 'real-estate', description: 'Main real estate office location' },
                    { title: 'LPG Station', position: { lat: 9.0805, lng: 7.4204 }, type: 'lpg', description: 'LPG distribution center' },
                    { title: 'Weighbridge Center', position: { lat: 9.0574, lng: 7.4898 }, type: 'weighbridge', description: 'Vehicle weighing station' }
                ];
        
                const infoWindow = new google.maps.InfoWindow();
        
                const markers = locations.map(location => {
                    const marker = new google.maps.Marker({
                        position: location.position,
                        map: map,
                        title: location.title,
                        icon: icons[location.type],
                        animation: google.maps.Animation.DROP
                    });
        
                    marker.addListener('click', () => {
                        infoWindow.setContent(
                            `<div class="info-window">
                                <h3>${location.title}</h3>
                                <p>${location.description}</p>
                                <button onclick="getDirections(${location.position.lat}, ${location.position.lng})">Get Directions</button>
                            </div>`
                        );
                        infoWindow.open(map, marker);
                    });
                    return marker;
                });
        
                new MarkerClusterer(map, markers, {
                    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                });
        
                addCustomControls(map);
            }
        
            function getDirections(lat, lng) {
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);
            }
        
            function addCustomControls(map) {
                const customControlDiv = document.createElement('div');
                customControlDiv.className = 'custom-map-control';
        
                ['real-estate', 'lpg', 'weighbridge'].forEach(type => {
                    const button = document.createElement('button');
                    button.textContent = `Show ${type.replace('-', ' ')}`;
                    button.addEventListener('click', () => filterMarkers(type));
                    customControlDiv.appendChild(button);
                });
        
                const resetButton = document.createElement('button');
                resetButton.textContent = 'Reset View';
                resetButton.addEventListener('click', () => {
                    map.setCenter({ lat: 9.0765, lng: 7.3986 });
                    map.setZoom(12);
                });
                customControlDiv.appendChild(resetButton);
        
                map.controls[google.maps.ControlPosition.TOP_RIGHT].push(customControlDiv);
            }
        
            function trackPageView() {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'page_view', {
                        page_title: document.title,
                        page_location: window.location.href,
                        page_path: window.location.pathname
                    });
                }
            }
        
            trackPageView();
        
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
        
