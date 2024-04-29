import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdFavoriteBorder } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { searchProduct } from '../store/actions/adminAction';
import './ProductSearch.scss';
import { GrFormNext } from "react-icons/gr";

const ProductSearch = () => {

    const dispatch = useDispatch();
    const listSearchProduct = useSelector(state => state.admin.listSearchProduct)

    // useEffect(() => {
    //     dispatch(searchProduct())
    // }, []);



    return (
        <>
            <div className='container'>
                <div className='search' style={{ display: "flex" }}>
                    <NavLink to='/'>
                        <div className='' style={{ color: "#009eff" }}>Trang chủ</div>
                    </NavLink>

                    <div className='title-small'> <GrFormNext />Tìm kiếm</div>
                </div>

                <div className='title'>Tìm kiếm </div>
                <p style={{ fontSize: '20px', fontFamily: 'fangsong' }}>Có {listSearchProduct.length} sản phẩm cho tìm kiếm</p>

                {/* sản phẩm */}
                <div className='grid-product col-8 mt-5'>
                    {listSearchProduct.map((product) => (
                        <NavLink to={`/product/${product._id}`} key={product._id}>
                            <div className='custom-item'>
                                <div className="image-container">
                                    <div className='discount'>-{product.discount}%</div>
                                    <img src={product.images[0]} className="product-image" />
                                    <img src={product.images[1]} className="product-image hover-image" />
                                </div>
                                <div className='bottom'>
                                    <div className="product-name">{product.name_product}</div>
                                    <div className='price'>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</div>
                                    <div className='sale'>{product.sale_price.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</div>
                                    <div className='bottom-two'>
                                        <div className='sao'>{product.averageRating}<IoIosStar className='icon-star' /></div>
                                        <div className='purchases'>{product.purchases} Đã bán <MdFavoriteBorder /></div>
                                    </div>
                                </div>
                            </div>

                        </NavLink>
                    ))}
                </div>


            </div>
        </>
    );
}

export default ProductSearch;