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

export const userSubscription = (subscriptioninfo) => {
    console.log(subscriptioninfo);
    return{
        type: 'USER_SUBSCRIPTION',
        payload: subscriptioninfo
    }
};
