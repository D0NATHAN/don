document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const steps = document.querySelectorAll('.form-step');
    const progressBar = document.getElementById('progress');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    
    let currentStep = 1;
    const totalSteps = steps.length;

    function updateProgress() {
        const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressBar.style.width = `${progress}%`;

        progressSteps.forEach((step, idx) => {
            if (idx + 1 <= currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    function showStep(stepNumber) {
        steps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) === stepNumber) {
                step.classList.add('active');
            }
        });
        updateProgress();
    }

    function validateStep(stepNumber) {
        const currentStepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
        const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        return isValid;
    }

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const monthlyEnergy = parseFloat(data.monthlyEnergy) || 0;
            const weeklyMiles = parseFloat(data.weeklyMiles) || 0;
            let carbonFootprint = 0;

            if (data.energySource === 'grid') {
                carbonFootprint += monthlyEnergy * 0.92;
            }

            if (data.carType === 'gasoline') {
                carbonFootprint += weeklyMiles * 0.404 * 52;
            } else if (data.carType === 'diesel') {
                carbonFootprint += weeklyMiles * 0.442 * 52;
            } else if (data.carType === 'hybrid') {
                carbonFootprint += weeklyMiles * 0.284 * 52;
            }

            const message = `
                <h3>Sign Up Successful!</h3>
                <p>Your estimated annual carbon footprint: ${Math.round(carbonFootprint)} kg CO2</p>
                <p>We'll help you offset this through your chosen projects.</p>
            `;

            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = message;

            form.innerHTML = '';
            form.appendChild(successMessage);
        }
    });

    showStep(currentStep);
}); 