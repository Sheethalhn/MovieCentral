import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './landing.css';
import landingImg from './landingpage-img.png';
import LandingHeader from '../header/LandingHeader';
/**
 * Landing Page Component of the app displaying first view of the application
 * @author - Shreya Shah
 */
class Landing extends Component {

    render() {
        return (
            <div className="container-body our-story-container" id="outer-container">
                <LandingHeader iconRequired={true}/>
                <div className="body-container our-story-cards">
                    <div className="our-story-card illustration-card ">
                        <div className="our-story-card-text">
                            <h1 id="" className="our-story-card-title">Watch on any device</h1>
                            <h2 id="" className="our-story-card-subtitle">Stream on your phone, tablet, laptop, and TV without paying more.</h2>
                        </div>
                        <div className="our-story-card-img-container">
                            <img className="our-story-card-img" alt="Landing Logo" src={landingImg} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Landing);