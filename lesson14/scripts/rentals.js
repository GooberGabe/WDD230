async function loadRentalData() {
    try {
        const response = await fetch('../data/rentals.json');
        const data = await response.json();
        displayRentalPricing(data);
        displayAgreements(data.rental_agreements);
    } catch (error) {
        console.error('Error loading rental data:', error);
        document.getElementById('pricing-tables').innerHTML = 
            '<p class="error">Error loading rental information. Please try again later.</p>';
    }
}

function displayRentalPricing(data) {
    const pricingContainer = document.getElementById('pricing-tables');
    
    data.rental_types.forEach(type => {
        const section = document.createElement('section');
        section.className = 'pricing-section';
        
        section.innerHTML = `
            <h3>${type.category}</h3>
            <div class="table-responsive">
                <table class="pricing-table">
                    <thead>
                        <tr>
                            <th>Vehicle</th>
                            <th>Max Persons</th>
                            <th colspan="2">Reservation</th>
                            <th colspan="2">Walk-In</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Half Day</th>
                            <th>Full Day</th>
                            <th>Half Day</th>
                            <th>Full Day</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${type.vehicles.map(vehicle => `
                            <tr>
                                <td>
                                    <strong>${vehicle.name}</strong>
                                    ${vehicle.cc ? `<br><span class="specs">${vehicle.cc}</span>` : ''}
                                    ${vehicle.features ? `<br><span class="specs">${vehicle.features.join(', ')}</span>` : ''}
                                </td>
                                <td>${vehicle.maxPersons}</td>
                                <td>$${vehicle.pricing.reservation.halfDay}</td>
                                <td>$${vehicle.pricing.reservation.fullDay}</td>
                                <td>$${vehicle.pricing.walkIn.halfDay}</td>
                                <td>$${vehicle.pricing.walkIn.fullDay}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        
        pricingContainer.appendChild(section);
    });
}

function displayAgreements(agreements) {
    const requirementsContainer = document.getElementById('requirements');
    const servicesContainer = document.getElementById('services');
    
    requirementsContainer.innerHTML = `
        <h3>Rental Requirements</h3>
        <ul>
            ${agreements.requirements.map(req => `<li>${req}</li>`).join('')}
        </ul>
    `;
    
    servicesContainer.innerHTML = `
        <h3>Services & Policies</h3>
        <ul>
            ${agreements.services.map(service => `<li>${service}</li>`).join('')}
        </ul>
    `;
}

document.addEventListener('DOMContentLoaded', loadRentalData);