import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './payment.css';
import amexlogo from './amex.jpg';
import masterlogo from './mastercard.jpg';
import visalogo from './visa.jpg';
import Message from '../Message/Message';
import * as CardValidator from '../Helper/CardValidator';
import * as API from '../../api/API';
import { userSubscription } from "../../actions";
import { loginUser } from "../../actions";
import CommonHeader from '../header/CommonHeader';
import { ToastContainer, toast } from 'react-toastify';


class Payment extends Component {

    notify = (message) => toast(message);

    constructor(props) {
        super(props);
        this.state = {
            card_number: '',
            name: '',
            expiration: '',
            cvv: '',
            submitted: false,
            subscription_months:((this.props.location.state.subscription_months == undefined || this.props.location.state.subscription_months == null) ? 0 : this.props.location.state.subscription_months ),
            subscription_type: this.props.location.state.subscription_type
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        

    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        console.log(this.state);
        if (this.state.card_number !== undefined && this.state.card_number !== "" && this.state.name !== undefined && this.state.name !== ""  && this.state.cvv !== undefined && this.state.cvv !== ""  && CardValidator.validateCardNumber(this.state.card_number)) {
            let requestData;
            if(this.state.subscription_type == "M")
            {
                 requestData ={duration : this.state.subscription_months,userSubscriptionObj :this.props.user,subscriptionType : this.state.subscription_type};
            }
            else
            {
                requestData ={duration : this.state.subscription_months,userSubscriptionObj :this.props.user,subscriptionType : this.state.subscription_type,movieSubscriptionObj : this.state.movie};
            }
            console.log(requestData);
            console.log(this.props.user);
            API.addSubscription(requestData)
                .then((resultData) => {
                    this.notify(resultData.meta.message);
                    this.props.history.push("/home");
                    console.log("Payment is done");
                }).catch(error => {
                    console.log("error :", error);
                    this.notify(error.message);
                });
        }
    }
    handleCancel(){
        this.props.history.push("/home");
    }
    render() {
        return (
            <div className="outerBody">
                <CommonHeader />
                <div className="row justify-content-center">
                    <div className="creditCardForm">
                        <div className="heading">
                            <h1>Confirm Purchase</h1>
                        </div>
                        <div className="payment">
                            <form noValidate onSubmit={this.handleSubmit}>
                                <div className="form-group owner">
                                    <label htmlFor="owner">Name</label>
                                    <input
                                        type="text"
                                        className="form-control-sm col-sm-12"
                                        id="owner"
                                        name="name"
                                        value={this.state.name}
                                        onChange={(event) => {
                                            this.setState({
                                                name: event.target.value
                                            });
                                        }}
                                        required />
                                    {this.state.submitted && !this.state.name &&
                                        <Message message={"Name is required"} />
                                    }
                                </div>
                                <div className="form-group CVV">
                                    <label htmlFor="cvv">CVV</label>
                                    <input
                                        type="number"

                                        className="form-control-sm col-sm-12" id="cvv"
                                        max="9999"
                                        value={this.state.cvv}
                                        onChange={(event) => {
                                            this.setState({
                                                cvv: event.target.value
                                            });
                                        }}
                                        required />
                                    {this.state.submitted && !this.state.cvv &&
                                        <Message message={"CVV is required"} />
                                    }
                                </div>
                                <div className="form-group" id="card-number-field">
                                    <label htmlFor="cardNumber">Card Number</label>
                                    <input
                                        type="number"
                                        className="form-control-sm col-sm-12"
                                        id="cardNumber"
                                        value={this.state.card_number}
                                        onChange={(event) => {
                                            this.setState({
                                                card_number: event.target.value
                                            });
                                        }}
                                        required />
                                    {this.state.submitted && !this.state.card_number &&
                                        <Message message={"Card Number is required"} />
                                    }
                                    {this.state.submitted && this.state.card_number && !CardValidator.validateCardNumber(this.state.card_number) &&
                                        <Message message={"Card Number is invalid"} />
                                    }
                                </div>
                                <div className="form-group" id="expiration-date">
                                    <label>Expiration Date</label>
                                    <div className="form-group form-control-sm">
                                        <select >
                                            <option value="01">January</option>
                                            <option value="02">February </option>
                                            <option value="03">March</option>
                                            <option value="04">April</option>
                                            <option value="05">May</option>
                                            <option value="06">June</option>
                                            <option value="07">July</option>
                                            <option value="08">August</option>
                                            <option value="09">September</option>
                                            <option value="10">October</option>
                                            <option value="11">November</option>
                                            <option value="12" selected>December</option>
                                        </select>
                                        <select>
                                            <option value="16"> 2018</option>
                                            <option value="17"> 2019</option>
                                            <option value="18"> 2020</option>
                                            <option value="19"> 2021</option>
                                            <option value="20"> 2022</option>
                                            <option value="21"> 2023</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group" id="credit_cards">
                                    <img src={visalogo} id="visa" />
                                    <img src={masterlogo} id="mastercard" />
                                    <img src={amexlogo} id="amex" />
                                </div>
                                <div className="form-group" id="pay-now">
                                    <button type="submit" className="btn btn-default" id="confirm-purchase">Pay Now</button>
                                    <button type="button" onClick ={this.handleCancel} className="btn btn-default" id="cancel-purchase">Cancel</button>
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
        userSubscription: state.userSubscription,
        user: state.loginUser,
        movie:state.selectedMovie
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ userSubscription: userSubscription }, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(Payment);