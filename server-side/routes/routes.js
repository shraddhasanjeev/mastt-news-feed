const express = require('express');
const router = express.Router();

var weatherController = require('../app/controllers/weather/weather.controller');
var newsController = require('../app/controllers/news/news.controller');
var holidayController = require('../app/controllers/holiday/holiday.controller');

/* Main */
router.get('/getHoliday', holidayController.getHoliday)

/* Weather API */
router.get('/getWeatherByCity', weatherController.getWeatherByCity);

/* News API */
router.get('/getNews', newsController.getNews)
router.get('/archiveNews', newsController.archiveNews)

module.exports = router;