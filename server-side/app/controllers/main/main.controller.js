const service = require('./server.service')
const validateToken = require('../security')

module.exports.getNextIndiaHoliday = async function (req, res) {
    if (validateToken(req.query.token)){
        res.header("Access-Control-Allow-Origin", "*");
        var data = await service.getNextIndiaHoliday()
        res.json(data)
        res.end()
    }
    
}

module.exports.getNextAustraliaHoliday = async function (req, res) {
    if (validateToken(req.query.token)) {
        res.header("Access-Control-Allow-Origin", "*");
        var data = await service.getNextAustraliaHoliday()
        res.json(data)
        res.end()
    }
}

module.exports.getNextArgentinaHoliday = async function (req, res) {
    if (validateToken(req.query.token)) {
        res.header("Access-Control-Allow-Origin", "*");
        var data = await service.getNextArgentinaHoliday()
        res.json(data)
        res.end()
    }
}

module.exports.getNextPhilippinesHoliday = async function (req, res) {
    if (validateToken(req.query.token)) {
        res.header("Access-Control-Allow-Origin", "*");
        var data = await service.getNextPhilippinesHoliday()
        res.json(data)
        res.end()
    }
}

