import React, { Component } from 'react';
import './subscription.css';
import CommonHeader from '../header/CommonHeader';
import {Link} from 'react-router-dom';


class Subscription extends Component {


    constructor(props) {
        super(props);
        this.state = {
            subscription_months: 1,
            total_amount: 10,
            subscription_type:"M"
        };
        this.submitSubscription = this.submitSubscription.bind(this);
        // this.handleCancel = this.handleCancel.bind(this);
    }
    submitSubscription = () => {
        this.props.history.push({
            pathname:"/payment",
            state : {
                subscription_months : this.state.subscription_months,
                subscription_type : this.state.subscription_type

            }
        })
    }
// handleCancel(){
//     this.props.history.push("/home");
// }
    render() {

        return (
            <div className="subscription-body">
                <CommonHeader />
                <div className="container-fluid">
                    <br /><br />
                    <div className="container col-md-4">

                        <div className="card-deck mb-3 text-center">
                            <div className="card text-white mb-3">
                                <div className="card-header bg-danger">
                                    <h4 className="my-0 font-weight-normal">Standard Plan</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">$10.00 <small className="text-muted">/ mo</small></h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>Unlimited Movie Streaming</li>
                                        <li>50% Discounts on Premium Movies </li>
                                        <li>24/7 Customer Support</li>
                                        <br/>
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
                                    </ul>
                                    
                                </div>
                                <div class="card-footer">
                                    <button type="button" className="btn btn-lg btn-block btn-danger" onClick={this.submitSubscription}>Buy For {this.state.total_amount}.00$</button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>    
            </div>

        )
    }
}

export default Subscription;