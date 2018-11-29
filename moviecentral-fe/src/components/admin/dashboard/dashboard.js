import React, { Component } from 'react';
import CommonHeader from '../../header/CommonHeader';
import { withRouter } from 'react-router-dom';
import './dashboard.css';

import AddMovie from "../addMovie/addMovie";
// import Search from './Search';
// import NavBar from './Navigation';
// import { DropdownButton, MenuItem } from 'react-bootstrap';
// import './admin.css';
// import '../MovieHall/subheader.css';


class Dashboard extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         dropdownTitle: 'Select'
    //     }
    //     this.handleSelect = this.handleSelect.bind(this);
    // }

    // handleSelect(event) {
    //     if (event === "1") {
    //         this.setState({
    //             dropdownTitle: 'Movies'
    //         })
    //     } else if (event === "2") {
    //         this.setState({
    //             dropdownTitle: 'Theatres'
    //         })
    //     }
    // }

    // render(renderDropdownButton) {
    render() {
        return (
            <div className="container-body admin-dashboard" id="outer-container">
                <div className="admin">
                    <CommonHeader />
                </div>

                <div id="wrapper">
                    <div id="sidebar-wrapper">
                        <ul className="sidebar-nav">
                            <li>
                                <a href="#">Add Movie</a>
                            </li>
                            <li>
                                <a href="#">Edit Movie</a>
                            </li>
                            <li>
                                <a href="#">User Activity</a>
                            </li>
                            <li>
                                <a href="#">Movie Acitvity Report</a>
                            </li>
                            <li>
                                <a href="#">Financial Report</a>
                            </li>
                        </ul>
                    </div>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <AddMovie/>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Dashboard);