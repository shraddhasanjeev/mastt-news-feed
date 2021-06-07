const service = require('./holiday.service')
const validateToken = require('../security')
const model = require('../../models/holidaySchema');
module.exports.getHoliday = async function (req, res) {
    if (validateToken(req.query.token)) {
        res.header("Access-Control-Allow-Origin", "*");
        var city = req.query.city;
        city = city.charAt(0).toLowerCase() + city.slice(1)
        const docquery = model.find({ 'city': city })
            .where('start_date').gt(new Date().getTime())
            .limit(1)
        docquery.exec().then(holiday => {
            res.json(holiday);
        }).catch(err => {
            res.status(500).send(err);
        });
    } else {
        res.status(401)
        res.end()
    }
}
