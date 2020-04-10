import React, { Component } from 'react';

class DashboardItem extends Component {
    render() {
        return (
            <a className="link-unstyled" href={this.props.href}>
                <div className="row">
                    <div className="border border-dark col-sm-4 p-3 margin-dash">
                        <h5 className="text-center scaleIcon"><i className={this.props.iconClass}></i></h5>
                    </div>
                    <div className="border border-dark col-sm-7 p-3 margin-dash">
                        <h4>{this.props.text}</h4>
                        <p>{this.props.desc}</p>
                    </div>
                </div>
            </a>
        )
    }
}

export default DashboardItem;