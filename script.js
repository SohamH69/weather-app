//Get current location
async function getWeatherByLocation() {
  try {
    const position = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject),
    );
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(`Latitude: ${lat}, Longitude: ${lon}`);

    //Call backend
    const response = await fetch(
      `https://weather-app-backend-dm79.onrender.com/weather?lat=${lat}&lon=${lon}`,
    );
    const data = await response.json();
    const iconCode = data.icon;
    const iconUrl = `https://openweathermap.org/payload/api/media/file/${iconCode}.png`;

    //Update UI
    updateUI(data, iconUrl);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

//Search by city name
async function getWeatherByCity(city) {
  try {
    const response = await fetch(
      `https://weather-app-backend-dm79.onrender.com/weather?city=${city}`,
    );
    const data = await response.json();
    const iconCode = data.icon;
    const iconUrl = `https://openweathermap.org/payload/api/media/file/${iconCode}.png`;

    updateUI(data, iconUrl);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  getWeatherByCity(searchBox.value);
});

//Update UI
function updateUI(data, iconUrl) {
  document.querySelector(".weather-desc").innerHTML = data.description;
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";
  document.getElementById("weather-icon").src = iconUrl;
}

document.addEventListener("DOMContentLoaded", () => {
  getWeatherByLocation();
});
