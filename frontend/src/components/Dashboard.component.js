import React, { Component } from 'react';

class DashboardItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userClearance: undefined
        }
    }

    componentDidMount() {
        var userID = localStorage.getItem('USER_ID');
        fetch("/dashboard/" + userID)
            .then(res => {
                return res.json();
            })
            .then(res => {
                this.setState({
                    userClearance: res
                });
            });
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default DashboardItem;