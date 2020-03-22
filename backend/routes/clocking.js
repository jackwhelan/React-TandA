const express = require('express');
const router = express.Router();
const checkAuth = require('./middleware/check-auth');

// Clocking model
const { Clocking, ClockingValidation } = require('../models/Clocking');

// @route   GET /clocking
// @desc    Get All Clockings
// @access  Public
router.get('/', checkAuth, (req, res) => {
    Clocking.find()
        .sort({ date: -1 })
        .then(clocking => res.json(clocking));
});

router.post('/in', (req, res) => {
    
});

module.exports = router;