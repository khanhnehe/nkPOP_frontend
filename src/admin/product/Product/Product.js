import React, { useEffect, useState, useRef } from 'react';
import "./Product.scss"
import Sidebar from '../../../components/Sidebar/Sidebar';
import Navbar from '../../../components/Navbar/Navbar';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { MdDeleteOutline } from "react-icons/md";
import { Modal } from 'react-bootstrap';
import { getAllProduct, editProduct, deleteProduct, createProduct } from '../../../store/actions/adminAction';
import { RiEdit2Line } from "react-icons/ri";
import { toast } from 'react-toastify';
import { getBase64 } from '../../../utils/Base64';
import CreateProduct from './CreateProduct';
import { useNavigate } from 'react-router-dom';
import SearchProduct from './SearchProduct';


const Product = () => {

    const columns = [
        {
            id: 'name_product', label: 'Tên sản phẩm', minWidth: 110, render: (rowData) => (
                <div className="description">
                    {rowData.name_product}
                </div>
            ),
        },
        {
            id: 'brand', label: 'Thương hiệu', minWidth: 110, render: (rowData) => (
                <div >
                    {rowData.brand ? rowData.brand.brand_name : ''}
                </div>
            ),
        },
        {
            id: 'images', label: 'Hình ảnh', minWidth: 110, render: (rowData) => (
                <div >
                    {rowData.images && rowData.images[0] ? <img src={rowData.images[0]} alt="Product" className="images" /> : ''}
                </div>
            ),
        },
        {
            id: 'description', label: 'Mô tả', minWidth: 110, render: (rowData) => (
                <div className="description">
                    {rowData.description}
                </div>
            ),
        },
        {
            id: 'category', label: 'Danh mục', minWidth: 110, render: (rowData) => (
                <div >
                    {rowData.category ? rowData.category.map(category => category.category_name).join(', ') : ''}
                </div>
            ),
        },
        {
            id: 'product_type', label: 'Loại sản phẩm', minWidth: 110, render: (rowData) => (
                <div className="product_type">
                    {rowData.product_type ? rowData.product_type.map(type => type.type_name).join(', ') : ''}
                </div>
            ),
        },
        // { id: 'discount', label: 'Giảm giá', minWidth: 110 },
        {
            id: 'sale_price',
            label: 'Giá bán',
            minWidth: 110,
            render: (rowData) => (
                <div>
                    {rowData.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </div>
            ),
        },        // { id: 'sale_price', label: 'Giá bán', minWidth: 110 },
        { id: 'quantity', label: 'Số lượng', minWidth: 60 },
        {
            id: 'variants',
            label: 'Mục sản phẩm',
            minWidth: 110,
            render: (rowData) => (
                <div className='product_type'>
                    {rowData.variants && rowData.variants.slice(0, 2).map((variant) => (
                        <div key={variant._id} className='variants'>
                            {variant.name} {variant.price}, SL: {variant.quantity}
                        </div>
                    ))}
                </div>
            ),
        },
        { id: 'sku', label: 'SKU', minWidth: 90 },
        {
            id: 'edit', label: 'Sửa', minWidth: 60, align: 'center',
            render: (rowData) => <Button
                style={{ fontSize: '20px', color: 'yellowgreen' }}
                onClick={() => handleEdit(rowData)}><RiEdit2Line /></Button>
        },
        {
            id: 'delete', label: 'Xóa', minWidth: 60, align: 'center',
            render: (rowData) => <Button
                style={{ fontSize: '20px', color: '#ee5a5a' }}
                onClick={() => handleDelete(rowData)}
            >
                <MdDeleteOutline />
            </Button>
        },
    ];


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const listProduct = useSelector(state => state.admin.allProduct);
    const [product, setProduct] = useState({ name_product: '' });

    const [state, setState] = useState({ name_product: '' })

    //show close modal

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const fetchListProduct = async () => {
        try {
            await dispatch(getAllProduct());
        } catch (error) {
            console.error('Error fetching Product list:', error);
        }
    };


    useEffect(() => {
        fetchListProduct();
    }, []);


    //delete
    const handleDelete = async (rowData) => {
        try {
            await dispatch(deleteProduct(rowData._id));

            fetchListProduct();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    //page row
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    //_______edit
    const handleEdit = (rowData) => {
        // Navigate to the edit product page with the product id as a URL parameter
        navigate(`/system/manage-edit-product/${rowData._id}`);
    };









    return (
        <>
            <div className='Product'>
                <Sidebar />
                <div className='Product-container'>
                    <Navbar />
                    <div className='Product-content'>
                        <div className='search-top row'>
                            <SearchProduct />
                        </div>
                        <div className='top row'>
                            <CreateProduct fetchProduct={fetchListProduct} />
                        </div>
                        <div className='bottom row'>
                            <div className='title-cate h4 my-3 mx-2'>Danh sách danh mục</div>
                            <div className='col'>
                                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                    <TableContainer sx={{ maxHeight: 440 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    {columns.map((column) => (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            style={{
                                                                minWidth: column.minWidth,
                                                                backgroundColor: '#dfffd2',
                                                            }}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {/* Kiểm tra xem listProduct có dữ liệu không */}
                                                {listProduct && listProduct.length > 0 && (
                                                    // Nếu có, sử dụng hàm map để tạo một TableRow cho mỗi phần tử trong listProduct
                                                    listProduct.map((row) => (
                                                        // Tạo một TableRow với key là _id của row
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                                            {/* Tạo một TableCell cho mỗi cột trong columns */}
                                                            {columns.map((column) => {
                                                                // Lấy giá trị của cột từ row
                                                                const value = row[column.id];
                                                                return (
                                                                    // Tạo một TableCell với key là id của cột
                                                                    <TableCell key={column.id} align={column.align}>
                                                                        {/* Kiểm tra xem cột có hàm render không. Nếu có, gọi hàm render với row làm đối số. Nếu không, hiển thị giá trị của cột */}
                                                                        {column.render ? column.render(row) : value}
                                                                    </TableCell>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 15]}
                                        component="div"
                                        count={listProduct.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        labelRowsPerPage="Số hàng của trang:"
                                        labelDisplayedRows={({ from, to, count }) => `${from}–${to}`}
                                    />
                                </Paper>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}

export default Product;