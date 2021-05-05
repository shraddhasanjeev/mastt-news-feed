const express = require('express');
const router = express.Router();

var weatherController = require('../app/controllers/weather/weather.controller');
var newsController = require('../app/controllers/news/news.controller');

/* Main */
const mainRouter = require('./mainRoutes');
router.get('/main', mainRouter)

/* Holiday */
const holidayRouter = require('./holidayRoutes');
router.get('/holiday', holidayRouter)

/* Weather API */
router.get('/fetchWeatherAlerts', weatherController.fetchWeatherAlertsFromThirdParty);
router.get('/getWeatherAlertsByCity', weatherController.getWeatherAlertsByCity);

/* News API */
router.get('/getNews', newsController.getNews)

module.exports = router;