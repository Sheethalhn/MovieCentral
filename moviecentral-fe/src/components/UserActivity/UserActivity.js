import React, { Component } from 'react';
import CommonHeader from '../header/CommonHeader';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './useractivity.css';
import { ToastContainer, toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as API from '../../api/API';
import { Link } from 'react-router-dom';
const Timestamp = require('react-timestamp');

class UserActivity extends Component {

    notify = (message) => toast(message);

    constructor(props) {
        super(props);

        this.state = {
            customerList: []
        };

        this.fetchTopUsers = this.fetchTopUsers.bind(this);
        this.getAllCustomers = this.getAllCustomers.bind(this);
    }

    componentDidMount() {
        this.getAllCustomers();
    }

    getAllCustomers() {
        API.getAllActiveUsers()
            .then((resultData) => {
                if (!!resultData.data) {
                    this.setState({
                        customerList: resultData.data
                    });
                } else {
                    console.log("No Users Available");
                }
            }).catch(error => {
                this.notify(error);
            });
    }

    fetchTopUsers(time) {
        API.getTopUsersBasedOnTime(time)
            .then((resultData) => {
                if (!!resultData.data) {
                    console.log(resultData.data)
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
                                <h4 className="top-cust-header">Most Played Movie Top 10 Customers : </h4>
                                <a className="nav-link page-header-emphasis link-pad-top"
                                    href="javascript:void(0);"
                                    onClick={() => { this.getAllCustomers() }}>All </a>
                                <a className="nav-link page-header-emphasis link-pad-top"
                                    href="javascript:void(0);"
                                    onClick={() => { this.fetchTopUsers('last24hrs') }}>Last 24 hours </a>
                                <a className="nav-link page-header-emphasis link-pad-top"
                                    href="javascript:void(0);"
                                    onClick={() => { this.fetchTopUsers('lastweek') }}>Last week</a>
                                <a className="nav-link page-header-emphasis link-pad-top"
                                    href="javascript:void(0);"
                                    onClick={() => { this.fetchTopUsers('lastmonth') }}>Last Month</a>
                            </div>
                            <h2 className="schedule-page-header">Valuable All <span className="page-header-emphasis"> Customers</span></h2>
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


export default connect(mapStateToProps, matchDispatchToProps)(UserActivity);