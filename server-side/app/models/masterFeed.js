//var mongoClient = require('./masttDb')
const mongoose = require('mongoose');

const options = {discriminatorKey: 'category'};
const masterFeedSchema = new mongoose.Schema({
    start_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, options);

module.exports = mongoose.model('masterFeed', masterFeedSchema);