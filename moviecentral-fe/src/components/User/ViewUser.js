import React, { Component } from 'react';
import CommonHeader from '../header/CommonHeader';
import { ToastContainer, toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as API from '../../api/API';
import './user.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';
const Timestamp = require('react-timestamp');


class ViewUser extends Component {

    notify = (message) => toast(message);

    constructor(props) {
        super(props);

        this.state = {
            userObj: {},
            userId: ''
        };
    }

    componentDidMount() {
        this.setState({
            userId: this.props.match.params.userId
        })
        API.getUserById(this.props.match.params.userId)
            .then((resultData) => {
                console.log("resultData :", resultData);
                if (!!resultData.data) {
                    this.setState({
                        userObj: resultData.data
                    });
                } else {
                    console.log("No such User Available");
                }
            }).catch(error => {
                this.notify(error);
            });
    }

    render() {
        const playBackcolumns = [{
            Header: 'Movie Name',
            accessor: 'movieObj',
            width: 250,
            style: { 'whiteSpace': 'unset' },
            Cell: props =>
                (<span className="visual-sub-title dark"
                    style={{ 'display': 'block', 'margin': 'auto' }}>
                    {props.row._original.movieObj.title}</span>)
        }, {
            Header: 'Genre',
            accessor: 'movieObj',
            width: 200,
            style: { 'whiteSpace': 'unset', 'fontSize': '20px' },
            Cell: props =>
                (<span className="visual-sub-title dark"
                    style={{ 'display': 'block', 'margin': 'auto' }}>
                    {props.row._original.movieObj.genre}</span>)
        }, {
            Header: 'Watch Time',
            accessor: 'movieObj',
            width: 250,
            style: { 'whiteSpace': 'unset', 'fontSize': '20px' },
            Cell: props => <span className='number'><Timestamp time={props.row._original.movieObj.timestamp} format='full' /></span>
        }]

        const subscriptioncolumns = [{
            Header: 'Movie Name',
            accessor: 'movieObj',
            width: 250,
            style: { 'whiteSpace': 'unset' },
            Cell: props =>
                (<span className="visual-sub-title dark"
                    style={{ 'display': 'block', 'margin': 'auto' }}>
                    {props.row._original.movieSubscriptionObj.title}</span>)
        }, {
            Header: 'Subscription Type',
            accessor: 'movieObj',
            width: 200,
            style: { 'whiteSpace': 'unset', 'fontSize': '20px' },
            Cell: props =>
                (<span className="visual-sub-title dark"
                    style={{ 'display': 'block', 'margin': 'auto' }}>
                    {props.row._original.subscriptionType}</span>)
        }, {
            Header: 'Duration',
            accessor: 'movieObj',
            width: 250,
            style: { 'whiteSpace': 'unset', 'fontSize': '20px' },
            Cell: props =>
                (<span className="visual-sub-title dark"
                    style={{ 'display': 'block', 'margin': 'auto' }}>
                    {props.row._original.duration}</span>)
        }]

        return (
            <div className="account-background">
                <CommonHeader />
                <div className="container">
                    <div className="responsive-account-container">
                        <h1 className="account-header">Account</h1>
                        <div className="account-messages-container">
                            <div className="ui-message-container ui-message-info">
                                <div className="ui-message-icon"><i className="fas fa-exclamation-circle"></i></div>
                                <div className="ui-message-contents">
                                    Your membership will be canceled at the end of your current billing period.
                                </div>
                            </div>
                        </div>
                        <div className="responsive-account-content">
                            <div className="account-section collapsable-panel clearfix membership-section-wrapper membership-section-with-button">
                                <header className="account-section-header collapsable-section-toggle">
                                    <h2 className="account-section-heading">PERSONAL INFORMATION</h2>
                                </header>
                                <section className="collapsable-section-content account-section-content collapsable-section-content-visible">
                                    <div className="account-subsection clearfix">
                                        <div className="clearfix">
                                            <div className="account-section-group">
                                                <div className="account-section-item account-section-email">
                                                    Email: shah.shreya.3012@gmail.com
                                                </div>
                                                <div className="account-section-item account-section-item-disabled">
                                                    Screen Name: Shreya Shah
                                                </div>
                                                <div className="account-section-item account-section-item-disabled">
                                                    Created On: <Timestamp time={this.state.userObj.createdOn} format='date' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="account-section collapsable-panel clearfix membership-section-wrapper membership-section-with-button">
                                <header className="account-section-header collapsable-section-toggle">
                                    <h2 className="account-section-heading">WATCH HISTORY INFORMATION</h2>
                                </header>
                                <section className="collapsable-section-content account-section-content collapsable-section-content-visible">
                                    <div className="account-subsection clearfix">
                                        <div className="clearfix">
                                            {/* <div className="account-section-group"> */}
                                            < ReactTable
                                                minRows={0}
                                                defaultPageSize={5}
                                                noDataText="No Playback History Found"
                                                filterable={true}
                                                pagination={true}
                                                data={this.state.userObj.userPlaybackHistory}
                                                columns={playBackcolumns} />
                                            {/* </div> */}
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="account-section collapsable-panel clearfix membership-section-wrapper membership-section-with-button">
                                <header className="account-section-header collapsable-section-toggle">
                                    <h2 className="account-section-heading">SUBSCRIPTION INFORMATION</h2>
                                </header>
                                <section className="collapsable-section-content account-section-content collapsable-section-content-visible">
                                    <div className="account-subsection clearfix">
                                        <div className="clearfix">
                                            < ReactTable
                                                minRows={0}
                                                defaultPageSize={5}
                                                noDataText="No Subscriptions Found"
                                                filterable={true}
                                                pagination={true}
                                                data={this.state.userObj.userSubscriptions}
                                                columns={subscriptioncolumns} />
                                        </div>
                                    </div>
                                </section>
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


export default connect(mapStateToProps, matchDispatchToProps)(ViewUser);