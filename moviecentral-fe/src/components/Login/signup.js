import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './login.css';
import LandingHeader from '../header/LandingHeader';
import { Link } from 'react-router-dom';
import Message from '../Message/Message';
import * as API from '../../api/API';
import * as _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';

class Signup extends Component {

    notify = (message1) => toast(message1);
    emailSplit = [];

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            screenName: '',
            role: 'customer',
            email: '',
            password: '',
            confirmPassword: '',
            submitted: false,
            signedUp: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        this.emailSplit = this.state.email.split("@");
        if (this.state.role !== undefined && this.state.role !== "" && (this.state.role == 'admin' && this.emailSplit[1] == 'sjsu.edu')) {
            let requestData = _.cloneDeep(this.state);;
            delete requestData.submitted;
            delete requestData.confirmPassword;
            requestData.emailVerified = false;
            API.signup(requestData)
                .then((resultData) => {
                    if (resultData.data !== null && resultData.data != undefined) {
                        this.setState({ signedUp: true })
                    } else {
                        this.setState({ signedUp: false })
                    }
                    this.notify(resultData.meta.message);
                }).catch(error => {
                    this.setState({ signedUp: false });
                    this.notify(error);
                });
        }
    }

    render() {
        return (
            <div className="login-background">
                <ToastContainer />
                <LandingHeader iconRequired={false} />
                <div className="signup-body">
                    {!this.state.signedUp && <div className="login-content login-form hybrid-login-form signup-form hybrid-login-form-signup">
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
                                                screenName: event.target.value
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
                                    {this.state.role == 'admin' && this.emailSplit[1] !== 'sjsu.edu' &&
                                        <Message message={"For Admin Role Sjsu email is required"} />
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
                                            value="admin"
                                            checked={this.state.role === 'admin'}
                                            onChange={(event) => {
                                                this.setState({
                                                    role: event.target.value
                                                });
                                            }} />
                                        <label className="form-check-label radio-label"
                                            htmlFor="inlineRadio1">Admin</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input"
                                            type="radio"
                                            name="inlineRadioOptions"
                                            id="inlineRadio2"
                                            value="customer"
                                            checked={this.state.role === 'customer'}
                                            onChange={(event) => {
                                                this.setState({
                                                    role: event.target.value
                                                });
                                            }} />
                                        <label className="form-check-label radio-label" htmlFor="inlineRadio2">Customer</label>
                                    </div>
                                    {this.state.submitted && !this.state.role &&
                                        <Message message={"Role is required"} />
                                    }
                                </div>
                                <div className="form-group">
                                    <button className="btn login-button btn-submit btn-small">Join Up</button>
                                </div>
                                <div className="login-signup-now">
                                    Already have an Account?
                                    <Link to="/login">  Sign In</Link>
                                    .
                                </div>
                            </form>
                        </div>
                    </div>
                    }
                    {this.state.signedUp && <div className="successful-register"><h3>Thank You for Registering to Movie Central. Please verify your email before Login!</h3></div>}
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