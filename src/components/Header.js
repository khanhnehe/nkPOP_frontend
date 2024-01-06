import React, { Component } from 'react';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import { PiShoppingCartFill } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { path } from '../utils/constant';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openMenu: false,
            // header lun hiện
            scrollPage: true,

        };
    }

    componentDidMount() { }

    logoHome = (
        <div className='logo'>
            <Link to={path.HOME}>
                <div>
                    <span>KANH POP</span>
                </div>
            </Link>
        </div>
    );

    cartOrder = (
        <span className='cart'>
            <Link to="/cart">
                <PiShoppingCartFill />
                <p>0</p>
            </Link>
        </span>
    )

    toggleMenu = () => {
        this.setState({
            openMenu: !this.state.openMenu
        })
    }

    render() {
        let { openMenu, scrollPage } = this.state;
        return (
            <header>
                {/* className={scrollPage ? 'fixed' : ''} */}
                <div className='header'>
                    {this.logoHome}
                    {/* show menu */}
                    <nav className={openMenu ? 'show-nav' : 'hide-nav'}>

                        {/* <div className={openMenu ? 'nav-wrapper' : 'hide-nav'}></div> */}
                        <NavLink to={path.HOMEPAGE} className="text-home ms-5"> Trang chủ</NavLink>

                        <div className='header-right' >

                            <span className='links'>
                                <NavLink to={path.LOGIN} className="me-3">
                                    Đăng nhập
                                </NavLink>
                                <NavLink to="/register" className="me-3">
                                    Đăng ký
                                </NavLink>
                                <NavLink to="/order" className="me-3">
                                    Giỏ hàng
                                </NavLink>
                            </span>
                            {this.cartOrder}
                        </div>
                    </nav>
                    {/* menu phụ */}
                    <div className='menu-icon'>
                        <GiHamburgerMenu onClick={this.toggleMenu} />
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
