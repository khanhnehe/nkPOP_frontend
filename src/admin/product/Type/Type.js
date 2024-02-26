import React, { useEffect, useState } from 'react';
import "./Type.scss"
import Sidebar from '../../../components/Sidebar/Sidebar';
import Navbar from '../../../components/Navbar/Navbar';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { MdDeleteOutline } from "react-icons/md";
import { Modal } from 'react-bootstrap';
import { RiEdit2Line } from "react-icons/ri";
import { editType, createType, deleteType, getAllType } from '../../../store/actions/adminAction';
import { toast } from 'react-toastify';
import Product_Type from './Product_Type';

const Type = () => {

    const columns = [
        { id: 'type_name', label: 'Tên phân loại', minWidth: 170 },
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

    const listType = useSelector(state => state.admin.allType);
    const [type, setType] = useState({ type_name: '' });

    const [state, setState] = useState({ type_name: '' })

    //show close modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchListType = async () => {
        try {
            await dispatch(getAllType());
        } catch (error) {
            console.error('Error fetching Type list:', error);
        }
    };


    useEffect(() => {
        fetchListType();
        console.log('listType', listType);

    }, []);


    //_______edit
    const handleEdit = (rowData) => {
        setType({
            _id: rowData._id,
            type_name: rowData.type_name
        });

        handleShow();
    };

    const handleOnChange = (event, name) => {
        const { value } = event.target;
        const updateType = { ...type };
        updateType[name] = value;
        setType(updateType);
    };

    //edit
    const validateInput = () => {
        // Kiểm tra xem Type_name có giá trị không. Nếu không, trả về false.
        if (!type.type_name) {
            toast.error('Bạn điền thiếu phân loại');
            return false;
        }
        // Nếu Type_name có giá trị, trả về true.
        return true;
    };

    const handleUpdate = async () => {
        try {
            // Nếu hàm trả về false, dừng việc thực hiện hàm handleUpdate.
            if (!validateInput()) {
                return;
            }
            let updateType = { ...type, _id: type._id };

            await dispatch(editType(updateType));
            fetchListType();
            handleClose();

        } catch (e) {
            console.log('Error updating profile:', e);

        }
    }

    //delete
    const handleDelete = async (rowData) => {
        try {
            // Gọi action deleteUser với id của người dùng cần xóa
            await dispatch(deleteType(rowData._id));

            // Nếu xóa thành công, cập nhật danh sách người dùng và hiển thị thông báo
            fetchListType();
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
        // Kiểm tra xem Type_name có giá trị không. Nếu không, trả về false.
        if (!state.type_name) {
            toast.error('Bạn tạo thiếu tên phân loại ');
            return false;
        }
        // Nếu Type_name có giá trị, trả về true.
        return true;
    };
    const handleCreateType = async () => {
        try {
            if (!validate()) {
                return;
            }
            await dispatch(createType(state));
            // Reset the form state after successful user creation
            fetchListType();
            setState({
                type_name: ''
            });

        } catch (error) {
            console.error('Error create user:', error);
        }
    }


    return (
        <>
            <div className='Type'>
                <Sidebar />
                <div className='Type-container'>
                    <Navbar />
                    <div className='Type-content'>
                        <div className='top row'>
                            <div className='row px-4 my-3 '>
                                <div className='title-top col-2'>Thêm phân loại</div>

                            </div>
                            <form className="row g-2 px-4">

                                <div className="col-md-5 mb-2">
                                    <label className="form-label">Tên phân loại</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={state.type_name}
                                        onChange={(event) => handleOnChangeInput(event, 'type_name')}
                                    ></input>
                                </div>

                                <div className='col-12'>
                                    <Button className="btn btn-save text-light" onClick={handleCreateType} style={{ backgroundColor: "#85d400", borderColor: "#85d400" }}>
                                        Lưu
                                    </Button>
                                </div>

                            </form>
                        </div>
                        <div className='bottom row'>
                            <div className='title-cate h4 my-3 mx-2'>Danh sách phân loại</div>
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
                                                {/* Kiểm tra xem listType có dữ liệu không */}
                                                {listType.length > 0 && (
                                                    // Nếu có, sử dụng hàm map để tạo một TableRow cho mỗi phần tử trong listType
                                                    listType.map((row) => (
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
                                <Product_Type listNameType={listType} />

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal-header' closeButton>
                    <Modal.Title >Chỉnh sửa phân loại</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col ben-trai'>
                        <div className="form-group row mb-3">
                            <label className="col-sm-4 col-form-label" >Tên Phân loại</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={type.type_name}
                                    onChange={(event) => handleOnChange(event, 'type_name')}
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

export default Type;