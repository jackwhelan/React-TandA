import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import DashboardItem from './DashboardItem.component';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dashboard: undefined,
            redirect: false
        }
    }

    componentDidMount() {
        if (localStorage.getItem('USER_ID')) {
            axios.get("/dashboard/" + localStorage.getItem('USER_ID'))
            .then(database_dashboard => {
                this.setState({
                    dashboard: database_dashboard.data.dashboardItems
                });
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

    render() {
        if(this.state.redirect) {
            return <Redirect to="/" />
        }
        else if (!this.state.dashboard) {
            return (
                <div>
                    Loading...
                </div>
            )
        }
        else
        {
            var dbitems = this.state.dashboard;
            return (
                <div className="row">
                    {
                        dbitems.map((item, i) => {
                            var iconClass = item.icon + " fa-5x";
                            return (
                                <div key={i} className="col-sm-6 mb-4">
                                    <DashboardItem
                                        href={item.href}
                                        iconClass={iconClass}
                                        text={item.text}
                                        desc={item.desc}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    }
}

export default Dashboard;