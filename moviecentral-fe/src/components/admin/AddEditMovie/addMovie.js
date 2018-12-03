import React, { Component } from 'react';
import CommonHeader from '../../header/CommonHeader';
import Sidebar from "../Dashboard/Sidebar";
import FullMovieForm from "./FullMovieForm";

class AddMovie extends Component {
    render() {
        return (
            <div className="container-body admin-dashboard" id="outer-container">
                <div className="admin">
                    <CommonHeader />
                </div>

                <div id="wrapper" className="toggled">
                    <div id="sidebar-wrapper">
                        <Sidebar />
                    </div>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <FullMovieForm />
                        </div>
                    </div>
                </div>
            </div>    
        );
    }
}

export default AddMovie;