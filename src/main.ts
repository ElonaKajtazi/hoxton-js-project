import "./style.css";
type WeatherData = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
  // forecast: {
  //   forecastday: [
  //     {
  //       date: string;
  //       date_epoch: number;
  //       day: {
  //         maxtemp_c: number;
  //         maxtemp_f: number;
  //         mintemp_c: number;
  //         mintemp_f: number;
  //         avgtemp_c: number;
  //         avgtemp_f: number;
  //         maxwind_mph: number;
  //         maxwind_kph: number;
  //         totalprecip_mm: number;
  //         totalprecip_in: number;
  //         avgvis_km: number;
  //         avgvis_miles: number;
  //         avghumidity: number;
  //         condition: {
  //           text: string;
  //           icon: string;
  //           code: number;
  //         };
  //         uv: number;
  //       };
  //       astro: {
  //         sunrise: string;
  //         sunset: string;
  //         moonrise: string;
  //         moonset: string;
  //         moon_phase: string;
  //         moon_illumination: number;
  //       };
  //       hour: {
  //         time_epoch: number;
  //         time: string;
  //         temp_c: number;
  //         temp_f: number;
  //         is_day: number;
  //         condition: {
  //           text: string;
  //           icon: string;
  //           code: number;
  //         };
  //         wind_mph: number;
  //         wind_kph: number;
  //         wind_degree: number;
  //         wind_dir: string;
  //         pressure_mb: number;
  //         pressure_in: number;
  //         precip_mm: number;
  //         precip_in: number;
  //         humidity: number;
  //         cloud: number;
  //         feelslike_c: number;
  //         feelslike_f: number;
  //         windchill_c: number;
  //         windchill_f: number;
  //         heatindex_c: number;
  //         heatindex_f: number;
  //         dewpoint_c: number;
  //         dewpoint_f: number;
  //         will_it_rain: number;
  //         will_it_snow: number;
  //         vis_km: number;
  //         vis_miles: number;
  //         uv: number;
  //         gust_mph: number;
  //         gust_kph: number;
  //       };
  //     }
  //   ];
  // }
};

type State = {
  apiKey: string;
  city: string;
  weatherData: WeatherData[];
};
// Kindof created stata, will update it later
let state: State = {
  apiKey: "18f4c97774164c96b9b192555221807",
  city: "Gjakova",
  weatherData: [],
};
// create a function that will get the weather data from the API
function getWeatherDataFromServer() {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=${state.apiKey}&q=${state.city}&aqi=no`
  )
    .then((response) => response.json())
    .then((data) => {
      state.weatherData = data;
      render();
    });
}
// rendering everything on a big function
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
  let cityDiv = document.createElement("div");
  cityDiv.className = "city";
  let pinDropEl = document.createElement("span");
  pinDropEl.className = "material-symbols-outlined";
  pinDropEl.textContent = "pin_drop";

  let cityNameEl = document.createElement("h2");
  cityNameEl.className = "city-name";
  cityNameEl.textContent = state.city;

  let currentTemperatureEl = document.createElement("h2");
  currentTemperatureEl.className = "current-temperature";

  currentTemperatureEl.textContent = `${state.weatherData["current"].temp_c} °C`;

  let descriptionEl = document.createElement("div");
  descriptionEl.className = "description";

  let textEl = document.createElement("h3");
  textEl.className = "text";
  textEl.textContent = state.weatherData["current"].condition.text;

  let iconEl = document.createElement("img");
  iconEl.className = "icon";
  iconEl.src = state.weatherData["current"].condition.icon;
  iconEl.alt = "sun";
  // iconEl.width = "80";

  let windspeedEl = document.createElement("div");
  windspeedEl.className = "windspeed";
  windspeedEl.textContent = `Wind Speed: ${state.weatherData["current"].wind_kph} km/h`;

  let humidityEl = document.createElement("div");
  humidityEl.className = "humidity";
  humidityEl.textContent = `Humidity: ${state.weatherData["current"].humidity}%`;

  let feelsLikeEl = document.createElement("div");
  feelsLikeEl.className = "feels-like";
  feelsLikeEl.textContent = `Feels like: ${state.weatherData["current"].feelslike_c}°C`;

  let lastUpdatedEl = document.createElement("div");
  lastUpdatedEl.className = "last-updated";

  let timeEl = document.createElement("span");
  timeEl.className = "time";
  // timeEl.textContent = state.weatherData["current"].last_updated;

  formEl.appendChild(inputEl);
  descriptionEl.append(iconEl, textEl);
  cityDiv.append(pinDropEl, cityNameEl);

  // lastUpdatedEl.append("Last updated: ", timeEl);
  containerDiv.append(
    formEl,
    cityDiv,
    descriptionEl,
    currentTemperatureEl,
    feelsLikeEl,

    windspeedEl,
    humidityEl,

    lastUpdatedEl
  );
  mainEl.append(containerDiv);
}
getWeatherDataFromServer();
render();
//
