import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { getAllProduct } from '../../store/actions/adminAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const columns = [
    // { id: 'name_product', label: 'Tên sản phẩm', minWidth: 170 },
    // // { id: 'brand', label: 'Thương hiệu', minWidth: 100 },
    // { id: 'description', label: 'Mô tả', minWidth: 170 },
    // // { id: 'category', label: 'Danh mục', minWidth: 170 },
    // { id: 'price', label: 'Giá', minWidth: 170, align: 'right' },
];

const Listht = () => {
    const dispatch = useDispatch();  // Lấy hàm dispatch từ Redux
    const products = useSelector(state => state.admin.allProduct);  // Lấy danh sách sản phẩm từ Redux store


    const [page, setPage] = useState(0);    //trang hiện tại trong phân trang
    const [rowsPerPage, setRowsPerPage] = useState(10); // số lượng hàng trên mỗi trang


    const fetchListProduct = async () => {
        try {
            await dispatch(getAllProduct());
        } catch (error) {
            console.error('Error fetching product list:', error);
            toast.error('Error fetching product list from server!');
        }
    };

    useEffect(() => {
        // Gọi hàm fetchListProduct khi component được mount
        fetchListProduct();
    }, []); // Dependency array rỗng để đảm bảo effect chỉ chạy một lần khi component mount


    // khi trang thay đổi
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    //khi số lượng hàng trên mỗi trang thay đổi
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0); // Đặt lại trang về trang đầu tiên khi số lượng hàng trên mỗi trang thay đổi
    };

    if (!products || !Array.isArray(products)) {
        return <div>Loading...</div>;
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align}>
                                            {row[column.id]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default Listht;
