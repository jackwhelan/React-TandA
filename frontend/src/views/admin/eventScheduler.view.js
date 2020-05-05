import React, { Component } from 'react';
import ScheduleAdmin from '../../components/admin/ScheduleAdmin.component';
import Navbar from '../../components/AppNavbar.component';

class EventSchedulerView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container bg-tertiary pb-5 px-5 pt-4">
                    <ScheduleAdmin />
                </div>
            </div>
        );
    }
}

export default EventSchedulerView;