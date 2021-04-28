const request = require('request');
const config = require('../config.json');

module.exports.fetchWeather = function(req,res){

    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + config.locationCoordinates.hyderabad.latitude + "&lon=" + config.locationCoordinates.hyderabad.longitude + "&exclude=current,minutely,hourly,daily&appid=" + config.tokens.openweatherapi;
    
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        console.log(body)
        }
    })
}