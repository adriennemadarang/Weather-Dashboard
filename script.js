var cityInput = document.querySelector("#city-input");
var searchButton = $('#search-button');
var clearButton = $('#clear-button');
var presentDayForecast = document.querySelector("#present-day-forecast");
var fiveDayForecast = document.querySelector("#five-day-forecast");

var pastSearches = $('#past-searches');



function dashboard(event) {
    event.preventDefault();
    var cityName = cityInputEl.value;
    displayWeather(cityName);
}

function displayWeather(data) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=7b4242051c9c905646e12bcdbddb273';
    fetch(requestUrl)
     
    }