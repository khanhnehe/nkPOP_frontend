import React, { useEffect, useState, useRef } from 'react';
import "./createUser.scss"
import { getAllUser, deleteUser, createUser } from '../../store/actions/adminAction';
import { Button } from '@mui/material';
import { getBase64 } from '../../utils/Base64';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const CreateUser = ({ onUserCreated }) => {

    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        image: null, // Store the actual image file here


    });
    const dispatch = useDispatch();
    const fileInputRef = useRef();

    const handleOnChange = (event, id) => {
        const value = event.target.value;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };
    //validate input
    const validateInput = () => {
        let isValid = true;
        let checkArr = ['lastName', 'firstName', 'email', 'password', 'phoneNumber',];

        //lăp để tiếp kiệm thời gian thay gì lặp từng phần tử
        for (let i = 0; i < checkArr.length; i++) {
            if (!state[checkArr[i]]) {
                isValid = false;
                toast.error('Bạn điền thiếu: ' + checkArr[i]); break;
            }
        }
        return isValid;


    }
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = async (event) => {
        const fileList = event.target.files;
        const file = fileList[0];

        if (!file.url && !file.preview) {
            let base64Image = await getBase64(file);
            base64Image = `data:image/jpeg;base64,${base64Image.split(',')[1]}`;
            file.preview = base64Image;
        }

        // Set the actual image file in the state
        setState((prevProfile) => ({ ...prevProfile, image: file }));

        // Set the preview for UI
        setImagePreview(file.preview);
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleCreateUser = async () => {
        try {
            let isValid = validateInput();
            if (!isValid) {
                return;
            }
            await dispatch(createUser(state));
            // Reset the form state after successful user creation
            setState({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                phoneNumber: '',
                address: '',
                image: null,
            });
            setImagePreview(null); // Also reset the image preview

            // Call the onUserCreated callback function
            if (onUserCreated) {
                onUserCreated();
            }
        } catch (error) {
            console.error('Error create user:', error);
        }
    };

    return (
        <>
            <div className="create">
                <div className="top col-12 p3" style={{ height: '470px' }}>

                    <form className="row g-2 p-4">

                        <div className='title-user'>Thêm người dùng</div>
                        <div className="col-md-6 ">
                            <label className="form-label">Họ</label>
                            <input
                                type="text"
                                className="form-control"
                                value={state.lastName}
                                onChange={(event) => handleOnChange(event, 'lastName')}
                            ></input>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Tên</label>
                            <input
                                type="text"
                                className="form-control"
                                value={state.firstName}
                                onChange={(event) => handleOnChange(event, 'firstName')}
                            ></input>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={state.email}
                                onChange={(event) => handleOnChange(event, 'email')}
                            ></input>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Mật Khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                value={state.password}
                                onChange={(event) => handleOnChange(event, 'password')}
                            ></input>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Địa chỉ </label>
                            <input
                                type="text"
                                className="form-control"
                                value={state.address}
                                onChange={(event) => handleOnChange(event, 'address')}
                            ></input>
                        </div>
                        <div className="col-6">
                            <label className="form-label">Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                value={state.phoneNumber}
                                onChange={(event) => handleOnChange(event, 'phoneNumber')}
                            ></input>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Tải ảnh lên </label>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />
                            <Button variant="outlined" onClick={handleUploadClick}
                            >
                                Chọn hình ảnh
                            </Button>
                            {imagePreview && (
                                <img src={imagePreview} style={{ height: '40px', width: '40px', marginTop: '5px' }} />
                            )}
                        </div>

                        <div className='col-12'>
                            <Button className="btn btn-save text-light" onClick={handleCreateUser} style={{ backgroundColor: "#85d400", borderColor: "#85d400" }}>
                                Lưu
                            </Button>
                        </div>

                    </form>
                </div>
            </div>

        </>
    )
}

export default CreateUser;