import React, { Component } from 'react';
import Navbar from '../components/AppNavbar.component';
import QR from '../components/QR.component';

class DashboardView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container bg-light">
                    <QR />
                </div>
            </div>
        )
    }
}

export default DashboardView;