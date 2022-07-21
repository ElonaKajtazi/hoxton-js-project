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
  city: "Roma",
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
  if (state.weatherData === null) return;
  let containerDiv = document.createElement("div");
  containerDiv.className = "container";

  if (state.weatherData.current.condition.text === "Sunny")
    containerDiv.classList.add("container-sunny");
  if (
    state.weatherData.current.condition.text === "Cloudy" ||
    state.weatherData.current.condition.text === "Overcast"
  )
    containerDiv.classList.add("container-cloudy");
  if (state.weatherData.current.condition.text === "Partly cloudy")
    containerDiv.classList.add("container-partly-cloudy");
  if (
    state.weatherData.current.condition.text === "Rain" ||
    state.weatherData.current.condition.text === "Moderate rain" ||
    state.weatherData.current.condition.text === "Heavy rain" ||
    state.weatherData.current.condition.text ===
      "Moderate or heavy rain with thunder"
  )
    containerDiv.classList.add("container-rainy");
  if (state.weatherData.current.condition.text === "Clear")
    containerDiv.classList.add("container-clear");

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

  currentTemperatureEl.textContent = `${Math.floor(
    state.weatherData.current.temp_c
  )} °C`;

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
  if (state.weatherData === null) return;

  let detailsPageDiv = document.createElement("div");
  detailsPageDiv.className = "details-page";

  let cityCountryEl = document.createElement("div");
  cityCountryEl.className = "city-country-weather";
  let locationDiv = document.createElement("div");
  locationDiv.className = "location";

  let pinDropEl = document.createElement("span");
  pinDropEl.className = "material-symbols-outlined";
  pinDropEl.textContent = "pin_drop";
  pinDropEl.classList.add("details__pin-drop");
  let detailsCityNameH1 = document.createElement("h1");
  detailsCityNameH1.className = "details__city-name";
  detailsCityNameH1.textContent = state.city;

  let countryNameP = document.createElement("p");
  countryNameP.className = "details__country-name";

  countryNameP.textContent = state.weatherData.location.country;
  let detailsIconTempDiv = document.createElement("div");
  detailsIconTempDiv.className = "icon-temp";

  let detailsIconImg = document.createElement("img");
  detailsIconImg.className = "details__icon";

  detailsIconImg.src = state.weatherData.current.condition.icon;
  detailsIconImg.alt = "suny weather";

  let detailsCurrentTemperatureH2 = document.createElement("h2");
  detailsCurrentTemperatureH2.className = "details__current-temperature";
  detailsCurrentTemperatureH2.textContent = `${Math.floor(
    state.weatherData.current.temp_c
  )} °C`;
  let detailsWeatherDescriptionH3 = document.createElement("h3");
  detailsWeatherDescriptionH3.className = "weather-description";
  detailsWeatherDescriptionH3.textContent =
    state.weatherData.current.condition.text;

  detailsIconTempDiv.append(detailsIconImg, detailsCurrentTemperatureH2);
  locationDiv.append(pinDropEl, detailsCityNameH1, detailsIconTempDiv);

  cityCountryEl.append(
    locationDiv,
    countryNameP,
    detailsIconTempDiv,
    detailsWeatherDescriptionH3
  );

  let detailsWeatherInfoDiv = document.createElement("div");
  detailsWeatherInfoDiv.className = "weather-info";

  let detailsMainInfoDiv = document.createElement("div");
  detailsMainInfoDiv.className = "main-info";

  let detailsFeelsLikeP = document.createElement("p");
  detailsFeelsLikeP.className = "details__feels-like";
  detailsFeelsLikeP.textContent = `Feels like: ${Math.floor(
    state.weatherData.current.feelslike_c
  )}°C`;

  let detailsTemperaturesDiv = document.createElement("div");
  detailsTemperaturesDiv.className = "temperatures";

  let detailsMaxTempSpan = document.createElement("p");
  detailsMaxTempSpan.className = "max-temp";
  detailsMaxTempSpan.textContent = `Max: ${Math.floor(
    state.weatherData.forecast.forecastday[0].day.maxtemp_c
  )} °C`;

  let detailsMinTempSpan = document.createElement("p");
  detailsMinTempSpan.className = "min-temp";
  detailsMinTempSpan.textContent = `Min: ${Math.floor(
    state.weatherData.forecast.forecastday[0].day.mintemp_c
  )} °C`;

  detailsTemperaturesDiv.append(detailsMaxTempSpan, detailsMinTempSpan);
  detailsMainInfoDiv.append(detailsFeelsLikeP, detailsTemperaturesDiv);

  let detailsMoreInfoDiv = document.createElement("div");
  detailsMoreInfoDiv.className = "more-info";

  let detailsPercipitationP = document.createElement("p");
  detailsPercipitationP.className = "details__percipitation";
  detailsPercipitationP.textContent = `Percipitation: ${state.weatherData.current.precip_mm} mm`;

  let detailsWindSpeedP = document.createElement("p");
  detailsWindSpeedP.className = "details__wind-speed";
  detailsWindSpeedP.textContent = `Wind: ${state.weatherData.current.wind_kph} km/h`;

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

function renderWeatherForecast(detailsPageDiv: Element) {
  let dailyForecastDiv = document.createElement("div");
  dailyForecastDiv.className = "daily-forecast";
  let daysDiv = document.createElement("div");
  daysDiv.className = "days";

  if (state.weatherData === null) return;
  for (let day of state.weatherData.forecast.forecastday) {
    let tomorrowDiv = document.createElement("div");
    tomorrowDiv.className = "tomorrow";

    let dayP = document.createElement("p");
    dayP.className = "day";

    if (day.date === "2022-07-20") {
      dayP.textContent = "Wednesday";
    } else if (day.date === "2022-07-21") {
      dayP.textContent = "Thursday";
    } else if (day.date === "2022-07-22") {
      dayP.textContent = "Friday";
    }
    let forecastIconImg = document.createElement("img");
    forecastIconImg.className = "forecast-icon";
    forecastIconImg.src = day.day.condition.icon;
    forecastIconImg.alt = "suny weather";

    let forecastTemperaturesDiv = document.createElement("div");
    forecastTemperaturesDiv.className = "fprecast__temperatures";
    let forecastMaxTempSpan = document.createElement("span");
    forecastMaxTempSpan.className = "forecast__max-temp";
    forecastMaxTempSpan.textContent = `${Math.floor(day.day.maxtemp_c)}`;
    let forecastMinTempSpan = document.createElement("span");
    forecastMinTempSpan.className = "forecast__min-temp";
    forecastMinTempSpan.textContent = `${Math.floor(day.day.mintemp_c)}`;

    forecastTemperaturesDiv.append(
      forecastMinTempSpan,
      " | ",
      forecastMaxTempSpan
    );
    tomorrowDiv.append(dayP, forecastIconImg, forecastTemperaturesDiv);
    daysDiv.append(tomorrowDiv);
    dailyForecastDiv.append(daysDiv);
    detailsPageDiv.append(dailyForecastDiv);
  }
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
