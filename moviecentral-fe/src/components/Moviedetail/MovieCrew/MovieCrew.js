import React, { Component} from 'react';
import './MovieCrew.css'
import Rating from 'react-rating';
import stargrey from './../MovieOverview/star-grey.png'
import staryellow from './../MovieOverview/staryellow.png'
import {connect} from "react-redux";
import MovieBox from "./../MovieDetailBox/MovieDetailBox"

class MovieCrew extends Component {

    constructor(props){
        super(props);
    }

    renderCast(){
        var i=0;
        var arr = this.props.movie.actors;
        var result = [];

        for(i=0;i<arr.length;i++){
            result.push(<h6 key={i} className="crew-font">{arr[i]['name']}</h6>)
        }
        return result;
    }


    render(){

        return(
            <div className="movie-overview-layout" style={{ height: '100%'}}>
                <div className="movie-overview-layout-left">
                    <MovieBox />
                </div>

                <section id="SECTION_1">
                    <div id="DIV_2">
                        <div id="DIV_3">
                            <div id="DIV_4">
                                <div className="crew-info" >
                                    <h3 className="crew-font"> CREW DETAILS</h3>
                                    <h4 className="crew-font"> Director </h4>
                                    <h6 className="crew-font"> {this.props.movie.director} </h6>
                                    <h4 className="crew-font"> Actors </h4>
                                    {this.renderCast()}

                                </div>
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


export default connect(mapStateToProps,null)(MovieCrew);