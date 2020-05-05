import React, { Component } from 'react';
import axios from 'axios';
import DayJS from 'dayjs';

class ClockingSearch extends Component {
    state = {
        results: [],
        showAmt: 5
    }

    componentDidMount() {
        this.fetchClockings();
    }

    fetchClockings = () => {
        var username = this.props.username;
        var showAmt = this.state.showAmt;

        axios.get("/clocking?showAmt=" + showAmt + "&username=" + username)
            .then(res => {
                this.setState({
                    results: res.data.data
                })
            })
            .catch(err => { throw err })
    }

    showMore = () => {
        this.setState({
            showAmt: this.state.showAmt + 5
        }, () => {
            this.fetchClockings();
        });
    }

    myClockingDel = (event) => {
        const clockingID = event.target.value;
        const username = this.props.username;

        const body = {
            username: username,
            clockingId: clockingID
        }

        axios.post('/clockings/admin/remove', body)
            .then(res => {
                this.setState({
                    res: res.data
                })
            })
            .catch(err => console.log(err))
        
        this.fetchClockings();
    }

    render() {
        return (
            <div className="card bg-light p-5 mt-3">
                {console.log(this.state.results)}
                <div className="core-cont border-secondary rounded">
                    <ul className="list-group">
                        {this.state.results && this.state.results > 0 ? this.state.results.map((item, i) => {
                            return (
                                <li key={i} className="list-group-item mb-3">
                                    <span className="h4 text-muted">Clocked {item.status}</span>
                                    <p>On <span className="text-muted">{DayJS(item.datetime).format('DD-MM-YYYY') + " at " + DayJS(item.datetime).format('HH:mm:ss')}</span></p>
                                    <button value={item._id} className="float-right btn btn-md btn-danger" onClick={this.myClockingDel}>Delete Clocking</button>
                                </li>
                            )
                        }) : <h4>Loading Clockings</h4>}
                    </ul>
                    {this.state.results && this.state.results.length > 5 && <button className="btn btn-secondary btn-lg float-right" onClick={this.showMore}>Show More</button>}
                </div>
            </div>
        )
    }
}

export default ClockingSearch;
