const request = require('request');
const config = require('../../config.json');
const util = require('util')
var weatherSchema = require("../../models/weatherSchema");

var errors = [];

module.exports.fetchWeatherAlertsFromThirdParty = function(req,res){

    config.locationCoordinates.forEach(city => {

        var weatherAlert = new weatherSchema();
        var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + city.latitude + "&lon=" + city.longitude + "&exclude=current,minutely,hourly,daily&appid=" + config.tokens.openweatherapi;
        
        weatherAlert.city = city.cityName;
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                console.log(result);
                if(result.alerts){
                    weatherAlert.title = result.alerts.event;
                    weatherAlert.sourceName = result.alerts.sender_name;
                    weatherAlert.start_date = result.alerts.start;
                    weatherAlert.end_date = result.alerts.end;
                    weatherAlert.content = result.alerts.description;
                    weatherAlert.save().catch(err => {
                        console.log(err)
                        errors.push(err)
                    });
                }
            }
        })
    });
    if (errors.length > 0){
        res.status(500).send(errors);
    }
    else
        res.status(200).send("DONE");
}

module.exports.getWeatherAlertsByCity = function(req,res){
    const city = req.query.city;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    console.log(city)
    const docquery = weatherSchema.find({city: city});
    docquery.exec().then(weatherAlert => {
      res.json(weatherAlert);
    }).catch(err => {
      res.status(500).send(err);
    });
}