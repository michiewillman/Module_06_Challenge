// Global variables
var currentDate = dayjs().format('DD/MM/YYYY');
var searchContainer = $('#search-form');
var cityInput = $('#city-input');
var todaysWeather = $('#weather-container');
var fiveDay = $('#five-day');

function getCoordinates(city) {
  var coordinateURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=6de9315fe02ad136b310b6c68d6d0811";

  fetch (coordinateURL)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        getWeather(data[0].lat, data[0].lon)
      })
    }
  });
}



function getWeather(lat, lon) {
  // Make a call to the api for weather information
  var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=6de9315fe02ad136b310b6c68d6d0811&units=imperial";

  fetch (forecastURL)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayWeather(data);
        // localStorage.setItem();
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
}

// <div class="card">
//           <h5 class="card-date"></h5>
//           <i class="card-icon"></i>
//           <div class="card-details">
//             <ul>
//               <li class="card-temp"></li>
//               <li class="card-wind"></li>
//               <li class="card-humidity"></li>
//             </ul>
//           </div>
// </div>

function displayWeather(data) {
  
  // // Display Weather Today
  // $('#main-city').textContent = toString(city);
  // $('#current-date').textContent = currentDate;
  // $('.city-temp').textContent = "Temp:" + data[0].list.main.temp + "°F";
  // $('.city-wind').textContent = "Wind" + data[0].list.wind.speed;
  // $('.city-humidity').textContent = "Humidity" + data[0].list.main.humidity;

  // Display 5-Day Forecast
  for (var i = 0; i < data.list.length; i+=8) {

    var card = $('<div>');
    card.addClass('card');
    var cardDate = $('<h5>');
    var cardIcon = $('<i>');
    var cardDetails = $('<div>');
    var detailList = $('<ul>');
    var cardTemp = $('<li>');
    var cardWind = $('<li>');
    var cardHumidity = $('<li>');
    
    fiveDay.append(card);
    card.append(cardDate, cardIcon, cardDetails);
    cardDetails.append(detailList);
    detailList.append(cardTemp, cardWind, cardHumidity);

    // Fill content for 5-day forecast cards
    cardDate.text(data.list[i].dt);
    cardIcon.text(data.list[i].weather.icon);
    cardTemp.text("Temp:" + data.list[i].main.temp);
    cardWind.text("Wind" + data.list[i].wind.speed);
    cardHumidity.text("Humidity" + data.list[i].main.humidity);

  }
}

function searchHandler(event) {
  event.preventDefault();

  var selectCity = $('#city-input').val();

  if (selectCity) {
    getCoordinates(selectCity);
    // getWeather(selectCity);

    // TODO: clear the input form
  } else {
    alert('Please enter a valid city name.')
  }

  // TODO: Stringify + Save city search to local storage


}

function renderLastCity() {
  var saved = localStorage.getItem('savedCities');
  if (saved) {
    // parse
    // run display weather
    // 
  } else {
    // create empty array
  }

}

// Event Listener on search button
var searchBtn = $('.search-button');
searchBtn.on("click", searchHandler);

// Render last saved city search on page load
// renderLastCity();


// HOW TO MAKE THIS APP BETTER IN THE FUTURE:
// - Add an error message when a user doesn't input a city but clicks search button
// - Add "previous day" & "next day" buttons on the bottom of today's forecast
// - Add ZIPCODE option (convert to coordinates?)

