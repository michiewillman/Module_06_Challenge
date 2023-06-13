// Global variables
var cityInput = $('#city-input');
var listContainer = $('#city-list');

function getCoordinates(city) {
  var coordinateURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=6de9315fe02ad136b310b6c68d6d0811";

  fetch(coordinateURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {

          // Save city name: coordinates to local storage
          var lat = data[0].lat;
          var lon = data[0].lon;

          // Run functions to get today's weather and the 5-day forecast
          getToday(lat, lon);
          getForecast(lat, lon);
        })
      }
    });
}

// Pull in today's weather information
function getToday(lat, lon) {
  var todayUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=6de9315fe02ad136b310b6c68d6d0811&units=imperial";

  fetch (todayUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayToday(data);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
}

// Pull in forecast for following 5-Day Weather
function getForecast(lat, lon, selectCity) {
  // Make a call to the api for weather information
  var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=6de9315fe02ad136b310b6c68d6d0811&units=imperial";

  fetch (forecastUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayForecast(data, selectCity);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
}

// Convert unix timestamp to accessible date
function formatDate(unix) {
  var date = new Date(unix * 1000);
  var day = date.getDate();
  var month = date.getMonth() + 1; // Add 1 as month index starts from 0
  var year = date.getFullYear();
  var formattedDate = ('0' + month).slice(-2) + '/' + ('0' + day).slice(-2) + '/' + year;
  return formattedDate;
}

// Display today's weather
function displayToday(todays) {
  
  // // Display Weather Today
  var currentDate = dayjs().format('MM/DD/YYYY');
  $('#current-date').text(currentDate);
 
  $('#main-city').text("Today's Weather for " + todays.name);
  $('#current-icon').attr("src", "http://openweathermap.org/img/wn/" + todays.weather[0].icon + "@2x.png");
  $('#current-temp').text("Temp: " + Math.floor(todays.main.temp) + " °F");
  $('#current-wind').text("Wind: " + Math.floor(todays.wind.speed) + " MPH");
  $('#current-humidity').text("Humidity: " + Math.floor(todays.main.humidity));
}

// Display 5-Day Forecast weather cards
function displayForecast(data) {
  // Clear the existing forecast cards
  $('#five-day').empty();

  // Display 5-Day Forecast
  for (var i = 0; i < data.list.length; i+=8) {
    var fiveDay = $('#five-day');
    var card = $('<div>');
    card.addClass('card');
    var cardDate = $('<h5>');
    var cardIcon = $('<img>');
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
    var unixDate = data.list[i].dt;
    cardDate.text(formatDate(unixDate));
    cardIcon.attr("src", "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png")
    cardTemp.text("Temp: " + Math.floor(data.list[i].main.temp) + " °F");
    cardWind.text("Wind: " + Math.floor(data.list[i].wind.speed) + " MPH");
    cardHumidity.text("Humidity: " + Math.floor(data.list[i].main.humidity));
  }
}

// Handle submit button click + input --> run functions to get coords & update saved history
function searchHandler(event) {
  event.preventDefault();
  // TODO: Clear cards from the previous search to prevent stacking up

  var selectCity = cityInput.val();
  if (selectCity) {
    getCoordinates(selectCity);
    updateSaved(selectCity);
  }
  // Clear input field
  cityInput.val('');

}

// Update saved history of city searches
function updateSaved(city) {
  // Check for an item named saved-cities in local storage
  var savedCities = localStorage.getItem("saved-cities");
  if (savedCities) {
    savedCities = JSON.parse(savedCities);
  } else {
    savedCities = [];
  }

  if (city) {
    if (savedCities.length < 6) {
      savedCities.unshift(city);
    } else {
      savedCities.pop();
      savedCities.unshift(city);
    }
    localStorage.setItem("saved-cities", JSON.stringify(savedCities));
  }

  // Clear out any remaining buttons on the page
  listContainer.empty();

  // Show "recent searches" text
  $('#recent-text').removeClass('d-none');

  // Create a button for each city in the search history
  $.each(savedCities, function () {
    var cityButton = $("<button>", {
      text: this,
      class: "city-button",
      click: function () {
        getCoordinates(this.innerText);
      },
    });

    listContainer.append(cityButton);
  });
}

// Event Listener on search button
var searchBtn = $('.search-button');
searchBtn.on("click", searchHandler);