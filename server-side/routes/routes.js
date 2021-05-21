const express = require('express');
const router = express.Router();

var weatherController = require('../app/controllers/weather/weather.controller');
var newsController = require('../app/controllers/news/news.controller');
var mainController = require('../app/controllers/main/main.controller');

/* Main */
router.get('/getIndiaHoliday', mainController.getNextIndiaHoliday)
router.get('/getPhilippinesHoliday', mainController.getNextPhilippinesHoliday)
router.get('/getArgentinaHoliday', mainController.getNextArgentinaHoliday)
router.get('/getAustraliaHoliday', mainController.getNextAustraliaHoliday)

/* Weather API */
router.get('/getWeatherByCity', weatherController.getWeatherByCity);

/* News API */
router.get('/getNews', newsController.getNews)

module.exports = router;