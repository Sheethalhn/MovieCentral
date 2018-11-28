import React, { Component } from 'react';
import './MovieItem.css'

class MovieItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="MovieItemDIV_1">
                <div id="MovieItemDIV_2">
                    <div id="MovieItemDIV_3">
                        HD
                    </div>

                    <a href="/film/high-resolution.4j60o" id="MovieItemA_4">
                        <img src="https://static.akacdn.ru/static/images/2018/10/0f46b27c4176ea7dd025acd25e6f8814.jpg" alt="High Resolution | Bmovies" id="MovieItemIMG_5" />
                    </a>

                    <a href="/film/high-resolution.4j60o" id="MovieItemA_6">
                        High Resolution
                    </a>
                </div>
            </div>
        )
    }
}

export default MovieItem