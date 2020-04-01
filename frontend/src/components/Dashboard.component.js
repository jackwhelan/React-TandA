import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class DashboardItem extends Component {
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
                .then(userClearance => {
                    axios.get("/dashboard/clearance/" + userClearance.data)
                        .then(database_dashboard => {
                            this.setState({
                                dashboard: database_dashboard.data.dashboardItems
                            });
                        })
                        .catch(err => console.log(err));
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
                <div className="centerMobile">
                    {
                        dbitems.map((item, i) => {
                            var iconClass = item.icon + " fa-5x";

                            return (
                                <div key={i} className="card cardStyle">
                                    <div className="card-body">
                                        <h5 className="card-title text-center scaleIcon"><i className={iconClass}></i></h5>
                                        <h4 className="card-subtitle mb-2 text-muted scaleH4">{item.text}</h4>
                                        <p className="card-text">{item.desc}</p>
                                        <a className="btn btn-primary btn-sm" href={item.href}>{item.text}</a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    }
}

export default DashboardItem;