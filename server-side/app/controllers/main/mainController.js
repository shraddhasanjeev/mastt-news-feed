const service = require('./serverService')

module.exports.getAllHolidays = async function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var data = await service.getAllHolidays()
    res.json(data)
    res.end()
}