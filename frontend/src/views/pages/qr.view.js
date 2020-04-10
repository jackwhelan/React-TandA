import React, { Component } from 'react';

import Navbar from '../../components/AppNavbar.component';
import QR from '../../components/clocking/QR.component';

class QRView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container bg-light p-5">
                    <h4>Mobile Clocking</h4><hr className="bg-black" />
                    <QR id={localStorage.getItem("USER_ID")} />
                </div>
            </div>
        )
    }
}

export default QRView;