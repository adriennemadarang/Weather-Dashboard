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
        var uvIndexQuery = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';

        
    })
     
    }