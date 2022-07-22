import "./style.css";
// WeatherData state
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

// State type
type State = {
  apiKey: string;
  city: string;
  weatherData: WeatherData | null;
  show: "null" | "moreDetails";
  message: string;
  showForecast: "Daily" | "Hourly";
};
// State
let state: State = {
  apiKey: "18f4c97774164c96b9b192555221807",
  city: "Pristina",
  weatherData: null,
  show: "null",
  message: "",
  showForecast: "Daily",
};
// create a function that will get the weather data from the API
function getWeatherDataFromServer() {
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${state.apiKey}&q=${state.city}&days=10&aqi=yes&alerts=no`
  )
    .then((rsp) => {
      if (rsp.ok) return rsp.json();
      state.message = "City not found";
      render();
      throw new Error("Network response was not ok.");
    })

    .then((data) => {
      state.weatherData = data;
      state.message = "";
      render();
    });
}
function getNextHours() {
  if (state.weatherData === null) return;

  let hour = state.weatherData.forecast.forecastday[0].hour.filter(
    (hour) => hour.time_epoch > state.weatherData.current.last_updated_epoch
  );
  if (hour.length > 0) return hour;
  else return state.weatherData.forecast.forecastday[1].hour;
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
// function renderMessage() {
//   let mainEl = document.querySelector("#app");
//   if (mainEl === null) return;
//   mainEl.textContent = state.message;
// }
// This function will render the current weather page
function renderCurrentWeather(mainEl: Element) {
  if (state.weatherData === null) return;
  let divBox = document.createElement("div");
  divBox.className = "rollingBox";
  let containerDiv = document.createElement("div");
  containerDiv.className = "container";

  // All this classes are so that we can change the background image acording to the weather with css
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
    state.weatherData.current.condition.text === "Light rain" ||
    state.weatherData.current.condition.text === "Moderate rain" ||
    state.weatherData.current.condition.text === "Heavy rain" ||
    state.weatherData.current.condition.text ===
      "Moderate or heavy rain with thunder" ||
    state.weatherData.current.condition.text ===
      "Patchy light rain with thunder" ||
    state.weatherData.current.condition.text ===
      "Moderate or heavy rain shower" ||
    state.weatherData.current.condition.text === "Light drizzle" ||
    state.weatherData.current.condition.text === "Light rain shower"
  )
    containerDiv.classList.add("container-rainy");
  if (state.weatherData.current.condition.text === "Clear")
    containerDiv.classList.add("container-clear");
  if (
    state.weatherData.current.condition.text === "Fog" ||
    state.weatherData.current.condition.text === "Mist"
  )
    containerDiv.classList.add("container-fog");
  // This allows the user to search the weather in any city
  let formEl = document.createElement("form");
  formEl.className = "form";
  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    state.city = inputEl.value;
    getWeatherDataFromServer();
  });

  let inputEl = document.createElement("input");
  inputEl.className = "search";
  inputEl.type = "text";
  inputEl.placeholder = "Search Location";
  inputEl.required = true;

  if (state.message) {
    let messageEl = document.createElement("p");
    messageEl.className = "message";
    messageEl.textContent = state.message;
    formEl.append(messageEl);
  }

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

  let moreDetailsEl = document.createElement("p");
  moreDetailsEl.className = "more-details";
  moreDetailsEl.textContent = "→ More details";
  moreDetailsEl.addEventListener("click", function () {
    getDetailsPage();
  });

  formEl.appendChild(inputEl);
  descriptionEl.append(iconEl, textEl);
  cityDiv.append(pinDropEl, cityNameEl, currentTemperatureEl, descriptionEl);
  windAndHumidityEl.append(windspeedEl, humidityEl);

  containerDiv.append(
    divBox,
    formEl,
    cityDiv,
    descriptionEl,
    currentTemperatureEl,

    windAndHumidityEl,
    moreDetailsEl
  );
  mainEl.append(containerDiv);
}
// This function will render the details weather page
function renderDetailsPage(mainEl: Element) {
  if (state.weatherData === null) return;

  let detailsPageDiv = document.createElement("div");
  detailsPageDiv.className = "details-page";

  let goBackEl = document.createElement("span");
  goBackEl.className = "material-symbols-outlined";
  goBackEl.classList.add("go-back");
  goBackEl.textContent = "arrow_back";

  goBackEl.addEventListener("click", function () {
    getCurrentWeatherPage();
  });

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
  let sunRiseEl = document.createElement("p");
  sunRiseEl.className = "sun-rise";
  sunRiseEl.textContent = `Sunrise: ${state.weatherData.forecast.forecastday[0].astro.sunrise}`;

  detailsTemperaturesDiv.append(detailsMaxTempSpan, detailsMinTempSpan);
  detailsMainInfoDiv.append(
    detailsFeelsLikeP,
    detailsTemperaturesDiv,
    sunRiseEl
  );

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
  let sunSetEl = document.createElement("p");
  sunSetEl.className = "sun-set";
  sunSetEl.textContent = `Sunset: ${state.weatherData.forecast.forecastday[0].astro.sunset}`;

  let lastUpdated = document.createElement("p");
  lastUpdated.className = "last-updated";
  lastUpdated.textContent = `Last updated: ${state.weatherData.current.last_updated.slice(
    10
  )}`;

  detailsMoreInfoDiv.append(
    detailsPercipitationP,
    detailsWindSpeedP,
    detailsHumidityP,
    sunSetEl
  );
  detailsWeatherInfoDiv.append(
    detailsMainInfoDiv,

    detailsMoreInfoDiv
  );

  detailsPageDiv.append(goBackEl, cityCountryEl, detailsWeatherInfoDiv);

  detailsWeatherInfoDiv.append(detailsMainInfoDiv, detailsMoreInfoDiv);

  let dailyForecast = renderWeatherDailyForecast();
  let hourlyForecast = renderWeatherHourlyForecast();
  if (state.showForecast === "Daily") {
    detailsPageDiv.append(dailyForecast);
  } else {
    detailsPageDiv.append(hourlyForecast);
  }
  mainEl.append(detailsPageDiv);

  // renderWeatherDailyForecast(detailsPageDiv);
  // if ((state.showForecast = "Hourly")) {
  //   renderWeatherHourlyForecast(detailsPageDiv);
  // } else {
  //   renderWeatherDailyForecast();
  // }
  // renderWeatherDailyForecast(detailsPageDiv);
  detailsPageDiv.append(lastUpdated);
}

function renderWeatherDailyForecast() {
  let dailyForecastDiv = document.createElement("div");
  dailyForecastDiv.className = "daily-forecast";
  let daysDiv = document.createElement("div");
  daysDiv.className = "days";
  // let buttonsDiv = document.createElement("div");
  // buttonsDiv.className = "buttons";
  // let dailyButton = document.createElement("button");
  // dailyButton.className = "daily-button";
  // dailyButton.textContent = "Daily";
  // dailyButton.addEventListener("click", () => {
  //   state.showForecast = "Daily";
  //   render();
  // });

  let hourlyButton = document.createElement("button");
  hourlyButton.className = "hourly-button";
  hourlyButton.textContent = "Hourly";
  hourlyButton.addEventListener("click", () => {
    state.showForecast = "Hourly";
    render();
  });
  // buttonsDiv.append(dailyButton, hourlyButton);
  dailyForecastDiv.append(daysDiv, hourlyButton);

  if (state.weatherData === null) return;
  for (let day of state.weatherData.forecast.forecastday) {
    let tomorrowDiv = document.createElement("div");
    tomorrowDiv.className = "tomorrow";

    let dayP = document.createElement("p");
    dayP.className = "day";
    // Weather forecast for the next 5 days not the best solution but it works for now
    if (day.date === "2022-07-20") {
      dayP.textContent = "Wednesday";
    } else if (day.date === "2022-07-21") {
      dayP.textContent = "Thursday";
    } else if (day.date === "2022-07-22") {
      dayP.textContent = "Friday";
    } else if (day.date === "2022-07-23") {
      dayP.textContent = "Saturday";
    } else if (day.date === "2022-07-24") {
      dayP.textContent = "Sunday";
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

    // detailsPageDiv.append(dailyForecastDiv);
  }
  return dailyForecastDiv;
}
function renderWeatherHourlyForecast() {
  let dailyForecastDiv = document.createElement("div");
  dailyForecastDiv.className = "hourly-forecast";
  let daysDiv = document.createElement("div");
  daysDiv.className = "days";
  // let buttonsDiv = document.createElement("div");
  // buttonsDiv.className = "buttons";
  let dailyButton = document.createElement("button");
  dailyButton.className = "daily-button";
  dailyButton.textContent = "Daily";
  dailyButton.addEventListener("click", () => {
    state.showForecast = "Daily";
    render();
  });

  // let hourlyButton = document.createElement("button");
  // hourlyButton.className = "hourly-button";
  // hourlyButton.textContent = "Hourly";
  // hourlyButton.addEventListener("click", () => {
  //   state.showForecast = "Hourly";
  //   render();
  // });
  // buttonsDiv.append(dailyButton, hourlyButton);
  dailyForecastDiv.append(daysDiv, dailyButton);

  if (state.weatherData === null) return;

  for (let hour of getNextHours()) {
    let tomorrowDiv = document.createElement("div");
    tomorrowDiv.className = "tomorrow";

    let hourP = document.createElement("p");
    hourP.className = "hour";
    hourP.textContent = `${hour.time.slice(10)}`;

    let forecastIconImg = document.createElement("img");
    forecastIconImg.className = "forecast-icon";
    forecastIconImg.src = hour.condition.icon;
    forecastIconImg.alt = "suny weather";

    let forecastTemperaturesDiv = document.createElement("div");
    forecastTemperaturesDiv.className = "fprecast__temperatures";

    let forecastMaxTempSpan = document.createElement("span");
    forecastMaxTempSpan.className = "forecast__max-temp";
    forecastMaxTempSpan.textContent = `${Math.floor(hour.temp_c)}`;

    forecastTemperaturesDiv.append(forecastMaxTempSpan);
    tomorrowDiv.append(hourP, forecastIconImg, forecastTemperaturesDiv);
    daysDiv.append(tomorrowDiv);
    dailyForecastDiv.append(daysDiv);
  }
  return dailyForecastDiv;
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
window.state = state;
window.getNextHours = getNextHours;

// let date = new Date(state.weatherData.forecast.forecastday[1].date)
