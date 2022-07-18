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

// function render() {
//   // let mainEl=document.querySelector('#app')
//   // if (mainEl===null)return
//   // mainEl.textContent = ""
//   // let h1El=document.createElement('h1')
//   // h1El.textContent = "Don't finish it this early"
//   // let h2El=document.createElement('h2')
//   // h2El.textContent = "Cool, it works!"
//   // mainEl.append(h1El, h2El)
// }
// render();
