import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoSearch } from 'react-icons/io5';
import './SearchProduct.scss';
import { searchProduct, detailProduct } from '../../../store/actions/adminAction';
import { useNavigate } from 'react-router-dom';

const SearchProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // thông tin sp
    const productDetail = useSelector(state => state.admin.detailProduct);

    // state cho giá trị tìm kiếm
    const [searchValue, setSearchValue] = useState('');

    // hàm xử lý khi form tìm kiếm được submit
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        dispatch(searchProduct(searchValue));
    };

    // hàm xử lý khi giá trị tìm kiếm thay đổi
    const handleOnChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <>
            <div className='search col-6'>
                <div className='search-group'>
                    <input className='input-search'
                        type='text'
                        placeholder='Nhập sản phẩm...'
                        value={searchValue}
                        onChange={handleOnChange}
                    />
                    <button className='icon-search'
                        onClick={handleSearchSubmit}>
                        <IoSearch />
                    </button>
                </div>
            </div>

        </>
    )
}

export default SearchProduct;