import React, { Component } from 'react';

import Navbar from '../../components/AppNavbar.component';
import ModifyUserForm from '../../components/forms/ModifyUserForm.component';

class AccountView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container bg-light p-5">
                    <div className="container">
                        <div className="card bg-light pb-4 mt-3">
                            <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
                                <h4 className="card-title mt-3 text-center">My Account</h4>
                                <p className="text-center">Modify your account details below</p>
                                <ModifyUserForm />
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountView;