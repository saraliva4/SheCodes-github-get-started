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

searchLocation("longyearbyen");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

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

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//****

let temperatureElement = document.querySelector(".current-temperature");

function temperatureCelsius(event) {
  event.preventDefault();
  currentDegrees.innerHTML = 3;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", temperatureCelsius);

function temperatureFahrenheit(event) {
  event.preventDefault();
  currentDegrees.innerHTML = 37;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", temperatureFahrenheit);
