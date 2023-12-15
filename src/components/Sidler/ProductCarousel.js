// ProductCarousel.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCarousel.scss';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; // Import carousel styles
import { responsive, productData } from './data'; // Import responsive and productData

const ProductCarousel = () => {
    const settings = {
        showDots: true,
        responsive: responsive,
        autoPlay: true,
        autoPlaySpeed: 3000,
        customTransition: "all .500ms ease",
        transitionDuration: 1000,
    };

    return (
        <>
            <div className='row mx-4 mt-5'>
                <div className='col-6'><h3>product</h3></div>
                <div className='col-6'>
                    <button className='btn btn-primary'>ok</button>
                </div>
            </div>
            <div className='mx-4 mb-4'>
                <Carousel {...settings}>
                    {/* hiển thị product từ productData */}
                    {productData.map((product) => (
                        <Link to={`/product/${product.id}`} key={product.id} className='product-link'>
                            <div className='content'>
                                <div className='custom'>
                                    <img src={product.imageurl} alt={product.name} className='custom-img' />
                                </div>
                                <h3>{product.name}</h3>
                                <div className='price'>{product.price}</div>
                                {/* Add other product details here */}
                                <button className='btn btn-primary mt-2'>Thêm vào giỏ hàng</button>

                            </div>
                        </Link>
                    ))}
                </Carousel>
            </div>

        </>
    );
};

export default ProductCarousel;
