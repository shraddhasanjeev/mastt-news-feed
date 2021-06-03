var mongoose = require('mongoose');
var masterFeed = require("./masterFeed");

const options = { discriminatorKey: 'category' };


const holidayApiSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
}, options);

var holidaySchema = masterFeed.discriminator('holiday', holidayApiSchema);

module.exports = holidaySchema;