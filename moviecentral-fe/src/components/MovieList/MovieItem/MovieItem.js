import React, { Component } from 'react';
import './MovieItem.css'

class MovieItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            movieId: this.props.movie_id ? this.props.movie_id : null,
            quality: (this.props.quality? this.props.quality : "HD")
        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <div id="MovieItemDIV_1">
                <div id="MovieItemDIV_2">

                    <div id="MovieItemDIV_3">
                        {this.state.quality}
                    </div>

                    <div id="MovieItemA_4">
                        <img src={this.props.image} alt={this.props.title + " | MVC"} id={this.props.movie_id}
                             style={{'maxWidth':'100%'}}
                        />}
                        {<img  style={{'maxWidth':'100%'}} src="/default-movie.jpg" alt="Default Movie"/>}
                    </div>

                    <div id="MovieItemA_6">
                        {this.props.title}
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieItem