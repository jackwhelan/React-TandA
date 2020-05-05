import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Info from '../notifiers/Info.component';
import FormInput from './FormInput.component';

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            clocking: {
                status: '',
                datetime: '',
                username: ''
            },
            response: undefined,
            redirect: false
        }
    }

    handleStatusChange = (event) => {
        let newStatus = event.target.value;

        this.setState(previousState => {
            let clocking = { ...previousState.clocking }
            clocking.status = newStatus;
            return { clocking };
        });
    }

    handleTimeChange = (event) => {
        let newTime = event.target.value;

        this.setState(previousState => {
            let clocking = { ...previousState.clocking }
            clocking.datetime = newTime;
            return { clocking };
        });
    }

    handleUserNameChange = (event) => {
        let newUserName = event.target.value;

        this.setState(previousState => {
            let clocking = { ...previousState.clocking }
            clocking.username = newUserName;
            return { clocking };
        });
    }

    handleSubmitAdd = (event) => {
        event.preventDefault();

        axios.post("/users/admin/add", this.state.clocking)
            .then(res => {
                this.setState({
                    response: res.data,
                })
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
        if (!localStorage.getItem('USER_ID')) {
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
            return <Redirect to="/" />
        }
        return (
            <form onSubmit={this.handleSubmitAdd}>
                {info}
                <div className="mt-4">
                    <FormInput
                        icon="fa fa-user-circle"
                        type="text"
                        value={this.state.clocking.username}
                        onChange={this.handleUserNameChange}
                        label="Username"
                        required={true}
                    />
                </div>

                <div className="mt-4">
                    <FormInput
                        icon="fa fa-calendar"
                        type="datetime-local"
                        value={this.state.clocking.datetime}
                        onChange={this.handleTimeChange}
                        label="Clocking Time"
                        required={true}
                    />
                </div>

                <div className="mt-4 mb-5">
                    <select className="form-control" value={this.state.clocking.status} onChange={this.handleStatusChange} required>
                        <option>in</option>
                        <option>out</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-black">Login</button>
            </form>
        )
    }
}

export default Form;
