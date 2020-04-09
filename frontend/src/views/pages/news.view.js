import React, { Component } from 'react';
import Navbar from '../../components/AppNavbar.component';
import News from '../../components/News.component';

class NewsView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container bg-tertiary pb-5 px-5 pt-4">
                    <News/>
                </div>
            </div>
        )
    }
}

export default NewsView;