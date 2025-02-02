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

    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

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
            alert('No matching results found');
        }
    }
});})

function showMenu() {
    document.getElementById("navLinks").classList.add("active");
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    document.getElementById("navLinks").classList.remove("active");
    document.body.style.overflow = '';
}