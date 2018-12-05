import React, { Component} from 'react';
import './MovieOverview.css';
import Rating from 'react-rating';
import stargrey from './star-grey.png'
import staryellow from './staryellow.png'
import {connect} from "react-redux";
// import * as API from "../../../api/apicall_for_users"; Temporarily disabling API calls
import MovieBox from '../MovieDetailBox/MovieDetailBox';
import MovieCrew from '../MovieCrew/MovieCrew';
import ReactPlayer from 'react-player'
import SubscriptionModal from "../../Subscription/SubscriptionModal";

class MovieOverview extends Component {

    constructor(props){
        super(props);
        this.state={
            avgrating: this.props.stars,
            totalrating: 0,
            showModal: false
        };

        this.movieStart = this.movieStart.bind(this);
        this.onReady = this.onReady.bind(this);
        this.hideModal = this.hideModal.bind(this);
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
        var userSubscription = new Set();

        // if (movietype === "PayPerViewOnly")

        // this.props.user.userSubscriptions.forEach(sub => {
        //     if (sub.subscriptionType === "V" && sub.movieSubscriptionObj.movieId === this.props.movie.movieId) {

        //         this.setState({ showModal: false });
        //     } else if() {

        //     }
        // });

        // debugger
        // if(movietype ==)
        
    }
 
    movieStart() {
        var movietype = this.props.movie.availability;
        var userSubscription = this.props.user.userSubscription;


        // debugger
    }

    hideModal() {
        this.setState({ showModal: false });

    }
 
    render(){
        let availability = this.props.movie.availability;
        if(!this.props.movie.availability || availability === ""){
            availability = "Paid"
        }
        return(

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
                
                <SubscriptionModal show={this.state.showModal} onHide={this.hideModal} />
            </div>

            
        );
    }
}

function mapStateToProps(state){
    return{
        movie: state.selectedMovie,
        user: state.loginUser
    }
}


export default connect(mapStateToProps)(MovieOverview);