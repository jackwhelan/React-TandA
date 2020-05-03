const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

process.env.SECRET_KEY = 'secret';

// User Model
const { User, RegistrationValidation, UpdateValidation } = require('../models/User.model');

// @route   GET /users
// @desc    Get All Users
router.get('/', (req, res) => {
    User.find()
    .sort({date:-1})
    .then(users => res.json(users));
});

// @route   DELETE /users/:id
// @desc    Delete a User
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   GET /users/:id
// @desc    Gets a User
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json(err));
});

// @route   POST /users/register
// @desc    Register a user
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

    User.findOne({ username: req.body.username }).then(usernameMatch => {
        if (usernameMatch) {
            return res.json({
                status: 'error',
                error: 'Username is already registered'
            });
        }
    });

    User.findOne({ email: req.body.email }).then(emailMatch => {
        if (emailMatch) {
            return res.json({
                status: 'error',
                error: 'Email is already registered'
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

                res.json({
                    status: "success",
                    header: "Success",
                    message: "Logged in successfully.",
                    token: token
                });
            }
            else
            {
                return res.json({
                    status: "error",
                    header: "Error",
                    message: "The password you entered is incorrect."
                });
            }
        }
        else
        {
            return res.json({
                status: "error",
                header: "Error",
                message: "The username you entered does not exist."
            });
        }
    })
    .catch(err => {
        res.json({ error: err });
    });
});

// @route   PATCH /users/:id
// @desc    Modifies a user
router.patch('/:id', (req, res) => {
    var UID = req.params.id;

    var conditions = {
        _id: UID
    }

    var update = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email
    }

    const { error } = UpdateValidation(update);
    if (error) return res.status(400).json({
        status: 'error',
        header: error.details[0].path[0],
        message: error.details[0].message,
    });

    User.findOne({ username: req.body.username }).then(usernameMatch => {
        if (usernameMatch && usernameMatch._id != UID) {
            return res.json({
                status: "error",
                header: "Error",
                message: "This username is already registered."
            });
        }
    });

    User.findOne({ email: req.body.email }).then(emailMatch => {
        if (emailMatch && emailMatch._id != UID) {
            return res.json({
                status: "error",
                header: "Error",
                message: "This email address is already registered."
            });
        }
    });

    User.findOneAndUpdate(
        conditions,
        update,
        { useFindAndModify: false }
    )
        .then(() => {
                res.json({
                    status: "success",
                    header: "Success",
                    message: "The user details you submitted are now stored and up to date.",
                });
            }
        )
        .catch(err => {
            res.json({ err });
        });
})

module.exports = router;