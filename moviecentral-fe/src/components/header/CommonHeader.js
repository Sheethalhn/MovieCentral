/**
 * Common Header Component for the entire application
 * @author - Shreya Shah
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import moviecentral from './moviecentral.png';
import './header.css';

class CommonHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div className="home-header">
                    <div className="home-header-container">
                        <LinkContainer to='/'>
                            <a>
                                <img className="mc-logo" alt="Project Logo" src={moviecentral} />
                            </a>
                        </LinkContainer>
                        <ul id="menu" className="tabbed-primary-navigation" role="navigation">
                            <li className="navigation-tab">Home</li>
                            <li className="navigation-tab">Movies</li>
                            <li className="navigation-tab">Recently watched</li>
                            <li className="navigation-tab nav-drop">User Profile</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(CommonHeader);