import React, { Component } from 'react';
import UserSearch from '../../components/admin/UserSearch.component';
import AppNavbarComponent from '../../components/AppNavbar.component';

class UserManagementView extends Component {
    render() {
        return (
            <div>
                <AppNavbarComponent/>
                <div className="container bg-tertiary pb-5 px-5 pt-4">
                    <UserSearch />
                </div>
            </div>
        );
    }
}

export default UserManagementView;