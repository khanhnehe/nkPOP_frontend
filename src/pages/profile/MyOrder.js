import React, { useEffect, useState } from 'react';
import { Link, NavLink, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import "./MyOrder.scss"
import { useDispatch, useSelector } from 'react-redux';
import OrderCho from './MyOrder/OrderCho';
import OrderGiao from './MyOrder/OrderGiao';
import OrderHoanThanh from './MyOrder/OrderHoanThanh';
import AllOrder from "./MyOrder/AllOrder";
import CancelOrder from './MyOrder/CancelOrder';

const MyOrder = () => {

    const { isLoggedIn, userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const [selectedItem, setSelectedItem] = useState('TatCaDon');


    const renderOrderComponent = () => {
        switch (selectedItem) {
            case 'TatCaDon':
                return <AllOrder />;
            case 'ChoVanChuyen':
                return <OrderCho />;
            case 'DangGiao':
                return <OrderGiao />;
            case 'HoanThanh':
                return <OrderHoanThanh />;
            case 'DonHuy':
                return <CancelOrder />;
            default:
                return <AllOrder />;
        }
    };

    // Kiểm tra xem userInfo có tồn tại không trước khi truy cập lastName và firstName
    const lastName = userInfo && userInfo.lastName;
    const firstName = userInfo && userInfo.firstName;
    const image = userInfo && userInfo.image;

    return (
        <>
            <div className='MyOrder'>
                <div className='row row-big'>
                    <div className='col-3 content-left'>

                        <div className='row account'>
                            <div className='col-4 image'>
                                <img src={image} />

                            </div>
                            <div className='col-6 name'>{lastName} {firstName}</div>
                        </div>
                        <div className='col nav-content'>
                            <NavLink to="/profile/account" activeClassName="active" className='row child-nav'>Tài khoản</NavLink>
                            <NavLink to="/profile/my-order" activeClassName="active" className='row child-nav'>Đơn hàng</NavLink>
                            <NavLink to="/profile/favorite" activeClassName="active" className='row child-nav'>Sản phẩm yêu thích</NavLink>
                            <NavLink to="/dia-chi-nhan-hang" activeClassName="active" className='row child-nav'>Địa chỉ nhận hàng</NavLink>
                            <NavLink to="/hoi-dap" activeClassName="active" className='row child-nav'>Hỏi đáp</NavLink>
                        </div>
                    </div>

                    <div className='col-8 content'>
                        <div className='top'>
                            <div className={`item ${selectedItem === 'TatCaDon' ? 'active' : ''}`} onClick={() => setSelectedItem('TatCaDon')}>Tất cả đơn</div>

                            <div className={`item ${selectedItem === 'ChoVanChuyen' ? 'active' : ''}`} onClick={() => setSelectedItem('ChoVanChuyen')}>Chờ vận chuyển</div>
                            <div className={`item ${selectedItem === 'DangGiao' ? 'active' : ''}`} onClick={() => setSelectedItem('DangGiao')}>Đang giao</div>
                            <div className={`item ${selectedItem === 'HoanThanh' ? 'active' : ''}`} onClick={() => setSelectedItem('HoanThanh')}>Hoàn thành</div>
                            <div className={`item ${selectedItem === 'DonHuy' ? 'active' : ''}`} onClick={() => setSelectedItem('DonHuy')}>Đơn hủy</div>
                        </div>

                        <div className='bottom'>
                            {renderOrderComponent()}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default MyOrder;