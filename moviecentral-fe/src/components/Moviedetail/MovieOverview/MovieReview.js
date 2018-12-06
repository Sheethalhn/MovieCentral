import React, { Component} from 'react';
import './MovieOverview.css';
import Rating from 'react-rating';
import {Link} from 'react-router-dom';
import stargrey from './star-grey.png';
import staryellow from './staryellow.png';
import {connect} from "react-redux";
import * as API from '../../../api/API';
import {selectedReview} from "../../../actions";
import MovieHallsBox from '../MovieDetailBox/MovieDetailBox';
import loading from '../../RoutesComponent/loading.gif'
class MovieReview extends Component {

    constructor(props){
        super(props);

        this.state={
            movie_id: this.props.movie.movieId.toString(),
            display: ''
        }
    }

    componentDidMount(){
        API.getRatings(this.props.movie.movieId)
            .then((result) => {
                this.setState({
                    ratings: result.aggregates,
                    reviews: result.data,
                });

            })
    }

    updateReview = () => {
        window.location = "/moviedetailupdatereview";
    }


    renderLink(){
        var display = "yes";
        let data = [
            <div className="submit-review">
                <label className="submit-review-button" style={{display:"block"}} >WATCH THIS MOVIE TO WRITE REVIEWS</label>
            </div>
        ];

        // let arr = this.props.user.userPlaybackHistory;
        // for(let i=0; i<arr.length;i++){
        //     debugger;
        //     if(arr[i]['movieSubscriptionObj']['movieId'] === this.props.movie.movieId){
        //         data = [<div className="submit-review">
        //             <label className="submit-review-button" style={{display:"block"}} onClick={this.props.onAdd}>TELL US WHAT YOU THINK!!</label>
        //         </div>]
        //     }
        // }
        data = [<div className="submit-review">
            <label className="submit-review-button" style={{display:"block"}} onClick={this.props.onAdd}>TELL US WHAT YOU THINK!!</label>
        </div>];


        if (this.props.user === undefined || this.props.user === null) {
            display = "semi"
        }
        else if(this.props.user !== undefined && this.props.user !== null) {
            this.state.reviews.map((review) => {

                if (review.user.userId === this.props.user.userId) {
                    display = "no";
                }
            })
        }

        if(display === "no"){
            return (<div></div>)
        }
        else if(display === "semi") {
            return(
                <div className="submit-review">
                    <Link to="/login"> LOGIN HERE TO WRITE REVIEW!!</Link>
                </div>
            )
        }
        else{
            return(
                data
            )
        }
    }


    renderReviews(){
        if(this.props.user === undefined || this.props.user === null){
            return this.state.reviews.map((review) => {

                return (
                    <div className="review-tab">
                        <div className="star-review-pos">
                            <Rating
                                placeholderRating={review.rating}
                                emptySymbol={<img src={stargrey} className="icon"/>}
                                placeholderSymbol={<img src={staryellow} className="icon"/>}
                                fullSymbol={<img src={staryellow} className="icon"/>}
                                readonly = {true}
                            />

                        </div>
                        <div className="review-spacing">
                            <h4>{review.title}</h4>
                        </div>
                        <div className="reviewer-name">
                            <h5>Review By: {review.user.screenName}</h5>
                        </div>
                        <div className="review-body">
                            <h6>{review.text}
                            </h6>
                        </div>
                    </div>
                )
            })

        }

        else if(this.props.user !== undefined && this.props.user !== null)
        {
            return this.state.reviews.map((review) => {


                if (review.user.userId !== this.props.user.userId) {
                    return (
                        <div className="review-tab">
                            <div className="star-review-pos">
                                <Rating
                                    placeholderRating={review.rating}
                                    emptySymbol={<img src={stargrey} className="icon"/>}
                                    placeholderSymbol={<img src={staryellow} className="icon"/>}
                                    fullSymbol={<img src={staryellow} className="icon"/>}
                                    readonly = {true}
                                />

                            </div>
                            <div className="review-spacing">
                                <h4>{review.title}</h4>
                            </div>
                            <div className="reviewer-name">
                                <h5>Review By: {review.user.screenName}</h5>
                            </div>
                            <div className="review-body">
                                <h6>{review.text}
                                </h6>
                            </div>
                        </div>
                    )
                }
                else {
                    return (
                        <div className="review-tab">
                            <div className="star-review-pos">
                                <Rating
                                    placeholderRating={review.rating}
                                    emptySymbol={<img src={stargrey} className="icon"/>}
                                    placeholderSymbol={<img src={staryellow} className="icon"/>}
                                    fullSymbol={<img src={staryellow} className="icon"/>}
                                    readonly = {true}
                                />

                            </div>
                            <div className="review-spacing">
                                <h4>{review.title}</h4>
                            </div>
                            <div className="reviewer-name">
                                <h5>Review By: {review.user.screenName}</h5>
                            </div>
                            <div className="review-body">
                                <h6>{review.text}
                                </h6>
                            </div>
                            {/*<div style={{}}>*/}
                                {/*<button type="button" className="btn"*/}
                                        {/*style={{marginTop: "120px", marginLeft: '80%', backgroundColor: '#f15500'}}*/}
                                        {/*onClick={() => this.updateReview(this.props.selectedReview(review))}>EDIT*/}
                                {/*</button>*/}
                            {/*</div>*/}
                        </div>
                    )
                }

            })
        }
    }




    render(){
        if(!this.state.ratings){
            return <img src={loading}/> ;
        }
        return(

            <div className="movie-overview-layout">
                <div className="movie-overview-layout-left">
                    <MovieHallsBox/>
                </div>

                <div className="view-review-box  col-md-5">
                    <div className="review-box-header">
                        <h3 className="review-header-font">FANS SAY</h3>
                        <div className="star-pos">
                            <Rating
                                placeholderRating={this.state.ratings.avgratings}
                                emptySymbol={<img src={stargrey} className="icon" />}
                                placeholderSymbol={<img src={staryellow} className="icon" />}
                                fullSymbol={<img src={staryellow} className="icon" />}
                                readonly = {true}
                            />
                        </div>
                        <h6 className="fans-rating"> {this.state.ratings.totalreviews} Fan Ratings</h6>

                    </div>

                    {this.renderLink()}
                    {this.renderReviews()}


                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        user: state.loginUser,
        movie: state.selectedMovie,
        // review: state.selectedReview
    }
}

// function matchDispatchToProps(dispatch){
//     return bindActionCreators({selectedReview: selectedReview}, dispatch)
// }
export default connect(mapStateToProps, null)(MovieReview);