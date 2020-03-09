const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const User = new mongoose.model('User', UserSchema);

function registrationValidation(user) {
    const schema = Joi.object({
        username: Joi.string()
        .min(3)
        .max(30)
        .required(),
        email: Joi.string()
        .email()
        .required(),
        password: Joi.string()
        .required()
    });
    
    const validation = schema.validate(user);

    return validation;
}

exports.User = User;
exports.RegistrationValidation = registrationValidation;