import React, { Component } from 'react'
import axios from 'axios';

class Form extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         username: '',
         password: '',
         email: ''
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

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleSubmit = (event) => {
        axios.post("/users/register", this.state);
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

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
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
                </div>

                <button type="submit" className="btn btn-black">Submit</button>
            </form>
        )
    }
}

export default Form;
