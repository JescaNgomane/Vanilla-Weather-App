function weatherDetails(response) {
  let tempElement = document.querySelector("#weather-app-temp");
  let temp = response.data.temperature.current;
  tempElement.innerHTML = Math.round(temp);
  let cityElement = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity-descrip");
  let speedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let speed = response.data.wind.speed;

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  speedElement.innerHTML = `${Math.round(speed)}km/h`;
  timeElement.innerHTML = `${date.getDay()},${date.getHours()}:${date.getMinutes()}`;
  console.log(response);
}
function dateFormat(day) {
  let day = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
}

function searchcity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(weatherDetails);
}
function searchBar(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-search-form");
  searchcity(searchInput.value);
}

let searchFormElement = document.querySelector("#input-search");
searchFormElement.addEventListener("submit", searchBar);

searchcity("Soweto");
