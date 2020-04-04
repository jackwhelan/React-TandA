import React, { Component } from 'react';

class Greeting extends Component {
    render() {
        var greeting = "Hello " + localStorage.getItem('USER_FIRSTNAME');
        if (this.props.context) {
            var context = this.props.context;
            greeting = greeting + ", " + context
        }
        return (
            <div className="text-muted">
                {greeting}
            </div>
        )
    }
}

export default Greeting;