// Global variables
var searchContainer = $('#search-form');
var todaysWeather = $('#weather-container');
var fiveDay = $('five-day');


function getApi(date) {
  // Declare variable for the weather api URL using personal key
  var requestURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={6de9315fe02ad136b310b6c68d6d0811}";


  // figure out how to filter search by first 6 dates of weather

  // fetch to call Weather API
  // if response comes back ok --> parse to JSON
  // then act on the data
  fetch (requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function(data) {

    for (var i = 0; i < data.length; i++) {
      // Create the elements for data to go in on each card
      var cardDate = document.createElement('h5');
      var cardDetails = document.createElement('p');
      cardDate.classList('card-date');
      cardDetails.classList('card-details');
  
      // nameDiv.textContent = data[i].login;
      // urlDiv.textContent = data[i].url;
  
      // Append the elements to the five day weather container
      fiveDay.append(cardDate);
      fiveDay.append(cardDetails);
    }

  })
}

// function displayWeather() {
//   // Pulls weather forecasts from the api
//   getApi();

//   // display current day weather in weatherContainer
//   // display 5 day weather in fiveDay
// }

function autofillSearch() {

  // Create a dropdown of cities to select from
  // User input must match an available dropdown item
  // these items are pulled from the api
}

function searchHandler(event) {
  event.preventDefault();

  var input = $('#city-input');
  var cityInput = input.value.trim();

  if (cityInput) {
    displayWeather();
  } else {
    return;
  }

}

// Event Listener on search button
var searchBtn = $('#search-button');
searchBtn.on("click", searchHandler);

// HOW TO MAKE THIS APP BETTER IN THE FUTURE:
// - Add "previous day" & "next day" buttons on the bottom of today's forecast
// - Add ZIPCODE option (convert to coordinates?)
