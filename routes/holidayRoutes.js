const express = require('express');
const holidayRouter = express.Router();
const controller = require('../controllers/holiday/holidayController');

holidayRouter.get('/holiday', controller.getHolidayData)

module.exports = holidayRouter;