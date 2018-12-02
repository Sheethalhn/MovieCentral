/**
 * Common Header Component for the entire application
 * @author - Shreya Shah
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import moviecentral from './moviecentral.png';
import './header.css';
import { loginUser } from "../../actions";
import * as API from '../../api/API';

class CommonHeader extends Component {

    constructor(props) {
        super(props);
        console.log("user props :", this.props.user);
    }

    signOut(event) {
        event.stopPropagation();
        API.logout().then(() => {
            console.log("inside if");
            this.props.loginUser(null);
            window.location = "/";
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
                            {/* {this.props.user !== undefined && this.props.user !== null && this.props.user.role === 'admin' && <li className="navigation-tab">Customers</li>} */}
                            {/* {this.props.user !== undefined && this.props.user !== null && this.props.user.role === 'admin' && <li className="navigation-tab">Reports</li>} */}
                            {this.props.user !== undefined && this.props.user !== null && this.props.user.role === 'admin' && <li className="navigation-tab">Admin Dashboard</li>}
                            <li className="navigation-tab nav-drop">
                                <Link to={(this.props.user !== undefined && this.props.user !== null) ? '/viewuser/' + this.props.user.userId : ''}>Welcome, 
                                    <button
                                        className="btn btn-link user-name-color"
                                        type="button"><b>{this.props.user !== undefined && this.props.user !== null ? this.props.user.firstName + " " + this.props.user.lastName : ''}</b>
                                    </button>
                                </Link>
                                <a href="javascript:void(0)" onClick={(event) => { this.signOut(event) }}>Logout</a>
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