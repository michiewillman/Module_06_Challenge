// Global variables
var cityInput = $('#city-input');

function getCoordinates(city) {
  var coordinateURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=6de9315fe02ad136b310b6c68d6d0811";

  fetch (coordinateURL)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // Save city name: coordinates to local storage
        var lat = data[0].lat;
        var lon = data[0].lon;
        var coordinates = lat.toString() + " " + lon.toString();
        localStorage.setItem(city, coordinates);

        // Run functions to get today's weather and the 5-day forecast
        getToday(lat, lon);
        getForecast(lat, lon);

      })
    }
  });
}

function getToday(lat, lon) {
  var todayUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=6de9315fe02ad136b310b6c68d6d0811&units=imperial";

  fetch (todayUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayToday(data);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
}

function getForecast(lat, lon) {
  // Make a call to the api for weather information
  var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=6de9315fe02ad136b310b6c68d6d0811&units=imperial";

  fetch (forecastUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayForecast(data);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
}

function formatDate(unix) {
  var date = new Date(unix * 1000);
  var day = date.getDate();
  var month = date.getMonth() + 1; // Add 1 as month index starts from 0
  var year = date.getFullYear();
  var formattedDate = ('0' + month).slice(-2) + '/' + ('0' + day).slice(-2) + '/' + year;
  return formattedDate;
}

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

function displayForecast(data) {
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

function searchHandler(event) {
  event.preventDefault();
  // TODO: Clear cards from the previous search to prevent stacking up

  var selectCity = cityInput.val();
  if (selectCity) {
    getCoordinates(selectCity);
  }
  // Clear input field
  cityInput.val('');

}

function listSavedCities() {
  var savedCities = JSON.parse(localStorage.getItem('cityList'));
  if (savedCities !== null) {
    console.log(savedCities);
    // run display weather
    for (i = 0; i < 6; i++) {
      
    }
  } else {
    // create empty array
  }

}

// Event Listener on search button
var searchBtn = $('.search-button');
searchBtn.on("click", searchHandler);

// Render last saved city search on page load
// listSavedCities();