import React, { Component } from 'react';
import PayslipAdmin from '../../components/admin/PayslipAdmin.component';
import Navbar from '../../components/AppNavbar.component';

class PayslipCreatorView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container bg-tertiary pb-5 px-5 pt-4">
                    <PayslipAdmin/>
                </div>
            </div>
        );
    }
}

export default PayslipCreatorView;