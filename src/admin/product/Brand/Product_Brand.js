import React, { useEffect, useState, useRef } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { productBrand } from '../../../store/actions/adminAction';
import Select from 'react-select';
import Brand from './Brand';

const Product_Brand = ({ listNameBrand }) => {

    const columns = [
        { id: 'name_product', label: 'Tên sản phẩm', minWidth: 170 },
        { id: 'brand', label: 'Tên thương hiệu', minWidth: 170 },
    ];

    const dispatch = useDispatch();
    const listProductBrand = useSelector(state => state.admin.productBrand);

    const [selectedBrand, setSelectedBrand] = useState('');

    const fetchlistProductBrand = async () => {
        try {
            await dispatch(productBrand(selectedBrand ? selectedBrand.value : ''));
        } catch (error) {
            console.error('Error fetching brand list:', error);
        }
    };

    useEffect(() => {
        fetchlistProductBrand();
        console.log(listNameBrand);

    }, [selectedBrand]);

    const handleSelectChange = (selectedOption) => {
        // Lưu trữ giá trị đã chọn vào state
        setSelectedBrand(selectedOption);
    };

    const brandOptions = listNameBrand.map(brand => ({
        value: brand._id,
        label: brand.brand_name, // Thay 'name' bằng tên trường chứa tên danh mục

    }));

    return (
        <>
            <div className='category'>
                <div className='col'>
                    <div className='title-cate h4 my-3 px-2'>Danh sách sản phẩm của thương hiệu</div>

                    <div className='row '>
                        <div className='col-4 px-4'>
                            <Select
                                options={brandOptions}
                                onChange={handleSelectChange}
                                value={selectedBrand}
                                placeholder="Chọn thương hiệu"
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
                                                {/* Kiểm tra xem listProductBrand có dữ liệu không */}
                                                {listProductBrand.length > 0 && (
                                                    // Nếu có, sử dụng hàm map để tạo một TableRow cho mỗi phần tử trong listProductBrand
                                                    listProductBrand.map((row) => (
                                                        // Tạo một TableRow với key là _id của row
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                                            {/* Tạo một TableCell cho mỗi cột trong columns */}
                                                            {columns.map((column) => {
                                                                // Lấy giá trị của cột từ row
                                                                let value = row[column.id];

                                                                // Kiểm tra xem giá trị có phải là đối tượng không
                                                                if (typeof value === 'object' && value !== null) {
                                                                    // Nếu là đối tượng, chúng ta sẽ giả định rằng nó có một thuộc tính 'category_name' mà chúng ta có thể sử dụng
                                                                    value = value.brand_name;
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

export default Product_Brand;