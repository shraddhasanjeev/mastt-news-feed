var mongoose = require('mongoose');
var masterFeed = require("./masterFeed");

const options = {discriminatorKey: 'category'};

const alertsSchema = mongoose.Schema({
    alertEvent: String,
    sourceName: String,
    start: Number,
    end: Number,
    description: String
});

const weatherApiSchema = mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    outlook: {
        type: String,
        required: true
    },
    alert: alertsSchema
}, options);

var weatherSchema = masterFeed.discriminator('weather', weatherApiSchema);

module.exports = weatherSchema;