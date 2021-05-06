const service = require('./serverService')

module.exports.getAllHolidays = async function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var data = await service.getAllHolidays()
    res.json(data)
    res.end()
}

module.exports.getAllWeather = async function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var data = await service.getAllWeather()
    res.json(data)
    res.end()
}

module.exports.getAllNews = async function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var data = await service.getAllNews()
    res.json(data)
    res.end()
}

module.exports.getNextIndiaHoliday = async function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var data = await service.getNextIndiaHoliday()
    res.json(data)
    res.end()
}

module.exports.getNextAustraliaHoliday = async function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var data = await service.getNextAustraliaHoliday()
    res.json(data)
    res.end()
}


module.exports.getNextArgentinaHoliday = async function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var data = await service.getNextArgentinaHoliday()
    res.json(data)
    res.end()
}


module.exports.getNextPhilippinesHoliday = async function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var data = await service.getNextPhilippinesHoliday()
    res.json(data)
    res.end()
}

