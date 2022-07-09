let currentTime = new Date();
let dayNow = document.querySelector(".current-day");
let dateNow = document.querySelector(".date-today");
let timeNow = document.querySelector(".time-today");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[currentTime.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentMonth = months[currentTime.getMonth()];
let currentDate = currentTime.getDate();
let currentHour = currentTime.getHours();
if (currentHour < 10) {
  currentHour = "0" + currentHour;
}
let currentMinute = currentTime.getMinutes();
if (currentMinute < 10) {
  currentMinute = "0" + currentMinute;
}
dayNow.innerHTML = `${currentDay}`;
dateNow.innerHTML = `${currentMonth}, ${currentDate}th`;
timeNow.innerHTML = `${currentHour}:${currentMinute}`;
//
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
//
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    let forecastIcon = forecastDay.weather[0].icon;
    if (forecastIcon === "01d" || forecastIcon === "01n") {
      forecastIcon = `images/sun-60.png`;
    }
    if (
      forecastIcon === "02d" ||
      forecastIcon === "02n" ||
      forecastIcon === "03d" ||
      forecastIcon === "03n" ||
      forecastIcon === "04d" ||
      forecastIcon === "04n"
    ) {
      forecastIcon = `images/cloud-60.png`;
    }
    if (
      forecastIcon === "09d" ||
      forecastIcon === "09n" ||
      forecastIcon === "10d" ||
      forecastIcon === "10n"
    ) {
      forecastIcon = `images/heavy-rain-60.png`;
    }
    if (forecastIcon === "11d" || forecastIcon === "11n") {
      forecastIcon = `images/storm-60.png`;
    }
    if (forecastIcon === "13d" || forecastIcon === "13n") {
      forecastIcon = `images/snowy-winter-60.png`;
    }
    if (forecastIcon === "50d" || forecastIcon === "50n") {
      forecastIcon = `images/fog-60.png`;
    }

    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        ` 
            <div class="col">
              <div class="weather-forecast-block">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img src=${forecastIcon} height="30" alt=${
          forecastDay.weather[0].main
        } />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max"> ${Math.round(
                    forecastDay.temp.max
                  )}° </span>
                  <span class="weather-forecast-temperature-min"> ${Math.round(
                    forecastDay.temp.min
                  )}° </span>
                </div>
              </div>
            </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
//
function getForecast(coordinates) {
  let apiKey = "3959d341d5294447fa3d604e983c20c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
//
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElementAlt = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElementAlt.setAttribute("alt", response.data.weather[0].description);

  let mainIcon = response.data.weather[0].icon;
  if (mainIcon === "01d" || mainIcon === "01n") {
    document.querySelector("#icon").setAttribute("src", "images/sun-60.png");
  }
  if (
    mainIcon === "02d" ||
    mainIcon === "02n" ||
    mainIcon === "03d" ||
    mainIcon === "03n" ||
    mainIcon === "04d" ||
    mainIcon === "04n"
  ) {
    document.querySelector("#icon").setAttribute("src", "images/cloud-60.png");
  }
  if (
    mainIcon === "09d" ||
    mainIcon === "09n" ||
    mainIcon === "10d" ||
    mainIcon === "10n"
  ) {
    document
      .querySelector("#icon")
      .setAttribute("src", "images/heavy-rain-60.png");
  }
  if (mainIcon === "11d" || mainIcon === "11n") {
    document.querySelector("#icon").setAttribute("src", "images/storm-60.png");
  }
  if (mainIcon === "13d" || mainIcon === "13n") {
    document
      .querySelector("#icon")
      .setAttribute("src", "images/snowy-winter-60.png");
  }
  if (mainIcon === "50d" || mainIcon === "50n") {
    document.querySelector("#icon").setAttribute("src", "images/fog-60.png");
  }

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "3959d341d5294447fa3d604e983c20c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahr-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Kyiv");
