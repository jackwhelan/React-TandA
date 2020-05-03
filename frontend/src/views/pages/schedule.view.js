import React, { Component } from 'react';
import Navbar from '../../components/AppNavbar.component';
import Schedule from '../../components/Schedule.component';

class HomeView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container bg-tertiary p-5">
                   <Schedule/>
                </div>
            </div>
        )
    }
}

export default HomeView;