import React, { Component } from 'react';

class DashboardItem extends Component {
    render() {
        return (
            <a className="link-unstyled" href={this.props.href}>
                <div className="border border-dark p-3 text-center">
                    <h5 className="scaleIcon"><i className={this.props.iconClass}></i></h5>
                    <hr className="bg-dark"></hr>
                    <h4>{this.props.text}</h4>
                    <p>{this.props.desc}</p>
                </div>
            </a>
        )
    }
}

export default DashboardItem;