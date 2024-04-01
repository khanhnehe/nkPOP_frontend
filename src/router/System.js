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
import EditProduct from "../admin/product/Product/EditProduct";
import AllOrders from "../admin/Orders/AllOrders";
import OrderChoXacNhan from "../admin/Orders/ConfirmOrder/OrderChoXacNhan";
import OrderGiaoHang from "../admin/Orders/ConfirmOrder/OrderGiaoHang";
import OrderHoanThanh from "../admin/Orders/ConfirmOrder/OrderHoanThanh";
import OrderCancel from "../admin/Orders/ConfirmOrder/OrderCancel";

const System = () => {
    return (
        <Routes>

            <Route path="admin-manage" element={<HomeAdmin />} />
            <Route path="manage-user" element={<ManagerUser />} />
            <Route path="manage-category" element={<Category />} />
            <Route path="manage-brand" element={<Brand />} />
            <Route path="manage-type" element={<Type />} />
            <Route path="manage-product" element={<Product />} />
            <Route path="manage-edit-product/:id" element={<EditProduct />} />
            <Route path="all-orders" element={<AllOrders />} />
            <Route path="cho-xac-nhan-orders" element={<OrderChoXacNhan />} />
            <Route path="giao-hang-orders" element={<OrderGiaoHang />} />
            <Route path="hoan-thanh-orders" element={<OrderHoanThanh />} />
            <Route path="cancel-orders" element={<OrderCancel />} />
        </Routes>
    );
}

export default System;