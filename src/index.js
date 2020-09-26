function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
function displayTemperature(response) {
  let cityElement = document.querySelector("#city-country");
  let tempElement = document.querySelector("#temp");
  let descriptionElement = document.querySelector("#description");
  let maxElement = document.querySelector("#max-temp");
  let minElement = document.querySelector("#min-temp");
  let feelsElement = document.querySelector("#feels-like");
  let dateElement = document.querySelector("#date-month");
  let iconElement = document.querySelector("#icon");
  celciusTemperature = response.data.main.temp;
  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(celciusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  maxElement.innerHTML = Math.round(response.data.main.temp_max) + `°C`;
  minElement.innerHTML = Math.round(response.data.main.temp_min) + `°C`;
  feelsElement.innerHTML = Math.round(response.data.main.feels_like) + `°C`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2">
              <img 
              src = "https://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png" width = "35px"> <span>${formatHours(
      forecast.dt * 1000
    )}</span> <strong>${Math.round(forecast.main.temp_max)}° </strong
              ><span>${Math.round(forecast.main.temp_min)}°</span>
            </div>`;
  }
}
function search(city) {
  let apiKey = "26c70cc759f2dda82240508e33d14cb9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handelSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city");
  search(cityInput.value);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let fahTemp = document.querySelector("#temp");
  celciusElement.classList.remove("active");
  fahrenheitElement.classList.add("active");

  let conversion = (celciusTemperature * 9) / 5 + 32;

  fahTemp.innerHTML = Math.round(conversion);
}
function displayCelcius(event) {
  event.preventDefault();

  let fahTemp = document.querySelector("#temp");

  fahrenheitElement.classList.remove("active");
  celciusElement.classList.add("active");
  fahTemp.innerHTML = Math.round(celciusTemperature);
}
let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handelSubmit);

let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", displayFahrenheit);

let celciusElement = document.querySelector("#celcius");
celciusElement.addEventListener("click", displayCelcius);

search("Name");
