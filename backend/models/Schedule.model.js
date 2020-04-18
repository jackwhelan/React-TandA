const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    begins: {
        type: Date,
        required: true
    },
    ends: {
        type: Date,
        required: true
    }
});

const Schedule = new mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;