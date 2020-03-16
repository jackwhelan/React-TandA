import React, { Component } from 'react'
import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
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
        axios.post("/users/login", this.state);
        window.location.href = "/dashboard";
    }

    render() {
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
                </div>

                <button type="submit" className="btn btn-black">Login</button>
            </form>
        )
    }
}

export default Form;
