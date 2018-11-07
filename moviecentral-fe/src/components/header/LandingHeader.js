/**
 * Common Header Component for the entire application
 * @author - Shreya Shah
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './header.css';
import moviecentral from './moviecentral.png';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class LandingHeader extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            iconRequired: this.props.iconRequired
        }
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <div className="header-container">
                    <div className="col-md-12">
                        <span className="logo">
                            <LinkContainer to='/'>
                                <a>
                                    <img className="mc-logo" alt="Project Logo" src={moviecentral} />
                                </a>
                            </LinkContainer>
                        </span>
                        {this.state.iconRequired ? <div className="side-action-buttons">
                            <Link to="/login"
                                className="auth-links">Sign In</Link>
                            <Link to="/signup"
                                className="auth-links">Join Up</Link>
                        </div> : ''}
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

export default connect(mapStateToProps, matchDispatchToProps)(LandingHeader);