function weatherDetails(response) {
  let tempElement = document.querySelector("#weather-app-temp");
  let temp = response.data.temperature.current;
  tempElement.innerHTML = Math.round(temp);
  let cityElement = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity-descrip");
  let speedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let iconElelment = document.querySelector("#weather-icon");
  let date = new Date(response.data.time * 1000);
  let speed = response.data.wind.speed;

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  speedElement.innerHTML = `${Math.round(speed)}km/h`;
  timeElement.innerHTML = dateFormat(date);
  iconElelment.innerHTML = `<img src="${response.data.condition.icon_url}" class="emoji"></img>`;
  forecastData(response.data.city);
}
function dateFormat(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchcity(city) {
  let apiKey = "8b28ob4022ta8eb8ef00a2f473170403";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(weatherDetails);
}
function searchBar(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-search-form");
  searchcity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}
function forecastData(city) {
  let apiKey = "8b28ob4022ta8eb8ef00a2f473170403";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayForecast(response) {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        ` <div class="weather-forecast-days">
          <div class="weather-forecast-day">${formatDay(day.time)}</div>
          <div>
          <img src="${
            day.condition.icon_url
          }"  class="weather-forecast-icon"/></div>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}°</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum
            )}°</div>
          </div>
          </div>`;
    }
  });
  let forecast = document.querySelector("#weather-forecast");
  forecast.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#input-search");
searchFormElement.addEventListener("submit", searchBar);

searchcity("Soweto");
