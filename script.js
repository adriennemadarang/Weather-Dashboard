var cityInputEl = document.querySelector("#city-input");
var searchForm = document.querySelector("#search-form");
var clearButton = document.querySelector("#clear-button");
var presentDayForecast = document.querySelector("#present-day-forecast");
var fiveDayForecast = document.querySelector("#five-day-forecast");
var pastSearch = 
var searchHistory

function dashboard(event) {
    event.preventDefault();
    var cityName = cityInputEl.value;
    displayWeather(cityName);
}

function displayWeather(cityName) {
    var url = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=07b4242051c9c905646e12bcdbddb273";
    fetch(url)
}

// function clearSearchHistory() {
//     localStorage.clear();
// pastSearch.innerHTML = "";
// searchHistory = [];
// }
// clearButton.addEventListener("click", function () {
//     clearSearchHistory();
// }); 