const express = require('express');
const router = express.Router();

var weatherController = require('../controllers/weather.controller')

/* Main */
const mainRouter = require('./mainRoutes');
router.get('/main', mainRouter)

/* Holiday */
const holidayRouter = require('./holidayRoutes');
router.get('/holiday', holidayRouter)

/* Weather API */
router.get('/fetchWeather', weatherController.fetchWeather)

module.exports = router;