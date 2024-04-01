import React from "react";
import { NavLink } from 'react-router-dom';
import "./SidebarOrder.scss"




const SidebarOrder = () => {
    return (
        <>
            <div className="SidebarOrder">
                <div className="content">
                    <NavLink to='/system/all-orders' activeClassName="active">
                        <div className="item">Tất cả đơn hàng</div>
                    </NavLink>

                    <NavLink to='/system/cho-xac-nhan-orders' activeClassName="active">
                        <div className="item">Chờ xác nhận</div>
                    </NavLink>

                    <NavLink to='/system/giao-hang-orders' activeClassName="active">
                        <div className="item">Giao hàng</div>
                    </NavLink>

                    <NavLink to='/system/hoan-thanh-orders' activeClassName="active">
                        <div className="item">Hoàn thành</div>
                    </NavLink>

                    <NavLink to='/system/cancel-orders' activeClassName="active">
                        <div className="item">Đơn hủy</div>
                    </NavLink>
                </div>


            </div>
        </>
    )
}

export default SidebarOrder;