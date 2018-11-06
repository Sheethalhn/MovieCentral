/**
 * Routing Component providing routing definitions of the system
 * @author - Shreya Shah
 */

import React, { Component } from 'react';
import { Route, withRouter} from 'react-router-dom';
import Landing from '../Landing/Landing'
import PageNotFound from '../ErrorHandler/PageNotFound';

class RoutesComponent extends Component {

    render() {
        return (
            <div>
                <Route exact path="/" component={Landing} />
                <Route exact path="/pagenotfound" component={PageNotFound} />
            </div>
        );
    }
}

export default (withRouter)(RoutesComponent);
