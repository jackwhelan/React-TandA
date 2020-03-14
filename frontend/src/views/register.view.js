import React, { Component } from 'react';
import Navbar from '../components/AppNavbar.component';

class RegisterView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    Register
                </div>
            </div>
        )
    }
}

export default RegisterView;