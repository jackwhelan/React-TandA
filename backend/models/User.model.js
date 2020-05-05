const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
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
    },
    clearance: {
        type: String,
        default: 'user'
    },
    clocking: {
        type: Array,
        default: [{
            _id: mongoose.Types.ObjectId(),
            status: "out ",
            datetime: Date.now()
        }]
    }
});

UserSchema.index({
    firstname: 'text',
    lastname: 'text',
    email: 'text',
    username: 'text'
});

const User = new mongoose.model('User', UserSchema);

function registrationValidation(user) {
    const schema = Joi.object({
        firstname: Joi.string()
            .min(2)
            .max(30)
            .required(),
        lastname: Joi.string()
            .min(2)
            .max(30)
            .required(),
        username: Joi.string()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .max(100)
            .required()
    });
    
    const validation = schema.validate(user);

    return validation;
}

function updateValidation(user) {
    const schema = Joi.object({
        firstname: Joi.string()
            .min(2)
            .max(30)
            .required(),
        lastname: Joi.string()
            .min(2)
            .max(30)
            .required(),
        username: Joi.string()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email()
            .required()
    });

    const validation = schema.validate(user);

    return validation;
}

exports.User = User;
exports.RegistrationValidation = registrationValidation;
exports.UpdateValidation = updateValidation;