import React, { Component } from 'react';
import CommonHeader from '../header/CommonHeader';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../UserActivity/useractivity.css';
import './financialreport.css';
import { ToastContainer, toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as API from '../../api/API';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';

class SubscriptionReport extends Component {

    notify = (message) => toast(message);

    constructor(props) {
        super(props);

        this.state = {
            month: -1,
            category: 'Registered',
            customerList: []
        };

        this.getActiveUsersByMonth = this.getActiveUsersByMonth.bind(this);
        this.getActiveUserPlayBackByMonth = this.getActiveUserPlayBackByMonth.bind(this);
    }

    componentDidMount() {
        this.getActiveUsersByMonth('Registered');
    }

    changeCustomer(event) {
        this.setState({
            month: event.target.value
        });
        setTimeout(
            function () {
                console.log(this.state.month)
                if (this.state.category === 'Registered') {
                    this.getActiveUsersByMonth('Registered');
                } else if (this.state.category === 'Active') {
                    this.getActiveUserPlayBackByMonth('Active');
                } else if (this.state.category == 'Subscribed') {
                    this.getUsersBySubscriptionType('M', 'Subscribed')
                } else if (this.state.category === 'Pay-Per-View') {
                    this.getUsersBySubscriptionType('V,P', 'Pay-Per-View')
                }
            }.bind(this), 1000);
    }

    getActiveUsersByMonth(categoryType) {
        this.setState({ category: categoryType });
        API.getActiveUsersByMonth(this.state.month)
            .then((resultData) => {
                if (!!resultData.data) {
                    this.setState({
                        customerList: resultData.data
                    });
                } else {
                    this.setState({
                        customerList: []
                    });
                    console.log("No Users Available");
                }
            }).catch(error => {
                this.notify(error);
            });
    }

    getActiveUserPlayBackByMonth(categoryType) {
        this.setState({ category: categoryType });
        API.getActiveUserPlayBackByMonth(this.state.month)
            .then((resultData) => {
                if (!!resultData.data) {
                    this.setState({
                        customerList: resultData.data
                    });
                } else {
                    this.setState({
                        customerList: []
                    });
                    console.log("No Users Available");
                }
            }).catch(error => {
                this.notify(error);
            });
    }

    getUsersBySubscriptionType(subscriptionType, categoryType) {
        this.setState({ category: categoryType });
        API.getUsersBySubscriptionType(subscriptionType, this.state.month)
            .then((resultData) => {
                if (!!resultData.data) {
                    this.setState({
                        customerList: resultData.data
                    });
                } else {
                    this.setState({
                        customerList: []
                    });
                    console.log("No Users Available");
                }
            }).catch(error => {
                this.notify(error);
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
                                <h4 className="top-cust-header">User Categories : </h4>
                                <a className="nav-link page-header-emphasis link-pad-top"
                                    href="javascript:void(0);"
                                    onClick={() => { this.getActiveUsersByMonth('Registered') }}>Registered Users </a>
                                <a className="nav-link page-header-emphasis link-pad-top"
                                    href="javascript:void(0);"
                                    onClick={() => { this.getActiveUserPlayBackByMonth('Active') }}>Active Users </a>
                                <a className="nav-link page-header-emphasis link-pad-top"
                                    href="javascript:void(0);"
                                    onClick={() => { this.getUsersBySubscriptionType('M', 'Subscribed') }}>Subscribed Users</a>
                                <a className="nav-link page-header-emphasis link-pad-top"
                                    href="javascript:void(0);"
                                    onClick={() => { this.getUsersBySubscriptionType('V,P', 'Pay-Per-View') }}>Pay Per View</a>
                            </div>
                            <div className="row justify-content-center">
                                <h2 className="schedule-page-header"> {this.state.category} <span className="page-header-emphasis"> Customers</span></h2>
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
                            < ReactTable
                                minRows={0}
                                defaultPageSize={5}
                                noDataText="No Customers Found"
                                filterable={true}
                                pagination={true}
                                data={this.state.customerList}
                                columns={columns} />
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


export default connect(mapStateToProps, matchDispatchToProps)(SubscriptionReport);