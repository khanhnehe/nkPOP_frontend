import React, { useEffect, useState, useRef } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { productType } from '../../../store/actions/adminAction';
import Select from 'react-select';
import Type from './Type';

const Product_Type = ({ listNameType }) => {

    const columns = [
        { id: 'name_product', label: 'Tên sản phẩm', minWidth: 170 },
        { id: 'product_type', label: 'Tên phân loại', minWidth: 170 },
    ];

    const dispatch = useDispatch();
    const listProductType = useSelector(state => state.admin.productType);

    const [selectedType, setSelectedType] = useState('');

    const fetchlistProductType = async () => {
        try {
            await dispatch(productType(selectedType ? selectedType.value : ''));
        } catch (error) {
            console.error('Error fetching Type list:', error);
        }
    };

    useEffect(() => {
        fetchlistProductType();
        console.log(listNameType);

    }, [selectedType]);

    //xử lý khi giá trị của Select thay đổi
    const handleSelectChange = (selectedOption) => {
        // Lưu trữ giá trị đã chọn vào state
        setSelectedType(selectedOption);
    };

    // Tạo ra mảng options cho Select từ listNameType
    const TypeOptions = listNameType.map(product_type => ({
        value: product_type._id,
        label: product_type.type_name, // Thay 'name' bằng tên trường chứa tên danh mục

    }));

    return (
        <>
            <div className='category'>
                <div className='col'>
                    <div className='title-cate h4 my-3 px-2'>Danh sách sản phẩm của phân loại</div>

                    <div className='row '>
                        <div className='col-4 px-4'>
                            <Select
                                options={TypeOptions}
                                onChange={handleSelectChange}
                                value={selectedType}
                                placeholder="Chọn phân loại"
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
                                                {/* Kiểm tra xem listProductType có dữ liệu không */}
                                                {listProductType.length > 0 && (
                                                    // Nếu có, sử dụng hàm map để tạo một TableRow cho mỗi phần tử trong listProductType
                                                    listProductType.map((row) => (
                                                        // Tạo một TableRow với key là _id của row
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                                            {/* Tạo một TableCell cho mỗi cột trong columns */}
                                                            {columns.map((column) => {
                                                                // Lấy giá trị của cột từ row
                                                                let value = row[column.id];

                                                                // Kiểm tra xem giá trị có phải là đối tượng không
                                                                if (Array.isArray(value) && value.length > 0) {
                                                                    // Nếu là mảng, lấy giá trị đầu tiên và giả định rằng nó có một thuộc tính 'type_name' mà chúng ta có thể sử dụng
                                                                    value = value[0].type_name;
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

export default Product_Type;