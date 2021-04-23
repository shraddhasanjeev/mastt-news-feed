const service = require('./holidayService')

module.exports.getHolidayData = function (req, res) {
    res.json(service.getHolidays())
    res.end()
}

module.exports.getAllHolidayData = function (req, res) {
    res.json(service.getAllHolidays())
    res.end()
}