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
    }

    componentDidMount() {
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
                        type="button"><b>{props.row._original.firstName + " "+ props.row._original.lastName}</b>
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
            Header: 'Created On',
            accessor: 'createdOn',
            style: { 'whiteSpace': 'unset', 'fontSize': '20px' },
            Cell: props => <span className='number'><Timestamp time={props.value} format='date' /></span>
        }]

        return (
            <div>
                <CommonHeader />
                <ToastContainer />
                <div className="row justify-content-center">
                    <div className=" col-md-12 page-header-container">
                        <div className="col-md-11 pd-left-0">
                            <h2 className="schedule-page-header">Total Number of  <span className="page-header-emphasis"> Customers</span></h2>
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