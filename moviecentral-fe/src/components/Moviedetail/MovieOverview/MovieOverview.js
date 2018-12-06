import React, { Component } from 'react';
import './MovieOverview.css';
import Rating from 'react-rating';
import stargrey from './star-grey.png'
import staryellow from './staryellow.png'
import { connect } from "react-redux";
// import * as API from "../../../api/apicall_for_users"; Temporarily disabling API calls
import { playbackHistory } from "../../../api/API";
import MovieBox from '../MovieDetailBox/MovieDetailBox';
import MovieCrew from '../MovieCrew/MovieCrew';
import ReactPlayer from 'react-player'
import SubscriptionModal from "../../Subscription/SubscriptionModal";

class MovieOverview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avgrating: this.props.stars,
            totalrating: 0,
            showModal: false,
            movietype: "",
            isSubscribed: false,
            PaidForMovie: false,
            PPVpaidForMovie: false
        };

        this.onReady = this.onReady.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.movieStart = this.movieStart.bind(this);
    }

    // componentDidMount(){
    // Disabling API calls
    // API.getRatings(this.state)
    //     .then((result) => {
    //         this.setState({
    //             "avgrating":result.data.aggregates.avgrating,
    //             "totalrating":result.data.aggregates.totalrating,
    //         });
    //     })
    // }

    onReady() {
        var movietype = this.props.movie.availability;
        var userSubscription = this.props.user.userSubscriptions;

        var payPerViewUserSub = userSubscription.filter(sub => sub.subscriptionType === "V");
        var monthlySub = userSubscription.filter(sub => sub.subscriptionType === "M");
        var paidSub = userSubscription.filter(sub => sub.subscriptionType === "P");

        var isSubscribed = false;
        monthlySub.forEach((sub) => {
            if (new Date(sub.expiresOn) > new Date()) {
                isSubscribed = true;
            }
        })

        var PPVpaidForMovie = false;
        payPerViewUserSub.forEach((sub) => {
            if (sub.movieSubscriptionObj.movieId === this.props.movie.movieId && new Date(sub.expiresOn) > new Date()) {
                PPVpaidForMovie = true;
            }
        });

        var PaidForMovie = false;
        paidSub.forEach((sub) => {
            if (sub.movieSubscriptionObj.movieId === this.props.movie.movieId && new Date(sub.expiresOn) > new Date()) {
                PaidForMovie = true;
            }
        });

        
        if ((movietype === "PayPerViewOnly" && !PPVpaidForMovie)) {
            this.setState({
                showModal: true,
                movietype: movietype,
                isSubscribed: isSubscribed,
                PaidForMovie: PaidForMovie,
                PPVpaidForMovie: PPVpaidForMovie
            });
        }

        if ((movietype === "SubscriptionOnly" && !isSubscribed)) {
            this.setState({
                showModal: true,
                movietype: movietype,
                isSubscribed: isSubscribed,
                PaidForMovie: PaidForMovie,
                PPVpaidForMovie: PPVpaidForMovie
            });
        }

        if ((movietype === "Paid" && (isSubscribed || !PaidForMovie))) {
            this.setState({
                showModal: true,
                movietype: movietype,
                isSubscribed: isSubscribed,
                PaidForMovie: PaidForMovie,
                PPVpaidForMovie: PPVpaidForMovie
            });
        }
    }

    movieStart() {
        var movieObj = this.props.movie;
        playbackHistory({
            movieObj: { movieId: movieObj.movieId }
        }).then((result) => {
            console.error(result);
        })

    }

    hideModal() {
        this.setState({ showModal: false });
    }

    render() {
        return (

            <div className="container-fluid">
                <div className="movie-overview-layout">
                    <div className="movie-overview-layout-left">
                        <MovieBox />
                    </div>

                    <section id="SECTION_1">
                        <div id="DIV_2">
                            <div id="DIV_3">
                                <div id="DIV_4">
                                    <ReactPlayer
                                        url={this.props.movie.movieURL}
                                        height="125%"
                                        width="130%"
                                        onStart={this.movieStart}
                                        onReady={this.onReady}
                                    />
                                </div>
                            </div>

                        </div>
                    </section>


                </div>

                <SubscriptionModal
                    show={this.state.showModal}
                    onHide={this.hideModal}
                    movietype={this.state.movietype}
                    isSubscribed={this.state.isSubscribed}
                    PPVpaidForMovie={this.state.PPVpaidForMovie}
                    PaidForMovie={this.state.PaidForMovie}
                />
            </div>


        );
    }
}

function mapStateToProps(state) {
    return {
        movie: state.selectedMovie,
        user: state.loginUser
    }
}


export default connect(mapStateToProps)(MovieOverview);