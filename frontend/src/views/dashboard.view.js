import React, { Component } from 'react';
import Navbar from '../components/AppNavbar.component';

class DashboardView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container bg-light">
                    DASHBOARD
                </div>
            </div>
        )
    }
}

export default DashboardView;