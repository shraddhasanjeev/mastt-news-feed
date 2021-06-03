const service = require('./holiday.service')
const validateToken = require('../security')

module.exports.getHoliday = async function (req, res) {
    if (validateToken(req.query.token)){
        res.header("Access-Control-Allow-Origin", "*");

        const city = req.query.city;
        var data = await service.getNextHoliday(city)
        res.json(data)
        res.end()
    }
}

