import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Sidebar extends Component {

    render() {

        return (
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
                    <a href="javascript:void(0);">Movie Activity Report</a>
                </li>
                <ul className="sub-menu-reports">
                    <li className="sub-menu-item-reports">
                        <Link to="/admin/topactivity">Top 10 Movies Report</Link>
                    </li>
                    <li className="sub-menu-item-reports">
                        <Link to="/admin/allactivity">Movies play Report</Link>
                    </li>
                </ul>
                
                <li>
                    <a href="javascript:void(0);">Financial Report</a>
                </li>
                <ul className="sub-menu-reports">
                    <li className="sub-menu-item-reports">
                        <Link to="/admin/subscriptionreports">Subscriptions Reports</Link>
                    </li>
                    <li className="sub-menu-item-reports">
                        <Link to="/admin/incomereports">Central Income Reports</Link>
                    </li>
                </ul>
            </ul>
        )
    }

}

export default Sidebar;