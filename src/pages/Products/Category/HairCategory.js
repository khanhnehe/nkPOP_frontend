import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { getHairProduct, } from '../../../store/actions/adminAction';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { MdFavoriteBorder } from "react-icons/md";
import './MakeupCategory.scss';
import { useNavigate } from 'react-router-dom';
import { IoIosStar } from "react-icons/io";


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        slidesToSlide: 1 // optional, default to 1.
    },
};

const HairCategory = () => {
    const dispatch = useDispatch();
    const hairCategory = useSelector(state => state.admin.hairProduct);

    useEffect(() => {
        dispatch(getHairProduct('65e1f10dbaff0e3fb3abf66d'));
    }, [dispatch,],); // Only re-run the effect if dispatch or categoryId changes

    const loadProductCategory = () => {
        dispatch(getHairProduct('65e1f10dbaff0e3fb3abf66d'));
    };

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/category/65e1f10dbaff0e3fb3abf66d');
    }

    return (
        <div className='makeup-container'>
            <div className='top-makeup'>
                <div className='makeup-title'
                    onClick={loadProductCategory}>
                    Chăm sóc tóc và da đầu
                </div>
                <div className='more' onClick={handleClick}>Xem thêm...</div>
            </div>
            <div className='makeup-item'>
                <Carousel responsive={responsive}>

                    {hairCategory.map((product) => (
                        <NavLink to={`/product/${product._id}`} key={product._id}>
                            <div className='custom-item'>
                                <div className="image-container">
                                    <div className='discount'>-{product.discount}%</div>
                                    <img src={product.images[0]} className="product-image" />
                                    <img src={product.images[1]} className="product-image hover-image" />
                                </div>
                                <div className='bottom'>
                                    <div className="product-name" >{product.name_product}</div>
                                    <div className='price'>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                    <div className='sale'>{product.sale_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                    <div className='bottom-two'>
                                        <div className='sao'>{product.averageRating}<IoIosStar className='icon-star' /></div>
                                        <div className='purchases'>{product.purchases} Đã bán <MdFavoriteBorder /></div>
                                    </div>
                                </div>

                                {/* Render other product details here */}
                            </div>
                        </NavLink>
                    ))}

                </Carousel>
            </div>
        </div>
    );
}

export default HairCategory;