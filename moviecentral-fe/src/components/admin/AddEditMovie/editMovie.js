import React, { Component } from 'react';
import CommonHeader from '../../header/CommonHeader';
import Sidebar from "../dashboard/Sidebar";
import FullMovieForm from "./FullMovieForm";
import { getOneMovie } from "../../../api/API";




class AddMovie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: {}
        }
    }

    componentDidMount() {
        const { match } = this.props;
        getOneMovie(match.params.id).then((movie) => {
            this.setState({movie})
        })
    }

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
                            <div id="FullMovieForm" className="admin-sub-header">
                                <h2>Edit {this.state.movie.title}</h2>
                                <br />
                                <FullMovieForm movie={this.state.movie} type="edit"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddMovie;