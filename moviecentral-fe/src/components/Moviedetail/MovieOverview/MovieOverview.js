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


class MovieOverview extends Component {

    constructor(props){
        super(props);
        this.state={
            avgrating: this.props.stars,
            totalrating: 0
        }
        this.movieStart = this.movieStart.bind(this);
    }

    componentDidMount(){
        // Disabling API calls
        // API.getRatings(this.state)
        //     .then((result) => {
        //         this.setState({
        //             "avgrating":result.data.aggregates.avgrating,
        //             "totalrating":result.data.aggregates.totalrating,
        //         });
        //     })
    }

    movieStart() {
        debugger
    }

    render(){
        let availability = this.props.movie.availability;
        if(!this.props.movie.availability || availability === ""){
            availability = "Paid"
        }

        return(

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
                                />
                            </div>
                        </div>

                    </div>
                </section>


            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        movie: state.selectedMovie
    }
}


export default connect(mapStateToProps)(MovieOverview);