import React, { useEffect, useState, useRef } from 'react';
import "./ManagerUser.scss"
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from "../../components/Navbar/Navbar";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { getAllUser, deleteUser, createUser } from '../../store/actions/adminAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { Modal } from 'react-bootstrap';
import { getBase64 } from '../../utils/Base64';
import { editProfile } from '../../store/actions/userActions'
import CreateUser from './CreateUser';
const ManagerUser = () => {

    const columns = [
        { id: 'fullName', label: 'Họ tên', minWidth: 170 },
        {
            id: 'image',
            label: 'Ảnh',
            minWidth: 100,
            render: (rowData) => (
                <img src={rowData.image} style={{ width: '50px', height: '50px' }} />
            )
        }, { id: 'email', label: 'Email', minWidth: 170 },
        { id: 'phoneNumber', label: 'Số điện thoại', minWidth: 170 },
        { id: 'address', label: 'Địa chỉ', minWidth: 170, },
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
    const listUsers = useSelector(state => state.admin.allUser);
    const updateUser = useSelector(state => state.user.userInfo)
    //fetch list usrr

    const initialState = {
        userId: updateUser ? updateUser._id : '',
        lastName: updateUser ? updateUser.lastName : '',
        firstName: updateUser ? updateUser.firstName : '',
        email: updateUser ? updateUser.email : '',
        phoneNumber: updateUser ? updateUser.phoneNumber : '',
        image: updateUser ? updateUser.image : '',
        address: updateUser ? updateUser.address : '',
        role: updateUser ? updateUser.role : ''
    }


    const [profile, setProfile] = useState(initialState);

    //show close modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = (rowData) => {
        setProfile({
            userId: rowData._id,
            lastName: rowData.lastName,
            firstName: rowData.firstName,
            email: rowData.email,
            phoneNumber: rowData.phoneNumber,
            image: rowData.image,
            address: rowData.address,
            role: rowData.role
        });

        handleShow();
    };

    const handleDelete = async (rowData) => {
        try {
            // Gọi action deleteUser với id của người dùng cần xóa
            await dispatch(deleteUser(rowData._id));

            // Nếu xóa thành công, cập nhật danh sách người dùng và hiển thị thông báo
            fetchListUser();
        } catch (error) {
            // Nếu xóa thất bại, hiển thị thông báo lỗi
            console.error('Error deleting user:', error);
        }
    };

    const handleOnChange = (event, name) => {
        const { value } = event.target;
        const updatedProfile = { ...profile };
        updatedProfile[name] = value;
        setProfile(updatedProfile);
    }

    const validateInput = () => {
        let isValid = true;
        let checkArr = ['lastName', 'firstName', 'email', 'phoneNumber', 'address'];

        for (let i = 0; i < checkArr.length; i++) {
            if (!profile[checkArr[i]]) {
                isValid = false;
                alert('Bạn điền thiếu: ' + checkArr[i]);
                break;
            }
        }
        return isValid;
    }


    // Then in your handleUpdate function, set dbChange to true after dispatching the updateProfile action
    const handleUpdate = async () => {
        try {
            let isValid = validateInput();
            if (!isValid) {
                return;
            }

            let updatedProfile = { ...profile, _id: profile.userId };
            await dispatch(editProfile(updatedProfile));

            // Set dbChange to true here

            fetchListUser();
            handleClose();
        } catch (error) {
            console.log('Error updating profile:', error);
        }
    }
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const fetchListUser = async () => {
        try {
            await dispatch(getAllUser());
        } catch (error) {
            console.error('Error fetching user list:', error);
            toast.error('Error fetching user list from the server!');
        }
    };


    useEffect(() => {
        fetchListUser();
    }, []);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // update image
    const fileInputRef = useRef();

    const handleImageChange = async (event) => {
        const fileList = event.target.files;
        const file = fileList[0];
        if (!file.url && !file.preview) {
            let base64Image = await getBase64(file);
            base64Image = `data:image/jpeg;base64,${base64Image.split(',')[1]}`;
            file.preview = base64Image;
        }
        setProfile(prevProfile => ({ ...prevProfile, image: file.preview }));
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            <div className="manager-user">
                <Sidebar />
                <div className="user-Container">
                    <Navbar />
                    <div className="user">
                        <div className="top col-6">
                            <CreateUser onUserCreated={fetchListUser} />                        </div>
                        <div className="bottom mt-3">
                            <div className='h4 my-3 mx-2'>Danh sách người dùng</div>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell key={column.id}
                                                        align={column.align}
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
                                            {listUsers.length > 0 && (
                                                listUsers
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((row) => (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                                            {columns.map((column) => (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.id === 'fullName' ? (
                                                                        `${row.lastName} ${row.firstName}`
                                                                    ) : (
                                                                        column.id === 'image' ? (
                                                                            <img src={row[column.id]} style={{ width: '50px', height: '50px' }} />
                                                                        ) : (
                                                                            column.render ? column.render(row) : row[column.id]
                                                                        )
                                                                    )}
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 100]}
                                    component="div"
                                    count={listUsers.length}
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal-header' closeButton>
                    <Modal.Title >Chỉnh sửa thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col ben-trai'>
                        <div className="form-group row mb-3">
                            <label className="col-sm-3 col-form-label" >Họ:</label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={profile.lastName}
                                    onChange={(event) => handleOnChange(event, 'lastName')}
                                ></input>
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-sm-3 col-form-label"  >Tên:</label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={profile.firstName}
                                    onChange={(event) => handleOnChange(event, 'firstName')}
                                ></input>
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-sm-3 col-form-label"  >Email:</label>
                            <div className="col-sm-6">
                                <input
                                    type="email"
                                    className="form-control"
                                    value={profile.email}
                                    onChange={(event) => handleOnChange(event, 'email')}
                                ></input>
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-sm-3 col-form-label"  >Mật khẩu:</label>
                            <div className="col-sm-6">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder='.......'
                                ></input>
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label className="col-sm-3 col-form-label"  >Diện thoại:</label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={profile.phoneNumber}
                                    onChange={(event) => handleOnChange(event, 'phoneNumber')}
                                ></input>
                            </div>
                        </div>

                        <div className="form-group row mb-3" >
                            <label className="col-sm-3 col-form-label"  >Đại chỉ:</label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={profile.address}
                                    onChange={(event) => handleOnChange(event, 'address')}
                                ></input>
                            </div>
                        </div>

                        {/* Input để chọn hình ảnh */}
                        <div className="form-group row mb-3">
                            <label className="col-sm-3 col-form-label">Hình ảnh:</label>
                            <div className="col-sm-6">
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                />
                                <Button variant="outlined" onClick={handleUploadClick}>
                                    Chọn hình ảnh
                                </Button>
                                {profile.image && (
                                    <img src={profile.image} style={{ height: '100px', width: '100px', marginTop: '5px' }} />
                                )}
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

export default ManagerUser;
