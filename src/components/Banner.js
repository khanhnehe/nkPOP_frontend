import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { useSpring, animated } from 'react-spring';
import { path } from '../utils/constant';
import { TiThMenu } from "react-icons/ti";
import './Banner.scss'


const Banner = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    }
    const bannerAnimation = useSpring({
        overflowX: openMenu ? 'hidden' : 'auto',
        scrollSnapType: openMenu ? 'none' : 'x proximity',
        display: 'flex',
        flexDirection: 'row',
        willChange: 'transform',
    });


    return (
        <>

            <SwipeableViews enableMouseEvents>
                <animated.div className='banner' style={bannerAnimation}>
                    {/* để cái này nó mới ăn */}
                    <span onClick={toggleMenu}></span>
                    <div className='banner-right'>
                        <NavLink to="/hot-deals" activeClassName="active me-3">
                            <TiThMenu className='TiThMenu me-2' />
                            DANH MỤC
                        </NavLink>
                        <NavLink to="/hot-deals" activeClassName="active me-3">
                            HOT DEAL
                        </NavLink>

                        <NavLink to="/hot-deals" activeClassName="active me-3">
                            CHĂM SÓC DA
                        </NavLink>

                        <NavLink to="/hot-deals" activeClassName="active me-3">
                            TRANG ĐIỂM
                        </NavLink>

                        <NavLink to="/brand" activeClassName="active me-3">
                            THƯƠNG HIỆU
                        </NavLink>

                        <NavLink to="/new-products" activeClassName="active me-3">
                            HÀNG MỚI VỀ
                        </NavLink>

                        <NavLink to="/best-seller" activeClassName="active me-3">
                            BÁN CHẠY
                        </NavLink>
                    </div>
                </animated.div>
            </SwipeableViews>
        </>
    )
}

export default Banner;