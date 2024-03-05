import React, { useEffect, useState, useRef } from 'react';
import "./Category.scss"
import Sidebar from '../../../components/Sidebar/Sidebar';
import Navbar from '../../../components/Navbar/Navbar';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { MdDeleteOutline } from "react-icons/md";
import { Modal } from 'react-bootstrap';
import { getAllCategory, editCategory, deleteCategory, createCategory, getAllType } from '../../../store/actions/adminAction';
import { RiEdit2Line } from "react-icons/ri";
import { toast } from 'react-toastify';
import Product_Category from './Product_Category';
import Select from 'react-select';
const Category = () => {
    const columns = [
        { id: 'category_name', label: 'Tên danh mục', minWidth: 170 },
        {
            id: 'types', label: 'Tên phân loại', minWidth: 170, render: (rowData) => (
                <div>
                    {rowData.types.map(types => types.type_name).join(', ')}
                </div>
            )
        },
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
            > <MdDeleteOutline /></Button>
        },
    ];
    const dispatch = useDispatch();
    const listCategory = useSelector(state => state.admin.allCategory);
    const [category, setEditCategory] = useState({ category_name: '', types: [] });

    const [state, setSCreateCategory] = useState({ category_name: '', types: [] })
    const listProductType = useSelector(state => state.admin.allType);

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
        dispatch(getAllType());
    }, [dispatch]);

    useEffect(() => {
        fetchListCategory();
    }, []);

    //_______edit
    const handleEdit = (rowData) => {
        setEditCategory({
            _id: rowData._id,
            category_name: rowData.category_name,
            types: rowData.types.map(type => ({ label: type.type_name, value: type._id }))
        }); handleShow();
    };

    //edit
    const handleOnChange = (event, name) => {
        const { value } = event.target;
        const updateCategory = { ...category };
        updateCategory[name] = value;
        setEditCategory(updateCategory);
    };

    const handleOnChangeType = (selectedOptions, actionMeta, id) => {
        if (id === 'types') {
            // Lọc ds danh mục từ Redux chỉ giữ lại những danh mục đã được chọn
            const filter_select_type = listProductType.filter(types =>
                selectedOptions.some(option => option.value === types._id)
            );
            setSelectType(filter_select_type);

            setEditCategory((prevState) => ({
                ...prevState,
                [id]: selectedOptions.map(option => option.value),
            }));
        }
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
            setSelectType([]);

            handleClose();

        } catch (e) {
            console.log('Error updating profile:', e);

        }
    }

    //delete
    const handleDelete = async (rowData) => {
        try {
            await dispatch(deleteCategory(rowData._id));
            fetchListCategory();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    //_____create
    const handleOnChangeInput = (event, id) => {
        const value = event.target.value;
        setSCreateCategory((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const [selectType, setSelectType] = useState([]);

    const handleOnChangeTypeInput = (selectedOptions, actionMeta, id) => {
        if (id === 'types') {
            // Lọc ds danh mục từ Redux chỉ giữ lại những danh mục đã được chọn
            const filter_select_type = listProductType.filter(types =>
                selectedOptions.some(option => option.value === types._id)
            );
            setSelectType(filter_select_type);

            setSCreateCategory((prevState) => ({
                ...prevState,
                [id]: selectedOptions.map(option => option.value),
            }));
        }
    };

    const validate = () => {
        // Kiểm tra xem category_name có giá trị không. Nếu không, trả về false.
        if (!state.category_name) {
            toast.error('Bạn điền thiếu tên danh mục');
            return false;
        }
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
            setSCreateCategory({
                category_name: ''
            });
            setSelectType([]);


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
                                <div className='title-top col-2'>Thêm danh mục</div>  </div>
                            <form className="row g-2 px-4">
                                <div className="col-md-5 mb-2">
                                    <label className="form-label">Tên danh mục</label>
                                    <input type="text" className="form-control" value={state.category_name}
                                        onChange={(event) => handleOnChangeInput(event, 'category_name')}
                                    ></input>
                                </div>
                                <label className="form-label">Phân loại sản phẩm:</label>
                                <div className="col-sm-4">
                                    <Select placeholder="Chọn phân loại..."
                                        styles={{ menu: base => ({ ...base, zIndex: 9999 }) }} // Add this line
                                        isMulti // Cho phép chọn nhiều mục
                                        options={listProductType.map(types => ({
                                            label: types.type_name,
                                            value: types._id,
                                        }))}
                                        value={selectType.map(types => ({
                                            label: types.type_name,
                                            value: types._id,
                                        }))}
                                        onChange={(selectedOptions, actionMeta) =>
                                            handleOnChangeTypeInput(selectedOptions, actionMeta, 'types')
                                        } />
                                </div>
                                <div className='col-12'>
                                    <Button className="btn btn-save text-light" onClick={handleCreateCategory} style={{ backgroundColor: "#85d400", borderColor: "#85d400" }}>
                                        Lưu </Button></div></form> </div>
                        <div className='bottom row'>
                            <div className='title-cate h4 my-3 mx-2'>Danh sách danh mục</div>
                            <div className='col-6'>
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
                                                {listCategory.length > 0 && (
                                                    listCategory.map((row) => (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                                            {columns.map((column) => {
                                                                const value = row[column.id];
                                                                return (
                                                                    <TableCell key={column.id} align={column.align}>
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
                            <div className='col-6'>
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
                            <label className="form-label">Phân loại sản phẩm:</label>
                            <div className="col">
                                <Select placeholder="Chọn phân loại..."
                                    styles={{ menu: base => ({ ...base, zIndex: 9999 }) }}
                                    isMulti options={listProductType.map(types => ({
                                        label: types.type_name,
                                        value: types._id,
                                    }))}
                                    value={selectType.types}
                                    onChange={(selectedOptions, actionMeta) =>
                                        handleOnChangeType(selectedOptions, actionMeta, 'types')
                                    }
                                /> </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn text-light me-2" onClick={handleClose} style={{ backgroundColor: "#92b060", borderColor: "#85d400" }}>
                        Đóng</Button>
                    <Button className="btn btn-save text-light" onClick={handleUpdate} style={{ backgroundColor: "#85d400", borderColor: "#85d400" }}>
                        Lưu thay đổi</Button>
                </Modal.Footer> </Modal>
        </>
    )
}
export default Category;