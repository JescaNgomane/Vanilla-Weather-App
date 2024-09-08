function weatherDetails(response) {
  let tempElement = document.querySelector("#weather-app-temp");
  let temp = response.data.temperature.current;
  tempElement.innerHTML = Math.round(temp);
  let cityElement = document.querySelector("#weather-app-city");
  cityElement.innerHTML = response.data.city;
  //console.log(response.data.temperature.current);
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
