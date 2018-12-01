import React, { Component } from 'react';
import HomeHeader from './../header/CommonHeader'
import MovieItem from './MovieItem/MovieItem'
import './AllMovies.css'
import {getAllMovies} from "../../api/API";

class All_Movies extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        getAllMovies().then((data) => {
            this.setState({...this.state,"content" : data.content})
        })
    }

    render(){
        let moviedata = [];
        if(this.state.content){
                for(var index in this.state.content){
                    let movie = this.state.content[index];
                    moviedata.push(<MovieItem quality = "HD" movie_id={movie.movieId}
                                              image={movie.image}
                                              title={movie.title}
                    />)
                }

        }else{
            moviedata.push(
                "Loading..."
            )
        }
        return(
            <div>
                    <div>
                        <HomeHeader/>
                    </div>
                    <div>
                        <div id="DIV_1">
                            <form method="get" action="https://www4.fmovies.to/search" id="FORM_2">
                                <input type="text" name="keyword" placeholder="Enter keywords here" id="INPUT_3" />
                                <button type="submit" id="BUTTON_4">
                                    {/*<i id="I_5" className={"fa fa-search"}></i>*/}
                                </button>
                                <div id="DIV_6">
                                </div>
                            </form>
                        </div>
                        <div className={'body-wrapper'}>
                            <div className={'container'}>
                                <div className={'widget-rachit'}>
                                    <div className={'widget-rachit-title'}>
                                        <h1 id="H1_1">
                                            Movies
                                        </h1>

                                    </div>
                                    <div className={'widget-rachit-body'}>


                                        <div className={'widget-rachit-row-movie-list'}>
                                            <div className={'widget-rachit-row-movie-list'}>
                                            {moviedata}
                                            </div>
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

export default All_Movies;