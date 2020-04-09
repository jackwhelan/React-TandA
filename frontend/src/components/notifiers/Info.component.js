import React, { Component } from 'react';

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {}
        }
    }

    componentDidMount() {
        var bgColor;

        if (this.props.status.includes("error")) {
            bgColor = '#d9534f';
        }
        else if (this.props.status.includes("success")) {
            bgColor = '#5cb85c';
        }
        else {
            bgColor = '#d9534f';
        }

        this.setState({
            style: {
                backgroundColor: bgColor
            }
        });
    }

    render() {
        return (
            <div className="infoComponent" style={this.state.style}>
                <h5>{this.props.header}</h5>
                <p>{this.props.message}</p>
            </div>
        )
    }
}

export default Info;