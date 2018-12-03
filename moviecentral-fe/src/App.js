/**
 * Root Component of the react app where every view and component being rendered using Route Component
 * @author - Shreya Shah
 */
import React, {Component} from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import RoutesComponent from "./components/RoutesComponent/RoutesComponent";
import { ToastContainer, toast } from 'react-toastify';


class App extends Component {

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <RoutesComponent/>
                </BrowserRouter>

                <ToastContainer/>

            </div>
        );
    }
}

export {App};
