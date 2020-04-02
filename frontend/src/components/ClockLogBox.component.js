import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class ClockLogBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    parseTime(time) {
        if (time < 10)
        {
            time = "0" + time;
        }
        return time;
    }

    updateLog() {
        if (localStorage.getItem('USER_ID')) {
            axios.get("/clocking/list/" + localStorage.getItem('USER_ID'))
                .then(clockings => {
                    this.setState({
                        clockings: clockings.data
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            this.setState({
                redirect: true
            });
        }
    }

    componentDidMount() {
        this.updateLog();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        else if (!this.state.clockings) {
            return (
                <div>
                    Loading...
                </div>
            )
        }
        else {
            var clockings = this.state.clockings;
            return (
                <div>
                    <h4 className="mb-5">Previous Clockings</h4>
                    <div className="centerMobile">
                        {
                            clockings.map((item, i) => {
                                var datetime = new Date(item.datetime);
                                var hours = this.parseTime(datetime.getHours());
                                var minutes = this.parseTime(datetime.getMinutes());
                                var seconds = this.parseTime(datetime.getSeconds());
                                return (
                                    <div key={i} className="card mb-2 d50m100">
                                        <div className="card-body text-center">
                                            <h4>Clocked {item.status} at {hours}:{minutes}:{seconds}</h4>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
    }
}

export default ClockLogBox;