async function loadRentalTypes() {
    try {
        const response = await fetch('../data/rentals.json');
        const data = await response.json();
        populateRentalSelect(data.rental_types);
    } catch (error) {
        console.error('Error loading rental data:', error);
    }
}

function populateRentalSelect(rentalTypes) {
    const rentalSelect = document.getElementById('rental-type');
    
    rentalTypes.forEach(type => {
        type.vehicles.forEach(vehicle => {
            const option = document.createElement('option');
            option.value = vehicle.name.toLowerCase().replace(/\s+/g, '-');
            option.textContent = `${vehicle.name} (${vehicle.maxPersons} person${vehicle.maxPersons > 1 ? 's' : ''})`;
            rentalSelect.appendChild(option);
        });
    });
}

function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.classList.add('loading');
    submitButton.disabled = true;

    setTimeout(() => {
        window.location.href = 'thank-you.html';
    }, 1500);
}

function initializeDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    
    startDateInput.min = tomorrow.toISOString().split('T')[0];
    endDateInput.min = tomorrow.toISOString().split('T')[0];
}

function toggleCruiseLine() {
    const cruiseSelect = document.getElementById('cruise-guest');
    const cruiseLineGroup = document.getElementById('cruise-line-group');
    
    cruiseLineGroup.style.display = cruiseSelect.value === 'yes' ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    loadRentalTypes();
    initializeDates();
    
    const form = document.querySelector('.reservation-form');
    form.addEventListener('submit', handleSubmit);
    
    const cruiseSelect = document.getElementById('cruise-guest');
    cruiseSelect.addEventListener('change', toggleCruiseLine);
});