import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { getAllBrand, getAllCategory, getAllType } from '../store/actions/adminAction';
import './Banner.scss'

const Banner = () => {
    const dispatch = useDispatch();
    const listCategory = useSelector(state => state.admin.allCategory);
    const listType = useSelector(state => state.admin.allType);
    const listBrand = useSelector(state => state.admin.allBrand)

    useEffect(() => {
        dispatch(getAllCategory());
        dispatch(getAllType());
        dispatch(getAllBrand());
    }, [dispatch]);

    const [dropdownOpen, setDropdownOpen] = useState(null); // Sử dụng hook useState để quản lý trạng thái mở/closed của dropdown

    const handleMouseEnter = (index) => { // Hàm xử lý sự kiện khi chuột di vào
        setDropdownOpen(index); // Đặt trạng thái mở của dropdown
    };

    const handleMouseLeave = () => { // Hàm xử lý sự kiện khi chuột di ra
        setDropdownOpen(null); // Đặt trạng thái closed của dropdown
    };

    const handleLoad = () => {
        dispatch(getAllCategory());
        dispatch(getAllType());
        dispatch(getAllBrand());
    }


    return (
        <div className='banner-container'>
            <div className='banner'>
                <div className='banner-right'>
                    {listCategory.map((category, index) => ( // Lặp qua danh sách các danh mục
                        <div
                            key={index} // Đặt key cho mỗi phần tử trong danh sách
                            onMouseEnter={() => handleMouseEnter(index)} // Khi chuột di vào, gọi hàm handleMouseEnter
                            onMouseLeave={handleMouseLeave} // Khi chuột di ra, gọi hàm handleMouseLeave
                        >
                            <span>
                                <NavLink to={`/category/${category._id}`} activeClassName="active me-3">
                                    {category.category_name}
                                </NavLink>
                            </span>
                            {dropdownOpen === index && category.types && category.types.length > 0 && (
                                <li className='category-item' style={{ listStyle: 'none', fontSize: '18px' }}>
                                    <ul>
                                        {category.types.map((type, typeIndex) => ( // Lặp qua danh sách các loại thuộc danh mục
                                            <li className='type-item' key={typeIndex}>
                                                <NavLink to={`/type/${type._id}`} className='a-con' activeClassName="active me-3">
                                                    {type.type_name}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            )}
                        </div>
                    ))}
                </div>
                <div className='banner-left'>
                    <div
                        onMouseEnter={() => handleMouseEnter('brand')} // Khi chuột di vào, gọi hàm handleMouseEnter với tham số 'brand'
                        onMouseLeave={handleMouseLeave} // Khi chuột di ra, gọi hàm handleMouseLeave
                    >
                        <NavLink to='/brand'>
                            <span activeClassName="active me-3">Thương hiệu</span>
                        </NavLink>
                        {dropdownOpen === 'brand' && listBrand && listBrand.length > 0 && (
                            <li className='brand-item' style={{ listStyle: 'none', fontSize: '18px' }}>
                                <ul>
                                    {listBrand.map((brand, index) => ( // Lặp qua danh sách các thương hiệu
                                        <li className='' key={index}>
                                            <NavLink to={`/brand/${brand._id}`} className='a-con' activeClassName="active me-3">
                                                {brand.brand_name}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        )}
                    </div>
                    <div className='an-di ' style={{ color: '#a5d651' }} onClick={handleLoad}>an di</div>
                </div>
            </div>
        </div>
    );
}


export default Banner;
