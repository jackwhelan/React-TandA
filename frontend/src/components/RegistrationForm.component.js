import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Alert from './Alert.component';

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: ''
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

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            error: undefined,
        })

        axios.post("/users/register", this.state)
            .then(res => {
                this.setState({
                    response: res.data
                })
            })
            .then(() => {
                if (this.state.response.error)
                {
                    this.setState({
                        error: this.state.response.error,
                        response: undefined
                    })
                }
                else
                {
                    this.setState({
                        redirect: true
                    });
                }
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        if (localStorage.getItem('USER_ID')) {
            this.setState({
                redirect: true
            });
        }
    }

render() {
    let alertIfError;
    if (this.state.error) {
        alertIfError = <Alert error={this.state.error} />
    }
    if (this.state.redirect === true) {
        return <Redirect to="/Dashboard" />
    }
    return (
        <form onSubmit={this.handleSubmit}>
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

            <div>
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    minLength="6"
                    maxLength="100"
                    required
                />
            </div>

            <div className="mb-5">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    required
                />
                {alertIfError}
            </div>

            <button type="submit" className="btn btn-black">Submit</button>
        </form>
        )
    }
}

export default Form;
