// Global variables
var searchContainer = $('#search-form');
var todaysWeather = $('#weather-container');
var fiveDay = $('five-day');


function getApi(date) {
  // Declare variable for the weather api URL using personal key
  var requestURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={6de9315fe02ad136b310b6c68d6d0811}?per_page=6";


  // Make a call to the api for weather information
  fetch (requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function(data) {

    for (var i = 0; i < data.length; i++) {
      // Create the elements for data to go in on each card
      var dateDiv = $('.card-date');
      var iconDiv = $('.card-icon');
      var detailsDiv = $('.card-details');

      cardDate.textContent = data[i].list.dt;
      cardIcon.textContent = data[i].list[2].icon;

      var cardTemp = data[i].list[1].temp;
      var cardWind = data[i].list[4].wind.speed;
      var cardHumidity = data[i].list[1].humidity;
      

      // TODO: figure out how to store this info to use later... in an object array?
      

    }

  })
}

function displayWeather() {
  // Pulls weather forecasts from the api
  getApi();

  // display current day weather in weatherContainer
  // display 5 day weather in fiveDay
}

function autofillSearch() {

  // Create a dropdown of cities to select from
  // User input must match an available dropdown item
  // these items are pulled from the api
}

function searchHandler(event) {
  event.preventDefault();

  var input = $('#city-input');
  var city = input.value.trim();

  if (city) {
    displayWeather();
  } else {
    return;
  }

  // TODO: Save city search to local storage


}

// Event Listener on search button
var searchBtn = $('#search-button');
searchBtn.on("click", searchHandler);

// TODO: Render last saved city search on page load



// HOW TO MAKE THIS APP BETTER IN THE FUTURE:
// - Add "previous day" & "next day" buttons on the bottom of today's forecast
// - Add ZIPCODE option (convert to coordinates?)

