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

class TopMovies extends Component {

    notify = (message) => toast(message);

    constructor(props) {
        super(props);

        this.state = {
            movieList: []
        };

        this.fetchTopMovies = this.fetchTopMovies.bind(this);
        this.handleDefault = this.handleDefault.bind(this);
    }

    componentDidMount() {
        this.handleDefault()
    }

    handleDefault() {
        this.fetchTopMovies('last24hrs')
    }

    fetchTopMovies(time) {
        console.log(this.state.movieList)
        API.getTopMoviesBasedOnTime(time)
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
            style: { 'whiteSpace': 'unset', 'fontSize': '20px', 'textAlign': 'center' }
        }, {
            Header: 'Availability Type',
            accessor: 'availability',
            style: { 'whiteSpace': 'unset', 'fontSize': '20px', 'textAlign': 'center' }
        }, {
            Header: '# of times Played',
            accessor: 'playCount',
            style: { 'whiteSpace': 'unset', 'fontSize': '20px', 'textAlign': 'center' }

        }]

        return (
            <div>
                <CommonHeader />
                <div id="wrapper" className="toggled">
                    <div id="sidebar-wrapper">
                        <Sidebar />
                    </div>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <div className="row justify-content-center">
                                <div className=" col-md-12 page-header-container">
                                    <div className="col-md-11 pd-left-0">
                                        <div className="row justify-content-center">
                                            <h4 className="top-cust-header">Top 10 movies  : </h4>
                                            <a className="nav-link page-header-emphasis link-pad-top"
                                                href="javascript:void(0);"
                                                onClick={() => { this.fetchTopMovies('last24hrs') }}>Last 24 hours </a>
                                            <a className="nav-link page-header-emphasis link-pad-top"
                                                href="javascript:void(0);"
                                                onClick={() => { this.fetchTopMovies('lastweek') }}>Last week</a>
                                            <a className="nav-link page-header-emphasis link-pad-top"
                                                href="javascript:void(0);"
                                                onClick={() => { this.fetchTopMovies('lastmonth') }}>Last Month</a>
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


export default connect(mapStateToProps, matchDispatchToProps)(TopMovies);