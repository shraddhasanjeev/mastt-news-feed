const express = require('express');
const holidayRouter = express.Router();
const controller = require('../controllers/holiday/holidayController');

holidayRouter.get('/holiday', controller.getHolidayData)
holidayRouter.get('/allHoliday', controller.getAllHolidayData)

module.exports = holidayRouter;