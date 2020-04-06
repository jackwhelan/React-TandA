import React, { Component } from 'react';
import axios from 'axios';
import DayJS from 'dayjs';
import Day from './day.component';

class Week extends Component {
    state = {
        clockings: []
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

    organizeClockings() {
        var clockings = {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
        }

        this.state.clockings.forEach(item => {
            switch (DayJS(item.datetime).format('dddd')) {
                case 'Monday':
                    clockings.monday.push(item);
                    break
                case 'Tuesday':
                    clockings.tuesday.push(item);
                    break
                case 'Wednesday':
                    clockings.wednesday.push(item);
                    break
                case 'Thursday':
                    clockings.thursday.push(item);
                    break
                case 'Friday':
                    clockings.friday.push(item);
                    break
                case 'Saturday':
                    clockings.saturday.push(item);
                    break
                case 'Sunday':
                    clockings.sunday.push(item);
                    break
                default:
                    console.log('Default Case In Week Component');
                    break;
            }
        })

        return clockings;
    }

    componentDidMount() {
        this.updateLog();
        this.organizeClockings();
    }

    render() {
        if(!this.state.clockings) {
            return (
                <div>Loading</div>
            )
        }
        else {
            var isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
            var isoWeek = require('dayjs/plugin/isoWeek')
            DayJS.extend(isoWeek)
            DayJS.extend(isSameOrAfter)
            
            var clockings = this.organizeClockings();

            return (
                <div>
                    <div className="week row">
                        <div className="day col-sm">
                            <h6 className="text-center mt-2 mb-4 font-weight-bold border border-dark p-2">Monday | { DayJS().startOf('isoWeek').format('D') }th</h6>
                            {
                                clockings.monday.map((item, i) => {
                                    var datetime = new Date(item.datetime);
                                    var dtime = DayJS(datetime).format('HH:MM');
                                    var isoweek = DayJS().isoWeek();
                                    if (DayJS(datetime).isAfter(isoweek))
                                    {
                                        return (
                                            <Day key={i} status={item.status} time={dtime} />
                                        )
                                    }
                                    else {
                                        return (
                                            <div key={i}></div>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className="day col-sm">
                            <h6 className="text-center mt-2 mb-4 font-weight-bold border border-dark p-2">Tuesday | {DayJS().startOf('isoWeek').add(1, 'day').format('D')}th</h6>
                            {
                                clockings.tuesday.map((item, i) => {
                                    var datetime = new Date(item.datetime);
                                    var dtime = DayJS(datetime).format('HH:MM');
                                    if (DayJS(datetime).isAfter(DayJS().startOf('isoWeek'))) {
                                        return (
                                            <Day key={i} status={item.status} time={dtime} />
                                        )
                                    }
                                    else {
                                        return (
                                            <div key={i}></div>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className="day col-sm">
                            <h6 className="text-center mt-2 mb-4 font-weight-bold border border-dark p-2">Wednesday | {DayJS().startOf('isoWeek').add(2, 'day').format('D')}th</h6>
                            {
                                clockings.wednesday.map((item, i) => {
                                    var datetime = new Date(item.datetime);
                                    var dtime = DayJS(datetime).format('HH:MM');
                                    if (DayJS(datetime).isAfter(DayJS().startOf('isoWeek'))) {
                                        return (
                                            <Day key={i} status={item.status} time={dtime} />
                                        )
                                    }
                                    else {
                                        return (
                                            <div key={i}></div>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className="day col-sm">
                            <h6 className="text-center mt-2 mb-4 font-weight-bold border border-dark p-2">Thursday | {DayJS().startOf('isoWeek').add(3, 'day').format('D')}th</h6>
                            {
                                clockings.thursday.map((item, i) => {
                                    var datetime = new Date(item.datetime);
                                    var dtime = DayJS(datetime).format('HH:MM');
                                    if (DayJS(datetime).isAfter(DayJS().startOf('isoWeek'))) {
                                        return (
                                            <Day key={i} status={item.status} time={dtime} />
                                        )
                                    }
                                    else {
                                        return (
                                            <div key={i}></div>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className="day col-sm">
                            <h6 className="text-center mt-2 mb-4 font-weight-bold border border-dark p-2">Friday | {DayJS().startOf('isoWeek').add(4, 'day').format('D')}th</h6>
                            {
                                clockings.friday.map((item, i) => {
                                    var datetime = new Date(item.datetime);
                                    var dtime = DayJS(datetime).format('HH:MM');
                                    if (DayJS(datetime).isAfter(DayJS().startOf('isoWeek'))) {
                                        return (
                                            <Day key={i} status={item.status} time={dtime} />
                                        )
                                    }
                                    else {
                                        return (
                                            <div key={i}></div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Week;