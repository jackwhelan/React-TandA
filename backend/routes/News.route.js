const express = require('express');
const router = express.Router();

process.env.SECRET_KEY = 'secret';

// User Model
const News = require('../models/News.model');

// @route   GET /news
// @desc    Get All News
// @access  Public
router.get('/', (req, res) => {
    News.find()
        .sort({ date: -1 })
        .then(news => res.json(news));
});

// @route   DELETE /news/:id
// @desc    Delete a News item
// @access  Public
router.delete('/:id', (req, res) => {
    News.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ status: "Success" })))
        .catch(err => res.status(404).json({ status: "Failure" }));
});

// @route   POST /news/add
// @desc    Add a news item
// @access  Public
router.post('/add', (req, res) => {
    const newItem = new News({
        title: req.body.title,
        author: req.body.author,
        body: req.body.body
    });

    newItem.save()
        .then(post => {
            if (post) {
                res.json({
                    status: "Success",
                    message: "News item added",
                    newsItem: post
                })
            }
            else
            {
                res.json({
                    status: "Error",
                    message: "News item could not be added",
                })
            }
        })
        .catch(err => console.error(err));
});

module.exports = router;