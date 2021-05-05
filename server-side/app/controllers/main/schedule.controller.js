var newsController = require("../news/news.controller");
var weatherController = require("../weather/weather.controller");

const config = require("../../config.json")

setInterval(newsController.fetchNewsFromThirdParty, config.intervals.news);
setInterval(weatherController.fetchWeatherAlertsFromThirdParty, config.intervals.weather);
