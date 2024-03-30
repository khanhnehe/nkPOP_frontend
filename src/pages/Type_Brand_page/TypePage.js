import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import './TypePage.scss'
import bia from "../../assets/83.webp"
import { MdFavoriteBorder } from "react-icons/md";
import { productType, productBrand, filterByPrice, getTopSelling, getAllProduct, } from '../../store/actions/adminAction';
import { useParams } from 'react-router-dom';
import { list } from 'postcss';
import { IoIosStar } from "react-icons/io";

const TypePage = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    const [selectBrand, setSelectBrand] = useState([]);

    //lọc sp theo type 
    const listProductType = useSelector(
        //  state.admin.productType và lọc ra các sản phẩm thuộc danh mục hiện tại
        state => state.admin.productType.filter(
            product => product.product_type.some(product_type => product_type._id === id)
        )
    );
    //lấy tên type
    const type = listProductType
        .flatMap(product => product.product_type)
        .find(product_type => product_type._id === id);

    const typeName = type ? type.type_name : '';



    const listBrand = listProductType
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


    //price
    const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 10000000 });

    const handlePriceChange = (e, field) => {
        setPriceRange({ ...priceRange, [field]: e.target.value });
    }
    //=>lọc theo brand type price
    const filterProducts = listProductType.filter(product =>

        // Nếu selectBrand không rỗng, lọc sản phẩm theo thương hiệu
        (selectBrand.length === 0 || selectBrand.includes(product.brand._id)) &&
        // Lọc sản phẩm theo khoảng giá
        (product.price >= priceRange.minPrice && product.price <= priceRange.maxPrice)
    );

    //______lọc menu 2 ____bán chạy

    // const [popularProduct, setPopularProduct] = useState([]);
    // const [topProduct, setTopProduct] = useState([]);

    useEffect(() => {
        dispatch(getAllProduct());
        dispatch(getTopSelling());
    }, [dispatch]);

    const allProduct = useSelector(state => state.admin.allProduct);

    // Lọc tất cả sản phẩm dựa trên danh mục
    const filterTopProduct = allProduct.filter(product => product.product_type.some(product_type => product_type._id === id));

    // Sort filterTopProduct and filterTopSelling
    const sortTopProduct = [...filterTopProduct].sort((a, b) => {
        // Sắp xếp dựa trên số lượng mua và doanh số
        // Tính sự khác biệt về số lượng mua giữa b và a        
        const popularityDiff = b.purchases - a.purchases;
        // Nếu sự khác biệt không phải là 0 (nghĩa là hai sản phẩm có số lượng mua khác nhau), trả về sự khác biệt
        if (popularityDiff !== 0) return popularityDiff;
        // Nếu số lượng mua giữa hai sản phẩm là như nhau, sắp xếp dựa trên doanh số
        return b.sales - a.sales;
    });



    const [filterOption, setFilterOption] = useState('');

    // filter option change

    const [selectedOption, setSelectedOption] = useState(null);
    const handleFilterOptionChange = (option) => {
        setFilterOption(option);
        setSelectedOption(option);

    }


    let filterProductPage;
    switch (filterOption) {
        case 'Phổ biến':
            filterProductPage = filterProducts;
            break;
        case 'Bán chạy':
            filterProductPage = sortTopProduct;
            break;
        default:
            filterProductPage = filterProducts;
            break;
    }


    useEffect(() => {
        dispatch(productType(id));
    }, [dispatch, id]);

    //nút load
    const loadProduct = () => {
        dispatch(productType(id))
    }


    return (
        <>
            <div className='container'>
                <div className='page-row row'>
                    <div className='left col-3'>

                        <div className='top-left p-4'>
                            Phân loại
                            {/* tên loại */}
                            <div className='title-page' onClick={loadProduct}>
                                {typeName}
                            </div>
                        </div>


                        {/* phân loại */}



                        {/* phân giá */}
                        <div className='option-price p-4'>
                            <div className='min'>
                                Giá tối thiểu(VND)
                                <input
                                    type="text"
                                    value={priceRange.minPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    placeholder="Tối thiểu"
                                    className="min-price"
                                    onChange={(e) => handlePriceChange(e, 'minPrice')}
                                />
                            </div>
                            <div>
                                <div className="lineprice"></div>
                            </div>
                            <div className='max'>
                                Giá tối đa(VND)
                                <input
                                    type="text"
                                    value={priceRange.maxPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} VND
                                    placeholder="Tối đa"
                                    className="min-price"
                                    onChange={(e) => handlePriceChange(e, 'maxPrice')}
                                />
                            </div>
                        </div>


                        {/* phân brand */}
                        <div className='option-brand p-4'>
                            <p className='page-p'>Thương hiệu</p>
                            <div className='type-of-type'>
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
                                    <div
                                        className={selectedOption === 'Phổ biến' ? 'active' : ''}
                                        onClick={() => handleFilterOptionChange('Phổ biến')}
                                    >
                                        Phổ biến
                                    </div>
                                    <div
                                        className={selectedOption === 'Mới nhất' ? 'active' : ''}
                                        onClick={() => handleFilterOptionChange('Mới nhất')}
                                    >
                                        Mới nhất
                                    </div>
                                    <div
                                        className={selectedOption === 'Bán chạy' ? 'active' : ''}
                                        onClick={() => handleFilterOptionChange('Bán chạy')}
                                    >
                                        Bán chạy
                                    </div>
                                </div>

                                {/* sản phẩm */}
                                <div className='grid-product'>
                                    {filterProductPage.map((product) => (
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
                                                        <div className='sao'>{product.averageRating}<IoIosStar className='icon-star' /></div>
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

export default TypePage;