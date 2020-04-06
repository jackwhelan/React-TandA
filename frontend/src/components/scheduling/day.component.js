import React, { Component } from 'react';

class Day extends Component {
    state = {
        textColour: '#ffffff'
    }
    componentDidMount() {
        if(this.props.status.includes('out'))
        {
            this.setState({
                textColour: '#d9534f'
            })
        }
        else
        {
            this.setState({
                textColour: '#5cb85c'
            })
        }
    }

    render() {
        var clockFont = {
            color: this.state.textColour,
            fontWeight: 'bolder'
        }

        var hrNoPad = {
            backgroundColor: 'black',
            margin: 0
        }
        
        return (
            <div className="text-center border rounded border-dark mb-3 p-3">
                Clocked <span style={clockFont}>{this.props.status}</span><br></br><hr style={hrNoPad}></hr>
                Time: {this.props.time}
            </div>
        )
    }
}

export default Day;