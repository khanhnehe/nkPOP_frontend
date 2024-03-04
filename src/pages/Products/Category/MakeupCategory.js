import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { productCategory, outstandingProductCategory, getAllProduct, getAllCategory } from '../../../store/actions/adminAction';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './MakeupCategory.scss'
import { useDispatch, useSelector } from 'react-redux';

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

const MakeupCategory = () => {
    const dispatch = useDispatch();
    const listProductCategory = useSelector(state => state.admin.productCategory);
    const categoryId = '65c26a926a6e3fd020fb2286'; // Or get this from props or state

    useEffect(() => {
        dispatch(productCategory(categoryId));
    }, [dispatch, categoryId],); // Only re-run the effect if dispatch or categoryId changes

    const loadProductCategory = () => {
        dispatch(productCategory(categoryId));
    };
    return (
        <div className='makeup-container'>
            <div className='makeup-title'
                onClick={loadProductCategory}>
                Trang Điểm
            </div>
            <div className='makeup-item'>
                <Carousel responsive={responsive}>
                    {listProductCategory.map((product) => (
                        <div key={product._id}>
                            <div className="image-container">
                                <img src={product.images[0]} className="product-image" />
                                <img src={product.images[1]} className="product-image hover-image" />
                            </div>                            <div className="product-name" >{product.name_product}</div>
                            <div>Price: {product.price}</div>
                            <div>Discount: {product.discount}%</div>
                            <div>Sale Price: {product.sale_price}</div>
                            {/* Render other product details here */}
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

export default MakeupCategory;