//create all your actions here..

export const selectedMovie = (movieinfo) => {
    console.log(movieinfo);
    return{
        type: 'SELECTED_MOVIE',
        payload: movieinfo
    }
};