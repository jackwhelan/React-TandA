import React, { Component } from 'react';
import Clock from 'react-clock';

class NavClock extends Component {
    state = {
        date: new Date()
    }

    componentDidMount() {
        setInterval(
            () => {
                this.setState({ date: new Date() })
            },
            1000
        );
    }

    render() { 
        return (
            <Clock value={this.state.date} size={35} />
        );
    }
}
 
export default NavClock;