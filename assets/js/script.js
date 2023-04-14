var APIKey = '47638e5ce4e889ab7f93e80381f9d50f'
var searchedCity = document.getElementById('searched-cities')
var searchBtn = document.getElementById('search-btn')
var searchInput = document.querySelector('.search-input')
var city, lat, lon, queryUrl, forecastUrl

function inputSubmit(event) {
  event.preventDefault()

  var city = searchInput.value.trim()

  if (city) {
    getWeatherAPI(city)

    searchedCity.textContent = ''
    searchInput.value = ''
  }
}

async function getWeatherAPI() {

  var city = searchInput.value.trim()
  var geoResponse = await fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + APIKey)
  var [{lat, lon}] = await geoResponse.json()
  var queryUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + APIKey
  var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + APIKey

  fetch(queryUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)
      var cityDate = document.querySelector('.city-date')
      var tempEl = document.getElementById('temp')
      var windEl = document.getElementById('wind')
      var humidityEl = document.getElementById('humidity')

      var currentDate = dayjs().format('M/D/YYYY')

      cityDate.textContent = data.name + ' ' + currentDate
      tempEl.textContent = 'temperature: ' + data.main.temp
      windEl.textContent = 'wind: ' + data.wind.speed
      humidityEl.textContent = 'humidity: ' + data.main.humidity
    })
    .then(()=> {
      fetch(forecastUrl)
      .then(function(response){
        return response.json()
      })
      .then(function(data){
        console.log(data)
        for(var i=0; i < data.list.length; i++){
          var testTime = data.list[i].dt_txt.split(' ')[1]

          if(testTime === '12:00:00'){
            var cardDiv = document.createElement('div')
            var tempEl = document.createElement('p')
            var windEl = document.createElement('p')
            var humidityEl = document.createElement('p')

            tempEl.textContent = 'temperature: ' + data.list[i].main.temp
            windEl.textContent = 'wind: ' + data.list[i].wind.speed
            humidityEl.textContent = 'humidity: ' + data.list[i].main.humidity

            cardDiv.setAttribute('class', 'card')

            cardDiv.appendChild(tempEl)
            cardDiv.appendChild(windEl) 
            cardDiv.appendChild(humidityEl)
            document.querySelector('.row').appendChild(cardDiv)
          }
        }
      })
    })
}

function displayForecastDates(){
  var date = dayjs()
  var card = document.querySelectorAll('.card')

  card.forEach(card => {
    for(let i=0; i < 5; i++) {
      var nextDate = date.add(i, 'day')
      var dateEl = document.createElement('p')
      dateEl.textContent = nextDate.format('M/D/YYYY')
      card.appendChild(dateEl)
    }
    console.log('forecast date: ', card)
  })
}
displayForecastDates()

searchBtn.addEventListener('click', getWeatherAPI)


//need to have previous search buttons populate 
//add date on each day for the 5 day forecast
//5 day forecast display in a row