import React, { Component } from 'react';
import HomeHeader from './../header/CommonHeader'
import MovieItem from './MovieItem/MovieItem'
import './AllMovies.css'
import { getAllMovies, getFilterMovies, getNewPage, getTopMoviesBasedOnTime } from "../../api/API";
import Paging from './Paging/paging'
import FilterForm from './FilterForm/FilterForm';
import { selectedMovie } from "../../actions";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';
import Suggestions from './Suggestions/suggestions';

let Filter = () => (<svg aria-hidden="true" data-prefix="fas" data-icon="filter" className="svg-inline--fa fa-filter fa-w-16" role="img"
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ height: '8px' }}>
    <path fill="currentColor"
        d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path>
</svg>);
class All_Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'currentPage': 1,
            'filterMode': false,
            'filterState': {},
            'searchText': ''
        };
    }

    componentDidMount() {
        getAllMovies().then((data) => {
            this.setState({ ...this.state, "content": data.content, "totalPages": data.page.totalPages })
        })
    }

    pageChange(page) {
        if (page !== this.state.currentPage) {
            if (this.generateURI().length > 0) {
                getFilterMovies(page - 1, this.generateURI()).then((data) => {
                    this.setState({ ...this.state, "content": data.content, "currentPage": page })
                });
            } else {
                getNewPage(page - 1).then((data) => {
                    this.setState({ ...this.state, "content": data.content, "currentPage": page })
                })
            }
        }
    }

    prevPage() {
        if (this.state.currentPage - 1 > 0) {
            this.pageChange(this.state.currentPage - 1)
        }
    }

    nextPage() {
        if (this.state.currentPage + 1 <= this.state.totalPages) {
            this.pageChange(this.state.currentPage + 1)
        }
    }

    handleMostWatchedScoreBoard = () => {
        this.setState({ ...this.state, "content": undefined, "totalPages": undefined, 'currentPage': 1, 'filterMode': false });
        getTopMoviesBasedOnTime('lastmonth').then((data)=>{


            if(data.data){
                this.setState({ ...this.state, "content": data.data.content, "totalPages": data.page.totalPages })
            }else{
                this.setState({ ...this.state, "content": [], "totalPages": 1 })
            }

        })
    };

    handleAllData = () => {
        this.setState({ ...this.state, "content": undefined, "totalPages": undefined, 'currentPage': 1, 'filterMode': false });
        getAllMovies().then((data) => {
            this.setState({ ...this.state, "content": data.content, "totalPages": data.page.totalPages })
        })
    };

    handleFilterData = () => {
        this.setState({ ...this.state, "content": undefined, "totalPages": undefined, 'currentPage': 1, 'filterMode': false });
        if (this.generateURI().length > 0) {
            getFilterMovies(0, this.generateURI()).then((data) => {
                this.setState({ ...this.state, "content": data.content, "totalPages": data.page.totalPages })
            });
        } else {
            getAllMovies().then((data) => {
                this.setState({ ...this.state, "content": data.content, "totalPages": data.page.totalPages })
            })
        }

    };

    handleSearchChange = (e) => {
        this.setState({ ...this.state, 'SearchText': e.target.value });
    };

    captureData = (category, item) => {
        let data2 = Object.assign(this.state['filterState']);
        if (!data2[category]) {
            data2[category] = [];
        }
        if (data2[category].includes(item)) {
            data2[category].splice(data2[category].indexOf(item), 1);
        } else {
            data2[category].push(item);
        }

        this.setState({ ...this.state, 'filterState': data2 })
    };

    generateURI = () => {
        let query = [];
        let data = this.state.filterState;
        for (let category in data) {
            if (data.hasOwnProperty(category)) {
                for (let j = 0; j < data[category].length; j++) {
                    query.push(category + '=' + data[category][j])
                }
            }
        }

        let data2 = [];
        if (this.state['SearchText']) {
            data2 = this.state.SearchText.split(' ').filter((el) => {
                return (el != null && el !== undefined && el !== '')
            });
        }

        for (let word in data2) {
            query.push('keyword' + '=' + data2[word]);
        }
        let uri = encodeURI(query.join("&"));
        return uri
    };

    handleClick = (movie)=>{
        this.props.selectedMovie(movie);
        // this.props.redirectURL('/moviedetail')
        this.setState({...this.state,'redirect':'/moviedetail'})
    };

    render(){
        if(this.state.redirect){
            return <Redirect to={{
                pathname: this.state.redirect,
            }}/>
        }

        let moviedata = [];
        let paging = <Paging size={this.state.totalPages} current={this.state.currentPage}
            onPageChange={(page) => { this.pageChange(page) }}
            onPrevPage={() => { this.prevPage() }}
            onNextPage={() => { this.nextPage() }}
        />;
        if (this.state.content) {
            if(this.state.content.length < 1){
                moviedata.push(
                    <h4>No Movies Available</h4>
                )
            }else{
                for (var index in this.state.content) {
                    let movie = this.state.content[index];
                    moviedata.push(<div key={index} onClick={() => this.handleClick(movie)}><MovieItem quality="HD" movie_id={movie.movieId}
                                                                                                       image={movie.image}
                                                                                                       title={movie.title}
                                                                                                       key={movie.movieId}
                    /></div>)
                }
            }


        } else {
            moviedata.push(
                "Loading..."
            );
            paging = undefined
        }
        let filterformelement = undefined;
        if (this.state.filterMode) {
            filterformelement = <FilterForm data={this.state.filterState} onSubmit={this.handleFilterData}
                captureData={this.captureData}
            />;
        } else {
            filterformelement = "";
        }
        return (
            <div>
                <div>
                    <HomeHeader />
                </div>
                <div>
                    <div id="DIV_1">
                        <form method="get" onSubmit={(e) => { e.preventDefault(); this.handleFilterData(this.state.filterData) }}>
                            <input type="text" name="keyword" placeholder="Enter keywords here"
                                id="INPUT_3"
                                onChange={this.handleSearchChange}
                            />
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
                                    <span id="FilterSPAN_1" onClick={() => { this.setState({ ...this.state, 'filterMode': (!this.state.filterMode) }) }}>
                                        <Filter /> Filter
                                        </span>
                                    <h1 id="H1_1">
                                        Movies
                                        </h1>

                                    {filterformelement}

                                </div>
                                <Suggestions MostWatched={this.handleMostWatchedScoreBoard} All={this.handleAllData}/>
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

function mapStateToProps(state) {
    return {

    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ selectedMovie: selectedMovie }, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(All_Movies);