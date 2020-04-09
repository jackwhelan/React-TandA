import React, { Component } from 'react';
import Navbar from '../../components/AppNavbar.component';
import { Redirect } from 'react-router-dom';

class DashboardView extends Component {
    checkLogged = () => {
        if (localStorage.getItem('USER_ID')) {
            return <Redirect to="/Dashboard" />
        }
        else
        {
            return (<h4>You are now signed out.</h4>)
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container bg-light p-5">
                    {
                        this.checkLogged()
                    }
                </div>
            </div>
        )
    }
}

export default DashboardView;