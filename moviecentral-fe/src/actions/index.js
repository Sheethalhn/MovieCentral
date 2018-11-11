//create all your actions here..

export const selectedMovie = (movieinfo) => {
    console.log(movieinfo);
    return{
        type: 'SELECTED_MOVIE',
        payload: movieinfo
    }
};

export const loginUser = (userinfo) => {
    console.log(userinfo);
    return{
        type: 'LOGIN_USER',
        payload: userinfo
    }
};