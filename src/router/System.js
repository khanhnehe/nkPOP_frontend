import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomeAdmin from "../pages/home/HomeAdmin";
import AdminUser from "../pages/home/AdminUser";

const System = () => {
    return (
        <Routes>
            <Route path="admin-manage" element={<HomeAdmin />} />
            {/* <Route path="admin-user" element={<AdminUser />} /> */}
        </Routes>
    );
}

export default System;