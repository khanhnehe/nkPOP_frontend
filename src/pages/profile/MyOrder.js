import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./MyOrder.scss"
import { useDispatch, useSelector } from 'react-redux';

const MyOrder = () => {

    const { isLoggedIn, userInfo } = useSelector(state => state.user);

    const dispatch = useDispatch();

    // Kiểm tra xem userInfo có tồn tại không trước khi truy cập lastName và firstName
    const lastName = userInfo && userInfo.lastName;
    const firstName = userInfo && userInfo.firstName;

    return (
        <>
            <div className='MyOrder'>
                <div className='row row-big'>
                    <div className='col-3 content-left'>

                        <div className='row account'>
                            <div className='col-4 image'></div>
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

                    <div className='col-8 content'>ok</div>
                </div>

            </div>
        </>
    );
}

export default MyOrder;