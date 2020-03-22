import React, { Component } from 'react';
import Navbar from '../components/AppNavbar.component';
import Dashboard from '../components/Dashboard.component';

class DashboardView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container bg-light p-5">
                    <h4>Hello {localStorage.getItem('USER_FIRSTNAME')}</h4><hr className="bg-black mb-5"/>
                    <Dashboard />
                </div>
                
            </div>
        )
    }
}

export default DashboardView;