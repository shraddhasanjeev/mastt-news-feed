var mongoose = require('mongoose');
var masterFeed = require("./masterFeed");

const options = {discriminatorKey: 'category'};
const newsApiSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    sourceUrl: {
        type: String,
        required: true
    },
    author: String,
    image: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, options);

var newsSchema = masterFeed.discriminator('news', newsApiSchema);

module.exports = newsSchema;