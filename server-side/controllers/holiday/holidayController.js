const service = require('./holidayService')

module.exports.getHolidayData = function (req, res) {
    res.json(service.getHolidays())
    res.end()
}