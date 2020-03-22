const express = require('express');
const router = express.Router();
const checkAuth = require('./middleware/check-auth');

// Clocking model and User Model
const { Clocking, ClockingValidation } = require('../models/Clocking');
const { User } = require('../models/User');

// @route   GET /user
// @desc    Get All Clockings
// @access  Public
router.get('/:id', (req, res) => {
    User.findOne({
        _id: req.params.id
    })
    .then(user => {
        res.json(user.clearance);
    });
});

router.post('/:username', (req, res) => {
    User.findOne({
        username: 'jackw97'
    })
    .then(user => {
        res.json(req.params);
    });
});

module.exports = router;