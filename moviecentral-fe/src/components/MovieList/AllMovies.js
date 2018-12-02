import React, { Component } from 'react';
import HomeHeader from './../header/CommonHeader'
import MovieItem from './MovieItem/MovieItem'
import './AllMovies.css'
import {getAllMovies} from "../../api/API";
import Paging from './Paging/paging'
import {getNewPage} from "../../api/API";
import FilterForm from './FilterForm/FilterForm';

let Filter = () => (<svg aria-hidden="true" data-prefix="fas" data-icon="filter" className="svg-inline--fa fa-filter fa-w-16" role="img"
         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{height:'8px'}}>
        <path fill="currentColor"
              d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path>
    </svg>);
class All_Movies extends Component {
    constructor(props){
        super(props);
        this.state = {
            'currentPage':1,
            'filterMode':false,
            'filterData':{}
        }
    }

    componentDidMount(){
        getAllMovies().then((data) => {
            this.setState({...this.state,"content" : data.content, "totalPages":data.page.totalPages})
        })
    }

    pageChange(page){
        if(page !== this.state.currentPage){
            getNewPage(page-1).then((data) => {
                this.setState({...this.state,"content" : data.content, "currentPage":page})
            })
        }
    }

    prevPage(){
        if(this.state.currentPage-1>0){
            this.pageChange(this.state.currentPage-1)
        }
    }

    nextPage(){
        if(this.state.currentPage+1<=this.state.totalPages){
            this.pageChange(this.state.currentPage+1)
        }
    }

    handleFilterData(data){
        let query = [];
        for(let category in data){
            if(data.hasOwnProperty(category)){
                for(let j = 0; j<data[category].length; j++){
                    query.push(category + '=' + data[category][j])
                }
            }
        }
        debugger;
        encodeURI(query.join("&"));
    }
    render(){
        let moviedata = [];
        let paging = <Paging size={this.state.totalPages} current={this.state.currentPage}
                             onPageChange={(page)=>{this.pageChange(page)}}
                             onPrevPage={()=>{this.prevPage()}}
                             onNextPage={()=>{this.nextPage()}}
        />;
        if(this.state.content){
                for(var index in this.state.content){
                    let movie = this.state.content[index];
                    moviedata.push(<MovieItem quality = "HD" movie_id={movie.movieId}
                                              image={movie.image}
                                              title={movie.title}
                                              key = {movie.movieId}
                    />)
                }

        }else{
            moviedata.push(
                "Loading..."
            );
            paging = undefined
        }
        let filterformelement = undefined;
        if(this.state.filterMode){
            filterformelement = <FilterForm data={this.state.filterData} onSubmit={this.handleFilterData}/>;
        }else{
            filterformelement = "";
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
                                        <span id="FilterSPAN_1" onClick={()=>{this.setState({...this.state,'filterMode':(!this.state.filterMode)})}}>
                                            <Filter/> Filter
                                        </span>
                                        <h1 id="H1_1">
                                            Movies
                                        </h1>

                                        {filterformelement}

                                    </div>
                                    <div className={'widget-rachit-body'}>

                                        {paging}

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