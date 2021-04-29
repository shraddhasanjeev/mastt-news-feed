const request = require('request');
const config = require('../../config.json');
const util = require('util')
var weatherSchema = require("../../models/weatherSchema");

var errors = [];

module.exports.fetchWeather = function(req,res){

    config.locationCoordinates.forEach(city => {

        var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + city.latitude + "&lon=" + city.longitude + "&exclude=current,minutely,hourly,daily&appid=" + config.tokens.openweatherapi;

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                console.log(result);
            if(result.alerts){
                var weatherAlert = new weatherSchema();
                weatherAlert.title = result.alerts.event;
                weatherAlert.start_date = result.alerts.start;
                weatherAlert.end_date = result.alerts.end;
                weatherAlert.content = result.alerts.description;
                weatherAlert.save(function(err){
                    if(err){
                        console.log(err);
                        errors.push(err);
                    }
                })
            }
            }
        })
    });
    if (errors.length > 0){
        res.status(500).send(err);
    }
    else
        res.status(200).send("DONE")
}