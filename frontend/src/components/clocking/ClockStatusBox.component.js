import React, { Component } from 'react';
import Axios from 'axios';
import LiveClock from 'react-live-clock';

class ClockStatusBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clockStatus: "loading..."
        }
    }

    async statusUpdate() {
        try
        {
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
                .catch(err => console.log(err))
        }
        catch(err)
        {
            console.log(err)
        }
    }

    componentDidMount() {
        this.statusUpdate();
    }

    postClockIn = () => {
        if (this.state.clockStatus.includes("out"))
        {
            Axios.post('/clocking/in/' + localStorage.getItem('USER_ID'), {
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
            Axios.post('/clocking/out/' + localStorage.getItem('USER_ID'), {
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
            <div className="d50m100">
                <div className="card bg-navBlue">
                    <div className="card-body">
                        <h1
                            style={{ color: this.state.textColour, letterSpacing: '1px' }}
                            className="card-title text-center mb-2 outline scaleH1">
                                {this.state.clockStatus}
                        </h1>
                        <div className="text-center">
                            <span className="text-muted scaleH1">
                                <LiveClock format="HH:mm:ss" ticking={true}/>
                            </span>
                        </div>
                    </div>
                    <div className="text-center mb-4">
                        <a id="clockInButton" className="btn btn-primary btn-sm mr-2" onClick={this.postClockIn} href="#ClockIn">Clock In</a>
                        <a id="clockOutButton" className="btn btn-primary btn-sm" onClick={this.postClockOut} href="#ClockOut">Clock Out</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClockStatusBox;