import React, { Component } from 'react';
// import Search from './Search';
// import NavBar from './Navigation';
import MovieForm from './movieForm';
// import CommonHeader from '../header/CommonHeader';
// import '../MovieHall/subheader.css';

class AddMovie extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         group: ''
    //     };
    // }
    // componentDidMount() {
    //     this.setState({
    //         group: 'Movies'
    //     })
    // }
    render() {
        // console.log(this.props);
        return (
            <div id="FullMovieForm" className="admin-sub-header">
                {/* <Search group={this.state.group} placeholder='Search for Movies' /> */}
                {/* <MovieForm /> */}
                <h2>Add New Movie</h2>
                <br/>
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Title</label>
                            <input type="text" className="form-control"  placeholder="Movie Name" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Studio</label>
                            <input type="text" className="form-control" placeholder="Studio Name" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Year</label>
                            <input type="text" className="form-control" placeholder="Year" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Director</label>
                            <input type="text" className="form-control" placeholder="Name" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Actors</label>
                            <input type="text" className="form-control" placeholder="Names" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Genre</label>
                            <input type="text" className="form-control" placeholder="Type" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Synopsis</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Country</label>
                            <input type="text" className="form-control" placeholder="Country" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Rating</label>
                            <input type="text" className="form-control" placeholder="Rating" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Availability</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Image</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Movie URL</label>
                            <input type="text" className="form-control" placeholder="URL" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Price</label>
                            <input type="text" className="form-control" placeholder="$$" />
                        </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Add New Movie</button>
                </form>

            </div>
        );
    }
}

export default AddMovie;