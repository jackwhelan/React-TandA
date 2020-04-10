import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Info from '../notifiers/Info.component';

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstname: localStorage.getItem('USER_FIRSTNAME'),
            lastname: localStorage.getItem('USER_LASTNAME'),
            username: localStorage.getItem('USER_USERNAME'),
            email: localStorage.getItem('USER_EMAIL')
        }
    }

    handleFirstnameChange = (event) => {
        this.setState({
            firstname: event.target.value
        })
    }

    handleLastnameChange = (event) => {
        this.setState({
            lastname: event.target.value
        })
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios.patch("/users/" + localStorage.getItem('USER_ID'), this.state)
            .then(res => {
                this.setState({
                    response: res.data
                })
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        if (!localStorage.getItem('USER_ID')) {
            this.setState({
                redirect: true
            });
        }
    }

    render() {
        if (this.state.response) {
            var info = <Info status={this.state.response.status}
                header={this.state.response.header}
                message={this.state.response.message} 
                key={Math.random()}/>
        }
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: "/",
                state: {
                    status: "warning",
                    header: "Access Restricted",
                    message: "You must be signed in to access this page."
                }
            }} />
        }
        return (
            <form onSubmit={this.handleSubmit}>
                {info}
                <div className="mt-4">
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.firstname}
                        onChange={this.handleFirstnameChange}
                        minLength="2"
                        maxLength="30"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.lastname}
                        onChange={this.handleLastnameChange}
                        minLength="2"
                        maxLength="30"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                        minLength="3"
                        maxLength="30"
                        required
                    />
                </div>

                <div className="mt-4 mb-5">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-black">Update Account Details</button>
            </form>
        )
    }
}

export default Form;
