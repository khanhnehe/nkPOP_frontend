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

                    <NavLink to='/system/confirm-orders' activeClassName="active">
                        <div className="item">Chờ xác nhận</div>
                    </NavLink>
                    <div className="item">Đang giao</div>
                    <div className="item">Đã giao</div>
                    <div className="item">Hoàn thành</div>
                    <div className="item">Đơn hủy</div>
                </div>


            </div>
        </>
    )
}

export default SidebarOrder;