import React, { Component } from 'react';
import './MovieItem.css'

class MovieItem extends Component{
    constructor(props){
        super(props);
        this.state = {
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

                    <a href="/film/high-resolution.4j60o" id="MovieItemA_4">
                        <img src={this.props.image} alt={this.props.title + " | MVC"} id={this.props.movie_id} />
                    </a>

                    <a href="/film/high-resolution.4j60o" id="MovieItemA_6">
                        {this.props.title}
                    </a>
                </div>
            </div>
        )
    }
}

export default MovieItem