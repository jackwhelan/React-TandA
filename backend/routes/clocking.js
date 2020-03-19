const express = require('express');
const router = express.Router();

// Clocking model
const { Clocking, ClockingValidation } = require('../models/Clocking');

// @route   GET /clocking
// @desc    Get All Clockings
// @access  Public
router.get('/', (req, res) => {
    Clocking.find()
        .sort({ date: -1 })
        .then(clocking => res.json(clocking));
});

module.exports = router;