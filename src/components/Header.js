import React, { Component } from 'react';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import { PiShoppingCartFill } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openMenu: false,
        };
    }

    componentDidMount() { }

    logoHome = (
        <div className='logo'>
            <Link to="/">
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
        let openMenu = this.state.openMenu;
        return (
            <header>
                <div className='header'>
                    {this.logoHome}
                    {/* show menu */}
                    <nav className={openMenu ? 'show-nav' : 'hide-nav'}>

                        {/* <div className={openMenu ? 'nav-wrapper' : 'hide-nav'}></div> */}
                        <NavLink to="/Home"> Trang chủ</NavLink>
                        <div className='header-right' >
                            <span className='links'>
                                <NavLink to={"login"} className='me-3' >
                                    Đăng nhập
                                </NavLink>
                                <NavLink to={"register"} className='me-3'>
                                    Đăng ký
                                </NavLink>
                                <NavLink to={"order"} className='me-3'>
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
