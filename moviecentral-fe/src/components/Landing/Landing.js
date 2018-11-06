import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
/**
 * Landing Page Component of the app displaying first view of the application
 * @author - Shreya Shah
 */
class Landing extends Component {

    render() {
        return (
            <div className="container-body" id="outer-container">
                <header className="main-header">
                    <h1 className="headertitle">Welcome to Movie Central!</h1>
                </header>
                <p></p>
            </div>
        )
    }
}

export default withRouter(Landing);