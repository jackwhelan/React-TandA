import React, { Component } from 'react';
import axios from 'axios';
import FormInput from '../forms/FormInput.component';
import { Redirect } from 'react-router-dom';

class PayslipAdmin extends Component {
    state = {
        username: '',
        payslip: {
            UID: '',
            grossPay: '',
            statutoryDeductions: [],
            contractualDeductions: [],
            netPay: '',
            paymentMethod: '',
            payDate: undefined
        }
    }

    handleUIDChange = (event) => {
        let username = event.target.value;
        this.setState({
            username: username
        })

        axios.get('/users/uid/' + username)
        .then(res => {
            this.setState(previousState => {
                let payslip = { ...previousState.payslip }
                payslip.UID = res.data;
                return { payslip };
            });
        })
        .catch(err => {throw err})
    }

    handleGrossPayChange = (event) => {
        let newGrossPay = event.target.value;

        this.setState(previousState => {
            let payslip = { ...previousState.payslip }
            payslip.grossPay = newGrossPay;
            return { payslip };
        });
    }

    handleStatutoryDeductionsChange = (event) => {
        let newStatutoryDeductions = event.target.value;

        this.setState(previousState => {
            let payslip = { ...previousState.payslip }
            payslip.statutoryDeductions = newStatutoryDeductions;
            return { payslip };
        });
    }

    handleContractualDeductionsChange = (event) => {
        let newContractualDeductions = event.target.value;

        this.setState(previousState => {
            let payslip = { ...previousState.payslip }
            payslip.contractualDeductions = newContractualDeductions;
            return { payslip };
        });
    }

    handleNetPayChange = (event) => {
        let newNetPay = event.target.value;

        this.setState(previousState => {
            let payslip = { ...previousState.payslip }
            payslip.netPay = newNetPay;
            return { payslip };
        });
    }

    handlePaymentMethodChange = (event) => {
        let newPaymentMethod = event.target.value;

        this.setState(previousState => {
            let payslip = { ...previousState.payslip }
            payslip.paymentMethod = newPaymentMethod;
            return { payslip };
        });
    }

    handlePaymentDateChange = (event) => {
        let newPaymentDate = event.target.value;

        this.setState(previousState => {
            let payslip = { ...previousState.payslip }
            payslip.payDate = newPaymentDate;
            return { payslip };
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let StatutoryDeductions = this.state.payslip.statutoryDeductions;
        let ContractualDeductions = this.state.payslip.contractualDeductions;

        const stat_deductions = []
        const cont_deductions = []

        const all_stat_deductions = StatutoryDeductions.split(',');
        const all_cont_deductions = ContractualDeductions.split(',');

        all_stat_deductions.forEach(item => {
            var statpair = item.split('=');
            stat_deductions.push({
                [statpair[0]]: statpair[1]
            })
        })

        all_cont_deductions.forEach(item => {
            var contpair = item.split('=');
            cont_deductions.push({
                [contpair[0]]: contpair[1]
            })
        })

        this.setState(previousState => {
            let payslip = { ...previousState.payslip }
            payslip.contractualDeductions = cont_deductions;
            payslip.statutoryDeductions = stat_deductions;
            return { payslip };
        }, () => {
                axios.post('/payslip/add', this.state.payslip)
                    .then(res => {
                        this.setState({
                            response: res.data
                        })
                    })
                    .then(() => {
                        this.setState({
                            redirect: true
                        })
                    })
                    .catch(err => { throw err })
        });
    }

    render() { 
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: "/",
                state: this.state.response
            }} />
        }

        return (
            <div className="container bg-light p-5 rounded">
                <h2>Create a Payslip</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="mt-4">
                        <FormInput
                            icon="fas fa-user-circle"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleUIDChange}
                            label="Username"
                            required={true}
                        />
                    </div>

                    <div className="mt-4">
                        <FormInput
                            icon="fas fa-money-bill"
                            type="text"
                            value={this.state.payslip.grossPay}
                            onChange={this.handleGrossPayChange}
                            label="Gross Pay"
                            required={true}
                        />
                    </div>

                    <div className="mt-4">
                        <FormInput
                            icon="fas fa-hand-holding-usd"
                            type="text"
                            value={this.state.payslip.statutoryDeductions}
                            onChange={this.handleStatutoryDeductionsChange}
                            label="Statutory Deductions (Comma Delimited): paye=500,usc=100"
                            required={true}
                        />
                    </div>

                    <div className="mt-4">
                        <FormInput
                            icon="fas fa-hand-holding-usd"
                            type="text"
                            value={this.state.payslip.contractualDeductions}
                            onChange={this.handleContractualDeductionsChange}
                            label="Contractual Deductions (Comma Delimited): gym=50,food=25"
                            required={true}
                        />
                    </div>

                    <div className="mt-4">
                        <FormInput
                            icon="fas fa-money-bill-wave"
                            type="text"
                            value={this.state.payslip.netPay}
                            onChange={this.handleNetPayChange}
                            label="Net Pay"
                            required={true}
                        />
                    </div>

                    <div className="mt-4">
                        <FormInput
                            icon="fas fa-money-check-alt"
                            type="text"
                            value={this.state.payslip.paymentMethod}
                            onChange={this.handlePaymentMethodChange}
                            label="Payment Method"
                            required={true}
                        />
                    </div>

                    <div className="mt-4">
                        <FormInput
                            icon="fas fa-calendar-alt"
                            type="date"
                            value={this.state.payslip.paymentDate}
                            onChange={this.handlePaymentDateChange}
                            label="Payment Date"
                            required={true}
                        />
                    </div>

                    <button type="submit" className="btn btn-secondary float-right">Send</button>
                </form>
            </div>
        );
    }
}
 
export default PayslipAdmin;