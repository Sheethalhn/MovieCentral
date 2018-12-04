import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Sidebar extends Component {

    render() {

        return(
            <ul className="sidebar-nav">
                <li>
                    <Link to="/admin/dashboard/addmovie">Add Movie</Link>
                </li>
                {/* <li>
                    <Link to="/admin/dashboard/editmovie">Edit Movie</Link>
                </li> */}
                <li>
                    <Link to="/admin/useractivity">User Activity</Link>
                </li>
                <li>
                    <Link to="/admin/movieactivity">Movie Acitvity Report</Link>
                </li>
                <li>
                    <Link to="/admin/financereports">Financial Report</Link>
                </li>
            </ul>
        )
    }

}

export default Sidebar;