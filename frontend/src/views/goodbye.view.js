import React, { Component } from 'react';
import Navbar from '../components/AppNavbar.component';

class DashboardView extends Component {
    checkLogged = () => {
        if (localStorage.getItem('USER_ID')) {
            return (<h4>Click the logout button on the top right to sign out.</h4>)
        }
        else
        {
            return (<h4>You are now signed out.</h4>)
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container bg-light p-5">
                    {
                        this.checkLogged()
                    }
                </div>
            </div>
        )
    }
}

export default DashboardView;