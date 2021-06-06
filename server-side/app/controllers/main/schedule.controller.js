const holidayController = require("../holiday/holiday.service");
const newsController = require("../news/news.controller");
const weatherController = require("../weather/weather.controller");

const config = require("../../config.json")

setInterval(holidayController.fetchHoliday, config.intervals.holiday);
setInterval(weatherController.fetchWeatherFromThirdParty, config.intervals.weather);

setInterval(() => {newsController.fetchNewsFromThirdParty("sydney")}, config.intervals.news);
setInterval(() => {newsController.fetchNewsFromThirdParty("hyderabad")}, config.intervals.news);
setInterval(() => {newsController.fetchNewsFromThirdParty("manila")}, config.intervals.news);
setInterval(() => {newsController.fetchNewsFromThirdParty("buenos aires")}, config.intervals.news);

// setInterval(() => {config.newsUrls.forEach(function(city){
//     newsController.fetchNewsFromThirdParty(city);
// })}, config.intervals.news);