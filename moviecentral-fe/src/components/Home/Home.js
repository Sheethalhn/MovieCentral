import React, { Component } from 'react';
import HomeHeader from './HomeHeader';
import HomeContent from './HomeContent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Home extends Component {

    constructor(props) {
        super(props);
        console.log("user :",this.props.user);
    }

    render() {
        return (
            <div className="container-body" id="outer-container">
                <HomeHeader />
                <HomeContent />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.loginUser
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);