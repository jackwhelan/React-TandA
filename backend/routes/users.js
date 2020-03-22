const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

process.env.SECRET_KEY = 'secret';

// User Model
const { User, RegistrationValidation } = require('../models/User');

// @route   GET /users
// @desc    Get All Users
// @access  Public
router.get('/', (req, res) => {
    User.find()
    .sort({date:-1})
    .then(users => res.json(users));
});

// @route   DELETE /users/:id
// @desc    Delete a User
// @access  Public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   POST /users/register
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
        firstname: req.body.firstname,
        lastname: req.body.lastname,
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

// @route   POST /users/login
// @desc    Logs a user in
// @access  Public
router.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    })
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    email: user.email,
                    created: user.created
                }

                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: "1h"
                });

                res.json(token);
            }
            else
            {
                res.json({ error: 'Incorrect password' });
            }
        }
        else
        {
            res.json({error: 'User does not exist' });
        }
    })
    .catch(err => {
        res.json({ error: err });
    });
});

module.exports = router;