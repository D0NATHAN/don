document.addEventListener('DOMContentLoaded', function() {
    const tourRequestForm = document.getElementById('tour-request-form');
    const thumbnails = document.querySelectorAll('.thumbnail-gallery img');
    const mainImage = document.querySelector('.main-image img');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const clickedImageSrc = this.src;
            mainImage.src = clickedImageSrc;
        });
    });

    tourRequestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            preferredDate: document.getElementById('preferred-date').value,
            message: document.getElementById('message').value
        };

        submitTourRequest(formData);
    });

    function submitTourRequest(data) {
        alert(`Tour Request Submitted\n
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Preferred Date: ${data.preferredDate}
Message: ${data.message}`);

        tourRequestForm.reset();
    }

    function initMap() {
        const mapContainer = document.getElementById('map-container');
        mapContainer.innerHTML = '<p>Map Will Be Displayed</p>';
    }

    initMap();
});