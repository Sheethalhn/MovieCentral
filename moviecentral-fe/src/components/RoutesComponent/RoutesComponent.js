/**
 * Routing Component providing routing definitions of the system
 * @author - Shreya Shah
 */

import React, { Component } from 'react';
import { Route, withRouter} from 'react-router-dom';
import Landing from '../Landing/Landing';
import Login from '../Login/login';
import SignUp from '../Login/signup';
import Verify from '../Login/verify';
import PageNotFound from '../ErrorHandler/PageNotFound';
import Movie_detail from '../Moviedetail/movidetail';
import Payment from '../Payment/payment';

class RoutesComponent extends Component {

    render() {
        return (
            <div>
                <Route exact path="/" component={Landing} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/verify/:code" component={Verify} />
                <Route exact path="/moviedetail" component={Movie_detail} />
                <Route exact path="/pagenotfound" component={PageNotFound} />
                <Route exact path="/payment" component={Payment} />
            </div>
        );
    }
}

export default (withRouter)(RoutesComponent);
