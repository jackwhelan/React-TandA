import React, { Component } from 'react';
import LiveClock from 'react-live-clock';
import Navbar from '../../components/AppNavbar.component';
import Info from '../../components/notifiers/Info.component';
import News from '../../components/News.component';

class HomeView extends Component {
    render() {
        if (this.props.location.state) {
            var info = <Info status={this.props.location.state.status}
                header={this.props.location.state.header}
                message={this.props.location.state.message} />
        }
        
        return (
            <div>
                <Navbar />
                <div className="container bg-tertiary pb-5 px-5 pt-4">
                    {info}
                    <div className="row border border-dark">
                        <div className="col-sm-6 text-center py-4 border border-secondary">
                            <h4 className="display-4"><LiveClock format={'HH:mm:ss'} ticking={true} /></h4>
                        </div>
                        <div className="col-sm-6 text-center py-4 border border-secondary">
                            <h4 className="display-4"><LiveClock format={'dddd, MMMM Mo'} ticking={true} /></h4>
                        </div>
                    </div>
                    <News/>
                </div>
            </div>
        )
    }
}

export default HomeView;