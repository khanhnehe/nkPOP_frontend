import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllBrand, getAllCategory, getAllType } from '../store/actions/adminAction';
import './Banner.scss'

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: null,
            listCategory: [],
            listType: [],
            listBrand: []
        };
    }

    componentDidMount() {
        this.props.getAllCategory();
        this.props.getAllType();
        this.props.getAllBrand();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.allCategory.some((category, index) => {
            const prevCategory = prevProps.allCategory[index];
            if (!prevCategory || category.category_name !== prevCategory.category_name) {
                return true;
            }
            if (category.types.some((type, typeIndex) => {
                const prevType = prevCategory.types[typeIndex];
                return !prevType || type.type_name !== prevType.type_name;
            })) {
                return true;
            }
            return false;
        })) {
            this.setState({ listCategory: this.props.allCategory });
        }

        if (this.props.allBrand.some((brand, index) => {
            const prevBrand = prevProps.allBrand[index];
            return !prevBrand || brand.brand_name !== prevBrand.brand_name;
        })) {
            this.setState({ listBrand: this.props.allBrand });
        }
    }

    handleMouseEnter = (index) => {
        this.setState({ dropdownOpen: index });
    };

    handleMouseLeave = () => {
        this.setState({ dropdownOpen: null });
    };

    render() {

        const { dropdownOpen, listCategory, listBrand } = this.state;
        return (
            <div className='banner-container'>
                <div className='banner'>
                    <div className='banner-right'>
                        {listCategory.map((category, index) => ( // Lặp qua danh sách các danh mục
                            <div
                                key={index} // Đặt key cho mỗi phần tử trong danh sách
                                onMouseEnter={() => this.handleMouseEnter(index)} // Khi chuột di vào, gọi hàm handleMouseEnter
                                onMouseLeave={this.handleMouseLeave} // Khi chuột di ra, gọi hàm handleMouseLeave
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
                            onMouseEnter={() => this.handleMouseEnter('brand')} // Khi chuột di vào, gọi hàm handleMouseEnter với tham số 'brand'
                            onMouseLeave={this.handleMouseLeave} // Khi chuột di ra, gọi hàm handleMouseLeave
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
                    </div>
                </div>
            </div>);
    }
}

const mapStateToProps = state => {
    return {
        allCategory: state.admin.allCategory,
        allType: state.admin.allType,
        allBrand: state.admin.allBrand
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCategory: () => dispatch(getAllCategory()),
        getAllType: () => dispatch(getAllType()),
        getAllBrand: () => dispatch(getAllBrand())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);