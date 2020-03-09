const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Model
const { User, RegistrationValidation } = require('../../models/User');

// @route   GET api/users
// @desc    Get All Users
// @access  Public
router.get('/', (req, res) => {
    User.find()
    .sort({date:-1})
    .then(users => res.json(users));
});

// @route   POST api/users
// @desc    Create a User
// @access  Public
router.post('/', (req, res) => {
    const newUser = new User({
        name: req.body.name
    })

    newUser.save()
    .then(user => res.json(user));
});

// @route   DELETE api/users/:id
// @desc    Delete a User
// @access  Public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res) => {
    const {error} = RegistrationValidation(req.body);
    if(error) return res.status(400).json({
        status: 'error',
        type: error.details[0].path[0],
        msg: error.details[0].message
    });

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    User.findOne({email:req.body.email}).then(emailMatch=>{
        if(emailMatch) {
            return res.status(400).json({
                status: 'error',
                type: 'email',
                msg: 'Email is already registered'
            });
        }
    });

    User.findOne({ username: req.body.username }).then(usernameMatch => {
        if (usernameMatch) {
            return res.status(400).json({
                status: 'error',
                type: 'username',
                msg: 'Username is already taken'
            });
        }
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(post => res.json(post))
            .catch(err => console.error(err));
        });
    });
});


module.exports = router;