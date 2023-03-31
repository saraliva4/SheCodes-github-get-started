function formatCurrentDate(timestamp) {
  let todayDate = document.querySelector("#date-zero");
  todayDate.innerHTML = `${weekDays[now.getDay()]}, ${
    months[now.getMonth()]
  } ${now.getDate()}`;
  if (timestamp) {
    let date = new Date(timestamp);
    return `${weekDays[date.getDay()]}, ${
      months[date.getMonth()]
    } ${date.getDate()}`;
  }
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  return weekDays[day];
}

function formatHour(timestamp) {
  let date = new Date(timestamp * 1000);
  let hour = date.getHours();

  return hours[hour];
}

function getForecast(coordinates) {
  let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
  let unit = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiURL).then(showWeeklyForecast);
  axios.get(apiURL).then(showHourlyForecast);
}

function showHourlyForecast(response) {
  console.log(response.data.hourly);
  let forecast = response.data.hourly;
  let hourlyForecastElement = document.querySelector("#hourly-forecast");
  let hourlyForecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastHour, index) {
    if (index > 0 && index < 7) {
      hourlyForecastHTML =
        hourlyForecastHTML +
        `
    <div class="col-2 today-hours currently">
    ${formatHour(forecastHour.dt)}
    <br />
      <img class="next-week weather-emoji"
        src="https://openweathermap.org/img/wn/${
          forecastHour.weather[0].icon
        }@2x.png"
        alt=""
        width="42"
        class="forecast-weather-icon"
      />
    <br />
      ${Math.round(forecastHour.temp)}°
      </div>`;
    }
  });

  hourlyForecastHTML = hourlyForecastHTML + `</div>`;
  hourlyForecastElement.innerHTML = hourlyForecastHTML;
}

function showWeeklyForecast(response) {
  let forecast = response.data.daily;
  let weeklyForecastElement = document.querySelector("#weekly-forecast");
  let weeklyForecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      weeklyForecastHTML =
        weeklyForecastHTML +
        `
      <div class="col-12 next-week-card card" style="width: 30rem">
        <div class="next-week-card card-body">
          <h5 class="next-week card-title">${formatCurrentDate(
            forecastDay.dt * 1000
          )}</h5>
          <h6 class="next-week card-subtitle mb-2 text-muted">
            ${formatDay(forecastDay.dt)}
          </h6>
          <div class="row">
          <div class="col-6 next-week-weather">
          <div class="next-week weather-forecast">${
            forecastDay.weather[0].description
          }</div>
          <img
          src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
          class="forecast-weather-icon"
          />
            </div>
            <div class="col-6 next-week-temperature">
            <span class ="max-temp"> <strong> ${Math.round(
              forecastDay.temp.max
            )}°</strong> </span> / <span class="min-temp">${Math.round(
          forecastDay.temp.min
        )}°</span>
            </div>  
          </div>
        </div>
      </div>
      `;
      weeklyForecastHTML = weeklyForecastHTML + `</div>`;
      weeklyForecastElement.innerHTML = weeklyForecastHTML;
    }
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
let hours = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

formatCurrentDate();
searchLocation("longyearbyen");
