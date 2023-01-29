var searchCity = []
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
    dates()
    fiveDayForecast()
    saveCity()
    showSavedCity()
})

function renderButtons() {
    for (var i = 0; i < searchCity.length; i++) {
        console.log(searchCity[i])
        var buttons = $('<button>')
        buttons.attr({ 'id': "cityBtn", 'class': "col-sm-12" })
        buttons.text(searchCity[i])
        $("#history").append(buttons);
        showSavedCity()
    }

}

function clearButtons() {
    $('#history').empty()
}
// Get the user input and put into cityName variable
var cityName = $('#search-input').val()

// When user put in town and clicks button, put the city into the link for API
function cityAPI() {
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
        // Current if and else statement not working
        let cityCod = response.cod
        (console.log(cityCod))
        if (cityCod === '404') {
            return alert('Please input correct city name')
        }
        else {
            var tempCalc = response.main.temp - 273.15;
            var city = response.name;
            var wind = response.wind.speed;
            var humidity = response.main.humidity;
            var icon = response.weather[0].icon;
            // https://www.youtube.com/watch?v=8R3FtApLdms
            var iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png"
            var iconFormat = $('#icon').attr('src', iconUrl,);
            $('#city').text('City: ' + city + todayDate);
            $('#temp').text('Temperature: ' + tempCalc.toFixed(2) + "°C");
            $('#wind').text('Wind: ' + wind + "KPH");
            $('#humidity').text('Humidity: ' + humidity + "%");
        }
    })
}
// Function to display the date on each of the 5 day weather forecast cards
function dates() {
    // Setting variable and adding the amount of the days from the current date
    let tomorrow = moment().add(1, 'days');
    let twoDays = moment().add(2, 'days');
    let threeDays = moment().add(3, 'days');
    let fourDays = moment().add(4, 'days');
    let fiveDays = moment().add(5, 'days');
    // Using text to print it onto the correct days card, need to format it so that it matches the current date format
    $('#tomorrow').text(tomorrow.format(' (D/M/YYYY)'))
    $('#twoDays').text(twoDays.format(' (D/M/YYYY)'))
    $('#threeDays').text(threeDays.format(' (D/M/YYYY)'))
    $('#fourDays').text(fourDays.format(' (D/M/YYYY)'))
    $('#fiveDays').text(fiveDays.format(' (D/M/YYYY)'))
}

function fiveDayForecast() {
    var cityName = $('#search-input').val()
    var APIKey = "5b045dfac16392eda5cca0b2562f708e";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // // Create CODE HERE to Log the queryURL
        console.log(queryURL);
        // // Create CODE HERE to log the resulting object
        console.log(response);
        var forecastList = response.list
        // console.log(forecastList)
        // // console.log(response.list[dt_txt])
        // //divide by 6 since API updates weather every 3 hours a day, this gives the weather at 12 each day
        for (i = 1; i <= 5; i++) {
            // console.log(i)
            // console.log(forecastList[i*6].main.temp)
            var temp = forecastList[i*6].main.temp
            var wind = forecastList[i*6].wind.speed
            var humidity= forecastList[i*6].main.humidity
            var icon = forecastList[i*6].weather[0].icon
            // if (forecastList[i].dt_txt.split(' ') === '12:00:00') 
        // //     // This is to find the 12 o'clock whether of each day, as the weather API shows the weather every 3hrs for 5 days, this equation picks the 9th
        // //         // console.log(forecastList[i])
            // var cards = $('.fiveDay')
        // //     //     console.log(JSON.stringify(response.list.dx_txt))
            var tempCalc = $('#tempforecast'+[i]).text('Temp : ' + temp + ' °C'); 
            var windEl = $('#windforecast'+[i]).text('Wind speed : ' + wind + 'KPH'); 
            var humidityEl = $('#humidityforecast'+[i]).text('Humidity : ' + humidity + ' %'); 
            var iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png"
            var iconFormat = $('#iconforecast'+[i]).attr('src', iconUrl)

            // cards.append(tempCalc)
            // $('#forecast').append(cards)
        }
            // rendering temp in the wrong way, tomorrow is showing temp on the 5th day, cards 2-5 shwo all the temps for the next 4 days



            // var tempCalc = response.main.temp - 273.15;
            // tempCalc.innerHTML = "Temp: "+ (response.data.list[forecastIndex].main.temp)
            // // var city = response.name;
            // // var wind = response.wind.speed;
            // // var humidity = response.main.humidity;
            // // var icon = response.weather[0].icon;
            // console.log(i)


            // Loop through each number of array to represent each day 
            // var fiveDayCards = $('#fiveDayCard').siblings()
            // for (i=0; i<fiveDayCards.length; i++) {
            //     forecastEls[i].innerHTML = "";}
        }
)
}

function saveCity(){
    localStorage.setItem("searchCity", JSON.stringify(searchCity)); //saves city input to local storage 
}

function showSavedCity(){
    var searchCity = JSON.parse(localStorage.getItem('searchCity'));
}

// ?how to stop the input returning the same input/repeating itself 