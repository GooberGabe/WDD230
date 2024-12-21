const COZUMEL_LAT = 20.4230;
const COZUMEL_LON = -86.9223;
const API_KEY = '1184a90aee199bd2fdfa0ea4c5d68101';

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${COZUMEL_LAT}&lon=${COZUMEL_LON}&appid=${API_KEY}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${COZUMEL_LAT}&lon=${COZUMEL_LON}&appid=${API_KEY}`;

async function getWeatherData() {
    try {
        const weatherResponse = await fetch(weatherURL);
        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(forecastURL);
        const forecastData = await forecastResponse.json();

        displayWeatherAlert(weatherData);
        displayWeatherWidget(weatherData, forecastData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".weather-widget").innerHTML = "Weather data currently unavailable";
    }
}

function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

function displayWeatherAlert(data) {
    const maxTemp = kelvinToCelsius(data.main.temp_max);
    const alertHtml = `
        <p>Today's high temperature: ${maxTemp}°C</p>
        <button aria-label="Close alert" onclick="closeWeatherAlert()">×</button>
    `;
    const alertElement = document.querySelector(".weather-alert");
    if (alertElement) {
        alertElement.innerHTML = alertHtml;
        alertElement.style.display = 'block';
    }
}

function displayWeatherWidget(currentData, forecastData) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split('T')[0];
    
    const forecast15 = forecastData.list.find(item => 
        item.dt_txt.includes(tomorrowDate) && 
        item.dt_txt.includes('15:00:00')
    );

    const currentTemp = kelvinToCelsius(currentData.main.temp);
    const humidity = currentData.main.humidity;
    const forecast15Temp = forecast15 ? kelvinToCelsius(forecast15.main.temp) : 'N/A';

    const weatherHtml = `
        <h3>Current Weather</h3>
        <div class="weather-data">
            <div class="weather-item">
                <p>Temperature</p>
                <strong>${currentTemp}°C</strong>
            </div>
            <div class="weather-item">
                <p>Humidity</p>
                <strong>${humidity}%</strong>
            </div>
            <div class="weather-item">
                <p>Tomorrow 3PM</p>
                <strong>${forecast15Temp}°C</strong>
            </div>
            <div class="weather-item">
                <p>Conditions</p>
                <div class="weather-conditions">
                    ${currentData.weather.map(weather => `
                        <div>
                            <img src="https://openweathermap.org/img/wn/${weather.icon}.png" 
                                 alt="${weather.description}">
                            <span>${weather.main}</span>
                            <small>${weather.description}</small>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    const weatherWidget = document.querySelector(".weather-widget");
    if (weatherWidget) {
        weatherWidget.innerHTML = weatherHtml;
    }
}

function closeWeatherAlert() {
    const alertElement = document.querySelector(".weather-alert");
    if (alertElement) {
        alertElement.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', getWeatherData);