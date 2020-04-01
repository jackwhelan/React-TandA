const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClockingSchema = new Schema({
    status: {
        type: String,
        default: "out"
    },
    datetime: {
        type: Date,
        default: Date.now
    }
});

const Clocking = new mongoose.model('Clocking', ClockingSchema);

module.exports = Clocking;