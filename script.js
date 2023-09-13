var today = moment().format('L');
var apiKey = '51c7b424209c905646e12bcdbddb273';
var searchHistory = [];


function displayWeather(city) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}';
   
    $.ajax({
        url: requestUrl,
        method: "GET"
    }).then(function(cityWeatherResponse){
        console.log(cityWeatherResponse);

        $("#weatherContent").css("display", "block");
        $("#cityDetails").empty();

        var iconCode = cityWeatherResponse.weather[0].icon;
        var iconUrl = 'https://openweathermap.org/img/w/${iconCode}.png';
        var currentCity = $(`
        <h2 id="currentCity">
        ${cityWeatherResponse.name} ${today} <img src="${iconUrl}" alt="${cityWeatherResponse.weather[0].description}"/>
        </h2>
        <p>Temperature: ${cityWeatherResponse.main.temp} °F</p>
        <p>WindSpeed: ${cityWeatherResponse.wind.speed} MPH</p>
        <p>Humidity: ${cityWeatherResponse.main.humidity} %</p>
        `);

        $("#cityDetails").append(currentCity);

        var lat = cityWeatherResponse.coord.lat;
        var lon = cityWeatherResponse.coord.lon;
        var uvIndexUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';

        $.ajax({
            url: uvIndexUrl,
            method: "GET"
        }).then(function(uviResponse){
            console.log(uviResponse);

            var uvIndex = uviResponse.value;
            var uvIndexP = $(`
            <p>UV Index: 
            <span id="uvIndexcolor" class="px-2 py-2 rounded">${uvIndex}</span
            </p>
        `);

        $("#cityDetails").append(uvIndexP);

        futureWeather(lat, lon);
        if (uvIndex >= 0 && uvIndex <= 2){
            $("#uvIndexColor").css("background-color", "#3EA72D").css("color", "white");
        } else if (uvIndex >= 3 && uvIndex <= 5) {
            $("#uvIndexColor").css("background-color", "#FFF300");
        } else if (uvIndex >=6 && uvIndex <=7){
            $("#uvIndexColor").css("background-color", "#F18B00");
        } else if (uvIndex >= 8 && uvIndex <= 10) {
            $("#uvIndexColor").css("background-color", "#E53210").css("color", "white");
        } else {
            $("#uvIndexColor").css("background-color", "#B567A4").css("color", "white");
        };
    }); 
});

function futureWeather(lat, lon) {
    var futureWeatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${apiKey';

    $.ajax({
        url: futureWeatherURL,
        method: "GET"
    }).then(function(fiveDayResponse){
        console.log(fiveDayResponse);
        $("#fiveDay").empty();

        for (let i = 1; i < 6; i++){
            var cityInfo = {
                date: fiveDayResponse.daily[i].dt,
                icon: fiveDayResponse.daily[i].weather[0].icon,
                temp: fiveDayResponse.daily[i].temp.day,
                humidity: fiveDayResponse.daily[i].humidity
            };

            var currentDate = moment.unix(cityInfo.date).format("MM/DD/YYYY");
            var iconURL = '<img src="https://openweathermap.org/img/w/${cityInfo.icon}.png alt="${futureResponse.daily[i].weather[0].main}"/>';
            var futureCard = $(`
            <div class="pl-3">
                <div class="card pl-3 pt-3 mb-3 bg-primary text-light" style="width: 12rem">
                    <div class="card-body">
                    <h5>${currentDate}</h5>
                    <p>$${iconURL}</p>
                    <p>Temperature: ${cityInfo.temp} °F </p>
                    <p>Humidity: ${cityInfo.humidity} %</p>
                </div>
            </div>
        </div>
            `);
            $("fiveDay").append(futureCard);
        }
    });
}

$("#searchBtn").on("click", function(event) {
    event.preventDefault();

    var city = $("enterCity").val().trim();
    currentWeather(city);
    if (!searchHistory.includes(city)){
        searchHistory.push(city);
        var searchedCity = $(`
        <li class="list-group-item">${city}</li>
        `);
        $("#searchHistory").append(searchedCity);
    };

    localStorage.setItem("city", JSON.stringify(searchHistory));
    console.log(searchHistory);
});

$(document).on("click", ".list-group-item", function(){
    var cityList = $(this).text();
    currentWeather(cityList);
});

$(document).ready(function(){
    var searchHistoryArr = JSON.parse(localStorage.getItem("city"));

    if(searchHistoryArr !== null) {
        var lastSearchedIndex = searchHistoryArr.length -1;
        var lastSearchedCity = searchHistoryArr[lastSearchedIndex];
        currentWeather(lastSearchedCity);
        console.log('Last city searched: ${lastSearchedCity}');
    }
});