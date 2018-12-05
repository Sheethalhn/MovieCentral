import React, { Component } from 'react';
import './subscription.css';
import CommonHeader from '../header/CommonHeader';
import {Link} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userSubscription } from "../../actions";
const Timestamp = require('react-timestamp');



class Subscription extends Component {


    constructor(props) {
        super(props);
        this.state = {
            subscription_months: 1,
            total_amount: 10,
            subscription_type:"M"
        };
        this.submitSubscription = this.submitSubscription.bind(this);
        this.calculateSubscription = this.calculateSubscription.bind(this);
        // this.handleCancel = this.handleCancel.bind(this);
    }

    calculateSubscription = () => {
        console.log(this.props.user.userSubscriptions.length)
        for(var x=0;x<this.props.user.userSubscriptions.length;x++)
            { 
                var currentDate = new Date();
                if(this.props.user.userSubscriptions[x].subscriptionType == "M" && new Date(this.props.user.userSubscriptions[x].expiresOn) > currentDate)
                {
                    console.log(this.props.user.userSubscriptions[x].expiresOn);
                    return this.props.user.userSubscriptions[x].expiresOn;
                }
                
            }
            return null;
    }

    submitSubscription = () => {
        this.props.history.push({
            pathname:"/payment"
        //     state : {
        //         subscription_months : this.state.subscription_months,
        //         subscription_type : this.state.subscription_type

        // }
    })
    //this.props.userSubscription(this.state.subscription_months,this.state.subscription_type);
    this.props.userSubscription(this.state);
    console.log(this.props.userSubscription)

}
handleCancel(){
    this.props.history.push("/home");
}
    render() {
        var header =this.calculateSubscription();
        var display;
        if(header != null)
          display= <h4 className="my-0 font-weight-normal">Subscription ends Date: <Timestamp time={header} format='full' />  </h4>
        else
          display= <h4 className="my-0 font-weight-normal">Please start your subscription</h4>

          return (
            <div className="subscription-body">
                <CommonHeader />
                <div className="container-fluid">
                    <br /><br />
                    <div className="container col-md-4">
                        {display}
                        <br /><br />
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
                                <div className="card-footer">
                                    <button type="button"  disabled={this.calculateSubscription() != null} className="btn btn-lg btn-block btn-danger" onClick={this.submitSubscription}>Buy For {this.state.total_amount}.00$</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.loginUser,
        subscription : state.userSubscription
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({userSubscription: userSubscription}, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(Subscription);