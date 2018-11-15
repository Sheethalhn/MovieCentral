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
import { loginUser } from "../../actions";
import * as API from '../../api/API';

class CommonHeader extends Component {

    constructor(props) {
        super(props);
        console.log("user props :", this.props.user);
    }

    logout() {
        API.logout().then(() => {
            window.location = "/"
            this.props.loginUser(null);
        })
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
                            <li className="navigation-tab nav-drop">
                                <a>Welcome, <span className="user-name-color">{this.props.user !== undefined && this.props.user !== null ? this.props.user.firstName + " " + this.props.user.lastName : ''}</span></a>
                                <a onClick={this.logout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.loginUser
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ loginUser: loginUser }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(CommonHeader);