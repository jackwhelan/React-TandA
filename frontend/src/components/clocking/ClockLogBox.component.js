import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Week from './week.component';

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
            return (
                <div className="container">
                    <Week />
                </div>
            )
        }
    }
}

export default ClockLogBox;