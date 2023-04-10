// var APIKey = '47638e5ce4e889ab7f93e80381f9d50f'
// var city;

function getWeatherAPI() {

  // var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey
  var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=madison&appid=47638e5ce4e889ab7f93e80381f9d50f'

  fetch(queryURL)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)
    })

}