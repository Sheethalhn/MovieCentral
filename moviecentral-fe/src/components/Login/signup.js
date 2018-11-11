import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './login.css';
import LandingHeader from '../header/LandingHeader';
import { Link } from 'react-router-dom';
import Message from '../Message/Message';
import * as API from '../../api/API';

class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            screenName: '',
            role: 'admin',
            email: '',
            password: '',
            confirmPassword: '',
            submitted: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        if (this.state.role != undefined && this.state.role != "") {
            API.signup(this.state)
                .then((resultData) => {
                })
        }
    }

    render() {
        return (
            <div className="login-background">
                <LandingHeader iconRequired={false} />
                <div className="signup-body">
                    <div className="login-content login-form hybrid-login-form signup-form hybrid-login-form-signup">
                        <div className="hybrid-login-form-main">
                            <h1>Create an Account</h1>
                            <form className="login-form" noValidate onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input type="text"
                                        className="form-control nfTextField"
                                        id="loginFirstName"
                                        placeholder="First Name"
                                        value={this.state.firstName}
                                        onChange={(event) => {
                                            this.setState({
                                                firstName: event.target.value
                                            });
                                        }}
                                        required />
                                    {this.state.submitted && !this.state.firstName &&
                                        <Message message={"First Name is required"} />
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                        className="form-control nfTextField"
                                        id="loginLastName"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        onChange={(event) => {
                                            this.setState({
                                                lastName: event.target.value
                                            });
                                        }}
                                        required />
                                    {this.state.submitted && !this.state.lastName &&
                                        <Message message={"Last Name is required"} />
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                        className="form-control nfTextField"
                                        id="loginScreenName"
                                        placeholder="Display Name"
                                        value={this.state.screenName}
                                        onChange={(event) => {
                                            this.setState({
                                                lastName: event.target.value
                                            });
                                        }} />
                                </div>
                                <div className="form-group">
                                    <input type="email"
                                        className="form-control nfTextField"
                                        id="loginEmail"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={(event) => {
                                            this.setState({
                                                email: event.target.value
                                            });
                                        }} required />
                                    {this.state.submitted && !this.state.email &&
                                        <Message message={"Email is required"} />
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                        className="form-control nfTextField"
                                        id="loginPwd"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={(event) => {
                                            this.setState({
                                                password: event.target.value
                                            });
                                        }} required />
                                    {this.state.submitted && !this.state.password &&
                                        <Message message={"Password is required"} />
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                        className="form-control nfTextField"
                                        id="loginConfirmPwd"
                                        placeholder="Confirm Password"
                                        value={this.state.confirmPassword}
                                        onChange={(event) => {
                                            this.setState({
                                                confirmPassword: event.target.value
                                            });
                                        }} required />
                                    {this.state.submitted && !this.state.confirmPassword &&
                                        <Message message={"Confirm Password is required"} />
                                    }
                                </div>
                                <div className="form-group row">
                                    <div className="form-check form-check-inline pd-15">
                                        <input className="form-check-input"
                                            type="radio"
                                            name="inlineRadioOptions"
                                            id="inlineRadio1"
                                            value={this.state.role}
                                            checked={this.state.role === 'admin'}
                                            onChange={(event) => {
                                                this.setState({
                                                    role: event.target.value
                                                });
                                            }} />
                                        <label className="form-check-label radio-label"
                                            for="inlineRadio1">Admin</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                            type="radio"
                                            name="inlineRadioOptions"
                                            id="inlineRadio2"
                                            value={this.state.role}
                                            checked={this.state.role === 'customer'}
                                            onChange={(event) => {
                                                this.setState({
                                                    role: event.target.value
                                                });
                                            }} />
                                        <label className="form-check-label radio-label" for="inlineRadio2">Customer</label>
                                    </div>
                                    {this.state.submitted && !this.state.role &&
                                        <Message message={"Role is required"} />
                                    }
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