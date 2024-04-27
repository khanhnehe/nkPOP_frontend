import React, { useState, useEffect } from 'react';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoSearch } from 'react-icons/io5';
import { MdFavorite, MdOutlineAccountCircle } from 'react-icons/md';
import { logout } from '../store/actions/userActions';
import logo1 from "../../src/assets/logo.png"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TbLogout } from "react-icons/tb";
import { useAlert } from 'react-alert'
import line from "../assets/line-top.webp";
import { searchProduct } from '../store/actions/adminAction';

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn, userInfo } = useSelector(state => state.user);

    const [firstName, setFirstName] = useState(userInfo ? userInfo.firstName : '');
    const [image, setImage] = useState(userInfo ? userInfo.image : '');
    const listSearchProduct = useSelector(state => state.admin.listSearchProduct)

    const [searchproduct, setSearchProduct] = useState('');

    const handleSearchChange = (event) => {
        setSearchProduct(event.target.value);
    };
    const handleSearchSubmit = async () => {
        await dispatch(searchProduct(searchproduct));
        setSearchProduct('');
        navigate("/search-product");


    }
    // Sử dụng useEffect để cập nhật firstName khi userInfo thay đổi
    useEffect(() => {
        setFirstName(userInfo ? userInfo.firstName : '');
        setImage(userInfo ? userInfo.image : '');
    }, [userInfo]);

    const dispatch = useDispatch();

    const logoHome = (
        <div className='logo'>
            <Link to='/'>
                <div>
                    <img src={logo1} alt='Logo' />
                </div>
            </Link>
        </div>
    );

    const cartOrder = (
        <span className='cart px-3'>
            <Link to='/cart'>
                <MdOutlineShoppingBag />
                <p>0</p>
            </Link>
        </span>
    );

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/login');
    };

    // lấy name


    return (
        <>
            <div className='top-line'></div>
            <header>
                <div className='header'>
                    {logoHome}

                    <div className='header-left'>
                        <div className='search'>
                            <div className='search-group'>
                                <input className='input-search' type='text' placeholder='Nhập tên sản phẩm cần tìm'
                                    value={searchproduct}
                                    onChange={(event) => handleSearchChange(event,)}
                                />

                                <button className='icon-search' onClick={handleSearchSubmit}>
                                    <IoSearch />
                                </button>
                            </div>
                        </div>
                    </div>

                    <nav className={openMenu ? 'show-nav' : 'hide-nav'}>
                        <div className='header-right'>
                            {/* chia menu */}
                            {isLoggedIn ? (
                                <div className='links px-3'>
                                    <div className='account'>
                                        <div className="image-header">
                                            {<img src={image} />}
                                            <span className='hello'>
                                                Hi, {firstName}!
                                            </span>
                                        </div>


                                        <div className='login-dropdown'>
                                            <div className='login-links'>
                                                <NavLink to='/profile/account' activeClassName='active me-3'>
                                                    Hồ sơ
                                                </NavLink>

                                                <span className='links px-3'>
                                                    <div onClick={handleLogout}><TbLogout />
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ) : (
                                <span className='links px-3'>
                                    <div className='account'>
                                        <MdOutlineAccountCircle className='icon-account' />
                                        <div className='login-dropdown'>
                                            <div className='login-links'>
                                                <NavLink to='/login' activeClassName='active me-3'>
                                                    Đăng nhập
                                                </NavLink>
                                                <NavLink to='/register' activeClassName='active me-3'>
                                                    Đăng ký
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </span>

                            )}

                            <span className='links px-3'>
                                <MdFavorite className='tim' />
                            </span>



                            {cartOrder}
                        </div>
                    </nav>

                    <div className='menu-icon'>
                        <GiHamburgerMenu onClick={toggleMenu} />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
