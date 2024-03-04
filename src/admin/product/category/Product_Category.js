import React, { useEffect, useState, useRef } from 'react';
import "./Category.scss"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { productCategory } from '../../../store/actions/adminAction';
import Category from './Category';
import Select from 'react-select';

const Product_Category = ({ listNameCategory }) => {

    const columns = [
        { id: 'name_product', label: 'Tên sản phẩm', minWidth: 170 },
        { id: 'price', label: 'Tên sản phẩm', minWidth: 170 },

        {
            id: 'category', label: 'Tên danh mục', minWidth: 170, render: (rowData) => (
                <div >
                    {rowData.category ? rowData.category.map(category => category.category_name).join(', ') : ''}
                </div>
            ),
        },
    ];

    const dispatch = useDispatch();
    const listProductCategory = useSelector(state => state.admin.productCategory);

    const [selectedCategory, setSelectedCategory] = useState('');

    const fetchlistProductCategory = async () => {
        try {
            await dispatch(productCategory(selectedCategory ? selectedCategory.value : ''));
        } catch (error) {
            console.error('Error fetching category list:', error);
        }
    };

    useEffect(() => {
        fetchlistProductCategory();
    }, [selectedCategory]);

    const handleSelectChange = (selectedOption) => {
        // Lưu trữ giá trị đã chọn vào state
        setSelectedCategory(selectedOption);
    };

    const categoryOptions = listNameCategory.map(category => ({
        value: category._id,
        label: category.category_name, // Thay 'name' bằng tên trường chứa tên danh mục
    }));

    return (
        <>
            <div className='category'>
                <div className='col'>
                    <div className='title-cate h4 my-3 px-2'>Danh sách sản phẩm của danh mục</div>

                    <div className='row '>
                        <div className='col-4 px-4'>
                            <Select
                                options={categoryOptions}
                                onChange={handleSelectChange}
                                value={selectedCategory}
                                placeholder="Chọn danh mục"
                                styles={{ menu: base => ({ ...base, zIndex: 9999 }) }} // Add this line

                            />
                        </div>
                        <div className='row mt-3 right  p-4'>
                            <div className='col'>
                                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                    <TableContainer sx={{ maxHeight: 440 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    {columns.map((column) => (
                                                        <TableCell key={column.id} align={column.align}
                                                            style={{
                                                                minWidth: column.minWidth,
                                                                backgroundColor: '#dfffd2'
                                                            }}>
                                                            {column.label}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {/* Kiểm tra xem listProductCategory có dữ liệu không */}
                                                {listProductCategory.length > 0 && (
                                                    // Nếu có, sử dụng hàm map để tạo một TableRow cho mỗi phần tử trong listProductCategory
                                                    listProductCategory.map((row) => (
                                                        // Tạo một TableRow với key là _id của row
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                                            {/* Tạo một TableCell cho mỗi cột trong columns */}
                                                            {columns.map((column) => {
                                                                // Lấy giá trị của cột từ row
                                                                let value = row[column.id];

                                                                // Kiểm tra xem giá trị có phải là đối tượng không
                                                                if (Array.isArray(value) && value.length > 0) {
                                                                    // Nếu là mảng, lấy giá trị đầu tiên và giả định rằng nó có một thuộc tính 'type_name' mà chúng ta có thể sử dụng
                                                                    value = value[0].category_name;
                                                                }
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
                                </Paper>
                            </div>

                        </div>

                    </div>
                </div>

            </div>


        </>
    )
}

export default Product_Category;