var searchCity = []
var history = $('#history')
// Moment JS to display the current date next to the search city 
var todayDate = moment().format(' (D/M/YYYY)');

// Renders cityName onto page once button clicked
$('#search-button').on('click', function (e) {
    e.preventDefault()
    var cityName = $('#search-input').val()
    searchCity.push(cityName)
    cityAPI()
    clearButtons()
    renderButtons()
    
})

function renderButtons(){
    for (var i = 0; i <searchCity.length; i++) {
        console.log(searchCity[i])
        var buttons = $('<button>')
        buttons.attr({'id':"cityBtn", 'class': "col-sm-12"})
        buttons.text(searchCity[i])
        $("#history").append(buttons);
    }

}

function clearButtons(){
    $('#history').empty()
  }
// Get the user input and put into cityName variable
var cityName = $('#search-input').val()

// When user put in town and clicks button, put the city into the link for API
function cityAPI(){
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
        // if (response === 404){
        //     alert('Please input correct city name')
        // }
        // else{
        var tempCalc = response.main.temp - 273.15;
        var city = response.name;
        var wind = response.wind.speed;
        var humidity = response.main.humidity;
        var icon = response.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" +icon +".png"
        $('#city').text('City: ' + city + todayDate );
        $('#icon').attr('src', iconUrl);
        $('#temp').text('Temperature: ' + tempCalc.toFixed(2)+ "°C");
        $('#wind').text('Wind: ' + wind + "KPH");
        $('#humidity').text('Humidity: ' + humidity + "%");
        }
    // })
// })
    )
}