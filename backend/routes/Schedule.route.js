const express = require('express');
const router = express.Router();

process.env.SECRET_KEY = 'secret';

// User and Schedule Item Model
const Schedule = require('../models/Schedule.model');

// @route   GET /schedule
// @desc    Get All Scheduled Events
router.get('/', (req, res) => {
    Schedule.find()
        .sort({ datetime: -1 })
        .then(schedule=> res.json(schedule))
        .catch(err => res.json(err));
});

// @route   DELETE /schedule/:id
// @desc    Deletes / Cancels an Event by ID
router.delete('/:id', (req, res) => {
    Schedule.findById(req.params.id)
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

// @route   POST /schedule/add
// @desc    Add/Schedule a new event.
router.post('/add', (req, res) => {
    const newItem = new Schedule({
        title: req.body.title,
        organizer: req.body.organizer,
        body: req.body.body,
        begins: req.body.begins,
        ends: req.body.ends
    });

    newItem.save()
        .then(event => {
            if (event) {
                res.json({
                    status: "success",
                    header: "Success",
                    message: "The Event has been Scheduled!",
                    event: event
                })
            }
            else
            {
                res.json({
                    status: "error",
                    header: "Error",
                    message: "The Event could not be Scheduled!",
                })
            }
        })
        .catch(err => console.error(err));
});

module.exports = router;