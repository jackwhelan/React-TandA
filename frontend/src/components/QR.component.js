import React, { Component } from 'react';
var QRCode = require('qrcode.react');

class QR extends Component {
    render() {
        return (
            <div>
                <QRCode value={"JWT"} />
            </div>
        )
    }
}

export default QR;