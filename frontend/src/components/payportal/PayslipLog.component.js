import React, { Component } from 'react';
import axios from 'axios';
import DayJS from 'dayjs';

class PaySlipLog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            payslipLog: undefined
        }
    }

    componentDidMount() {
        this.getPayslips();
    }

    async getPayslips() {
        try
        {
            axios.get('http://80.111.46.244:5000/payslip/' + localStorage.getItem('USER_ID'))
                .then(payslips => {
                    this.setState({
                        payslipLog: payslips.data
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        }
        catch(err)
        {
            console.log(err)
        }
    }

    render() {
        var isoWeek = require('dayjs/plugin/isoWeek');
        DayJS.extend(isoWeek);
        if (this.state.payslipLog) {
            return (
                this.state.payslipLog.map((item, i) => {
                    var datetime = item.payDate;
                    var date = DayJS(datetime).format('D MMM YYYY')
                    return (
                        <div key={i} className="rounded bg-leftBlue mt-4 p-4">
                            <h2 className="text-light2-custom mb-4">Payslip <span className="text-light-custom">for pay period {DayJS(date).isoWeek()}</span></h2>
                            <div className="text-light2-custom border rounded p-2 mb-3">
                                <span className="font-weight-bold">PAY DATE:</span>
                                <ul className="list-group p-4">
                                    <li className="list-group-item bg-lightgrey text-dark">{date}</li>
                                </ul>
                            </div>
                            <div className="text-light2-custom border rounded p-2 mb-3">
                                <span className="font-weight-bold">GROSS PAY:</span>
                                <ul className="list-group p-4">
                                    <li className="list-group-item bg-lightgrey text-dark">€{item.grossPay}</li>
                                </ul>
                            </div>
                            <div className="text-light2-custom border rounded p-2 mb-3">
                                <span className="font-weight-bold">STATUTORY DEDUCTIONS:</span>
                                <ul className="list-group p-4">
                                    {item.statutoryDeductions.map((statDed) => {
                                        return Object.entries(statDed).map((subs, k) => {
                                            return <li className="list-group-item bg-lightgrey text-dark" key={k}><span className="font-weight-bold">{subs[0]}:</span> €{subs[1]}</li>
                                        })
                                    })}
                                </ul>
                            </div>
                            <div className="text-light2-custom border rounded p-2 mb-3">
                                <span className="font-weight-bold">CONTRACTUAL DEDUCTIONS:</span>
                                <ul className="list-group p-4">
                                    {item.contractualDeductions.map((contDed) => {
                                        return Object.entries(contDed).map((subs, m) => {
                                            return <li className="list-group-item bg-lightgrey text-dark" key={m}><span className="font-weight-bold">{subs[0]}:</span> €{subs[1]}</li>
                                        })
                                    })}
                                </ul>
                            </div>
                            <div className="text-light2-custom border rounded p-2 mb-3">
                                <span className="font-weight-bold">NET PAY:</span>
                                <ul className="list-group p-4">
                                    <li className="list-group-item bg-lightgrey text-dark">€{item.netPay}</li>
                                </ul>
                            </div>
                            <div className="text-light2-custom border rounded p-2 mb-3">
                                <span className="font-weight-bold">PAYMENT METHOD:</span>
                                <ul className="list-group p-4">
                                    <li className="list-group-item bg-lightgrey text-dark">{item.paymentMethod}</li>
                                </ul>
                            </div>
                        </div>
                    )
                })
            )
        }
        else {
            return (
                <div className="core-cont bg-lightgrey mt-4">
                    <h2>Loading...</h2>
                    <hr className="bg-black" />
                    <p>We are attempting to load news items from the database, if this problem persists, please contact a system administrator.</p>
                </div>
            )
        }
    }
}

export default PaySlipLog;