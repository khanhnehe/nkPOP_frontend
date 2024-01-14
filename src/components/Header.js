import React, { useState } from 'react';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineShoppingBag } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { path } from '../utils/constant';
import { IoSearch } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { PiPhoneCallLight } from "react-icons/pi";
import logo1 from "../../src/assets/logo.png"


const Header = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [scrollPage, setScrollPage] = useState(true);

    const logoHome = (
        <div className='logo'>
            <Link to={path.HOME}>
                <div>
                    <span>KANH POP</span>
                </div>
            </Link>
        </div>
    );

    const cartOrder = (
        <span className='cart px-3'>
            <Link to="/cart">
                <MdOutlineShoppingBag />
                <p>0</p>
            </Link>
        </span>
    )

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    }


    return (
        <>
            {/* <div className='top-line'>Hotline: 1900 636 510 </div> */}
            <header>
                <div className='header'>
                    {logoHome}

                    <div className='header-left'>
                        <div className='search'>
                            <div className='search-group'>
                                <input
                                    className='input-search'
                                    type="text"
                                    placeholder="Search..."
                                />
                                <button className='icon-search'>
                                    <IoSearch />
                                </button>
                            </div>
                        </div>
                    </div>

                    <nav className={openMenu ? 'show-nav' : 'hide-nav'}>
                        <div className='header-right' >
                            {/* <span className='links'>
                            <NavLink to={path.LOGIN} activeClassName="active me-3">
                                Đăng nhập
                            </NavLink>
                        </span>

                        <span className='links'>
                            <NavLink to={path.REGISTER} activeClassName="active me-3">
                                Đăng ký
                            </NavLink>
                        </span> */}
                            <span className='links px-3'>
                                <div className="account">
                                    <MdOutlineAccountCircle className='icon-account' />
                                    <div className="login-dropdown">
                                        <div className="login-links">
                                            <NavLink to={path.LOGIN} activeClassName="active me-3">
                                                Đăng nhập
                                            </NavLink>
                                            <NavLink to={path.REGISTER} activeClassName="active me-3">
                                                Đăng ký
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </span>

                            <span className='links  px-3'>
                                <MdFavorite className='tim' />
                            </span>

                            {cartOrder}
                            {/* <span className='links  px-3'>
                                <NavLink to="/order" activeClassName="active me-3">
                                    Giỏ hàng
                                </NavLink>
                            </span> */}

                            <span className='links px-3'>
                                <div className='lienhe'>Hotline: 1900 636 510</div>

                            </span>
                        </div>
                    </nav>

                    <div className='menu-icon'>
                        <GiHamburgerMenu onClick={toggleMenu} />
                    </div>
                </div>


            </header>
        </>

    );
}

export default Header;