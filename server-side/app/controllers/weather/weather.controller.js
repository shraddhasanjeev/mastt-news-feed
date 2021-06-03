const request = require('request');
const config = require('../../config.json');
const util = require('util')
var weatherSchema = require("../../models/weatherSchema");
var errors = [];
const validateToken = require('../security')

module.exports.fetchWeatherFromThirdParty = function(){

    config.locationCoordinates.forEach(city => {

        var weather = new weatherSchema();
        var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + city.latitude + "&lon=" + city.longitude + "&exclude=minutely,hourly,daily&units=metric&appid=" + config.tokens.openweatherapi;
        
        weather.city = city.cityName;
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                if(result.current){
                    var epochDate = parseInt(result.current.dt);
                    if (epochDate < 10000000000)
                        epochDate *= 1000;
                    weather.start_date = epochDate;
                    weather.end_date = epochDate + config.intervals.weather;
                    weather.temperature = result.current.temp;
                    weather.outlook = result.current.weather[0].main;
                }
                if(result.alerts){
                    result.alerts.forEach(alert => {
                        weather.alert.alertEvent = alert.event;
                        weather.alert.sourceName = alert.sender_name;
                        weather.alert.start = alert.start;
                        weather.alert.end = alert.end;
                        weather.alert.description = alert.description;
                    });
                }
                else{
                    weather.alert = null;
                }
                weather.save().catch(err => {
                    errors.push(err)
                });
            }
        })
    });

    if (errors.length > 0){
        console.log(errors);
    }
}

module.exports.getWeatherByCity = function (req, res) {
    if (validateToken(req.query.token)) {
        const city = req.query.city;

        res.header('Access-Control-Allow-Origin', '*');
        // const docquery = weatherSchema.find({ city: city });
        const docquery = weatherSchema.find({ city: city }).sort({_id: -1}).limit(1);
        docquery.exec().then(weather => {
            res.json(weather);
        }).catch(err => {
            res.status(500).send(err);
        });
    }
}