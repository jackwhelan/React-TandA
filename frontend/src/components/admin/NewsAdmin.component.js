import React, { Component } from 'react';
import axios from 'axios';
import FormInput from '../forms/FormInput.component';
import {Redirect} from 'react-router-dom';

class NewsAdmin extends Component {
    state = {
        article: {
            title: '',
            body: '',
            author: ''
        }
    }

    handleTitleChange = (event) => {
        let newTitle = event.target.value;

        this.setState(previousState => {
            let article = { ...previousState.article }
            article.title = newTitle;
            return { article };
        });
    }

    handleBodyChange = (event) => {
        let newBody = event.target.value;

        this.setState(previousState => {
            let article = { ...previousState.article }
            article.body = newBody;
            return { article };
        });
    }

    componentDidMount() {
        const author = localStorage.getItem('USER_FIRSTNAME') + " " + localStorage.getItem('USER_LASTNAME');
        this.setState({
            article: {
                author: author
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/news/add', this.state.article)
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
        .catch(err => {throw err})
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
                <h2>Create News Item</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="mt-4">
                        <FormInput
                            icon="fas fa-heading"
                            type="text"
                            value={this.state.article.title}
                            onChange={this.handleTitleChange}
                            label="Title"
                            required={true}
                        />
                    </div>
                    
                    <div className="mt-4 mb-4">
                        <textarea
                            value={this.state.article.body}
                            onChange={this.handleBodyChange}
                            placeholder="Write the body of the news item here."
                            required={true}
                            className="form-control"
                        >
                        </textarea>
                    </div>

                    <button type="submit" className="btn btn-secondary float-right">Post</button>
                </form>
            </div>
        );
    }
}
 
export default NewsAdmin;