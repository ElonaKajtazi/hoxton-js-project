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
  forecast: {
    forecastday: [
      {
        date: string;
        date_epoch: number;
        day: {
          maxtemp_c: number;
          maxtemp_f: number;
          mintemp_c: number;
          mintemp_f: number;
          avgtemp_c: number;
          avgtemp_f: number;
          maxwind_mph: number;
          maxwind_kph: number;
          totalprecip_mm: number;
          totalprecip_in: number;
          avgvis_km: number;
          avgvis_miles: number;
          avghumidity: number;
          condition: {
            text: string;
            icon: string;
            code: number;
          };
          uv: number;
        };
        astro: {
          sunrise: string;
          sunset: string;
          moonrise: string;
          moonset: string;
          moon_phase: string;
          moon_illumination: number;
        };
        hour: {
          time_epoch: number;
          time: string;
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
          windchill_c: number;
          windchill_f: number;
          heatindex_c: number;
          heatindex_f: number;
          dewpoint_c: number;
          dewpoint_f: number;
          will_it_rain: number;
          will_it_snow: number;
          vis_km: number;
          vis_miles: number;
          uv: number;
          gust_mph: number;
          gust_kph: number;
        };
      }
    ];
  };
};

type State = {
  apiKey: string;
  city: string;
  weatherData: WeatherData | null;
  show: "null" | "moreDetails";
};
// Kindof created stata, will update it later
let state: State = {
  apiKey: "18f4c97774164c96b9b192555221807",
  city: "Tel Aviv",
  weatherData: null,
  show: "null",
};
// create a function that will get the weather data from the API
function getWeatherDataFromServer() {
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${state.apiKey}&q=${state.city}&days=10&aqi=yes&alerts=no`
  )
    .then((rsp) => rsp.json())
    .then((data) => {
      state.weatherData = data;
      render();
    });
}
// This function will display the Details weather page
function getDetailsPage() {
  state.show = "moreDetails";
  render();
}
// This function will display the current weather page
function getCurrentWeatherPage() {
  state.show = "null";
  render();
}
// This function will render the current weather page
function renderCurrentWeather(mainEl: Element) {
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
  // let temperatureEl = document.createElement("div");
  let currentTemperatureEl = document.createElement("h2");
  currentTemperatureEl.className = "current-temperature";

  //   let feelsLikeEl = document.createElement("p");
  // feelsLikeEl.className = "feels-like";
  // feelsLikeEl.textContent = `Feels like: ${state.weatherData["current"].feelslike_c}°C`;
  if (state.weatherData === null) return;

  currentTemperatureEl.textContent = `${state.weatherData.current.temp_c} °C`;

  let descriptionEl = document.createElement("div");
  descriptionEl.className = "description";

  let textEl = document.createElement("h3");
  textEl.className = "text";
  textEl.textContent = state.weatherData.current.condition.text;

  let iconEl = document.createElement("img");
  iconEl.className = "icon";
  iconEl.src = state.weatherData.current.condition.icon;
  iconEl.alt = "sun";
  // iconEl.width = "80";
  let windAndHumidityEl = document.createElement("div");
  let windspeedEl = document.createElement("p");
  windspeedEl.className = "windspeed";
  windspeedEl.textContent = `Wind Speed: ${state.weatherData.current.wind_kph} km/h`;

  let humidityEl = document.createElement("p");
  humidityEl.className = "humidity";
  humidityEl.textContent = `Humidity: ${state.weatherData.current.humidity}%`;

  // let lastUpdatedEl = document.createElement("div");
  // lastUpdatedEl.className = "last-updated";

  // let timeEl = document.createElement("span");
  // timeEl.className = "time";
  // timeEl.textContent = state.weatherData["current"].last_updated;
  let moreDetailsEl = document.createElement("p");
  moreDetailsEl.className = "more-details";
  moreDetailsEl.textContent = "More details";
  moreDetailsEl.addEventListener("click", function () {
    getDetailsPage();
  });

  formEl.appendChild(inputEl);
  descriptionEl.append(iconEl, textEl);
  cityDiv.append(pinDropEl, cityNameEl, currentTemperatureEl, descriptionEl);
  windAndHumidityEl.append(windspeedEl, humidityEl);
  // lastUpdatedEl.append("Last updated: ", timeEl);
  containerDiv.append(
    formEl,
    cityDiv,
    descriptionEl,
    currentTemperatureEl,

    windAndHumidityEl,
    moreDetailsEl

    // lastUpdatedEl
  );
  mainEl.append(containerDiv);
}
// This function will render the details weather page
function renderDetailsPage(mainEl: Element) {
  let detailsPageDiv = document.createElement("div");
  detailsPageDiv.className = "details-page";

  let cityCountryEl = document.createElement("div");
  cityCountryEl.className = "city-country";
  let locationDiv = document.createElement("div");
  locationDiv.className = "location";

  let pinDropEl = document.createElement("span");
  pinDropEl.className = "material-symbols-outlined";
  pinDropEl.textContent = "pin_drop";
  pinDropEl.classList.add("details__pin-drop");
  let detailsCityNameH1 = document.createElement("h1");
  detailsCityNameH1.className = "details__city-name";
  detailsCityNameH1.textContent = state.city;
  locationDiv.append(pinDropEl, detailsCityNameH1);

  let countryNameP = document.createElement("p");
  countryNameP.className = "details__country-name";
  if (state.weatherData === null) return;
  countryNameP.textContent = state.weatherData.location.country;

  cityCountryEl.append(locationDiv, countryNameP);

  let detailsWeatherInfoDiv = document.createElement("div");
  detailsWeatherInfoDiv.className = "weather-info";

  let detailsMainInfoDiv = document.createElement("div");
  detailsMainInfoDiv.className = "main-info";

  let detailsIconTempDiv = document.createElement("div");
  detailsIconTempDiv.className = "icon-temp";

  let detailsIconImg = document.createElement("img");
  detailsIconImg.className = "details__icon";

  detailsIconImg.src = state.weatherData.current.condition.icon;
  detailsIconImg.alt = "suny weather";

  let detailsCurrentTemperatureH2 = document.createElement("h2");
  detailsCurrentTemperatureH2.className = "details__current-temperature";
  detailsCurrentTemperatureH2.textContent = `${state.weatherData.current.temp_c} °C`;

  detailsIconTempDiv.append(detailsIconImg, detailsCurrentTemperatureH2);

  let detailsWeatherDescriptionH3 = document.createElement("h3");
  detailsWeatherDescriptionH3.className = "weather-description";
  detailsWeatherDescriptionH3.textContent =
    state.weatherData.current.condition.text;

  let detailsFeelsLikeP = document.createElement("p");
  detailsFeelsLikeP.className = "details__feels-like";
  detailsFeelsLikeP.textContent = `Feels like: ${state.weatherData.current.feelslike_c}°C`;

  let detailsTemperaturesDiv = document.createElement("div");
  detailsTemperaturesDiv.className = "temperatures";

  let detailsMaxTempSpan = document.createElement("span");
  detailsMaxTempSpan.className = "max-temp";
  detailsMaxTempSpan.textContent = `Max: ${state.weatherData.forecast.forecastday[0].day.maxtemp_c} °C`;

  let detailsMinTempSpan = document.createElement("span");
  detailsMinTempSpan.className = "min-temp";
  detailsMinTempSpan.textContent = `Min: ${state.weatherData.forecast.forecastday[0].day.mintemp_c} °C`;

  detailsTemperaturesDiv.append(detailsMaxTempSpan, " / ", detailsMinTempSpan);
  detailsMainInfoDiv.append(
    detailsIconTempDiv,
    detailsWeatherDescriptionH3,
    detailsFeelsLikeP,
    detailsTemperaturesDiv
  );

  let detailsMoreInfoDiv = document.createElement("div");
  detailsMoreInfoDiv.className = "more-info";

  let detailsPercipitationP = document.createElement("p");
  detailsPercipitationP.className = "details__percipitation";
  detailsPercipitationP.textContent = `Percipitation: ${state.weatherData.current.precip_mm} mm`;

  let detailsWindSpeedP = document.createElement("p");
  detailsWindSpeedP.className = "details__wind-speed";
  detailsWindSpeedP.textContent = `Wind speed: ${state.weatherData.current.wind_kph} km/h`;

  let detailsHumidityP = document.createElement("p");
  detailsHumidityP.className = "details__humidity";
  detailsHumidityP.textContent = `Humidity: ${state.weatherData.current.humidity}%`;

  detailsMoreInfoDiv.append(
    detailsPercipitationP,
    detailsWindSpeedP,
    detailsHumidityP
  );
  detailsWeatherInfoDiv.append(
    detailsMainInfoDiv,

    detailsMoreInfoDiv
  );
  detailsPageDiv.append(cityCountryEl, detailsWeatherInfoDiv);

  detailsWeatherInfoDiv.append(detailsMainInfoDiv, detailsMoreInfoDiv);

  mainEl.append(detailsPageDiv);
  renderWeatherForecast(detailsPageDiv);
}

function renderWeatherForecast (detailsPageDiv: Element) {
//   <div class="daily-forecast">
//   <div class="days">
//     <div class="tomorrow">
//       <p class="day">Tomorrow</p>
//       <img
//         class="forecast-icon"
//         src="http://cdn.weatherapi.com/weather/64x64/day/113.png"
//         alt="suny weather"
//       />
//       <div class="fprecast__temperatures">
//         <span class="forecast__max-temp">32</span> |
//         <span class="forecast__min-temp">15 </span>
//       </div>
//     </div>     
//   </div>
// </div>
  let dailyForecastDiv = document.createElement("div");
  dailyForecastDiv.className = "daily-forecast";
  let daysDiv = document.createElement("div");
  daysDiv.className = "days";
  let tomorrowDiv = document.createElement("div");
  tomorrowDiv.className = "tomorrow";
  let dayP = document.createElement("p");
  dayP.className = "day";
  dayP.textContent = "Tomorrow";
  let forecastIconImg = document.createElement("img");
  forecastIconImg.className = "forecast-icon";
  forecastIconImg.src = "http://cdn.weatherapi.com/weather/64x64/day/113.png";
  forecastIconImg.alt = "suny weather";
  let forecastTemperaturesDiv = document.createElement("div");
  forecastTemperaturesDiv.className = "fprecast__temperatures";
  let forecastMaxTempSpan = document.createElement("span");
  forecastMaxTempSpan.className = "forecast__max-temp";
  forecastMaxTempSpan.textContent = "32";
  let forecastMinTempSpan = document.createElement("span");
  forecastMinTempSpan.className = "forecast__min-temp";
  forecastMinTempSpan.textContent = "15";
  forecastTemperaturesDiv.append(forecastMaxTempSpan, " | ", forecastMinTempSpan);
  tomorrowDiv.append(dayP, forecastIconImg, forecastTemperaturesDiv);
  daysDiv.append(tomorrowDiv);
  dailyForecastDiv.append(daysDiv);
  detailsPageDiv.append(dailyForecastDiv);

}
// Rendering everything
function render() {
  //Selecting the main element from html file
  let mainEl = document.querySelector("#app");
  if (mainEl === null) return;
  // Clearing the main element
  mainEl.textContent = "";
  // If the state is null, render the current weather page otherwise render the details weather page
  if (state.show === "null") renderCurrentWeather(mainEl);
  if (state.show === "moreDetails") renderDetailsPage(mainEl);
}

getWeatherDataFromServer();
render();
