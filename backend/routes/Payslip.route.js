const express = require('express');
const router = express.Router();

process.env.SECRET_KEY = 'secret';

// User Model
const Payslip = require('../models/Payslip.model');

// @route   GET /payslip
// @desc    Get All Payslips
router.get('/', (req, res) => {
    Payslip.find()
        .sort({ datetime: -1 })
        .then(payslips => res.json(payslips))
        .catch(err => res.json(err));
});

// @route   GET /payslip
// @desc    Get Payslips by UID
router.get('/:uid', (req, res) => {
    Payslip.find({ UID: req.params.uid })
        .sort({ datetime: -1 })
        .then(payslips => res.json(payslips))
        .catch(err => res.json(err));
});

// @route   DELETE /payslip/:id
// @desc    Delete a Payslip
router.delete('/:id', (req, res) => {
    Payslip.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ status: "Success" })))
        .catch(err => res.status(404).json({ status: "Failure"}));
});

// @route   POST /payslip/add
// @desc    Add a payslip by UID
router.post('/add', (req, res) => {
    const newItem = new Payslip({
        UID: req.body.UID,
        grossPay: req.body.grossPay,
        statutoryDeductions: req.body.statutoryDeductions,
        contractualDeductions: req.body.contractualDeductions,
        netPay: req.body.netPay,
        paymentMethod: req.body.paymentMethod,
        payDate: req.body.payDate
    });

    newItem.save()
        .then(post => {
            if (post) {
                res.json({
                    status: "success",
                    header: "Success",
                    message: "Payslip added",
                    payslip: post
                })
            }
            else {
                res.json({
                    status: "error",
                    header: "Success",
                    message: "Payslip could not be added",
                })
            }
        })
        .catch(err => console.error(err));
});

module.exports = router;