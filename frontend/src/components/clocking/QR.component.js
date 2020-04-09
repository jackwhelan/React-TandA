import React, { Component } from 'react';
var QRCode = require('qrcode.react');

class QR extends Component {
    render() {
        return (
            <div className="container row">
                <div className="col-sm-6 p-5">
                    <h5>Your QR Code</h5>
                    This QR code serves as a unique identifier for your account. Scan
                    this with the android app on your phone if you want to use your
                    mobile device to clock in or out from now on!
                </div>
                <div className="col-sm-6 text-center border border-dark p-5"><QRCode value={this.props.id} /></div>
            </div>
        )
    }
}

export default QR;