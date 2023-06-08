// Global variables
var currentDate = dayjs().format('DD/MM/YYYY');
var searchContainer = $('#search-form');
var cityInput = $('#city-input');
var todaysWeather = $('#weather-container');
var fiveDay = $('five-day');


function getWeather(city) {
  // Make a call to the api for weather information
  var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=6de9315fe02ad136b310b6c68d6d0811&units=imperial";

  fetch (requestURL)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayWeather(data);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
}

function displayWeather(data) {
  for (var i = 0; i < data.length; i++) {

    console.log(data[i].dt);

    // Display current day weather in weatherContainer
    $('#main-city').textContent = toString(city);
    $('#current-date').textContent = currentDate;
    $('.city-temp').textContent = "Temp:" + data[0].main.temp + "°F";
    $('.city-wind').textContent = "Wind" + data[0].wind.speed;
    $('.city-humidity').textContent = "Humidity" + data[0].main.humidity;

    // Add icons 
    var iconDiv = $('.card-icon');
    iconDiv.textContent = data[i].weather.icon;

    if (i > 0) {
      // Add values to 5 day weather cards
      $('.card-date').textContent = data[i].dt;
      $('.card-temp').textContent = "Temp:" + data[i].main.temp;
      ('.card-wind').textContent = "Wind" + data[i].wind.speed;
      $('.card-humidity').textContent = "Humidity" + data[i].main.humidity;
    }
    return;
  }
}

function searchHandler(event) {
  event.preventDefault();

  var selectCity = $('#city-input').val();

  if (selectCity) {
    getWeather(selectCity);

    // TODO: clear the input form
  } else {
    alert('Please enter a valid city name.')
  }

  // TODO: Save city search to local storage


}

// function renderLastCity() {
//   var saved = localStorage.getItem('savedCity');
//   if (saved) {

//   } else {
//     return;
//   }

// }

// Event Listener on search button
var searchBtn = $('.search-button');
searchBtn.on("click", searchHandler);

// Render last saved city search on page load
// renderLastCity();


// HOW TO MAKE THIS APP BETTER IN THE FUTURE:
// - Add an error message when a user doesn't input a city but clicks search button
// - Add "previous day" & "next day" buttons on the bottom of today's forecast
// - Add ZIPCODE option (convert to coordinates?)

