// Global variables
var searchContainer = $('#search-form');
var todaysWeather = $('#weather-container');
var fiveDay = $('five-day');


function getApi() {
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

function displayWeather() {

  // pull current day's weather
  // display current day weather in weatherContainer

}

function displayFiveDay(data) {
  // not sure if i include data as a parameter here

  // pull first five days info from api



}

function autofillSearch() {
  
}

// Event Listener on search button
var searchBtn = $('#search-button');
searchBtn.on("click", displayWeather)

// HOW I COULD MAKE MY APP BETTER:
// - Add "previous day" & "next day" buttons on the bottom of today's forecast
// - 
