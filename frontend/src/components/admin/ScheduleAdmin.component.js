import React, { Component } from 'react';
import axios from 'axios';
import FormInput from '../forms/FormInput.component';
import { Redirect } from 'react-router-dom';

class ScheduleAdmin extends Component {
    state = {
        event: {
            title: '',
            body: '',
            organizer: '',
            begins: undefined,
            ends: undefined
        }
    }

    handleTitleChange = (event) => {
        let newTitle = event.target.value;

        this.setState(previousState => {
            let event = { ...previousState.event }
            event.title = newTitle;
            return { event };
        });
    }

    handleBeginsChange = (event) => {
        let newTime = event.target.value;

        this.setState(previousState => {
            let event = { ...previousState.event }
            event.begins = newTime;
            return { event };
        });
    }

    handleEndsChange = (event) => {
        let newTime = event.target.value;

        this.setState(previousState => {
            let event = { ...previousState.event }
            event.ends = newTime;
            return { event };
        });
    }

    handleBodyChange = (event) => {
        let newBody = event.target.value;

        this.setState(previousState => {
            let event = { ...previousState.event }
            event.body = newBody;
            return { event };
        });
    }

    componentDidMount() {
        const organizer = localStorage.getItem('USER_FIRSTNAME') + " " + localStorage.getItem('USER_LASTNAME');
        this.setState({
            event: {
                organizer: organizer
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/schedule/add', this.state.event)
            .then(res => {
                this.setState({
                    response: res.data
                })
            })
            .then(() => {
                this.setState({
                    redirect: true
                })
            })
            .catch(err => { throw err })
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: "/",
                state: this.state.response
            }} />
        }

        return (
            <div className="container bg-light p-5 rounded">
                <h2>Schedule an Event</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="mt-4">
                        <FormInput
                            icon="fas fa-heading"
                            type="text"
                            value={this.state.event.title}
                            onChange={this.handleTitleChange}
                            label="Title"
                            required={true}
                        />
                    </div>

                    <div className="mt-4 row">
                        <div className="col">
                            Begins:
                            <FormInput
                                icon="fas fa-calendar-alt"
                                type="datetime-local"
                                value={this.state.event.begins}
                                onChange={this.handleBeginsChange}
                                label="Begins"
                                required={true}
                            />
                        </div>
                        
                        <div className="col">
                            Ends:
                            <FormInput
                                icon="fas fa-calendar-check"
                                type="datetime-local"
                                value={this.state.event.ends}
                                onChange={this.handleEndsChange}
                                label="Ends"
                                required={true}
                            />
                        </div>
                    </div>

                    <div className="mt-4 mb-4">
                        <textarea
                            value={this.state.event.body}
                            onChange={this.handleBodyChange}
                            placeholder="Write the body of the event here."
                            required={true}
                            className="form-control"
                        >
                        </textarea>
                    </div>

                    <button type="submit" className="btn btn-secondary float-right">Schedule</button>
                </form>
            </div>
        );
    }
}

export default ScheduleAdmin;