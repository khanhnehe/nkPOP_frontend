import React, { useEffect, useState, useRef } from 'react';
import "./Category.scss"
import Sidebar from '../../../components/Sidebar/Sidebar';
import Navbar from '../../../components/Navbar/Navbar';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { MdDeleteOutline } from "react-icons/md";
import { Modal } from 'react-bootstrap';
import { getAllCategory, editCategory, deleteCategory, createCategory } from '../../../store/actions/adminAction';
import { RiEdit2Line } from "react-icons/ri";
import { toast } from 'react-toastify';
import Product_Category from './Product_Category';
const Category = () => {

    const columns = [
        { id: 'category_name', label: 'Tên danh mục', minWidth: 170 },
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

    const listCategory = useSelector(state => state.admin.allCategory);
    const [category, setCategory] = useState({ category_name: '' });

    const [state, setState] = useState({ category_name: '' })

    //show close modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchListCategory = async () => {
        try {
            await dispatch(getAllCategory());
        } catch (error) {
            console.error('Error fetching category list:', error);
        }
    };


    useEffect(() => {
        fetchListCategory();
    }, []);


    //_______edit
    const handleEdit = (rowData) => {
        setCategory({
            _id: rowData._id,
            category_name: rowData.category_name
        });

        handleShow();
    };

    //edit
    const handleOnChange = (event, name) => {
        const { value } = event.target;
        const updateCategory = { ...category };
        updateCategory[name] = value;
        setCategory(updateCategory);
    };

    const validateInput = () => {
        // Kiểm tra xem category_name có giá trị không. Nếu không, trả về false.
        if (!category.category_name) {
            toast.error('Bạn điền thiếu tên danh mục');
            return false;
        }
        // Nếu category_name có giá trị, trả về true.
        return true;
    };

    const handleUpdate = async () => {
        try {
            // Nếu hàm trả về false, dừng việc thực hiện hàm handleUpdate.
            if (!validateInput()) {
                return;
            }
            let updateCategory = { ...category, _id: category._id };

            await dispatch(editCategory(updateCategory));
            fetchListCategory();
            handleClose();

        } catch (e) {
            console.log('Error updating profile:', e);

        }
    }

    //delete
    const handleDelete = async (rowData) => {
        try {
            // Gọi action deleteUser với id của người dùng cần xóa
            await dispatch(deleteCategory(rowData._id));

            // Nếu xóa thành công, cập nhật danh sách người dùng và hiển thị thông báo
            fetchListCategory();
        } catch (error) {
            // Nếu xóa thất bại, hiển thị thông báo lỗi
            console.error('Error deleting user:', error);
        }
    };

    //_____create
    const handleOnChangeInput = (event, id) => {
        const value = event.target.value;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const validate = () => {
        // Kiểm tra xem category_name có giá trị không. Nếu không, trả về false.
        if (!state.category_name) {
            toast.error('Bạn điền thiếu tên danh mục');
            return false;
        }
        // Nếu category_name có giá trị, trả về true.
        return true;
    };
    const handleCreateCategory = async () => {
        try {
            if (!validate()) {
                return;
            }
            await dispatch(createCategory(state));
            // Reset the form state after successful user creation
            fetchListCategory();
            setState({
                category_name: ''
            });

        } catch (error) {
            console.error('Error create user:', error);
        }
    }


    return (
        <>
            <div className='category'>
                <Sidebar />
                <div className='category-container'>
                    <Navbar />
                    <div className='category-content'>
                        <div className='top row'>
                            <div className='row px-4 my-3 '>
                                <div className='title-top col-2'>Thêm danh mục</div>

                            </div>
                            <form className="row g-2 px-4">

                                <div className="col-md-5 mb-2">
                                    <label className="form-label">Tên danh mục</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={state.category_name}
                                        onChange={(event) => handleOnChangeInput(event, 'category_name')}
                                    ></input>
                                </div>

                                <div className='col-12'>
                                    <Button className="btn btn-save text-light" onClick={handleCreateCategory} style={{ backgroundColor: "#85d400", borderColor: "#85d400" }}>
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
                                                {/* Kiểm tra xem listCategory có dữ liệu không */}
                                                {listCategory.length > 0 && (
                                                    // Nếu có, sử dụng hàm map để tạo một TableRow cho mỗi phần tử trong listCategory
                                                    listCategory.map((row) => (
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
                                <Product_Category listNameCategory={listCategory} />

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
                                    value={category.category_name}
                                    onChange={(event) => handleOnChange(event, 'category_name')}
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

export default Category;