import React, { Component } from 'react';
import axios from 'axios';
import DayJS from 'dayjs';

class Schedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: undefined
        }
    }

    componentDidMount() {
        this.getSchedule();
    }

    getSchedule() {
        try {
            axios.get('/schedule')
                .then(schedule => {
                    this.setState({
                        events: schedule.data
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        if (this.state.events) {
            return (
                this.state.events.map((item, i) => {
                    var begins_datetime = item.begins;
                    var begins_date = DayJS(begins_datetime).format('dddd, MMMM D YYYY')
                    var begins_time = DayJS(begins_datetime).format('HH:mm');
                    var ends_datetime = item.ends;
                    var ends_date = DayJS(ends_datetime).format('dddd, MMMM D YYYY')
                    var ends_time = DayJS(ends_datetime).format('HH:mm');
                    return (
                        <div key={i} className="core-cont bg-lightgrey mt-4">
                            <h2>{item.title}</h2>
                            <hr className="bg-black" />
                            <span className="text-muted h6">Event organized by {item.organizer}.</span>
                            <hr className="bg-black" />
                            <span className="font-weight-bold">Begins: </span>{begins_date} at {begins_time}<br></br>
                            <span className="font-weight-bold">Ends: </span>{ends_date} at {ends_time}
                            <hr className="bg-black" />
                            <p>{item.body}</p>
                        </div>
                    )
                })
            )
        }
        else {
            return (
                <div className="core-cont bg-lightgrey mt-4">
                    <h2>Loading...</h2>
                    <hr className="bg-black" />
                    <p>We are attempting to load events from the database, if this problem persists, please contact a system administrator.</p>
                </div>
            )
        }
    }
}

export default Schedule;