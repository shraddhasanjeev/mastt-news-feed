const holidayController = require("../holiday/holiday.service");
const newsController = require("../news/news.controller");
const weatherController = require("../weather/weather.controller");

const config = require("../../config.json")

setInterval(holidayController.fetchHoliday, config.intervals.holiday);
setInterval(newsController.fetchNewsFromThirdParty, config.intervals.news);
setInterval(weatherController.fetchWeatherFromThirdParty, config.intervals.weather);

