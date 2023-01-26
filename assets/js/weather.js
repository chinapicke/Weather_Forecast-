
// Show current weather in London
var APIKey = "5b045dfac16392eda5cca0b2562f708e";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=London,UnitedKingdom&appid=" + APIKey;

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Create CODE HERE to Log the queryURL
    console.log(queryURL);
    // Create CODE HERE to log the resulting object
    console.log(response);
    var tempCalc = response.main.temp - 273.15;
  var city = response.name;
  var wind= response.wind.speed;
  var humidity = response.main.humidity;
  $('#city').text('City: '+city);
  $('#temp').text('Temperature: '+tempCalc.toFixed(2));
  $('#wind').text('Wind: '+wind);
  $('#humidity').text('Humidity: '+humidity);

  })
