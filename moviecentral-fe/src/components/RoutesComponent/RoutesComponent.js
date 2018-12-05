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
import SubscriptionReport from '../FinancialReports/SubscriptionReport';
import IncomeReport from '../FinancialReports/IncomeReport';
import TopMovies from '../MovieActivity/TopMovies';
import ViewUser from '../User/ViewUser';
import PrivateRoute from './PrivateRoute'
import AllMoviesActivity from '../MovieActivity/AllMoviesActivity';

// import Movie_detail_crew from "../Moviedetail/MovieCrew/MovieCrew";

// Admin Routes
import AdminDashboard from "../admin/dashboard/dashboard";
import AddMovie from "../admin/AddEditMovie/addMovie";
import EditMovie from "../admin/AddEditMovie/editMovie";



class RoutesComponent extends Component {

    redirectURL = (url) => {
        this.props.history.push(url);

    };

    render() {
        return (
            <div>
                <PrivateRoute exact path="/" component={Landing} />
                <PrivateRoute exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                {/*<Route exact path="/home" component={Home} />*/}
                <Route exact path="/verify/:code" component={Verify} />
                <PrivateRoute exact path="/moviedetail" component={Movie_detail} />
                <Route exact path="/pagenotfound" component={PageNotFound} />
                <PrivateRoute exact path="/payment" component={Payment} />
                <PrivateRoute exact path="/subscription" component={Subscription} />
                <PrivateRoute exact path="/browse" component={AllMovies}/>
                <Route exact path="/viewuser/:userId" component={ViewUser} />
                <PrivateRoute exact path="/admin/useractivity" component={UserActivity} />
                <PrivateRoute exact path="/admin/subscriptionreports" component={SubscriptionReport} />
                <PrivateRoute exact path="/admin/incomereports" component={IncomeReport} />
	        	<PrivateRoute exact path="/admin/dashboard" component={AdminDashboard} />
                <PrivateRoute exact path="/admin/dashboard/addmovie" component={AddMovie} />

                <PrivateRoute exact path="/admin/topactivity" component={TopMovies} />
                <PrivateRoute exact path="/admin/allactivity" component={AllMoviesActivity} />
                <Route exact path="/admin/dashboard/editmovie/:id" component={EditMovie} />
            </div>
        );
    }
}

export default (withRouter)(RoutesComponent);
