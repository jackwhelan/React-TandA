import React, { Component } from 'react';
import Navbar from '../components/AppNavbar.component';
import Week from '../components/clocking/week.component';

class HomeView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container bg-tertiary p-5">
                   <Week />
                </div>
            </div>
        )
    }
}

export default HomeView;