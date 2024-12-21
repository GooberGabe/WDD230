function closeWeatherAlert() {
    weatherAlert.style.display = 'none';
}

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

document.addEventListener('DOMContentLoaded', fetchWeatherData);