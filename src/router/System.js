import React, { Fragment } from "react";
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
import { Routes, Route } from 'react-router-dom';
import ProtectedComponent from './ProtectedComponent';
import PhieuNhap from "../admin/PhieuNhap/PhieuNhap";

const System = () => {
    return (
        <Routes>
            <Route path="admin-manage" element={<ProtectedComponent><HomeAdmin /></ProtectedComponent>} />
            <Route path="manage-user" element={<ProtectedComponent><ManagerUser /></ProtectedComponent>} />
            <Route path="manage-category" element={<ProtectedComponent><Category /></ProtectedComponent>} />
            <Route path="manage-brand" element={<ProtectedComponent><Brand /></ProtectedComponent>} />
            <Route path="manage-type" element={<ProtectedComponent><Type /></ProtectedComponent>} />
            <Route path="manage-product" element={<ProtectedComponent><Product /></ProtectedComponent>} />
            <Route path="manage-edit-product/:id" element={<ProtectedComponent><EditProduct /></ProtectedComponent>} />
            <Route path="all-orders" element={<ProtectedComponent><AllOrders /></ProtectedComponent>} />
            <Route path="cho-xac-nhan-orders" element={<ProtectedComponent><OrderChoXacNhan /></ProtectedComponent>} />
            <Route path="giao-hang-orders" element={<ProtectedComponent><OrderGiaoHang /></ProtectedComponent>} />
            <Route path="hoan-thanh-orders" element={<ProtectedComponent><OrderHoanThanh /></ProtectedComponent>} />
            <Route path="cancel-orders" element={<ProtectedComponent><OrderCancel /></ProtectedComponent>} />
            <Route path="phieu-nhap" element={<ProtectedComponent><PhieuNhap /></ProtectedComponent>} />
        </Routes>
    );
}

export default System;