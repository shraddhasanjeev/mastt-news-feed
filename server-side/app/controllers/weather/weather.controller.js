const request = require('request');
const config = require('../../config.json');
const util = require('util')
var newsSchema = require("../../models/newsSchema");



module.exports.fetchWeather = function(req,res){

    config.locationCoordinates.forEach(city => {

        var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + city.latitude + "&lon=" + city.longitude + "&exclude=current,minutely,hourly,daily&appid=" + config.tokens.openweatherapi;

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                console.log(result);
            // if(body.alerts )
            // var ;
            res.status(200);
            }
        })
    });
}