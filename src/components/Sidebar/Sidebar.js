import React from "react";
import { Link } from 'react-router-dom';
import "./Sidebar.scss"
import logo from "../../assets/logo3.png"
import { MdDashboard } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { TbShoppingBagCheck } from "react-icons/tb";
import { BiSolidDiscount } from "react-icons/bi";
import { PiNotepadFill } from "react-icons/pi";
import { IoBagAddSharp } from "react-icons/io5";



const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <div className="top">
                    <span className="logo">
                        <img src={logo} alt='Logo' />
                    </span>
                </div>
                <div className="bottom">
                    <ul>
                        <div className="title"><MdDashboard className="icon" />TỔNG QUAN</div>
                        <li>
                            <span>
                                <Link to="/system/admin-manage">Doanh thu</Link>

                            </span>
                        </li>
                        <li>
                            <span>
                                <Link to="/system/phieu-nhap">Nhập hàng</Link>

                            </span>
                        </li>

                        {/*  */}
                        <div className="title"><MdManageAccounts className="icon" />NGƯỜI DÙNG</div>
                        <li>
                            <span>
                                <Link to="/system/manage-user">Quản lý người dùng</Link>
                            </span>
                        </li>
                        {/*  */}
                        <div className="title"><PiNotepadFill className="icon" />ĐƠN HÀNG</div>
                        <li>
                            <span>
                                <Link to="/system/all-orders"> Quản lý đơn hàng</Link>
                            </span>
                        </li>

                        <div className="title"><IoBagAddSharp className="icon" /> SẢN PHẨM</div>
                        <li>
                            <span><Link to="/system/manage-product">Quản lý sản phẩm</Link></span>
                        </li>
                        <li>
                            <span><Link to="/system/manage-category">Quản lý danh mục</Link></span>
                        </li>
                        <li>
                            <span><Link to="/system/manage-brand">Quản lý Thương hiệu</Link></span>
                        </li>
                        <li>
                            <span><Link to="/system/manage-type">Quản lý phân loại</Link></span>
                        </li>
                        <li>
                            {/*  */}
                        </li>
                        <div className="title"><BiSolidDiscount className="icon" />KHUYẾN MÃI
                        </div>
                        <li>
                            <span>Mã giảm giá</span>
                        </li>
                        {/* <div className="title">HỒ SƠ</div>
                        <li>
                            <span>Tổng quan</span>
                        </li>
                        <li>
                            <span>Tổng quan</span>
                        </li>
                        <li>
                            <span>Tổng quan</span>
                        </li> */}
                    </ul>
                </div>


            </div>
        </>
    )
}

export default Sidebar;