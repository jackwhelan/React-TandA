import React, { Component } from 'react';
import Axios from 'axios';

class ClockStatusBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clockStatus: "loading..."
        }
    }

    statusUpdate() {
        Axios.get('/clocking/status/' + localStorage.getItem('USER_ID'))
            .then(res => {
                this.setState({
                    clockStatus: 'Clocked ' + res.data
                })
            })
            .then(() => {
                const clockInButton = document.getElementById("clockInButton");
                const clockOutButton = document.getElementById("clockOutButton");

                if (this.state.clockStatus.includes("out")) {
                    this.setState({
                        textColour: '#d9534f'
                    })

                    clockInButton.classList.remove("disabled");
                    clockOutButton.classList.add("disabled");
                } else {
                    this.setState({
                        textColour: '#5cb85c'
                    })

                    clockInButton.classList.add("disabled");
                    clockOutButton.classList.remove("disabled");
                }
            })
    }

    componentDidMount() {
        this.statusUpdate();
    }

    postClockIn = () => {
        if (this.state.clockStatus.includes("out"))
        {
            Axios.post('/clocking/in', {
                username: localStorage.getItem('USER_USERNAME')
            })
                .then(() => {
                    this.setState({
                        'clockStatus': 'Clocked in'
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }

        const clockInButton = document.getElementById("clockInButton");
        const clockOutButton = document.getElementById("clockOutButton");
        clockInButton.classList.add("disabled");
        clockOutButton.classList.remove("disabled");

        this.statusUpdate();
    }

    postClockOut = () => {
        if (this.state.clockStatus.includes("in"))
        {
            Axios.post('/clocking/out', {
                username: localStorage.getItem('USER_USERNAME')
            })
                .then(() => {
                    this.setState({
                        'clockStatus': 'Clocked out'
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }

        const clockInButton = document.getElementById("clockInButton");
        const clockOutButton = document.getElementById("clockOutButton");
        clockInButton.classList.remove("disabled");
        clockOutButton.classList.add("disabled");

        this.statusUpdate();
    }

    render() {
        return (
            <div className="card bg-dark">
                <div className="card-body">
                    <h1
                        style={{ color: this.state.textColour, letterSpacing: '1px' }}
                        className="card-title text-center mb-2 outline scaleH1">
                            {this.state.clockStatus}
                    </h1>
                </div>
                <div className="text-center mb-4">
                    <a id="clockInButton" className="btn btn-primary btn-sm mr-2" onClick={this.postClockIn} href="#ClockIn">Clock In</a>
                    <a id="clockOutButton" className="btn btn-primary btn-sm" onClick={this.postClockOut} href="#ClockOut">Clock Out</a>
                </div>
            </div>
        )
    }
}

export default ClockStatusBox;