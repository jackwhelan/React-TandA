const express = require('express');
const router = express.Router();

process.env.SECRET_KEY = 'secret';

// User Model
const News = require('../models/News.model');

// @route   GET /news
// @desc    Get All News
router.get('/', (req, res) => {
    News.find()
        .sort({ datetime: -1 })
        .then(news => res.json(news))
        .catch(err => res.json(err));
});

// @route   DELETE /news/:id
// @desc    Delete a News item
router.delete('/:id', (req, res) => {
    News.findById(req.params.id)
        .then(item => {
            item.remove().then(() => {
                res.json({ status: "Success" })
            })
        })
        .catch(err => {
            res.status(404).json({
                status: "Failure"
            })
        });
});

// @route   POST /news/add
// @desc    Add a news item
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
                    status: "success",
                    header: "Success",
                    message: "News item added",
                    newsItem: post
                })
            }
            else
            {
                res.json({
                    status: "error",
                    header: "Error",
                    message: "News item could not be added",
                })
            }
        })
        .catch(err => console.error(err));
});

module.exports = router;