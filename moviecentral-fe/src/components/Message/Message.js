/**
 * Common Message Component to display toaster message throughout the application
 * @author - Shreya Shah
 */

import React, { Component } from 'react';

class Message extends Component {

    render() {
        return (
            <div className="row justify-content-md-center" style={{ color: 'red' }} >
                {this.props.message}
            </div>

        );
    }
}

export default Message;