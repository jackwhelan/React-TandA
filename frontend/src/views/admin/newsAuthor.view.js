import React, { Component } from 'react';
import NewsAdmin from '../../components/admin/NewsAdmin.component';
import Navbar from '../../components/AppNavbar.component';

class NewsAuthorView extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container bg-tertiary pb-5 px-5 pt-4">
                    <NewsAdmin/>
                </div>
            </div>
        );
    }
}

export default NewsAuthorView;