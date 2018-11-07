import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './login.css';
import LandingHeader from '../header/LandingHeader';
import { Link } from 'react-router-dom';

class Signup extends Component {

    render() {
        return (
            <div className="login-background">
                <LandingHeader iconRequired={false} />
                <div className="signup-body">
                    <div className="login-content login-form hybrid-login-form hybrid-login-form-signup">
                        <div className="hybrid-login-form-main">
                            <h1>Create an Account</h1>
                            <form className="login-form">
                                <div className="form-group">
                                    <input type="text"
                                        className="form-control nfTextField"
                                        id="loginFirstName"
                                        placeholder="First Name" />
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                        className="form-control nfTextField"
                                        id="loginLastName"
                                        placeholder="Last Name" />
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                        className="form-control nfTextField"
                                        id="loginScreenName"
                                        placeholder="Display Name" />
                                </div>
                                <div className="form-group">
                                    <input type="email"
                                        className="form-control nfTextField"
                                        id="loginEmail"
                                        placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                        className="form-control nfTextField"
                                        id="loginPwd"
                                        placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                        className="form-control nfTextField"
                                        id="loginConfirmPwd"
                                        placeholder="Confirm Password" />
                                </div>
                                <div className="form-group">
                                    <button className="btn login-button btn-submit btn-small">Join Up</button>
                                </div>
                                <div class="login-signup-now">
                                    Already have an Account?
                                    <Link to="/login">  Sign In</Link>
                                    .
                                </div>
                            </form>
                        </div>
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
    return bindActionCreators({}, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(Signup);