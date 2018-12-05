import React, { Component } from 'react';
import CommonHeader from '../header/CommonHeader';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './MovieActivity.css';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as API from '../../api/API';
import Sidebar from "../admin/dashboard/Sidebar";

class AllMoviesActivity extends Component {

    notify = (message) => toast(message);

    constructor(props) {
        super(props);

        this.state = {
            movieList: []
        };

        this.fetchAllMovies = this.fetchAllMovies.bind(this);
    }

    componentDidMount() {

    }

    fetchAllMovies(time) {
        API.getAllMoviesBasedOnTime(time)
            .then((resultData) => {
                if (!!resultData.data) {
                    console.log(resultData.data)
                    this.setState({
                        movieList: resultData.data
                    });
                } else {
                    this.setState({
                        movieList: []
                    });
                    console.log("No Movies Available");
                }
            }).catch(error => {
                this.notify(error);
            });
    }

    render() {
        const columns = [{
            Header: 'Movie Name',
            accessor: 'title',
            width: 250,
            style: { 'whiteSpace': 'unset' }
        }, {
            Header: 'Availability Type',
            accessor: 'availability',
            style: { 'whiteSpace': 'unset', 'fontSize': '20px' }
        }, {
            Header: '# of times Played',
            accessor: 'playCount',
            style: { 'whiteSpace': 'unset', 'fontSize': '20px' }
        }]

        return (
            <div>
                <CommonHeader />
                <div id="sidebar-wrapper">
                    <Sidebar />
                </div>
                <div className="row justify-content-center">
                    <div className=" col-md-12 page-header-container">
                        <div className="col-md-11 pd-left-0">
                            <div className="row justify-content-center">
                                <h4 className="top-cust-header">Select time range to view Movie play report  : </h4>
                                <a className="nav-link page-header-emphasis link-pad-top"
                                    href="javascript:void(0);"
                                    onClick={() => { this.fetchAllMovies('last24hrs') }}>Last 24 hours </a>
                                <a className="nav-link page-header-emphasis link-pad-top"
                                    href="javascript:void(0);"
                                    onClick={() => { this.fetchAllMovies('lastweek') }}>Last week</a>
                                <a className="nav-link page-header-emphasis link-pad-top"
                                    href="javascript:void(0);"
                                    onClick={() => { this.fetchAllMovies('lastmonth') }}>Last Month</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 pd-left-0">
                        <div className="col-md-12 pd-left-0">
                            < ReactTable
                                minRows={2}
                                defaultPageSize={5}
                                noDataText="No Movies Found"
                                pagination={true}
                                data={this.state.movieList}
                                columns={columns} />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {

}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(AllMoviesActivity);