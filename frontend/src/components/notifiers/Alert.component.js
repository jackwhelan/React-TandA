import React, { Component } from 'react';

class Alert extends Component {
    render() {
        return (
            <div className='mt-2 text-danger'>
                {this.props.error}
            </div>
        )
    }
}

export default Alert;