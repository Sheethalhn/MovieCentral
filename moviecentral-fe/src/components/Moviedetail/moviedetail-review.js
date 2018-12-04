import React, { Component} from 'react';
import HomeHeader from '../header/CommonHeader';
import './moviedetail.css'
import MovieReview from "./MovieOverview/MovieReview";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

import {bindActionCreators} from "redux";

class Movie_detail_review extends Component {

    constructor(props){
        super(props);
    }

    render(){
        let background = "//images.fandango.com/ImageRenderer/300/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/207628/fmc_mc_Rampage.jpg";
        if(this.props.movie.image)background =  this.props.movie.image;

        return(

            <div>
                <HomeHeader/>
                <div className="movie-detail-main">
                    <div className="movie-detail-mop">
                        <div className="movie-detail-background">
                            <svg width="100%" height="100%">
                                <defs>
                                    <filter id="backgroundBlur" width="150%" height="150%" x="-25%" y="-25%"
                                            color-interpolation-filters="sRGB">
                                        <feGaussianBlur stdDeviation="7"></feGaussianBlur>
                                        <feColorMatrix type="matrix"
                                                       values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0 0 0 0 10 0"></feColorMatrix>
                                        <feComposite in2="SourceGraphic" operator="in"></feComposite>
                                    </filter>
                                </defs>
                                <image className="js-backgroundBlur-image" x="0" y="0" width="100%" height="110%"
                                       xlinkHref={background}
                                       preserveAspectRatio="xMidYMid slice" filter="url(#backgroundBlur)"></image>
                            </svg>
                        </div>
                        <div className="movie-detail-background-next">
                            <section className="movie-detail-subnav">
                                <div className="movie-detail-section-row">
                                    <div className="movie-detail-section-row-100">
                                        <h1 className="movie-detail-section-row-title">



                                            {this.props.movie.title} <span style={{ color: "#F15500"}}> REVIEW + RATINGS</span>





                                        </h1>
                                        <ul className="movie-detail-section-subnav">
                                            <li className="movie-detail-section-subnav-item">
                                                <Link to="/moviedetail" className="movie-detail-section-subnav-item-link">
                                                    Overview
                                                </Link>
                                            </li>
                                            {/*<li className="movie-detail-section-subnav-item">*/}
                                                {/*<Link to="/movietickets" className="movie-detail-section-subnav-item-link">*/}
                                                    {/*Movie Times + tickets*/}
                                                {/*</Link>*/}
                                            {/*</li>*/}
                                            <li className="movie-detail-section-subnav-item">
                                                <Link to="/moviedetailreview" className="movie-detail-section-subnav-item-link">
                                                    REVIEWS
                                                </Link>
                                            </li>
                                            <li className="movie-detail-section-subnav-item">
                                                <Link to="moviedetailcrew" className="movie-detail-section-subnav-item-link">
                                                    CAST
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                            <MovieReview/>

                        </div>
                    </div>
                </div>
            </div>);
    };
}

function mapStateToProps(state){
    return{
        movie: state.selectedMovie,
    }
}


export default connect(mapStateToProps,null)(Movie_detail_review);