//Create your reducers in reducers directory
//import your reducers and combine them in all Reducers which is provided to the store

import { combineReducers } from 'redux';
import movieReducer from './reducer-movie';
import loginReducer from './reducer-login';
import subscriptionReducer from './reducer-subscription';

const allReducers =  combineReducers({
    selectedMovie: movieReducer,
    loginUser: loginReducer,
    userSubscription:subscriptionReducer
});

export default allReducers;
