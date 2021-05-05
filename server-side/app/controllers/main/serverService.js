// holiday API
const holidayService = require('../holiday/holidayService')
holidayService.initialize()

// Main Server
var model = require('../../models/masterFeed');

module.exports.getAllHolidays = async function () {
    var data = await model.find({ "category": "holiday" }).limit(10)
    return data
}