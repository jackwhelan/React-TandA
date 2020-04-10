import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Info from '../notifiers/Info.component';

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            response: undefined,
            redirect: false
        }
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios.post("/users/login", this.state)
        .then(res => {
            this.setState({
                response: res.data,
            })
        })
        .then( () => {
            if(this.state.response.token)
            {
                localStorage.setItem('USER_ID', jwt.verify(this.state.response.token, 'secret').id);
                localStorage.setItem('USER_FIRSTNAME', jwt.verify(this.state.response.token, 'secret').firstname);
                localStorage.setItem('USER_LASTNAME', jwt.verify(this.state.response.token, 'secret').lastname);
                localStorage.setItem('USER_USERNAME', jwt.verify(this.state.response.token, 'secret').username);
                localStorage.setItem('USER_EMAIL', jwt.verify(this.state.response.token, 'secret').email);
                localStorage.setItem('USER_CREATED', jwt.verify(this.state.response.token, 'secret').created);
                localStorage.setItem('USER_TOKEN', this.state.response.token);
            }
        })
        .then(() => {
            if (this.state.response.status === 'error') {
                this.setState({
                    redirect: false
                })
            }
            else
            {
                this.setState({
                    redirect: true
                })
            }
        })
        .catch(err => {
            this.setState({
                status: "error",
                header: "System error",
                message: err
            })
        })
    }

    componentDidMount() {
        if (localStorage.getItem('USER_ID')) {
            this.setState({
                redirectToReferrer: true
            })
        }
    }

    render() {
        if (this.state.response) {
            var info = <Info status={this.state.response.status}
                header={this.state.response.header}
                message={this.state.response.message}
                key={Math.random()} />
        }
        if (this.state.redirect === true) {
            return <Redirect to="/Dashboard" />
        }
        return (
            <form onSubmit={this.handleSubmit}>
                {info}
                <div className="mt-4">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                        required
                    />
                </div>

                <div className="mt-4 mb-5">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-black">Login</button>
            </form>
        )
    }
}

export default Form;
