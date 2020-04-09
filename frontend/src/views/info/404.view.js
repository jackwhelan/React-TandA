import React, { Component } from 'react';
import Navbar from '../../components/AppNavbar.component';

class NotFoundView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container bg-light p-5">
                    <h4>404</h4><hr className="bg-black mb-5" />
                    Sorry! The page you are trying to access doesn't exist.
                </div>
            </div>
        )
    }
}

export default NotFoundView;