import React, { Component } from 'react';
import Navbar from '../components/AppNavbar.component';
import Form from '../components/RegistrationForm.component';

class RegisterView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div>
                    <div id="mobile_hidden" className="divLeft"></div>
                    <div className="divRight">
                        <div className="divRightHeader">
                            <h3>Register</h3>
                        </div>
                        <div className="divRightBody">
                            <Form/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterView;