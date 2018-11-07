import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './login.css';
import LandingHeader from '../header/LandingHeader';
import Message from '../Message/Message';
import { Link } from 'react-router-dom';

class Login extends Component {

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
    }

    render() {
        return (
            <div className="login-background">
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
                                <div class="login-signup-now">
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
    return bindActionCreators({}, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(Login);