var mongoose = require('mongoose');
var masterFeed = require("./masterFeed");

const options = {discriminatorKey: 'category'};
const newsApiSchema = mongoose.Schema({
    sourceUrl: {
        type: String,
        required: true
    },
    author: String,
    image: {
        type: String,
        required: true
    }
}, options);

var newsSchema = masterFeed.discriminator('news', newsApiSchema);

module.exports = newsSchema;