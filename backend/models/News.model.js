const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        default: Date.now
    }
});

const News = new mongoose.model('News', NewsSchema);

module.exports = News;