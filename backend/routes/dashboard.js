const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { User, RegistrationValidation } = require('../models/User');

process.env.SECRET_KEY = 'secret';

router.get('/', (req, res) => {
    var decoded = jwt.verify(
        req.headers.authorization,
        process.env.SECRET_KEY
    );

    User.findOne({
        _id: decoded.id
    })
    .then(user => {
        if(user) {
            res.json(user);
        }
        else
        {
            res.json({ error: 'User not found' });
        }
    })
    .catch(err => {
        res.json({ error: err });
    });
});

module.exports = router;