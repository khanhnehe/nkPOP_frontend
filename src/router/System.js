import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomeAdmin from "../pages/home/HomeAdmin";
import ManagerUser from "../admin/user/ManagerUser";
import Category from "../admin/product/category/Category";
import Brand from "../admin/product/Brand/Brand";
import Type from "../admin/product/Type/Type";
import Product from "../admin/product/Product/Product";


const System = () => {
    return (
        <Routes>
            <Route path="admin-manage" element={<HomeAdmin />} />
            <Route path="manage-user" element={<ManagerUser />} />
            <Route path="manage-category" element={<Category />} />
            <Route path="manage-brand" element={<Brand />} />
            <Route path="manage-type" element={<Type />} />
            <Route path="manage-product" element={<Product />} />
        </Routes>
    );
}

export default System;