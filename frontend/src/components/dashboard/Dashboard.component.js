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
                <div className="doublecol centerMobile">
                    {
                        dbitems.map((item, i) => {
                            var iconClass = item.icon + " fa-5x";

                            return (
                                <a key={i} className="link-unstyled" href={item.href}>
                                    <div className="row">
                                        <div className="border border-dark col-md-4 p-3">
                                            <h5 className="text-center scaleIcon"><i className={iconClass}></i></h5>
                                        </div>
                                        <div className="border border-dark col-md-8 p-3">
                                            <h4>{item.text}</h4>
                                            <p>{item.desc}</p>
                                        </div>
                                    </div>
                                </a>
                            )
                        })
                    }
                </div>
            )
        }
    }
}

export default DashboardItem;