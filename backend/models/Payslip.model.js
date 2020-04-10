const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PayslipSchema = new Schema({
    UID: {
        type: String,
        required: true
    },
    grossPay: {
        type: Number,
        required: true
    },
    statutoryDeductions: {
        type: Array,
        required: true
    },
    contractualDeductions: {
        type: Array,
        required: true
    },
    netPay: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    payDate: {
        type: Date,
        default: Date.now
    }
});

const Payslip = new mongoose.model('Payslip', PayslipSchema);

module.exports = Payslip;