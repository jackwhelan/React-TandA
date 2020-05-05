import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Alert from '../notifiers/Alert.component';
import FormInput from './FormInput.component';

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                firstname: '',
                lastname: '',
                username: '',
                email: '',
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
            error: undefined,
        })

        axios.post("/users/register", this.state.user)
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
        return <Redirect to={{
            pathname:"/",
            state: {
                status: "success",
                header: "Registration Succesful",
                message: "Your registration has been successfully processed and you can now log in to your new account with the login button in the top right."
            }
        }}/>
    }
    return (
        <form onSubmit={this.handleSubmit}>
            <div className="mt-4">
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
            </div>
            
            <div className="mt-4">
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
            </div>

            <div className="mt-4">
                <FormInput
                    icon="fa fa-user-circle"
                    type="text"
                    value={this.state.user.username}
                    onChange={this.handleUserNameChange}
                    min="3"
                    max="30"
                    label="Username"
                    required={true}
                />
            </div>
            
            <div className="mt-4">
                <FormInput
                    icon="fa fa-envelope"
                    type="email"
                    value={this.state.user.email}
                    onChange={this.handleEmailChange}
                    label="Email Address"
                    required={true}
                />
            </div>

            <div className="mt-4">
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
                {alertIfError}
            </div>
            
            <div className="mt-4">
                <button type="submit" className="btn btn-black">Submit</button>
            </div>
        </form>
        )
    }
}

export default Form;
