const weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=39.57&lon=-84.23&appid=1184a90aee199bd2fdfa0ea4c5d68101";
const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=39.57&lon=-84.23&appid=1184a90aee199bd2fdfa0ea4c5d68101";

async function getWeatherData() {
    try {
        const weatherResponse = await fetch(weatherURL);
        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(forecastURL);
        const forecastData = await forecastResponse.json();

        displayWeather(weatherData);
        displayForecast(forecastData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector("#weather").innerHTML = "Weather data currently unavailable";
    }
}

function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

function displayWeather(data) {
    const temp = kelvinToCelsius(data.main.temp);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = Math.round(data.wind.speed);

    const weatherHtml = `
        <div class="current-weather">
            <h2>Current Weather</h2>
            <p class="temperature">${temp}°C</p>
            <p class="description">${description}</p>
            <div class="details">
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            </div>
        </div>
    `;

    document.querySelector("#weather").innerHTML = weatherHtml;
}

function displayForecast(data) {
    const dailyForecasts = [];
    const processedDates = new Set();

    for (const item of data.list) {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!processedDates.has(date) && dailyForecasts.length < 3) {
            dailyForecasts.push(item);
            processedDates.add(date);
        }
    }

    const forecastHtml = `
        <div class="forecast">
            <h2>3-Day Forecast</h2>
            <div class="forecast-grid">
                ${dailyForecasts.map(day => `
                    <div class="forecast-day">
                        <p class="date">${new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                        <p class="temperature">${kelvinToCelsius(day.main.temp)}°C</p>
                        <p class="description">${day.weather[0].description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    let forecastContainer = document.querySelector("#forecast");
    if (!forecastContainer) {
        forecastContainer = document.createElement('div');
        forecastContainer.id = 'forecast';
        document.querySelector("#weather").insertAdjacentElement('afterend', forecastContainer);
    }
    forecastContainer.innerHTML = forecastHtml;
}

getWeatherData();