import React, { Component } from 'react';
import Navbar from '../../components/AppNavbar.component';
import Greeting from '../../components/notifiers/Greeting.component';

class PayPortalView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container bg-light p-5">
                    <h4>Pay Portal</h4><hr className="bg-black" />
                    <Greeting context="Welcome to the Pay Portal.">
                        Here you can access your previous payslips. If you have any queries regarding your payslips you should contact your manager. You may also wish to claim expenses or compensation, to find out if you are eligible for certain expense compensation, fill out the <a className='text-leftBlue' href='#notImplemented'>Expense Compensation Eligibility</a> form.
                    </Greeting>
                </div>
            </div>
        )
    }
}

export default PayPortalView;