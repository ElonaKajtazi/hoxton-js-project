import "./style.css";

let state = {
  apiKey: "d8e39a035f63c724b30d68bd39bb4022",
  city: "new york",
  weather: {},
};

function getWeatherDataFromServer() {
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=99e85ef67b8f4f57852185003221707&q=${state.city}&aqi=no`
  )
    .then((response) => response.json())
    .then((data) => {
      state.weather = data;
    });
}

getWeatherDataFromServer();
window.state = state;

function render() {
  let mainEl = document.querySelector("#app");
  if (mainEl === null) return;
  mainEl.textContent = "";

  let containerDiv = document.createElement("div");
  containerDiv.className = "container";

  let formEl = document.createElement("form");

  let inputEl = document.createElement("input");
  inputEl.className = "search";
  inputEl.type = "text";
  inputEl.placeholder = "Search City";

  let cityNameEl = document.createElement("h1");
  cityNameEl.className = "city-name";
  cityNameEl.textContent = "Tirana";

  let currentTemperatureEl = document.createElement("h2");
  currentTemperatureEl.className = "current-temperature";
  currentTemperatureEl.textContent = "35 °C";

  let descriptionEl = document.createElement("div");
  descriptionEl.className = "description";

  let textEl = document.createElement("div");
  textEl.className = "text";
  textEl.textContent = "Sunny";

  let iconEl = document.createElement("img");
  iconEl.className = "icon";
  iconEl.src = "http://cdn.weatherapi.com/weather/64x64/day/113.png";
  iconEl.alt = "sun";

  let windspeedEl = document.createElement("div");
  windspeedEl.className = "windspeed";
  windspeedEl.textContent = "Windspeed: 3.6 km/h";

  let humidityEl = document.createElement("div");
  humidityEl.className = "humidity";
  humidityEl.textContent = "Humidity: 27%";

  let feelsLikeEl = document.createElement("div");
  feelsLikeEl.className = "feels-like";
  feelsLikeEl.textContent = "Feels like: 33.2 °C";

  let lastUpdatedEl = document.createElement("div");
  lastUpdatedEl.className = "last-updated";

  let timeEl = document.createElement("span");
  timeEl.className = "time";
  timeEl.textContent = "14:15";

  formEl.appendChild(inputEl);
  descriptionEl.append(textEl, iconEl);

  lastUpdatedEl.append("Last updated: ", timeEl);
  containerDiv.append(
    formEl,
    cityNameEl,
    currentTemperatureEl,
    descriptionEl,
    windspeedEl,
    humidityEl,
    feelsLikeEl,
    lastUpdatedEl
  );
  mainEl.append(containerDiv);
}
render();
