const service = require('./holiday.service')
const validateToken = require('../security')
const model = require('../../models/holidaySchema');
module.exports.getHoliday = async function (req, res) {
    if (validateToken(req.query.token)) {
        res.header("Access-Control-Allow-Origin", "*");
        const city = req.query.city;

        const docquery = model.find({ "category": "holiday" })
            .where('start_date').gt(new Date().getTime())
            .where('city').equals(city)
            .sort("start_date").limit(1)
        docquery.exec().then(weather => {
            res.json(weather);
        }).catch(err => {
            res.status(500).send(err);
        });
    } else {
        res.status(401)
        res.end()
    }
}
