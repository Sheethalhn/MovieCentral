// Validations from React-Validation-Tutorial <https://github.com/mikeries/react-validation-tutorial>
import React, { Component } from "react";
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import { getActors, addNewActor, addNewMovie, updateMovie } from "../../../api/API";
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormValidator from './FormValidator';

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch)
}

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white', color: 'black' }),
    option: (styles) => {
        return {
            ...styles,
            color: 'black'
        };
    }
}

const mapActorsToSelect = (actors) => {
    if (actors.length > 0) {
        return actors.map((actor) => {
            return {
                value: actor.name,
                label: actor.name,
                id: actor.actorId
            }
        });
    } else {
        return [];
    }
}

const mapActorsFromSelect = (actors) => {
    return actors.map((actor) => {
        return {
            name: actor.value,
            actorId: actor.id
        }
    })
}

const ratings = [
    { value: 'G', label: 'G' },
    { value: 'PG', label: 'PG' },
    { value: 'PG-13', label: 'PG-13' },
    { value: 'R', label: 'R' },
    { value: 'NC-17', label: 'NC-17' }
]

const availability = [
    { value: "Free", label: "Free" },
    { value: "SubscriptionOnly", label: "Subscription Only" },
    { value: "PayPerViewOnly", label: "Pay Per View Only" },
    { value: "Paid", label: "Paid" },
]


class FullMovieForm extends Component {

    notify = (message) => toast(message);

    constructor(props) {
        super(props);
        //Validations
        this.validator = new FormValidator([
            {
                field: 'title',
                method: 'isEmpty',
                validWhen: false,
                message: 'Movie Title is Required!!'
            },
            {
                field: 'movieURL',
                method: 'isURL',
                validWhen: true,
                message: 'Movie URL is Required!!'
            },   
        ]);


        this.state = {
            movie: {
                title: "",
                genre: "",
                year: "",
                studio: "",
                synopsis: "",
                image: "",
                movieURL: "",
                actors: [],
                director: "",
                country: "",
                rating: "G",
                availability: "Free",
                price: 0,
                isActive: true
            },
            actors: [],
            validation: this.validator.valid(),
        };

        this.submitted = false;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleActor = this.handleActor.bind(this);

        this.selectedActors = [];

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.movie) {
            if(nextProps.movie.movieId !== prevState.movie.movieId) {
                return { someState: nextProps.movie };
            }
            else return null;
        } else return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.movie) {
            if (prevProps.movie.title !== this.props.movie.title) {
                this.setState({ movie: this.props.movie });
            }
        }
    }

    componentDidMount() {
        getActors().then((actors) => {
            this.setState({ actors: mapActorsToSelect(actors) });
        })
    }

    handleChange(event) {
        event.preventDefault();
        let movie = { ...this.state.movie };
        movie[event.target.id] = event.target.value;
        this.setState({ movie });
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

    handleAvailability(availability) {
        this.setState(prevState => ({
            ...prevState,
            movie: {
                ...prevState.movie,
                availability: availability.value
            }
        }))
    }

    resetForm() {
        let movie = {
            title: "",
            genre: "",
            year: "",
            studio: "",
            synopsis: "",
            image: "",
            movieURL: "",
            actors: [],
            director: "",
            country: "",
            rating: "",
            availability: "",
            price: 0,
            isActive: true
        }
        this.setState({ 
            movie: movie,
            selectedActors: []
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const validation = this.validator.validate(this.state.movie);
        this.setState({ validation });

        this.submitted = true;
        if (validation.isValid) {
            let formattedActors = mapActorsFromSelect(this.selectedActors);
            let movie = { ...this.state.movie };
            movie.actors = formattedActors;

            if (this.props.type === "edit") {
                updateMovie(movie, movie.movieId).then((result) => {
                    this.notify(`Movie Successfully Added!!`);
                })
            } else {
                addNewMovie(movie).then((result) => {
                    this.notify(`Movie Successfully Added!!`);
                    this.resetForm();
                })
            }
        }
    }

    handleActor(newValue) {
        this.selectedActors = newValue.filter((actor) => actor.id);
        newValue.forEach((actor) => {
            if (actor.__isNew__) {
                addNewActor({ name: actor.label }).then((result) => {
                    let newActors = [...this.state.actors];
                    newActors.push({
                        value: result.name,
                        label: result.name,
                        id: result.actorId
                    });
                    this.selectedActors.push({
                        value: result.name,
                        label: result.name,
                        id: result.actorId
                    })
                    this.setState({ actors: newActors });
                })
            }
        });
    }

    render() {
        let validation = this.submitted ?                 // if the form has been submitted at least once
            this.validator.validate(this.state.movie) :   // then check validity every time we render
            this.state.validation                         // otherwise just use what's in state

        return(
            <form>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Title</label>
                        <input id="title" className="form-control" placeholder="Movie Name" onChange={this.handleChange} value={this.state.movie.title} />
                        <span className="help-block">{validation.title.message}</span>
                    </div>
                    <div className="form-group col-md-4">
                        <label>Studio</label>
                        <input id="studio" className="form-control" placeholder="Studio Name" onChange={this.handleChange} value={this.state.movie.studio} />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Year</label>
                        <input id="year" type="number" className="form-control" placeholder="Year" onChange={this.handleChange} value={this.state.movie.year} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Director</label>
                        <input id="director" className="form-control" placeholder="Director Name" onChange={this.handleChange} value={this.state.movie.director} />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Actors</label>
                        <CreatableSelect
                            isClearable
                            isMulti
                            onChange={this.handleActor}
                            options={this.state.actors}
                            styles={colourStyles}
                            value={this.state.selectedActors}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Genre</label>
                        <input id="genre" className="form-control" placeholder="Type" onChange={this.handleChange} value={this.state.movie.genre} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Synopsis</label>
                    <textarea id="synopsis" className="form-control" rows="4" placeholder="Movie Summary" onChange={this.handleChange} value={this.state.movie.synopsis} />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Country</label>
                        <input id="country" className="form-control" placeholder="Country" onChange={this.handleChange} value={this.state.movie.country} />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Rating</label>
                        <Select 
                            id="rating" 
                            options={ratings} 
                            styles={colourStyles} 
                            onChange={this.handleRating.bind(this)} 
                            defaultValue={ratings[0]}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label>Availability</label>
                        <Select 
                            id="availability" 
                            options={availability} 
                            styles={colourStyles} 
                            onChange={this.handleAvailability.bind(this)} 
                            defaultValue={availability[0]}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Image URL</label>
                        <input id="image" className="form-control" placeholder="Image URL" onChange={this.handleChange} value={this.state.movie.image} />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Movie URL</label>
                        <input id="movieURL" className="form-control" placeholder="Youtube URL" onChange={this.handleChange} value={this.state.movie.movieURL} />
                        <span className="help-block">{validation.movieURL.message}</span>
                    </div>
                    <div className="form-group col-md-4">
                        <label>Price</label>
                        <input id="price" type="number" className="form-control" placeholder="$$" onChange={this.handleChange} value={this.state.movie.price} />
                    </div>
                </div>

                <button className="btn btn-secondary" onClick={this.resetForm.bind(this)}>Reset</button>
                
                <button type="submit" className="btn btn-primary float-right" onClick={this.handleSubmit}>
                    {this.props.type === "edit" && "Edit Movie"}
                    {this.props.type !== "edit" && "Add New Movie"} 
                </button>
            </form>
        )
    }
}

export default connect(mapDispatchToProps)(FullMovieForm);