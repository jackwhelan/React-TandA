import React, { Component } from 'react';
import Navbar from '../components/AppNavbar.component';

class LoginView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    Login
                </div>
            </div>
        )
    }
}

export default LoginView;