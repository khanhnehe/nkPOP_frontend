import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { productCategory, } from '../../../store/actions/adminAction';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { MdFavoriteBorder } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { IoIosStar } from "react-icons/io";

import './MakeupCategory.scss';

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

const SkinCategory = () => {
    const dispatch = useDispatch();
    const listProductCategory = useSelector(state => state.admin.productCategory);
    const categoryId = '65d8d2b70009e15caf750694'; // Or get this from props or state

    useEffect(() => {
        dispatch(productCategory(categoryId));
    }, [dispatch, categoryId],); // Only re-run the effect if dispatch or categoryId changes

    const loadProductCategory = () => {
        dispatch(productCategory(categoryId));
    };

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/category/65d8d2b70009e15caf750694');
    }
    return (
        <div className='makeup-container'>
            <div className='top-makeup'>
                <div className='makeup-title'
                    onClick={loadProductCategory}>
                    Chăm sóc da
                </div>
                <div className='more' onClick={handleClick}>Xem thêm... </div>
            </div>
            <div className='makeup-item'>
                <Carousel responsive={responsive}>

                    {listProductCategory.map((product) => (
                        <NavLink to={`/product/${product._id}`} key={product._id}>

                            <div key={product._id} className='custom-item'>
                                <div className="image-container">
                                    <div className='discount'>-{product.discount}%</div>
                                    <img src={product.images[0]} className="product-image" />
                                    <img src={product.images[1]} className="product-image hover-image" />
                                </div>
                                <div className='bottom'>
                                    <div className="product-name" >{product.name_product}</div>
                                    <div className='price'>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</div>
                                    <div className='sale'>{product.sale_price.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</div>
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

export default SkinCategory;