function displayTemperature(response) {
  console.log(response);
  console.log(response.data.name);
  let cityElement = document.querySelector("#city-country");
  let tempElement = document.querySelector("#temp");
  let descriptionElement = document.querySelector("#description");
  let maxElement = document.querySelector("#max-temp");
  let minElement = document.querySelector("#min-temp");
  let feelsElement = document.querySelector("#feels-like");
  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  maxElement.innerHTML = Math.round(response.data.main.temp_max) + `°C`;
  minElement.innerHTML = Math.round(response.data.main.temp_min) + `°C`;
  feelsElement.innerHTML = Math.round(response.data.main.feels_like) + `°C`;
}

let apiKey = "26c70cc759f2dda82240508e33d14cb9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
