// Global variables
var searchContainer = $('#search-form');
var todaysWeather = $('#weather-container');
var fiveDay = $('five-day');


function getApi() {
  // Declare variable for the weather api URL using personal key
  var requestURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={6de9315fe02ad136b310b6c68d6d0811}?per_page=6";


  // Make a call to the api for weather information
  fetch (requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function(data) {

    for (var i = 0; i < data.length; i++) {

      displayWeather(data);

      // TODO: figure out how to store this info to use later... in an object array?
      

    }

  })
}

function displayWeather(data) {


  // display current day weather in weatherContainer
  $('#main-city').val(cityName);
  var currentDate = dayjs().format('DD/MM/YYYY');
  console.log(currentDate);
  $('#current-date').val(currentDate);

  // Create the elements for data to go in on each card
  var cardDate = $('.card-date');
  var cardTemp = $('.card-temp');
  var cardWind = $('.card-temp');
  var cardHumidity = $('.card-temp');

  cardTemp.val(data[i].list[1].temp);
  cardWind.val(data[i].list[4].wind.speed);
  cardHumidity.val(data[i].list[1].humidity);

  // Add values to divs
  cardDate.textContent = data[i].list.dt;
  cardIcon.textContent = data[i].list[2].icon;


  // Add icons 
  var iconDiv = $('.card-icon');
  iconDiv.val(data[i]);
}

function autofillSearch() {
  // Create a dropdown of cities to select from
  // User input must match an available dropdown item
  // these items are pulled from the api

  var availCities = 

}

function searchHandler(event) {
  event.preventDefault();

  var city = $('#city-input').val();

  if (city) {
    displayWeather(city, weather);
  } else {
    return;
  }

  // TODO: Save city search to local storage


}

function renderLastCity() {

}

// Event Listener on search button
var searchBtn = $('#search-button');
searchBtn.on("click", searchHandler);

// TODO: Render last saved city search on page load
renderLastCity();


// HOW TO MAKE THIS APP BETTER IN THE FUTURE:
// - Add an error message when a user doesn't input a city but clicks search button
// - Add "previous day" & "next day" buttons on the bottom of today's forecast
// - Add ZIPCODE option (convert to coordinates?)

