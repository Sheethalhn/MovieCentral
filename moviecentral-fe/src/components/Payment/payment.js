import React, { Component } from 'react';
import './payment.css';
import amexlogo from './amex.jpg';
import masterlogo from './mastercard.jpg';
import visalogo from './visa.jpg';
import Message from '../Message/Message';
import LandingHeader from '../header/LandingHeader';
import * as CardValidator from '../Helper/CardValidator';

class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            card_number: '',
            name: '',
            expiration: '',
            cvv: '',
            submitted: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentWillMount() {
        this.state = {
            card_number: '',
            name: '',
            expiration: '',
            cvv: '',
            submitted: false
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
    }
    render() {
        return (
            <div class="outerBody">
            <LandingHeader />
            <div class="row justify-content-center">
            <div class="creditCardForm">
                <div class="heading">
                    <h1>Confirm Purchase</h1>
                </div>
                <div class="payment">
                    <form noValidate onSubmit={this.handleSubmit}>
                        <div class="form-group owner">
                            <label for="owner">Name</label>
                            <input
                                type="text"
                                class="form-control-sm col-sm-12"
                                id="owner"
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
                        <div class="form-group CVV">
                            <label for="cvv">CVV</label>
                            <input
                                type="number"

                                class="form-control-sm col-sm-12" id="cvv"
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
                        <div class="form-group" id="card-number-field">
                            <label for="cardNumber">Card Number</label>
                            <input
                                type="number"
                                class="form-control-sm col-sm-12"
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
                        <div class="form-group" id="expiration-date">
                                <label>Expiration Date</label>
                                <div class="form-group form-control-sm">
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
                            <div class="form-group" id="credit_cards">
                                <img src={visalogo} id="visa" />
                                <img src={masterlogo} id="mastercard" />
                                <img src={amexlogo} id="amex" />
                            </div>
                            <div class="form-group" id="pay-now">
                                <button type="submit" class="btn btn-default" id="confirm-purchase">Pay Now</button>
                            </div>
                    </form>
                </div>
            </div>
            </div>
            </div>
                )

            }
        }
export default Payment;