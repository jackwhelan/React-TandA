import React, { Component } from 'react';
var QRCode = require('qrcode.react');

class QR extends Component {
    render() {
        return (
            <div>
                <QRCode value={this.props.id} />
            </div>
        )
    }
}

export default QR;