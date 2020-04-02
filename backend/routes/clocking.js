const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Clocking model
const Clocking = require('../models/Clocking');
const {User} = require('../models/User');

// @route   GET /clocking
// @desc    Get All Clockings
router.get('/', (req, res) => {
    Clocking.find()
        .sort({ date: -1 })
        .then(clocking => res.json(clocking));
});

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
        console.log(err);
    })
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
})

// @route   GET /clocking/in
// @desc    Clock in
router.post('/in', (req, res) => {
    newClocking = new Clocking({
        status: "in"
    });

    User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { clocking: newClocking } },
        { useFindAndModify: false }
    )
    .then(user => {
        res.json(user);
    });
});

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
                        console.log(err);
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
                        console.log(err);
                    });
            }
        })
        .then(() => {
            res.send(newStatus)
        })
});

// @route   GET /clocking/out
// @desc    Clock out
router.post('/out', (req, res) => {
    newClocking = new Clocking({
        status: "out"
    });

    User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { clocking: newClocking } },
        { useFindAndModify: false }
    )
        .then(user => {
            res.json(user);
        });
});

module.exports = router;