import React, { Component } from 'react';
import axios from 'axios';

class DashboardItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dashboard: undefined
        }

        axios.get("/dashboard/" + localStorage.getItem('USER_ID'))
            .then(userClearance => {
                axios.get("/dashboard/clearance/" + userClearance.data)
                    .then(database_dashboard => {
                        this.setState({
                            dashboard: database_dashboard.data.dashboardItems
                        });
                    });
            })
    }

    render() {
        if(!this.state.dashboard) {
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
                <div>
                    {
                        dbitems.map((item, i) => {
                            var iconClass = item.icon + " fa-7x";
                            const divStyle = {
                                width: '18rem'
                            };
                            return (
                                <div key={i} className="card" style={divStyle}>
                                    <div className="card-body">
                                        <h5 className="card-title text-center"><i className={iconClass}></i></h5>
                                        <h4 className="card-subtitle mb-2 text-muted">{item.text}</h4>
                                        <p className="card-text">{item.desc}</p>
                                        <a href={item.href}>{item.text}</a>
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