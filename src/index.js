function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hours}:${minutes}`;
}
function displayTemperature(response) {
  let cityElement = document.querySelector("#city-country");
  let tempElement = document.querySelector("#temp");
  let descriptionElement = document.querySelector("#description");
  let maxElement = document.querySelector("#max-temp");
  let minElement = document.querySelector("#min-temp");
  let feelsElement = document.querySelector("#feels-like");
  let dateElement = document.querySelector("#date-month");
  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  maxElement.innerHTML = Math.round(response.data.main.temp_max) + `°C`;
  minElement.innerHTML = Math.round(response.data.main.temp_min) + `°C`;
  feelsElement.innerHTML = Math.round(response.data.main.feels_like) + `°C`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "26c70cc759f2dda82240508e33d14cb9";
let city = "Berlin";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
