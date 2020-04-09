import React, { Component } from 'react';
import Navbar from '../../components/AppNavbar.component';
import Info from '../../components/notifiers/Info.component';

class HomeView extends Component {
    render() {
        if(this.props.location.state) {
            console.log(this.props.location.state);
            var info = <Info status={this.props.location.state.status}
                             header={this.props.location.state.header}
                             message={this.props.location.state.message}/>
        }
        else
        {
            var info = "";
        }
        return (
            <div>
                <Navbar />
                <div className="container bg-tertiary pb-5 px-5 pt-4">
                    {info}
                    <div className="core-cont bg-lightgrey">
                        <h5>What is Lorem Ipsum?</h5>
                        <hr className="bg-black"/>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                    <div className="core-cont bg-lightgrey mt-4">
                        <h5>Why do we use it?</h5>
                        <hr className="bg-black"/>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeView;