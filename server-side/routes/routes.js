const express = require('express');
const router = express.Router();

var weatherController = require('../app/controllers/weather.controller');
var newsController = require('../app/controllers/news/news.controller');

/* Main */
const mainRouter = require('./mainRoutes');
router.get('/main', mainRouter)

/* Holiday */
const holidayRouter = require('./holidayRoutes');
router.get('/holiday', holidayRouter)

/* Weather API */
router.get('/fetchWeather', weatherController.fetchWeather)

/* News API */
router.get('/fetchNews', newsController.fetchNews)

module.exports = router;