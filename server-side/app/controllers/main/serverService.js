// holiday API
const holidayService = require('../holiday/holidayService')
holidayService.initialize()

// Main Server
var model = require('../../models/masterFeed');

module.exports.getAllHolidays = async function () {
    var data = await model.find({ "category": "holiday" })
        .where('start_date').gt(new Date().getTime())
    return data
}

module.exports.getNextPhilippinesHoliday = async function () {
    var data = await model.find({ "category": "holiday" })
        .where('start_date').gt(new Date().getTime())
        .where('city').equals('Philippines')
        .sort("start_date").limit(1)
    return data
}

module.exports.getNextAustraliaHoliday = async function () {
    var data = await model.find({ "category": "holiday" })
        .where('start_date').gt(new Date().getTime())
        .where('city').equals('Australia')
        .sort("start_date").limit(1)
    return data
}

module.exports.getNextArgentinaHoliday = async function () {
    var data = await model.find({ "category": "holiday" })
        .where('start_date').gt(new Date().getTime())
        .where('city').equals('Argentina')
        .sort("start_date").limit(1)
    return data
}

module.exports.getNextIndiaHoliday = async function () {
    var data = await model.find({ "category": "holiday" })
        .where('start_date').gt(new Date().getTime())
        .where('city').equals('India')
        .sort("start_date").limit(1)
    return data
}

module.exports.getAllWeather = async function () {
    var data = await model.find({ "category": "weather" })
        .where('start_date').gt(new Date().getTime())
    return data
}

module.exports.getAllNews = async function () {
    var data = await model.find({ "category": "news" })
        //.where('start_date').gt(new Date().getTime())
    return data
}