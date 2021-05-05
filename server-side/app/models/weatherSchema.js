var mongoose = require('mongoose');
var masterFeed = require("./masterFeed");

const options = {discriminatorKey: 'category'};
const weatherApiSchema = mongoose.Schema({
    sourceName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
}, options);

var weatherSchema = masterFeed.discriminator('weather', weatherApiSchema);

module.exports = weatherSchema;