import React, { Component } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import { getActors, addNewActor } from "../../../api/API";
import { ToastContainer, toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch)
}

// const mapStateToProps = (state) => {
//     return {
//         // currentUser: state.loginReducer.currentUser,
//     };
// }

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white', color:  'black'}),
    option: (styles) => {
        return {
            ...styles,
            color: 'black'
        };
    }
}

const mapActorsToSelect = (actors) => {
    return actors.map((actor) => {
        return {
            value: actor.name,
            label: actor.name,
            id: actor.actorId
        }
    });
}

const ratings = [
    { value: 'G', label: 'G' },
    { value: 'PG', label: 'PG' },
    { value: 'PG-13', label: 'PG-13' },
    { value: 'R', label: 'R' },
    { value: 'NC-17', label: 'NC-17' }
]

class AddMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {
                title: "",
                genre: "",
                year: "",
                studio: "",
                synopsis: "",
                image: "",
                movie: "",
                actors: "",
                director: "",
                country: "",
                rating: "",
                availability: "",
                price: "",
            },
            actors: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleActor = this.handleActor.bind(this);

    }

    componentDidMount() {
        getActors().then((actors) => {
            this.setState({actors: mapActorsToSelect(actors)});
        })
    }

    handleChange(event) {
        event.preventDefault();
        let movie = {...this.state.movie};
        movie[event.target.id] = event.target.value;
        this.setState({movie});
    }

    handleRating(rating) {
        this.setState(prevState => ({
            ...prevState,
            movie: {
                ...prevState.movie,
                rating: rating.value
            }
        }))
    }

    resetForm(event) {
        event.preventDefault();
        let movie =  {
            title: "",
            genre: "",
            year: "",
            studio: "",
            synopsis: "",
            image: "",
            movie: "",
            actors: "",
            director: "",
            country: "",
            rating: "",
            availability: "",
            price: "",
        }
        this.setState({movie});
    }

    handleSubmit() {
        debugger
    }

    handleActor(newValue) {
        if (newValue) {
            if (newValue.__isNew__) {
                addNewActor({ name: newValue.label }).then((result) => {
                    let newActors = [ ...this.state.actors ];
                    newActors.push({
                        value: result.name,
                        label: result.name,
                        id: result.actorId
                    })
                    this.setState({ actors: newActors });

                    this.setState(prevState => ({
                        ...prevState,
                        movie: {
                            ...prevState.movie,
                            actor: result.actorId
                        }
                    }))
                })
            } else {
                this.setState(prevState => ({
                    ...prevState,
                    movie: {
                        ...prevState.movie,
                        actor: newValue.id
                    }
                }))
            }
        } else {
            this.setState(prevState => ({
                ...prevState,
                movie: {
                    ...prevState.movie,
                    actor: ""
                }
            }))
        }
    }
    
    render() {
        return (
            <div id="FullMovieForm" className="admin-sub-header">
                <h2>Add New Movie</h2>
                <br/>
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Title</label>
                            <input id="title" className="form-control" placeholder="Movie Name" onChange={this.handleChange} value={this.state.movie.title}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Studio</label>
                            <input id="studio" className="form-control" placeholder="Studio Name" onChange={this.handleChange} value={this.state.movie.studio}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Year</label>
                            <input id="year" type="number" className="form-control" placeholder="Year" onChange={this.handleChange} value={this.state.movie.year}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Director</label>
                            <input id="director" className="form-control" placeholder="Director Name" onChange={this.handleChange} value={this.state.movie.director}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Actors</label>
                            <CreatableSelect
                                isClearable
                                onChange={this.handleActor}
                                options={this.state.actors}
                                formatOptionLabel="name"
                                styles={colourStyles}                         
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Genre</label>
                            <input id="genre" className="form-control" placeholder="Type" onChange={this.handleChange} value={this.state.movie.genre}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Synopsis</label>
                        <textarea id="synopsis" className="form-control" rows="4" placeholder="Movie Summary" onChange={this.handleChange} value={this.state.movie.synopsis}/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Country</label>
                            <input id="country" className="form-control" placeholder="Country" onChange={this.handleChange} value={this.state.movie.country}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Rating</label>
                            <Select id="rating" options={ratings} styles={colourStyles} onChange={this.handleRating.bind(this)} value={this.state.movie.rating}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Availability</label>
                            <input id="availabilty" className="form-control" onChange={this.handleChange} value={this.state.movie.availability}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Image URL</label>
                            <input id="image" className="form-control" placeholder="Image URL" onChange={this.handleChange} value={this.state.movie.image}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Movie URL</label>
                            <input id="movie" className="form-control" placeholder="Youtube URL" onChange={this.handleChange} value={this.state.movie.movie}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Price</label>
                            <input id="price" type="number" className="form-control" placeholder="$$" onChange={this.handleChange} value={this.state.movie.price}/>
                        </div>
                    </div>
                    
                    <button className="btn btn-secondary" onClick={this.resetForm.bind(this)}>Reset</button>
                    <button type="submit" className="btn btn-primary float-right" onClick={this.handleSubmit}>Add New Movie</button>
                </form>

            </div>
        );
    }
}

export default connect(mapDispatchToProps)(AddMovie);