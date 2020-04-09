import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Alert from '../notifiers/Alert.component';

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            token: '',
            redirectToReferrer: false
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

        this.setState({
            error: undefined,
        })

        axios.post("/users/login", this.state)
        .then(res => {
            this.setState({
                token: res.data,
            })
        })
        .then( () => {
            if(this.state.token.error)
            {
                this.setState({
                    error: this.state.token.error,
                    token: undefined
                })
            }
            else
            {
                localStorage.setItem('USER_ID', jwt.verify(this.state.token, 'secret').id);
                localStorage.setItem('USER_FIRSTNAME', jwt.verify(this.state.token, 'secret').firstname);
                localStorage.setItem('USER_LASTNAME', jwt.verify(this.state.token, 'secret').lastname);
                localStorage.setItem('USER_USERNAME', jwt.verify(this.state.token, 'secret').username);
                localStorage.setItem('USER_EMAIL', jwt.verify(this.state.token, 'secret').email);
                localStorage.setItem('USER_CREATED', jwt.verify(this.state.token, 'secret').created);
                localStorage.setItem('USER_TOKEN', this.state.token);
            }
        })
        .then(() => {
            if (this.state.error) {
                this.setState({
                    redirectToReferrer: false
                })
            }
            else
            {
                this.setState({
                    redirectToReferrer: true
                })
            }
        })
        .catch(err => {
            this.setState({
                error: "System error, please contact system administrator.",
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
        let alertIfError;
        if (this.state.error) {
            alertIfError = <Alert error={this.state.error} />
        }
        if (this.state.redirectToReferrer === true) {
            return <Redirect to="/Dashboard" />
        }
        return (
            <form onSubmit={this.handleSubmit}>
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

                <div className="mb-5">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        required
                    />
                    {alertIfError}
                </div>

                <button type="submit" className="btn btn-black">Login</button>
            </form>
        )
    }
}

export default Form;
