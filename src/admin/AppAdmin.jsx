import React, { Fragment } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import System from "../router/System";
import './AppAdmin.scss';

const AppAdmin = () => {
    return (
        <div className="app">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="content">
                    {/* <ToastContainer /> */}
                    <System />
                </div>
            </div>
        </div>
    );
}

export default AppAdmin;
