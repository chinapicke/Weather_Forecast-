// Get the user input and put into cityName variable
var cityName = $('#search-input').val()

// When user put in town and clicks button, put the city into the link for API
$('#search-button').on('click', function (e) {
    e.preventDefault();
    var cityName = $('#search-input').val()
    var APIKey = "5b045dfac16392eda5cca0b2562f708e";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // Create CODE HERE to Log the queryURL
        console.log(queryURL);
        // Create CODE HERE to log the resulting object
        console.log(response);
        var tempCalc = response.main.temp - 273.15;
        var city = response.name;
        var wind = response.wind.speed;
        var humidity = response.main.humidity;
        $('#city').text('City: ' + city);
        $('#temp').text('Temperature: ' + tempCalc.toFixed(2));
        $('#wind').text('Wind: ' + wind);
        $('#humidity').text('Humidity: ' + humidity);

    })
})