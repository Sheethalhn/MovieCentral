/**
 * Common Header Component for the entire application
 * @author - Shreya Shah
 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './header.css';

class CommonHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(CommonHeader);