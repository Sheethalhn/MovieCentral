import React, { Component } from 'react';
import CommonHeader from '../header/CommonHeader';
import 'react-table/react-table.css';
import '../UserActivity/useractivity.css';
import './financialreport.css';
import { ToastContainer, toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as API from '../../api/API';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';

class IncomeReport extends Component {

    notify = (message) => toast(message);

    constructor(props) {
        super(props);

        this.state = {
            month: -1,
            subscribedIncome: 0,
            payperviewIncome: 0,
            totalIncome: 0,
            Data: {},
            chartData: []
        };

        this.getMonthlySubscriptionIncome = this.getMonthlySubscriptionIncome.bind(this);
        this.getMonthlyPayPerViewIncome = this.getMonthlyPayPerViewIncome.bind(this);
    }

    componentDidMount() {
        this.setState({ chartData: [] });
        this.getMonthlyPayPerViewIncome().then(() => {
            this.getMonthlySubscriptionIncome().then(() => {
                console.log(this.state.chartData)
                this.setState({
                    totalIncome: this.state.subscribedIncome + this.state.payperviewIncome,
                    Data: {
                        labels: ['Pay-Per-View Income', 'Subscribed Income'],
                        datasets: [
                            {
                                label: 'Monthly Income',
                                data: this.state.chartData,
                                backgroundColor: [
                                    'rgba(255,105,145,0.6)',
                                    'rgba(155,100,210,0.6)'
                                ],
                                fill: false
                            }
                        ]
                    }
                });
            }).catch(error => {
            });
        }).catch(error => {
        });
    }

    changeCustomer(event) {
        this.setState({
            month: event.target.value
        });
        setTimeout(
            function () {
                console.log(this.state.month)
                this.setState({ chartData: [] });
                this.getMonthlyPayPerViewIncome().then(() => {
                    this.getMonthlySubscriptionIncome().then(() => {
                        console.log(this.state.chartData)
                        this.setState({
                            totalIncome: this.state.subscribedIncome + this.state.payperviewIncome,
                            Data: {
                                labels: ['Pay-Per-View Income', 'Subscribed Income'],
                                datasets: [
                                    {
                                        label: 'Monthly Income',
                                        data: this.state.chartData,
                                        backgroundColor: [
                                            'rgba(255,105,145,0.6)',
                                            'rgba(155,100,210,0.6)'
                                        ],
                                        fill: false
                                    }
                                ]
                            }
                        });
                    }).catch(error => {
                    });
                }).catch(error => {
                });
            }.bind(this), 1000);
    }

    getMonthlySubscriptionIncome() {
        return new Promise((resolve, reject) => {
            API.getMonthlySubscriptionIncome(this.state.month)
                .then((resultData) => {
                    if (!!resultData.data) {
                        this.setState({
                            subscribedIncome: resultData.data
                        });
                        this.state.chartData.push(resultData.data);
                        resolve();
                    } else {
                        this.setState({
                            subscribedIncome: 0
                        });
                        this.state.chartData.push(resultData.data);
                        console.log("No Subscribed Income Available");
                        resolve();
                    }
                }).catch(error => {
                    this.notify(error);
                    return reject();
                });
        });
    }

    getMonthlyPayPerViewIncome() {
        return new Promise((resolve, reject) => {
            API.getMonthlyPayPerViewIncome(this.state.month)
                .then((resultData) => {
                    if (!!resultData.data) {
                        this.setState({
                            payperviewIncome: resultData.data
                        });
                        this.state.chartData.push(resultData.data);
                        resolve();
                    } else {
                        this.setState({
                            payperviewIncome: 0
                        });
                        console.log("No Pay-Per-View Income Available");
                        this.state.chartData.push(resultData.data);
                        resolve();
                    }
                }).catch(error => {
                    this.notify(error);
                    return reject();
                });
        });
    }

    render() {
        const columns = [{
            Header: 'Customer Name',
            accessor: 'firstName',
            width: 250,
            style: { 'whiteSpace': 'unset' },
            Cell: props =>

                (<div className="user-name"><Link to={'/viewuser/' + props.row._original.userId}>
                    <button
                        className="btn btn-link user-name"
                        type="button"><b>{props.row._original.firstName + " " + props.row._original.lastName}</b>
                    </button>
                </Link>
                </div>)
        }, {
            Header: 'Customer Email',
            accessor: 'email',
            style: { 'whiteSpace': 'unset', 'fontSize': '20px' },
            Cell: props => (
                <span className="visual-sub-title dark"
                    style={{ 'display': 'block', 'margin': 'auto' }}>
                    {props.row._original.email}</span>)
        }, {
            Header: '# of Movie Played',
            accessor: 'createdOn',
            style: { 'whiteSpace': 'unset', 'fontSize': '20px' },
            Cell: props => (
                <span className="visual-sub-title dark"
                    style={{ 'display': 'block', 'margin': 'auto' }}>
                    {props.row._original.userPlaybackHistory.length}</span>)
        }]

        return (
            <div>
                <CommonHeader />
                <ToastContainer />

                <div className="row justify-content-center">
                    <div className=" col-md-12 page-header-container">
                        <div className="col-md-11 pd-left-0">
                            <div className="row justify-content-center">
                                <h2 className="schedule-page-header">
                                    <span className="page-header-emphasis"> Income </span>
                                </h2>
                                <select className="col-2 custom-select month-select"
                                    value={this.state.month}
                                    onChange={(event) => {
                                        this.changeCustomer(event);
                                    }}>>
                                    <option value="-1">All</option>
                                    <option value="0">January</option>
                                    <option value="1">February</option>
                                    <option value="2">March</option>
                                    <option value="3">April</option>
                                    <option value="4">May</option>
                                    <option value="5">June</option>
                                    <option value="6">July</option>
                                    <option value="7">August</option>
                                    <option value="8">September</option>
                                    <option value="9">October</option>
                                    <option value="10">November</option>
                                    <option value="11">December</option>
                                </select>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-9 pd-left-0">
                        <div className="col-md-12 pd-left-0">
                            <div className="col-md-6">
                                <Pie
                                    width={520}
                                    height={250}
                                    data={this.state.Data}
                                    options={{
                                        maintainAspectRatio: false,
                                        legend: {
                                            position: 'left',
                                            labels: {
                                                boxWidth: 10
                                            }
                                        }
                                    }} />
                            </div>
                            <div className="col-12 clearfix">
                                <a className="nav-link page-header-emphasis a-float-left"
                                    href="javascript:void(0);"> Monthly Subscribed Income: ${this.state.subscribedIncome} </a><br />
                            </div>
                            <div className="col-12 clearfix">
                                <a className="nav-link page-header-emphasis a-float-left"
                                    href="javascript:void(0);">Monthly Pay-Per-View Income: ${this.state.payperviewIncome} </a><br />
                            </div>
                            <div className="col-12 clearfix">
                                <a className="nav-link page-header-emphasis a-float-left"
                                    href="javascript:void(0);">Monthly Total Income: ${this.state.totalIncome}</a><br />
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
        user: state.loginUser
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(IncomeReport);