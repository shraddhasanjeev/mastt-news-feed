const express = require('express');
const router = express.Router();

var weatherController = require('../app/controllers/weather/weather.controller');
var newsController = require('../app/controllers/news/news.controller');
var mainController = require('../app/controllers/main/mainController');

/* Main */
router.get('/main', mainController.getAllHolidays)

/* Holiday */
const holidayRouter = require('./holidayRoutes');
//router.get('/holiday', holidayRouter)

/* Weather API */
router.get('/fetchWeather', weatherController.fetchWeather)

/* News API */
router.get('/fetchNews', newsController.fetchNews)

module.exports = router;