import React, { Component } from 'react';
import AppNavBar from '../../components/AppNavbar.component';
import ManualClockingComponent from '../../components/forms/AddManualClocking.component';

class AddManualClockingView extends Component {
    render() { 
        return (
            <div>
                <AppNavBar />
                <div className="container bg-tertiary pb-5 px-5 pt-4">
                    <div className="container">
                        <div className="card bg-light pb-4 mt-3">
                            <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
                                <h4 className="card-title mt-3 text-center">Manual Clocking</h4>
                                <p className="text-center">Add a manual clocking using this form.</p>
                                <ManualClockingComponent/>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default AddManualClockingView;