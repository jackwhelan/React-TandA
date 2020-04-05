import React, { Component } from 'react';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-react-schedule';

class Schedule extends Component {
    onPopupOpen(args) {
        args.cancel = true;
    } 

    render() {
        var localData = [{
            Id: 2,
            Subject: 'Clocked in',
            Description: 'Late',
            StartTime: new Date(2020, 4, 4, 20, 25),
            EndTime: new Date(2020, 4, 4, 20, 30),
            isAllDay: true,
            isReadOnly: true
        }]
        return (
            <ScheduleComponent
                currentView='Month'
                selectedDate={new Date(2020, 4, 4)}
                eventSettings={{dataSource: localData}}
            >
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
        )
    }
}

export default Schedule;