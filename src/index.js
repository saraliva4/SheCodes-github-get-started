function getForecast(coordinates) {
  let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
  let unit = "metric";
  let apiURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  console.log(coordinates);
  axios.get(apiURL).then(showWeeklyForecast);
}
function showHourlyForecast() {
  let hourlyForecastElement = document.querySelector("#hourly-forecast");
  let hourlyForecastHTML = `<div class="row">`;

  weekDays.forEach(function (day) {
    hourlyForecastHTML =
      hourlyForecastHTML +
      `
    <div class="col-2 today-hours currently">
    ${day}
    <br />
    <img
    src=""
    alt=""
    width="42"
    class="forecast-weather-icon"
    id="forecast-weather-icon"
    />
    3°
    </div>`;
  });

  hourlyForecastHTML = hourlyForecastHTML + `</div>`;
  hourlyForecastElement.innerHTML = hourlyForecastHTML;
}

function showWeeklyForecast(response) {
  console.log(response.data.daily);
  let weeklyForecastElement = document.querySelector("#weekly-forecast");
  let weeklyForecastHTML = `<div class="row">`;
  weekDays.forEach(function (day) {
    weeklyForecastHTML =
      weeklyForecastHTML +
      `<br />
      <div class="next-week-card card" style="width: 30rem">
        <div class="next-week-card card-body">
          <h5 class="next-week card-title" id="weekday-one">${day}</h5>
          <h6 class="next-week card-subtitle mb-2 text-muted" id="date-one">
            January 23rd
          </h6>
        </div>
        <div class="row">
          <div class="col-6 next-week weather">
            <span class="next-week weather-emoji">🌧</span>
            <span class="next-week weather-forecast">Rain</span>
          </div>
          <div class="col-6 next-week temperature">4°/1°</div>
          </div>
          </div>`;

    weeklyForecastElement.innerHTML = weeklyForecastHTML;
  });
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".current-temperature");
  temperatureElement.innerHTML = `${temperature}`;

  let city = response.data.name;
  let cityElement = document.querySelector("#current-location");
  cityElement.innerHTML = `${city}`;

  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}`;

  let windSpeed = response.data.wind.speed;
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = Math.round(windSpeed);

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `response.data.weather[0].description`);

  celsiusTemperature = response.data.main.temp;

  let iconElementOne = document.querySelector("#weather-icon");
  iconElementOne.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElementOne.setAttribute("alt", `response.data.weather[0].description`);

  getForecast(response.data.coord);
}

function searchLocation(city) {
  let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
  let unit = `metric`;
  let cityInput = city;
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${unit}`;

  axios.get(`${apiUrlCity}`).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-input");

  searchLocation(searchInput.value);
}

function showPositionFromButton(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
  let unit = `metric`;
  let apiUrlCoordinates = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(`${apiUrlCoordinates}`).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionFromButton);
}

function temperatureCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temperature");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  fahrenheit.classList.remove("active");
  fahrenheit.classList.add("inactive");
  celsius.classList.remove("inactive");
  celsius.classList.add("active");
}

function temperatureFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  fahrenheit.classList.remove("inactive");
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  celsius.classList.add("inactive");
}

let now = new Date();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let todayDate = document.querySelector("#date-zero");
todayDate.innerHTML = `${weekDays[now.getDay()]}, ${
  months[now.getMonth()]
} ${now.getDate()}`;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", temperatureCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", temperatureFahrenheit);

let celsiusTemperature = null;

searchLocation("longyearbyen");
