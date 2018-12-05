import React, { Component } from 'react';
import { toast } from 'react-toastify';
import './login.css';
import LandingHeader from '../header/LandingHeader';
import Message from '../Message/Message';
import * as API from '../../api/API';
import * as _ from 'lodash';
import { Link } from 'react-router-dom';

class VerifyPage extends Component {

    notify = (message) => toast(message);

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            userObj: {},
            verificationCode: this.props.match.params.code,
            submitted: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log("inside-------------")
        API.getUserFromCode(this.props.match.params.code)
            .then((resultData) => {
                console.log("data :"+resultData);
                if (resultData.data !== undefined && resultData.data !== undefined) {
                    this.setState({
                        userObj: resultData.data,
                        email: resultData.data.email
                    });
                } else {
                    console.log("Thereis no such user in DB");
                }
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        if (this.state.email !== undefined && this.state.email !== "" && this.state.verificationCode !== undefined && this.state.verificationCode !== "") {
            let userObj = _.cloneDeep(this.state.userObj);
            userObj.verificationCode = this.state.verificationCode;
            API.verifyUser(userObj)
                .then((resultData) => {
                    if (resultData.data !== undefined && resultData.data !== null) {
                        this.notify(resultData.meta.message);
                        this.props.history.push("/login");
                    } else {
                        this.notify(resultData.message);
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
                <LandingHeader iconRequired={false} />
                <div className="login-body">
                    {this.state.userObj !== null && !this.state.userObj.emailVerified && <div className="login-content login-form hybrid-login-form hybrid-login-form-signup">
                        <div className="hybrid-login-form-main">
                            <h1>Verify Your Account</h1>
                            <form className="login-form" noValidate onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input type="email"
                                        className="form-control nfTextField"
                                        id="loginEmail"
                                        placeholder="Email"
                                        value={this.state.email}
                                        readOnly />
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                        className="form-control nfTextField"
                                        id="loginCode"
                                        placeholder="Verification Code"
                                        value={this.state.verificationCode}
                                        onChange={(event) => {
                                            this.setState({
                                                verificationCode: event.target.value
                                            });
                                        }}
                                        required />
                                    {this.state.submitted && !this.state.verificationCode &&
                                        <Message message={"Verification Code is required"} />
                                    }
                                </div>
                                <div className="form-group">
                                    <button className="btn login-button btn-submit btn-small">Verify Account</button>
                                </div>
                            </form>
                        </div>
                    </div>}
                    {this.state.userObj !== null && this.state.userObj.emailVerified &&
                        <div className="successful-register">
                            <h3>You have already Verifed the Account! <br/> Please <Link style={{color:'white'}} to="/login"> Sign In</Link>!</h3>
                        </div>}
                </div>
            </div>
        )
    }

}

export default VerifyPage;