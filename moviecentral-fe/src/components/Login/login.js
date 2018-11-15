import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './login.css';
import LandingHeader from '../header/LandingHeader';
import Message from '../Message/Message';
import * as API from '../../api/API';
import { loginUser } from "../../actions";

class Login extends Component {

    notify = (message) => toast(message);

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            submitted: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({
            email: '',
            password: '',
            submitted: false
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        if (this.state.email !== undefined && this.state.email !== "" && this.state.password !== undefined && this.state.password !== "") {
            console.log("state :",this.state);
            API.login(this.state)
                .then((resultData) => {
                    if (resultData.data !== undefined && resultData.data !== null) {
                        this.setState({
                            isLoggedIn: true,
                            message: resultData.meta.message,
                            user: resultData.data,
                        });
                        this.props.loginUser(resultData.data);
                        this.props.history.push("/home");
                    } else {
                        this.setState({
                            isLoggedIn: false,
                            message: resultData.meta.message,
                        });
                        this.notify(resultData.meta.message);
                    }
                }).catch(error => {
                    console.log("error :", error);
                    this.notify(error.message);
                });
        }
    }

    render() {
        return (
            <div className="login-background">
                <ToastContainer />
                <LandingHeader iconRequired={false} />
                <div className="login-body">
                    <div className="login-content login-form hybrid-login-form hybrid-login-form-signup">
                        <div className="hybrid-login-form-main">
                            <h1>Sign In</h1>
                            <form className="login-form" noValidate onSubmit={this.handleSubmit}>
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
                                        }}
                                        required />
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
                                        }}
                                        required />
                                    {this.state.submitted && !this.state.password &&
                                        <Message message={"Password is required"} />
                                    }
                                </div>
                                <div className="form-group">
                                    <button className="btn login-button btn-submit btn-small">Sign In</button>
                                </div>
                                <div className="login-signup-now">
                                    New to Movie Central?
                                    <Link to="/signup">  Sign up now</Link>
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
    return bindActionCreators({ loginUser: loginUser }, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(Login);