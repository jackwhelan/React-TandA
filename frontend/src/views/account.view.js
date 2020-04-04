import React, { Component } from 'react';

import Navbar from '../components/AppNavbar.component';
import QR from '../components/QR.component';
import Greeting from '../components/Greeting.component';

class AccountView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container bg-light p-5">
                    <h4>Account</h4><hr className="bg-black" />
                    <Greeting context="Welcome to the account portal." />
                    <QR id={localStorage.getItem("USER_ID")}/>
                </div>
            </div>
        )
    }
}

export default AccountView;