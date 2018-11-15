import React, { Component } from 'react';
import './subscription.css';
import LandingHeader from '../header/LandingHeader';
import {Link} from 'react-router-dom';


class Subscription extends Component {


    constructor(props) {
        super(props);
        this.state = {
            subscription_months: 1,
            total_amount: 10
        };
    }
    render() {

        return (
            <div className="subscription-body">
                <LandingHeader />
                <div id="container">
                    <div className="whole">
                        <div className="type standard">
                            <p>Standard</p>
                        </div>
                        <div className="plan">

                            <div className="header">
                                <span>$</span>10<sup>00</sup>
                                <p className="month">per month</p>
                            </div>
                            <div className="content">
                                <ul>
                                    <li>Unlimited Movie Streaming</li>
                                    <li>50% Discounts on Premium Movies </li>
                                    <li
                                        value={this.state.subscription_months}
                                        onChange={(event) => {
                                            this.setState({
                                                subscription_months: event.target.value,
                                                total_amount: 10 * event.target.value
                                            });
                                        }}>
                                        <label>Select Months : <select>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select></label>
                                    </li>
                                    <li>
                                        Total Amount : $ {this.state.total_amount}
                                    </li>
                                    <li>
                                        <div className="form-group" id="pay-now">
                                        <Link to="/payment">
                                            <button type="submit" className="btn btn-default" id="confirm-purchase">Purchase</button>
                                        </Link>
                                        <button type="button" className="btn btn-default" id="cancel-purchase">Back</button>
                                        </div>
                                    </li>
                                </ul>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Subscription;