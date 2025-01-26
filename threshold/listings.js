document.addEventListener('DOMContentLoaded', function() {
    const tourRequestForm = document.getElementById('tour-request-form');
    const thumbnails = document.querySelectorAll('.thumbnail-gallery img');
    const mainImage = document.querySelector('.main-image img');

    // Thumbnail Image Gallery Interaction
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const clickedImageSrc = this.src;
            mainImage.src = clickedImageSrc;
        });
    });

    // Tour Request Form Submission
    tourRequestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            preferredDate: document.getElementById('preferred-date').value,
            message: document.getElementById('message').value
        };

        // Simulate form submission (replace with actual backend call)
        submitTourRequest(formData);
    });

    function submitTourRequest(data) {
        // Placeholder for actual form submission logic
        alert(`Tour Request Submitted\n
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Preferred Date: ${data.preferredDate}
Message: ${data.message}`);

        // Reset form after submission
        tourRequestForm.reset();
    }

    // Optional: Google Maps Integration (Placeholder)
    function initMap() {
        // In a real scenario, you would use Google Maps API
        const mapContainer = document.getElementById('map-container');
        mapContainer.innerHTML = '<p>Map of Banana Island, Lagos would be displayed here</p>';
    }

    // Call map initialization
    initMap();
});