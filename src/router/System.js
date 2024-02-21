import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomeAdmin from "../pages/home/HomeAdmin";
import ManagerUser from "../admin/user/ManagerUser";


const System = () => {
    return (
        <Routes>
            <Route path="admin-manage" element={<HomeAdmin />} />
            <Route path="manage-user" element={<ManagerUser />} />
        </Routes>
    );
}

export default System;