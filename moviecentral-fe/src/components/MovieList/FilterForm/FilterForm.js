import React, { Component } from 'react';
import './FilterForm.css'

class FilterForm extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        
    }


    render() {
        let genre = "";
        return (

            <div className="row filter-items">
                <div className="col-lg-3">
                    <h4 className="col-heading">Genre</h4>
                    <div className="list-group">
                        <a className="list-group-item col-group-rc">
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" name="genre[]" checked={(genre && genre.includes("drama")) ? true : false} value="drama"/>
                                    Drama
                                </label>
                            </div>
                        </a>
                        <a className="list-group-item col-group-rc">
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" name="genre[]" checked={(genre && genre.includes("comedy")) ? true : false} value="comedy"/>
                                    Comedy
                                </label>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        );
    }

}

export default FilterForm;