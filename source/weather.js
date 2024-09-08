function searchBar(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-search-form");
  let cityElement = document.querySelector("#weather-app-city");
  cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#input-search");
searchFormElement.addEventListener("submit", searchBar);
