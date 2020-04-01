import React, { Component } from 'react';
import Navbar from '../components/AppNavbar.component';
import ClockStatusBox from '../components/ClockStatusBox.component';
import ClockLogBox from '../components/ClockLogBox.component';

class ClockingView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container bg-light p-5">
                    <h4>Hello {localStorage.getItem('USER_FIRSTNAME')}</h4><hr className="bg-black mb-5" />
                    <ClockStatusBox/>
                    <hr className="bg-black mt-5 mb-5"></hr>
                    <ClockLogBox/>
                </div>
            </div>
        )
    }
}

export default ClockingView;