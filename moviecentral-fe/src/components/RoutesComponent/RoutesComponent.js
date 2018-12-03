/**
 * Routing Component providing routing definitions of the system
 * @author - Shreya Shah
 */

import React, { Component } from 'react';
import { Route, withRouter} from 'react-router-dom';
import Landing from '../Landing/Landing';
import Login from '../Login/login';
import SignUp from '../Login/signup';
import Home from '../Home/Home';
import Verify from '../Login/verify';
import PageNotFound from '../ErrorHandler/PageNotFound';
import Movie_detail from '../Moviedetail/movidetail';
import Payment from '../Payment/payment';
import Subscription from '../Subscription/subscription';
import AllMovies from '../MovieList/AllMovies'
import UserActivity from '../UserActivity/UserActivity';
import ViewUser from '../User/ViewUser';

// Admin Routes
import AdminDashboard from "../admin/Dashboard/Dashboard";
import AddMovie from "../admin/AddEditMovie/AddMovie";
import EditMovie from "../admin/AddEditMovie/EditMovie";


class RoutesComponent extends Component {

    render() {
        return (
            <div>
                <Route exact path="/" component={Landing} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/verify/:code" component={Verify} />
                <Route exact path="/moviedetail" component={Movie_detail} />
                <Route exact path="/pagenotfound" component={PageNotFound} />
                <Route exact path="/payment" component={Payment} />
                <Route exact path="/subscription" component={Subscription} />
                <Route exact path="/browse" component={AllMovies} />
                <Route exact path="/useractivity" component={UserActivity} />
                <Route exact path="/viewuser/:userId" component={ViewUser} />
    
	        	<Route exact path="/admin/dashboard" component={AdminDashboard} />
                <Route exact path="/admin/dashboard/addmovie" component={AddMovie} />
                <Route exact path="/admin/dashboard/editmovie/:id" component={EditMovie} />
                
            </div>
        );``
    }
}

export default (withRouter)(RoutesComponent);
