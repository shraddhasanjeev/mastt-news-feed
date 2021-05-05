const express = require('express');
const router = express.Router();

var weatherController = require('../app/controllers/weather/weather.controller');
var newsController = require('../app/controllers/news/news.controller');
var mainController = require('../app/controllers/main/mainController');

/* Main */
router.get('/holiday', mainController.getAllHolidays)
router.get('/weather', mainController.getAllWeather)
router.get('/news', mainController.getAllNews)

router.get('/getIndiaHoliday', mainController.getNextIndiaHoliday)
router.get('/getPhilippinesHoliday', mainController.getNextPhilippinesHoliday)
router.get('/getArgentinaHoliday', mainController.getNextArgentinaHoliday)
router.get('/getAustraliaHoliday', mainController.getNextAustraliaHoliday)


/* Holiday */
const holidayRouter = require('./holidayRoutes');
//router.get('/holiday', holidayRouter)

/* Weather API */
router.get('/fetchWeather', weatherController.fetchWeather)

/* News API */
router.get('/fetchNews', newsController.fetchNews)

module.exports = router;