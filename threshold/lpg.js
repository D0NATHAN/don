document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const suggestionsList = [
        'Real Estate Properties in Abuja',
        'LPG Services',
        'Weighbridge Solutions',
        'Property Investment',
        'Gas Supply',
        'Weight Measurement'
    ];

    const locationInput = document.getElementById('location-input');
    const priceResults = document.getElementById('price-results');

    locationInput.addEventListener('input', function() {
        const location = this.value.trim();
        if (location) {
            const baseLocations = {
                'Abuja': { priceMultiplier: 1.0 },
                'Lagos': { priceMultiplier: 1.1 },
                'Port Harcourt': { priceMultiplier: 1.2 }
            };

            const locationData = baseLocations[location] || { priceMultiplier: 1.0 };
            
            priceResults.innerHTML = `
                <h4>Prices for ${location}:</h4>
                ${products.map(product => `
                    <p>${product.name}: ₦${(product.price * locationData.priceMultiplier).toLocaleString()}</p>
                `).join('')}
            `;
        } else {
            priceResults.innerHTML = '';
        }
    });

    const orderNowBtn = document.getElementById('order-now-btn');
    if (orderNowBtn) {
        orderNowBtn.addEventListener('click', function() {
            window.location.href = '/checkout.html';
        });
    }

    populateProducts();
});

document.addEventListener('DOMContentLoaded', function() {
    const locationInput = document.getElementById('location-input');
    const comparePricesBtn = document.getElementById('compare-prices');
    const priceComparisonResults = document.getElementById('price-comparison-results');
    const cylinderSize = document.getElementById('cylinder-size');
    const cylinderQuantity = document.getElementById('cylinder-quantity');
    const totalPriceElement = document.getElementById('total-price');
    const orderNowBtn = document.getElementById('orderNow');

    const locationPrices = {
        'Lagos': { '5kg': 3800, '12.5kg': 4800, '50kg': 6200 },
        'Abuja': { '5kg': 3600, '12.5kg': 4600, '50kg': 6000 },
        'Port Harcourt': { '5kg': 3900, '12.5kg': 4900, '50kg': 6300 }
    };

    comparePricesBtn.addEventListener('click', function() {
        const location = locationInput.value.trim();
        if (!location) {
            priceComparisonResults.innerHTML = 'Please enter a location';
            return;
        }

        const matchedLocations = Object.keys(locationPrices)
            .filter(loc => loc.toLowerCase().includes(location.toLowerCase()));

        if (matchedLocations.length === 0) {
            priceComparisonResults.innerHTML = 'No pricing data found for this location';
            return;
        }

        let resultHTML = '<h5>Pricing Comparison</h5>';
        matchedLocations.forEach(loc => {
            resultHTML += `
                <div class="location-price">
                    <strong>${loc}:</strong>
                    <ul>
                        <li>5kg: ₦${locationPrices[loc]['5kg']}</li>
                        <li>12.5kg: ₦${locationPrices[loc]['12.5kg']}</li>
                        <li>50kg: ₦${locationPrices[loc]['50kg']}</li>
                    </ul>
                </div>
            `;
        });

        priceComparisonResults.innerHTML = resultHTML;
    });

    function updateTotalPrice() {
        const size = cylinderSize.value;
        const quantity = cylinderQuantity.value;
        const basePrice = locationPrices['Lagos'][size];
        const totalPrice = basePrice * quantity;

        totalPriceElement.textContent = `Total: ₦${totalPrice.toLocaleString()}`;
    }

    cylinderSize.addEventListener('change', updateTotalPrice);
    cylinderQuantity.addEventListener('input', updateTotalPrice);

    orderNowBtn.addEventListener('click', function() {
        const size = cylinderSize.value;
        const quantity = cylinderQuantity.value;

        if (!quantity || quantity < 1) {
            alert('Please select a valid quantity');
            return;
        }

        alert(`Preparing checkout for ${quantity} x ${size} cylinders`);
    });
});

function showMenu() {
    document.getElementById("navLinks").classList.add("active");
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    document.getElementById("navLinks").classList.remove("active");
    document.body.style.overflow = '';
}