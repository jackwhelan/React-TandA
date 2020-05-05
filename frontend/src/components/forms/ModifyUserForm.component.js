import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Info from '../notifiers/Info.component';
import FormInput from './FormInput.component';
import jwt from 'jsonwebtoken';

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                firstname: localStorage.getItem('USER_FIRSTNAME'),
                lastname: localStorage.getItem('USER_LASTNAME'),
                username: localStorage.getItem('USER_USERNAME'),
                email: localStorage.getItem('USER_EMAIL'),
                password: ''
            }
        }
    }

    handleFirstNameChange = (event) => {
        let newFirstName = event.target.value;

        this.setState(previousState => {
            let user = { ...previousState.user }
            user.firstname = newFirstName;
            return { user };
        });
    }

    handleLastNameChange = (event) => {
        let newLastName = event.target.value;

        this.setState(previousState => {
            let user = { ...previousState.user }
            user.lastname = newLastName;
            return { user };
        });
    }

    handleUserNameChange = (event) => {
        let newUserName = event.target.value;

        this.setState(previousState => {
            let user = { ...previousState.user }
            user.username = newUserName;
            return { user };
        });
    }

    handleEmailChange = (event) => {
        let newEmail = event.target.value;

        this.setState(previousState => {
            let user = { ...previousState.user }
            user.email = newEmail;
            return { user };
        });
    }

    handlePasswordChange = (event) => {
        let newPassword = event.target.value;

        this.setState(previousState => {
            let user = { ...previousState.user }
            user.password = newPassword;
            return { user };
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            response: undefined
        })

        axios.patch("/users/" + localStorage.getItem('USER_ID'), this.state.user)
            .then(res => {
                this.setState({
                    response: res.data
                })
            })
            .then(() => {
                if (this.state.response.token) {
                    localStorage.setItem('USER_ID', jwt.verify(this.state.response.token, 'secret').id);
                    localStorage.setItem('USER_FIRSTNAME', jwt.verify(this.state.response.token, 'secret').firstname);
                    localStorage.setItem('USER_LASTNAME', jwt.verify(this.state.response.token, 'secret').lastname);
                    localStorage.setItem('USER_USERNAME', jwt.verify(this.state.response.token, 'secret').username);
                    localStorage.setItem('USER_EMAIL', jwt.verify(this.state.response.token, 'secret').email);
                    localStorage.setItem('USER_CREATED', jwt.verify(this.state.response.token, 'secret').created);
                    localStorage.setItem('USER_TOKEN', this.state.response.token);
                }
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
                <FormInput
                    icon="fa fa-user"
                    type="text"
                    value={this.state.user.firstname}
                    onChange={this.handleFirstNameChange}
                    min="2"
                    max="30"
                    label="First Name"
                    required={true}
                />

                <FormInput
                    icon="fa fa-user"
                    type="text"
                    value={this.state.user.lastname}
                    onChange={this.handleLastNameChange}
                    min="2"
                    max="30"
                    label="Last Name"
                    required={true}
                />

                <FormInput
                    icon="fa fa-user-circle"
                    type="text"
                    value={this.state.user.username}
                    onChange={this.handleUserNameChange}
                    label="Username"
                    required={true}
                />

                <FormInput
                    icon="fa fa-envelope"
                    type="email"
                    value={this.state.user.email}
                    onChange={this.handleEmailChange}
                    label="Email Address"
                    required={true}
                />

                <hr></hr>
                <p className="text-center">Enter password to confirm changes</p>

                <FormInput
                    icon="fa fa-lock"
                    type="password"
                    value={this.state.user.password}
                    onChange={this.handlePasswordChange}
                    min="6"
                    max="100"
                    label="Password"
                    required={true}
                />

                <button type="submit" className="btn btn-primary btn-block">Submit Changes</button>
            </form>
        )
    }
}

export default Form;
