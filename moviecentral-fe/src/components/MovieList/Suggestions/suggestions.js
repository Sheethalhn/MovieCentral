import React, { Component } from 'react';
import './suggestions.css'

class Suggestions extends Component{
    constructor(props){
        super(props);
        this.state = {
            active: 0
        }
    }

    activate = (val)=>{
        this.setState({...this.state,active:val});
        if(this.state.active !== val){
            if(val === 2){
                this.props.MostWatched();
            }else if(val === 3){
                this.props.All();
            }else if(val === 1){
                this.props.TopRated();
            }
        }
    };

    render(){
        let first = {};
        let firstStyle = "tab active suggestions-main-tabs-label";
        let second = {};
        let secondStyle = "tab active suggestions-main-tabs-label";
        let third = {};
        let thirdStyle = "tab active suggestions-main-tabs-label";

        if(this.state.active === 1){
            first = {
                color: '#eee'
            };
            firstStyle = "suggestions-main-tabs-label-active"

        }else if(this.state.active === 2){
            second = {
                color: '#eee'
            };
            secondStyle = "suggestions-main-tabs-label-active"

        }else if(this.state.active === 3){
            third = {
                color: '#eee'
            };
            thirdStyle = "suggestions-main-tabs-label-active"
        }

        return(
            <div className="suggestions-main">
                <h2 className="suggestions-main-h2">Suggestions</h2>
                <div className="tabs floating suggestions-main-tabs">
                    <label className={thirdStyle}
                           style={third} onClick={()=>this.activate(3)}>
                        All
                    </label>
                    <label className={firstStyle}
                           style={first} onClick={()=>this.activate(1)}>
                        Top rated
                    </label>
                    <label className={secondStyle}
                           style={second} onClick={()=>this.activate(2)}>
                        Most watched
                    </label>

                </div>
            </div>
        );
    }
}

export default Suggestions;
