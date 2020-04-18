const express = require('express');
const router = express.Router();

// Clocking model and User Model
const Dashboard = require('../models/Dashboard.model');
const { User } = require('../models/User.model');

// @route   GET /dashboard/:id
// @desc    Get the dashboard for a given user ID
router.get('/:id', (req, res) => {
    User.findOne({
        _id: req.params.id
    })
    .then(user => {
        if(user.clearance) {
            Dashboard.findOne({
                clearance: user.clearance
            })
                .then(dashboard => res.json(dashboard));
        }
        else
        {
            res.json({
                error: "Invalid UID"
            })
        }
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