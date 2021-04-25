const express = require('express');
const holidayRouter = express.Router();
const controller = require('../app/controllers/holiday/holidayController');

holidayRouter.get('/holiday', controller.getHolidayData)

module.exports = holidayRouter;