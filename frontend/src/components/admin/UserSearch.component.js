import React, { Component } from 'react';
import FormInput from '../forms/FormInput.component';
import axios from 'axios';
import Info from '../notifiers/Info.component';
import DayJS from 'dayjs';
import ClockingSearch from './ClockingSearch.component';

class UserSearch extends Component {
    state = {
        search: '',
        showAmt: 5
    }

    handleSearchChange = (event) => {
        this.setState({
            search: event.target.value,
            showAmt: 5
        }, () => {
            this.fetchUsers();
        });
    }

    fetchUsers = () => {
        var showAmt = this.state.showAmt;
        var search = this.state.search;

        axios.get("/users?showAmt=" + showAmt + "&search=" + search)
            .then(res => {
                this.setState({
                    results: res.data
                })
            })
            .catch(err => { throw err })
    }

    showMore = () => {
        this.setState({
            showAmt: this.state.showAmt + 5
        }, () => {
            this.fetchUsers();
        });
    }

    myUserDel = (event) => {
        const userID = event.target.value;

        axios.delete('/users/' + userID)
            .then(res => {
                this.setState({
                    res: res.data
                })
            })
            .catch(err => console.log(err))
        
        this.fetchUsers();
    }

    render() {
        return (
            <div className="card bg-light p-5 mt-3">
                <div className="core-cont border-secondary rounded pb-3">
                    <FormInput
                        icon="fa fa-search"
                        type="text"
                        value={this.state.search}
                        onChange={this.handleSearchChange}
                        label="Search..."
                    />
                    {this.state.res && <Info header={this.state.res.header} status={this.state.res.status} message={this.state.res.message} key={Math.random()} />}
                </div>
                <div className="core-cont border-secondary rounded">
                    <ul className="list-group">
                        {this.state.results ? this.state.results.map((item, i) => {
                            return (
                                <li key={i} className="list-group-item mb-3">
                                    <span className="h4 text-muted">{item.username}</span>
                                    <p>Account Created on <span className="text-muted">{DayJS(item.created).format('DD-MM-YYYY') + " at " + DayJS(item.created).format('HH:mm:ss')}</span></p>
                                    <hr className="bg-black" />
                                    <p>Username: <span className="text-muted">{item.username}</span></p>
                                    <p>First Name: <span className="text-muted">{item.firstname}</span></p>
                                    <p>Last Name: <span className="text-muted">{item.lastname}</span></p>
                                    <p>Email: <span className="text-muted">{item.email}</span></p>
                                    <div className="core-cont">
                                        <ClockingSearch username={item.username}/>
                                    </div>
                                    <button value={item._id} className="float-right btn btn-md btn-danger" onClick={this.myUserDel}>Delete User</button>
                                </li>
                            )
                        }) : <h4>Search using the box above for real-time results!</h4>}
                    </ul>
                    {this.state.results && this.state.results.length > 5 && <button className="btn btn-secondary btn-lg float-right" onClick={this.showMore}>Show More</button>}
                </div>
            </div>
        )
    }
}

export default UserSearch;
