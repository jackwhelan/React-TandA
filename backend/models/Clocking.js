const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');

const ClockingSchema = new Schema({
    in: {
        type: Boolean,
        required: true
    },
    datetime: {
        type: Date,
        default: Date.now
    }
});

const Clocking = new mongoose.model('Clocking', ClockingSchema);

function clockingValidation(clocking) {
    const schema = Joi.object({
    });

    const validation = schema.validate(clocking);

    return validation;
}

exports.Clocking = Clocking;
exports.ClockingValidation = clockingValidation;