import React, { Component } from 'react';
import axios from 'axios';
import DayJS from 'dayjs';
import Day from './day.component';

class Week extends Component {
    state = {
        clockings: []
    }

    getOrdinal(n) {
        return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
    }

    calcTotalForDay = (clockings) => {
        var totalWorked = 0;

            if(clockings.length > 0) {
                for (var i = 0; i < clockings.length; i+=2)
                {
                    const inTime = DayJS(clockings[i].datetime);
                    const outTime = DayJS(clockings[i+1].datetime);
                    const diff = DayJS(inTime.diff(outTime));
                    totalWorked += diff;
                }

                return <div className="text-center">
                    <hr></hr>
                    <h6>Worked: {DayJS(totalWorked).subtract(1, 'hour').format('HH:MM:ss')}</h6>
                </div>
            }
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
        var isBetween = require('dayjs/plugin/isBetween')
        DayJS.extend(isBetween)

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
            if (DayJS(item.datetime).isBetween(DayJS().startOf('isoWeek'), DayJS().startOf('isoWeek').add(4, 'day'))) {
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

            const day = DayJS().format('dddd');
            const showDiv = document.getElementById(day);
            if(showDiv)
            {
                showDiv.style.display = "block";
            }
            

            return (
                <div>
                    <div className="week row">
                        <div id="Monday" className="day col-sm">
                            <h6 className="text-center mt-2 mb-4 font-weight-bold border border-dark p-2">Monday | { this.getOrdinal(DayJS().startOf('isoWeek').format('D')) }</h6>
                            {
                                clockings.monday.reverse().map((item, i) => {
                                    var datetime = item.datetime;
                                    var dtime = DayJS(datetime).format('HH:mm');
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
                            {
                                clockings.monday.length % 2 === 0 ?
                                this.calcTotalForDay(clockings.monday) :
                                <div>Clock out to calculate!</div>
                            }
                        </div>
                        <div id="Tuesday" className="day col-sm">
                            <h6 className="text-center mt-2 mb-4 font-weight-bold border border-dark p-2">Tuesday | {this.getOrdinal(DayJS().startOf('isoWeek').add(1, 'day').format('D'))}</h6>
                            {
                                clockings.tuesday.reverse().map((item, i) => {
                                    var datetime = item.datetime;
                                    var dtime = DayJS(datetime).format('HH:mm');
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
                            {
                                clockings.tuesday.length % 2 === 0 ?
                                    this.calcTotalForDay(clockings.tuesday) :
                                    <div>Clock out to calculate!</div>
                            }
                        </div>
                        <div id="Wednesday" className="day col-sm">
                            <h6 className="text-center mt-2 mb-4 font-weight-bold border border-dark p-2">Wednesday | {this.getOrdinal(DayJS().startOf('isoWeek').add(2, 'day').format('D'))}</h6>
                            {
                                clockings.wednesday.reverse().map((item, i) => {
                                    var datetime = item.datetime;
                                    var dtime = DayJS(datetime).format('HH:mm');
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
                            {
                                clockings.wednesday.length % 2 === 0 ?
                                    this.calcTotalForDay(clockings.wednesday) :
                                    <div>Clock out to calculate!</div>
                            }
                        </div>
                        <div id="Thursday" className="day col-sm">
                            <h6 className="text-center mt-2 mb-4 font-weight-bold border border-dark p-2">Thursday | {this.getOrdinal(DayJS().startOf('isoWeek').add(3, 'day').format('D'))}</h6>
                            {
                                clockings.thursday.reverse().map((item, i) => {
                                    var datetime = item.datetime;
                                    var dtime = DayJS(datetime).format('HH:mm');
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
                            {
                                clockings.thursday.length % 2 === 0 ?
                                    this.calcTotalForDay(clockings.thursday) :
                                    <div>Clock out to calculate!</div>
                            }
                        </div>
                        <div id="Friday" className="day col-sm">
                            <h6 className="text-center mt-2 mb-4 font-weight-bold border border-dark p-2">Friday | {this.getOrdinal(DayJS().startOf('isoWeek').add(4, 'day').format('D'))}</h6>
                            {
                                clockings.friday.reverse().map((item, i) => {
                                    var datetime = item.datetime;
                                    var dtime = DayJS(datetime).format('HH:mm');
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
                            {
                                clockings.friday.length % 2 === 0 ?
                                    this.calcTotalForDay(clockings.friday) :
                                    <div>Clock out to calculate!</div>
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Week;