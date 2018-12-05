import React, { Component } from "react"
import { Modal } from "react-bootstrap";
import "./subscription.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { userSubscription } from "../../actions";
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
    return {
        user: state.loginUser,
        movie: state.selectedMovie,
        subscription: state.userSubscription
    }
}

class SubscriptionModal extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            subscription_months: 0,
            total_amount: 10,
            subscription_type: null,
            redirect: false,
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    
    handleClose() {
        this.setState({ 
            show: false ,
            redirect: "/browse"
        });
    }
    handleShow() {
        this.setState({ 
            show: true 
        });
    }

    subscribe(type) {
        if(type === "pay" && this.props.movietype === "PayPerViewOnly") {
            
            this.props.userSubscription({
                subscription_months: this.state.subscription_months,
                subscription_type: "V"
            });
            this.setState({
                redirect:'/payment'
            })
            
            // this.props.subscription.subscription_months=this.state.subscription_months;
            // this.props.subscription.subscription_type="V";
        } else if(this.props.movietype !== "Free" && type === "pay") {
            
            this.props.userSubscription({
                subscription_months: this.state.subscription_months,
                subscription_type: "P"
            });
            this.setState({
                redirect:'/payment'
            })
            // this.setState({
            //     subscription_months: this.state.subscription_months,
            //     subscription_type: "P"
            // })
            // this.props.subscription.subscription_months=this.state.subscription_months;
            // this.props.subscription.subscription_type="P";
        } else if(type = "sub") {
            this.props.userSubscription({
                subscription_months: this.state.subscription_months,
                subscription_type: "M"
            });
            this.setState({
                redirect:'/payment'
            })

            // this.setState({
            //     subscription_months: this.state.subscription_months,
            //     subscription_type: "M"
            // })
            // this.props.subscription.subscription_months=this.state.subscription_months;
            // this.props.subscription.subscription_type="M";
        }
    }

    render() {
        if(this.state.subscription_type !== null) {
            return (<Redirect to={this.state.redirect} />);
        } else if (this.state.show === false && this.state.redirect === true) {
            return (<Redirect to={this.state.redirect} />);
        }
        return (
            <Modal
                {...this.props}
                onHide={this.handleClose}
                dialogClassName="custom-modal-class text-center bg-dark"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                        Please Buy To Continue Watching
                    </Modal.Title>
                </Modal.Header>

                {!this.props.isSubscribed && this.props.movietype !== "PayPerViewOnly" &&
                    <Modal.Body>
                        <div className="container-fluid">
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
                                            <br />
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
                                    <button type="button" className="btn btn-lg btn-block btn-danger" onClick={this.subscribe.bind(this, "sub")}>Buy For {this.state.total_amount}.00$</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                }
                {this.props.movietype === "PayPerViewOnly" && this.props.movietype !== "Paid" &&
                    <Modal.Footer>
                    <button type="button" className="btn btn-lg btn-block btn-warning text-dark" onClick={this.subscribe.bind(this, "pay")}>
                            Watch {this.props.movie.title} for {this.props.movie.price}$ One Time Only
                        </button>
                    </Modal.Footer>
                }
            </Modal>

        )
    }

}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({userSubscription: userSubscription}, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(SubscriptionModal)