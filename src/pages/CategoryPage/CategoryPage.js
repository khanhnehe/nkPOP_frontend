import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import './CategoryPage.scss'
import bia from "../../assets/bia.webp"
import { MdFavoriteBorder } from "react-icons/md";
import { productCategory, productBrand, productType, filterByPrice } from '../../store/actions/adminAction';
import { useParams } from 'react-router-dom';
import { list } from 'postcss';

const CategoryPage = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    const [selectBrand, setSelectBrand] = useState([]);
    const [selectType, setSelectType] = useState([]);
    const [priceRange, setPrice] = useState({ minPrice: 0, maxPrice: 0 });

    //lọc sp theo category 
    const listProductCategory = useSelector(
        //  state.admin.productCategory và lọc ra các sản phẩm thuộc danh mục hiện tại
        state => state.admin.productCategory.filter(
            product => product.category.some(category => category._id === id)
        )
    );

    const listType = listProductCategory
        // Sử dụng flatMap để lặp qua mỗi sp trong mảng
        .flatMap(product =>
            // Nếu isArray, trả về product.product_type : []
            Array.isArray(product.product_type) ? product.product_type : []
        )
        // Sử dụng reduce để tạo một mảng mới từ mảng được trả về bởi flatMap
        .reduce((unique, type) => {
            // Kiểm tra xem type._id đã tồn tại trong mảng unique chưa
            // Nếu đã tồn tại, trả về mảng unique như hiện tại
            // Nếu chưa tồn tại, thêm type vào mảng unique và trả về mảng mới
            return unique.some(obj => obj._id === type._id) ? unique : [...unique, type];
        }, []); // Khởi tạo mảng unique là một mảng rỗng


    const handleTypeChange = (event) => {
        const { value } = event.target;
        setSelectType(prev => {
            // Kiểm tra xem value đã tồn tại trong mảng prev chưa
            const isAlreadySelected = prev.includes(value);
            if (isAlreadySelected) {
                // Nếu đã tồn tại, xóa value khỏi mảng
                return prev.filter(type => type !== value);
            } else {
                // Nếu chưa tồn tại, thêm value vào mảng
                return [...prev, value];
            }
        });
        dispatch(productType(value));
    }

    const listBrand = listProductCategory
        .flatMap(product => ({ _id: product.brand._id, brand_name: product.brand.brand_name }))
        //dùng  reduce bỏ các brand  trùng lặp
        .reduce((unique, brand) => {
            return unique.some(obj => obj._id === brand._id) ? unique : [...unique, brand];
        }, []);

    const handleBrandChange = (event) => {
        const { value } = event.target;
        setSelectBrand(prev => {
            // Kiểm tra xem value đã tồn tại trong mảng prev chưa
            const isAlreadySelected = prev.includes(value);
            if (isAlreadySelected) {
                // Nếu đã tồn tại, xóa value khỏi mảng
                return prev.filter(type => type !== value);
            } else {
                // Nếu chưa tồn tại, thêm value vào mảng
                return [...prev, value];
            }
        });
        // Gửi action để lọc sản phẩm
        dispatch(productBrand(value));
    }



    const handlePriceChange = (minPrice, maxPrice) => {
        setPrice({ minPrice, maxPrice }); // Cập nhật khoảng giá
        dispatch(filterByPrice(minPrice, maxPrice)); //  lọc sp theo giá
    }


    useEffect(() => {
        dispatch(productCategory(id));
    }, [dispatch, id]);

    //nút load
    const loadProduct = () => {
        dispatch(productCategory(id))
    }

    //=>lọc theo brand type price
    // Lọc listProductCategory dựa trên selectType
    const filterProducts = listProductCategory.filter(product =>
        // Nếu selectType không rỗng, lọc sản phẩm theo loại
        (selectType.length === 0 || product.product_type.some(type => selectType.includes(type._id))) &&
        // Nếu selectBrand không rỗng, lọc sản phẩm theo thương hiệu
        (selectBrand.length === 0 || selectBrand.includes(product.brand._id))
    );
    return (
        <>
            <div className='container'>
                <div className='page-row row'>
                    <div className='left col-3'>

                        <div className='top-left p-4'>
                            Danh mục
                            {/* tên mục */}
                            <div className='title-page'
                                onClick={loadProduct}>Chăm sóc da</div>
                        </div>

                        {/* phân loại */}
                        <div className='bottom-left p-4'>
                            <p>Phân loại sản phẩm</p>
                            <div className='type-of-category'>
                                {listType.map(type => (
                                    <label key={type._id}>
                                        <input type="checkbox"
                                            value={type._id} onChange={handleTypeChange} />
                                        <span> {type.type_name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>


                        {/* phân giá */}
                        <div className='option-price p-4'>
                            <input type="number" placeholder="Nhập giá "
                                onChange={(e) => handlePriceChange(e.target.value, priceRange.maxPrice)} />
                            <input type="number" placeholder="Nhập giá "
                                onChange={(e) => handlePriceChange(priceRange.minPrice, e.target.value)} />
                        </div>


                        {/* phân brand */}
                        <div className='option-brand p-4'>
                            <p>Thương hiệu</p>
                            <div className='type-of-category'>
                                {listBrand.map(brand => (
                                    <label key={brand._id}>
                                        <input type="checkbox" value={brand._id}
                                            onChange={handleBrandChange} />
                                        <span> {brand.brand_name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='right col-9'>
                        <div className='col'>
                            <div className='top row'>
                                <img src={bia} className='img-page' />
                            </div>


                            {/* option sp */}
                            <div className='bottom-down row mt-0 p-0'>
                                <div className='option'>
                                    <div className=''>Phổ biến</div>
                                    <div className=''>Mới nhất</div>
                                    <div className=''>Bán chạy</div>

                                </div>

                                {/* sản phẩm */}
                                <div className='grid-product'>
                                    {filterProducts.map((product) => (
                                        <NavLink to={`/product/${product._id}`} key={product._id}>
                                            <div className='custom-item'>
                                                <div className="image-container">
                                                    <div className='discount'>-{product.discount}%</div>
                                                    <img src={product.images[0]} className="product-image" />
                                                    <img src={product.images[1]} className="product-image hover-image" />
                                                </div>
                                                <div className='bottom'>
                                                    <div className="product-name">{product.name_product}</div>
                                                    <div className='price'>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                                    <div className='sale'>{product.sale_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                                    <div className='bottom-two'>
                                                        <div className='sao'>{product.averageRating}</div>
                                                        <div className='purchases'>{product.purchases} Đã bán <MdFavoriteBorder /></div>
                                                    </div>
                                                </div>
                                            </div>

                                        </NavLink>
                                    ))}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryPage;