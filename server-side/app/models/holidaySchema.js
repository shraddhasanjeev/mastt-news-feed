var mongoose = require('mongoose');
var masterFeed = require("./masterFeed");

const options = { discriminatorKey: 'category' };


const holidayApiSchema = mongoose.Schema({
    city: {
        type: String,
        required: true
    }
}, options);

var holidaySchema = masterFeed.discriminator('holiday', holidayApiSchema);

module.exports = holidaySchema;