import React, { Component } from 'react';

import Navbar from '../../components/AppNavbar.component';
import ModifyUserForm from '../../components/forms/ModifyUserForm.component';

class AccountView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container bg-light p-5">
                    <h4>Account</h4><hr className="bg-black" />
                    <ModifyUserForm />
                </div>
            </div>
        )
    }
}

export default AccountView;