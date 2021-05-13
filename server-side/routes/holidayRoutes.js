const express = require('express');
const holidayRouter = express.Router();
const controller = require('../app/controllers/holiday/holidayController');

holidayRouter.get('/holiday', controller.getHolidayData)
holidayRouter.get('/allHoliday', controller.getAllHolidayData)

module.exports = holidayRouter;