import React, { Component } from 'react';

class Greeting extends Component {
    render() {
        var greeting = "Hello " + localStorage.getItem('USER_FIRSTNAME');
        if (this.props.context) {
            var context = this.props.context;
            greeting = greeting + ", " + context
        }
        return (
            <div className="border border-dark rounded p-4">
                <h6>{greeting}</h6><hr className="bg-dark"></hr>{this.props.children}
            </div>
        )
    }
}

export default Greeting;