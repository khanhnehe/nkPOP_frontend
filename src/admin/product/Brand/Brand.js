import React, { useEffect, useState, useRef } from 'react';
import "./Brand.scss"
import Sidebar from '../../../components/Sidebar/Sidebar';
import Navbar from '../../../components/Navbar/Navbar';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { MdDeleteOutline } from "react-icons/md";
import { Modal } from 'react-bootstrap';
import { RiEdit2Line } from "react-icons/ri";
import { editBrand, createBrand, deleteBrand, getAllBrand } from '../../../store/actions/adminAction';
import { toast } from 'react-toastify';
import Product_Brand from './Product_Brand';

const Brand = () => {

    const columns = [
        { id: 'brand_name', label: 'Tên thương hiệu', minWidth: 170 },
        {
            id: 'edit', label: 'Sửa', minWidth: 100, align: 'center',
            render: (rowData) => <Button
                style={{ fontSize: '20px', color: 'yellowgreen' }}
                onClick={() => handleEdit(rowData)}><RiEdit2Line /></Button>
        },
        {
            id: 'delete', label: 'Xóa', minWidth: 100, align: 'center',
            render: (rowData) => <Button
                style={{ fontSize: '20px', color: '#ee5a5a' }}
                onClick={() => handleDelete(rowData)}
            >
                <MdDeleteOutline />
            </Button>
        },
    ];

    const dispatch = useDispatch();

    const listBrand = useSelector(state => state.admin.allBrand);
    const [brand, setBrand] = useState({ brand_name: '' });

    const [state, setState] = useState({ brand_name: '' })

    //show close modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchListBrand = async () => {
        try {
            await dispatch(getAllBrand());
        } catch (error) {
            console.error('Error fetching Brand list:', error);
        }
    };


    useEffect(() => {
        fetchListBrand();
        console.log('listBrand', listBrand);

    }, []);


    //_______edit
    const handleEdit = (rowData) => {
        setBrand({
            _id: rowData._id,
            brand_name: rowData.brand_name
        });

        handleShow();
    };

    const handleOnChange = (event, name) => {
        const { value } = event.target;
        const updateBrand = { ...brand };
        updateBrand[name] = value;
        setBrand(updateBrand);
    };

    const validateInput = () => {
        // Kiểm tra xem Brand_name có giá trị không. Nếu không, trả về false.
        if (!brand.brand_name) {
            toast.error('Bạn điền thiếu tên thương hiệu');
            return false;
        }
        // Nếu Brand_name có giá trị, trả về true.
        return true;
    };

    const handleUpdate = async () => {
        try {
            // Nếu hàm trả về false, dừng việc thực hiện hàm handleUpdate.
            if (!validateInput()) {
                return;
            }
            let updateBrand = { ...brand, _id: brand._id };

            await dispatch(editBrand(updateBrand));
            fetchListBrand();
            handleClose();

        } catch (e) {
            console.log('Error updating profile:', e);

        }
    }

    //delete
    const handleDelete = async (rowData) => {
        try {
            // Gọi action deleteUser với id của người dùng cần xóa
            await dispatch(deleteBrand(rowData._id));

            // Nếu xóa thành công, cập nhật danh sách người dùng và hiển thị thông báo
            fetchListBrand();
        } catch (error) {
            // Nếu xóa thất bại, hiển thị thông báo lỗi
            console.error('Error deleting user:', error);
        }
    };

    //create
    const handleOnChangeInput = (event, id) => {
        const value = event.target.value;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const validate = () => {
        // Kiểm tra xem Brand_name có giá trị không. Nếu không, trả về false.
        if (!state.brand_name) {
            toast.error('Bạn điền thiếu tên danh mục');
            return false;
        }
        // Nếu Brand_name có giá trị, trả về true.
        return true;
    };
    const handleCreateBrand = async () => {
        try {
            if (!validate()) {
                return;
            }
            await dispatch(createBrand(state));
            // Reset the form state after successful user creation
            fetchListBrand();
            setState({
                brand_name: ''
            });

        } catch (error) {
            console.error('Error create user:', error);
        }
    }


    return (
        <>
            <div className='Brand'>
                <Sidebar />
                <div className='Brand-container'>
                    <Navbar />
                    <div className='Brand-content'>
                        <div className='top row'>
                            <div className='row px-4 my-3 '>
                                <div className='title-top col-2'>Thêm thương hiệu</div>

                            </div>
                            <form className="row g-2 px-4">

                                <div className="col-md-5 mb-2">
                                    <label className="form-label">Tên thương hiệu</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={state.brand_name}
                                        onChange={(event) => handleOnChangeInput(event, 'brand_name')}
                                    ></input>
                                </div>

                                <div className='col-12'>
                                    <Button className="btn btn-save text-light" onClick={handleCreateBrand} style={{ backgroundColor: "#85d400", borderColor: "#85d400" }}>
                                        Lưu
                                    </Button>
                                </div>

                            </form>
                        </div>
                        <div className='bottom row'>
                            <div className='title-cate h4 my-3 mx-2'>Danh sách danh mục</div>
                            <div className='col-5'>
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
                                                {/* Kiểm tra xem listBrand có dữ liệu không */}
                                                {listBrand.length > 0 && (
                                                    // Nếu có, sử dụng hàm map để tạo một TableRow cho mỗi phần tử trong listBrand
                                                    listBrand.map((row) => (
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
                                </Paper>
                            </div>
                            <div className='col-7'>
                                <Product_Brand listNameBrand={listBrand} />

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal-header' closeButton>
                    <Modal.Title >Chỉnh sửa danh mục</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col ben-trai'>
                        <div className="form-group row mb-3">
                            <label className="col-sm-4 col-form-label" >Tên Danh mục</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={brand.brand_name}
                                    onChange={(event) => handleOnChange(event, 'brand_name')}
                                ></input>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn text-light me-2" onClick={handleClose} style={{ backgroundColor: "#92b060", borderColor: "#85d400" }}>
                        Đóng
                    </Button>
                    <Button className="btn btn-save text-light" onClick={handleUpdate} style={{ backgroundColor: "#85d400", borderColor: "#85d400" }}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default Brand;