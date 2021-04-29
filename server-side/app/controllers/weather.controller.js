const request = require('request');
const config = require('../config.json');
const util = require('util')



module.exports.fetchWeather = function(req,res){

    config.locationCoordinates.forEach(city => {

        var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + city.latitude + "&lon=" + city.longitude + "&exclude=current,minutely,hourly,daily&appid=" + config.tokens.openweatherapi;

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
            console.log(body);
            res.status(200);
            }
        })
    });
}