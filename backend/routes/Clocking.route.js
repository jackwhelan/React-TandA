const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Clocking model
const Clocking = require('../models/Clocking.model');
const {User} = require('../models/User.model');

// @route   GET /clocking/status/:id
// @desc    Get whether a user is clocked in or out by ID
router.get('/status/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        lastClock = user.clocking.sort((a, b) => {
            return b.datetime - a.datetime;
        })[0];
        res.json(lastClock.status)
    })
        .catch(err => {
            res.json({ error: err });
        });
})

// @route   GET /clocking/list/:id
// @desc    Gets a list of clocking data by user ID
router.get('/list/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            lastClock = user.clocking.sort((a, b) => {
                return b.datetime - a.datetime;
            });
            res.json(lastClock)
        })
        .catch(err => {
            res.json({ error: err });
        });
})

// @route   GET /clocking/in
// @desc    Clock in
router.post('/in/:id', (req, res) => {
    newClocking = new Clocking({
        status: "in"
    });

    User.findById(req.params.id)
        .then(user => {
            lastClock = user.clocking.sort((a, b) => {
                return b.datetime - a.datetime;
            })[0];
        })
        .then(() => {
            if(lastClock.status.includes('out'))
            {
                User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { clocking: newClocking } },
                    { useFindAndModify: false }
                )
                    .then(user => {
                        if (user) {
                            res.json({
                                success: "Clock in successful"
                            });
                        }
                        else {
                            res.json({
                                error: "Attempting to clock in as non-existant user"
                            });
                        }
                    })
                    .catch(err => {
                        res.json({ error: err });
                    });
            }
            else
            {
                res.json({
                    error: "Already clocked in"
                })
            }
        })
        .catch(err => {
            res.json({ error: err });
        });
});

// @route   GET /clocking/mobile/:id
// @desc    Clock in/out for mobile
router.get('/mobile/:id', (req, res) => {
    var newStatus;
    User.findById(req.params.id)
        .then(user => {
            lastClock = user.clocking.sort((a, b) => {
                return b.datetime - a.datetime;
            });
        })
        .then(() => {
            if(lastClock[0].status.includes("out"))
            {
                newClocking = new Clocking({
                    status: "in"
                });

                User.findOneAndUpdate(
                    { _id: req.params.id },
                    { $push: { clocking: newClocking } },
                    { useFindAndModify: false }
                )
                    .then(() => {
                        newStatus = "in";
                    })
                    .catch(err => {
                        res.json({ error: err });
                    });
            }
            else
            {
                newClocking = new Clocking({
                    status: "out"
                });

                User.findOneAndUpdate(
                    { _id: req.params.id },
                    { $push: { clocking: newClocking } },
                    { useFindAndModify: false }
                )
                    .then(() => {
                        newStatus = "out";
                    })
                    .catch(err => {
                        res.json({ error: err });
                    });
            }
        })
        .then(() => {
            res.send(newStatus)
        })
        .catch(err => {
            res.json({ error: err });
        });
});

// @route   GET /clocking/out/:id
// @desc    Clock out
router.post('/out/:id', (req, res) => {
    newClocking = new Clocking({
        status: "out"
    });

    User.findById(req.params.id)
        .then(user => {
            lastClock = user.clocking.sort((a, b) => {
                return b.datetime - a.datetime;
            })[0];
        })
        .then(() => {
            if (lastClock.status.includes('in')) {
                User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { clocking: newClocking } },
                    { useFindAndModify: false }
                )
                    .then(user => {
                        if (user) {
                            res.json({
                                success: "Clock out successful"
                            });
                        }
                        else {
                            res.json({
                                error: "Attempting to clock out as non-existant user"
                            });
                        }
                    })
                    .catch(err => {
                        res.json({ error: err });
                    });
            }
            else {
                res.json({
                    error: "Already clocked out"
                })
            }
        })
        .catch(err => {
            res.json({ error: err });
        });
});

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
                    success: "Clocking added successfully."
                });
            }
            else {
                res.json({
                    error: "Attempting to add clock for a non-existant user"
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