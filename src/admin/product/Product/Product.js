import React, { useEffect, useState, useRef } from 'react';
import "./Product.scss"
import Sidebar from '../../../components/Sidebar/Sidebar';
import Navbar from '../../../components/Navbar/Navbar';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { MdDeleteOutline } from "react-icons/md";
import { Modal } from 'react-bootstrap';
import { getAllProduct, searchProduct, deleteProduct, createProduct } from '../../../store/actions/adminAction';
import { RiEdit2Line } from "react-icons/ri";
import { toast } from 'react-toastify';
import { getBase64 } from '../../../utils/Base64';
import CreateProduct from './CreateProduct';
import { useNavigate } from 'react-router-dom';
import SearchProduct from './SearchProduct';
import { IoSearch } from 'react-icons/io5';


const Product = () => {




    const dispatch = useDispatch();
    const navigate = useNavigate();

    const listProduct = useSelector(state => state.admin.allProduct);
    const listSearchProduct = useSelector(state => state.admin.listSearchProduct)

    const [searchproduct, setSearch] = useState('');

    //show close modal

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(6);



    const fetchListProduct = async () => {
        try {
            await dispatch(getAllProduct());
        } catch (error) {
            console.error('Error fetching Product list:', error);
        }
    };




    //delete
    const handleDelete = async (_id) => {
        try {
            await dispatch(deleteProduct(_id));

            fetchListProduct();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };



    //_______edit
    const handleEdit = (_id) => {
        // Navigate to the edit product page with the product id as a URL parameter
        navigate(`/system/manage-edit-product/${_id}`);
    };


    const handleSearchChange = async (event) => {
        setSearch(event.target.value);
        await dispatch(searchProduct(searchproduct))

    };
    const handleSearchSubmit = async () => {
        await dispatch(searchProduct(searchproduct))
    }

    useEffect(() => {
        fetchListProduct();
    }, []);


    return (
        <>
            <div className='Product'>
                <Sidebar />
                <div className='Product-container'>
                    <Navbar />
                    <div className='Product-content'>
                        {/* <div className='search-top row'>
                            <SearchProduct />
                        </div> */}
                        <div className='top row'>
                            <CreateProduct fetchProduct={fetchListProduct} />
                        </div>
                        <div className='bottom row'>
                            <div className='title-cate h4 my-3 mx-2'>Danh sách danh mục</div>
                            <div className='col'>
                                <div className='sreach mb-5'>
                                    <div className='col-4' style={{ display: 'flex' }}>
                                        <input type='text'
                                            placeholder='Nhập tên sản phẩm cần tìm'
                                            className="input col-11"
                                            value={searchproduct}
                                            onChange={(event) => handleSearchChange(event,)} />

                                        <div className='find' onClick={handleSearchSubmit}><IoSearch /></div>
                                    </div>

                                </div>
                                <table className="table-product">
                                    <thead>
                                        <tr className='' style={{ backgroundColor: "#dfffd2" }}>
                                            <th>Tên sản phẩm</th>
                                            <th>Thương hiệu</th>
                                            <th>Hình ảnh</th>
                                            <th>Mô tả</th>
                                            <th>Danh mục</th>
                                            <th>Loại sản phẩm</th>
                                            <th>Mục sản phẩm</th>
                                            <th>Giá bán</th>
                                            <th>SKU</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {((searchproduct ? listSearchProduct : listProduct) || '')
                                            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                                            .map((product) => (
                                                <tr key={product._id}>
                                                    <td className='name_product'>{product.name_product}</td>
                                                    <td>{product.brand ? product.brand.brand_name : ''}</td>

                                                    <td>{product.images && product.images[0] ? <img src={product.images[0]} alt="Product" className="images" /> : ''}</td>

                                                    <td className='description'>{product.description}</td>

                                                    <td className=''>{product.category ? product.category.map(category => category.category_name).join(', ') : ''}</td>

                                                    <td>{product.product_type ? product.product_type.map(type => type.type_name).join(', ') : ''}</td>

                                                    <td className='variants'>{product.variants ? product.variants.map(variant => variant.name).join(', ') : ''}</td>

                                                    <td>
                                                        <div className='price'>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</div>
                                                        <div>{product.sale_price.toLocaleString('vi-VN', { style: 'currency', currency: 'vnd' })}</div>
                                                    </td>

                                                    <td>{product.sku}</td>
                                                    <td>
                                                        <div className='action'>
                                                            <Button
                                                                style={{ fontSize: '20px', color: 'yellowgreen' }}
                                                                onClick={() => handleEdit(product._id)}><RiEdit2Line /></Button>
                                                            <Button
                                                                style={{ fontSize: '20px', color: '#ee5a5a' }}
                                                                onClick={() => handleDelete(product._id)}
                                                            >
                                                                <MdDeleteOutline />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>


                                </table>
                                <div className='page-btn'>
                                    <button className='btn-page me-3' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>Trước</button>
                                    <button className='btn-page' onClick={() => setCurrentPage(currentPage + 1)} disabled={(currentPage + 1) * itemsPerPage >= listProduct.length}>Sau</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}

export default Product;