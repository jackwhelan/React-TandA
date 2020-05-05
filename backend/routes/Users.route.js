const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

process.env.SECRET_KEY = 'secret';

// User Model
const { User, RegistrationValidation, UpdateValidation } = require('../models/User.model');
const Clocking = require('../models/Clocking.model');

// @route   GET /users
// @desc    Get All Users
router.get('/', async (req, res) => {
    const showAmt = parseInt(req.query.showAmt);
    const search = req.query.search;

    User.find({ $text: { $search: search } })
        .limit(showAmt)
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.json({
                status: "error",
                header: "Error",
                message: "The users could not be loaded from the database.",
                error: err
            });
        });
});

router.get('/uid/:username', (req, res) => {
    User.findOne({username: req.params.username})
    .then(user => {
        res.send(user._id)
    })
    .catch(() => res.send('User Doesnt Exist'))
})

// @route   DELETE /users/:id
// @desc    Delete a User
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
    .then(item => item.remove().then(() => {
        res.json({ status: "success", header: "Success", message: "User deleted successfully." })
    }))
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
    if(error) {
        return res.json({
            status: 'error',
            type: error.details[0].path[0],
            msg: error.details[0].message
        })
    }
    else
    {
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
            else
            {
                User.findOne({ email: req.body.email }).then(emailMatch => {
                    if (emailMatch) {
                        return res.json({
                            status: 'error',
                            error: 'Email is already registered'
                        });
                    }
                    else
                    {
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser.save()
                                    .then(post => res.json(post))
                                    .catch(err => console.error(err));
                            });
                        });
                    }
                });
            }
        });
    }
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
// router.patch('/:id', (req, res) => {
//     var UID = req.params.id;

//     var conditions = {
//         _id: UID
//     }

//     var update = {
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         username: req.body.username,
//         email: req.body.email
//     }

//     const { error } = UpdateValidation(update);
//     if (error) return res.status(400).json({
//         status: 'error',
//         header: error.details[0].path[0],
//         message: error.details[0].message,
//     });

//     User.findOne({ username: req.body.username }).then(usernameMatch => {
//         if (usernameMatch && usernameMatch._id != UID) {
//             return res.json({
//                 status: "error",
//                 header: "Error",
//                 message: "This username is already registered."
//             });
//         }
//     });

//     User.findOne({ email: req.body.email }).then(emailMatch => {
//         if (emailMatch && emailMatch._id != UID) {
//             return res.json({
//                 status: "error",
//                 header: "Error",
//                 message: "This email address is already registered."
//             });
//         }
//     });

//     User.findOneAndUpdate(
//         conditions,
//         update,
//         { useFindAndModify: false }
//     )
//         .then(() => {
//                 res.json({
//                     status: "success",
//                     header: "Success",
//                     message: "The user details you submitted are now stored and up to date.",
//                 });
//             }
//         )
//         .catch(err => {
//             res.json({ err });
//         });
// })


router.patch('/:id', (req, res) => {
    var UID = req.params.id;

    User.findById(UID)
        .then(user => {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                var update = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    username: req.body.username
                }

                const { error } = UpdateValidation(update);
                if (error) {
                    return res.json({
                        status: 'error',
                        header: error.details[0].path[0],
                        message: error.details[0].message,
                    })
                }
                else
                {
                    User.findOne({ email: req.body.email }).then(emailMatch => {
                        console.log(emailMatch)
                        if (emailMatch && emailMatch._id != UID) {
                            return res.json({
                                status: "error",
                                header: "Error",
                                message: "This email address is already registered."
                            });
                        }
                        else {
                            User.findOne({ username: req.body.username }).then(usernameMatch => {
                                if (usernameMatch && usernameMatch._id != UID) {
                                    return res.json({
                                        status: "error",
                                        header: "Error",
                                        message: "This email address is already registered."
                                    });
                                }
                                else {
                                    User.findOneAndUpdate(
                                        { _id: UID },
                                        update,
                                        { useFindAndModify: false }
                                    )
                                        .then(user => {
                                            const payload = {
                                                id: user._id,
                                                firstname: req.body.firstname,
                                                lastname: req.body.lastname,
                                                username: req.body.username,
                                                email: req.body.email,
                                                created: user.created
                                            }

                                            let token = jwt.sign(payload, process.env.SECRET_KEY);

                                            return res.json({
                                                status: "success",
                                                header: "Success",
                                                message: "The user details you submitted are now stored and up to date.",
                                                token: token
                                            });
                                        })
                                        .catch(err => {
                                            return res.json({
                                                err
                                            });
                                        });
                                }
                            });
                        }
                    });
                }
            }
            else {
                return res.json({
                    status: "error",
                    header: "Error",
                    message: "The password you entered is incorrect."
                });
            }
        })
        .catch(err => console.log(err))
})

// @route   POST /clocking/admin
// @desc    Add administrative clock in/out at a specific time for a specific user
router.post('/admin/add', (req, res) => {
    newClocking = new Clocking({
        status: req.body.status,
        datetime: req.body.datetime
    });

    User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { clocking: newClocking } },
        { useFindAndModify: false }
    )
        .then(user => {
            if (user) {
                res.json({
                    status: "success",
                    header: "Success",
                    message: "Clocking added successfully"
                });
            }
            else {
                res.json({
                    status: "error",
                    header: "Error",
                    message: "This user doesn't exist"
                });
            }
        })
        .catch(err => {
            res.json({ error: err });
        });
});

// @route   POST /clocking/admin/remove
// @desc    Remove administrative clock in/out for a specific user
router.post('/admin/remove', (req, res) => {
    User.findOneAndUpdate(
        { username: req.body.username },
        { $pull: { clocking: { "_id": mongoose.Types.ObjectId(req.body.clockingId) } } },
        { useFindAndModify: false }
    )
        .then(user => {
            if (user) {
                res.json({
                    success: "Clocking removed successfully."
                });
            }
            else {
                res.json({
                    error: "Attempting to remove clock for a non-existant user"
                });
            }
        })
        .catch(err => {
            res.json({ error: err });
        });
});

module.exports = router;