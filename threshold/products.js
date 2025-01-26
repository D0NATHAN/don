document.addEventListener('DOMContentLoaded', function () {
    const hash = window.location.hash;
    if (hash) {
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            targetSection.classList.add('highlighted-section');
        }
    }

    // Existing Search Suggestions
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

    // Share Buttons
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function () {
            const dropdown = this.nextElementSibling;
            dropdown.classList.toggle('active');
        });
    });

    // Map Initialization with Error Handling
    function loadGoogleMaps() {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onerror = () => console.error('Failed to load Google Maps script');
        document.head.appendChild(script);
    }

    window.initMap = function() {
        try {
            const mapStyles = [
                { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
                { featureType: 'transit', elementType: 'labels', stylers: [{ visibility: 'off' }] }
            ];

            const mapElement = document.getElementById('map');
            if (!mapElement) {
                console.error('Map container not found');
                return;
            }

            const map = new google.maps.Map(mapElement, {
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
        } catch (error) {
            console.error('Map initialization error:', error);
        }
    };

    // Improved Error Handling for Map Loading
    if (typeof google === 'undefined') {
        loadGoogleMaps();
    } else {
        initMap();
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

// Smooth section navigation for internal links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    const suggestionsContainer = document.getElementById('suggestions');
    const searchButton = document.getElementById('search-button');

    // Comprehensive search suggestions with advanced matching
    const searchData = [
        { 
            title: 'Real Estate Properties in Abuja', 
            keywords: ['real estate', 'properties', 'abuja', 'investment'],
            link: 'projects.html'
        },
        { 
            title: 'LPG Services', 
            keywords: ['lpg', 'gas', 'fuel', 'energy'],
            link: 'lpg.html'
        },
        { 
            title: 'Weighbridge Solutions', 
            keywords: ['weighbridge', 'weight', 'measurement', 'logistics'],
            link: 'weighbridge.html'
        },
        { 
            title: 'Property Investment', 
            keywords: ['property', 'invest', 'real estate', 'portfolio'],
            link: 'projects.html'
        }
    ];

    // Enhanced search suggestions
    searchInput.addEventListener('input', function (e) {
        const value = e.target.value.toLowerCase().trim();
        suggestionsContainer.innerHTML = '';

        if (value.length > 1) {
            const matches = searchData.filter(item => 
                item.keywords.some(keyword => 
                    keyword.toLowerCase().includes(value)
                )
            );

            matches.forEach(match => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.innerHTML = `
                    <span class="suggestion-title">${match.title}</span>
                    <span class="suggestion-keyword">${match.keywords.find(k => k.includes(value)) || match.keywords[0]}</span>
                `;
                div.addEventListener('click', () => {
                    searchInput.value = match.title;
                    window.location.href = match.link;
                });
                suggestionsContainer.appendChild(div);
            });
        }
    });

    // Add magnifying glass search button
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    // Allow search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const value = searchInput.value.toLowerCase().trim();
        const match = searchData.find(item => 
            item.keywords.some(keyword => 
                keyword.toLowerCase().includes(value)
            )
        );

        if (match) {
            window.location.href = match.link;
        } else {
            // Fallback or error handling
            alert('No matching results found');
        }
    }
});