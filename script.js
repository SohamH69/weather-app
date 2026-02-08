const apiKey = "b4ccecd2a4865fa4d314adfc0203d1d4";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//getting the elements from the DOM Search box and search button
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  console.log(data);

  document.querySelector(".weather-desc").innerHTML = data.weather[0].main;
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/payload/api/media/file/${iconCode}.png`;

  document.getElementById("weatherIcon").src = iconUrl;

  // if (data.weather[0].main == "Clouds") {
  //   document.querySelector(".weather-icon").src = "images/clouds.png";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

//Getting GeoLocation and converting it to city name using reverse geocoding API and then calling the checkWeather function with the city name
const currApiUrl = "https://api.openweathermap.org/geo/1.0/reverse?";
navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    //console.log(`Latitude: ${lat}, Longitude: ${lon}`);
    async function getCityName(lat, lon) {
      const response = await fetch(
        currApiUrl + `lat=${lat}&lon=${lon}&appid=${apiKey}`,
      );
      var data1 = await response.json();
      console.log(data1);
      const city = data1[0].name;
      console.log(city);
      checkWeather(city);
    }
    getCityName(lat, lon);
  },
  (error) => {
    console.error("Error getting location: ", error);
  },
);
