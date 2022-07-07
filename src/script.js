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
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "3959d341d5294447fa3d604e983c20c9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
