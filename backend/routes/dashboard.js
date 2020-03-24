const express = require('express');
const router = express.Router();
const checkAuth = require('./middleware/check-auth');

// Clocking model and User Model
const Dashboard = require('../models/Dashboard');
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
    })
    .catch(err => {
        console.log(err);
    });
});

router.get('/clearance/:clearance', (req, res) => {
    Dashboard.findOne({
        clearance: req.params.clearance
    })
    .then(dashboard => res.json(dashboard));
});

module.exports = router;