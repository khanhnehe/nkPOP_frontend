import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./Profile.scss"
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { editProfile, updatePhoto } from '../../store/actions/userActions';

const Profile = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, userInfo } = useSelector(state => state.user);
    // const lastName = userInfo && userInfo.lastName;
    // const firstName = userInfo && userInfo.firstName;

    const inintalState = {
        userId: userInfo ? userInfo._id : '',
        lastName: userInfo ? userInfo.lastName : '',
        firstName: userInfo ? userInfo.firstName : '',
        email: userInfo ? userInfo.email : '',
        phoneNumber: userInfo ? userInfo.phoneNumber : '',
        image: userInfo ? userInfo.image : '',
        address: userInfo ? userInfo.address : '',
        role: userInfo ? userInfo.role : ''
    }

    const [profile, setProfile] = useState(inintalState);

    const handleOnChange = (event, name) => {
        const { value } = event.target; // Lấy giá trị mới từ sự kiện
        const updatedProfile = { ...profile }; // Tạo một bản sao của state hiện tại
        updatedProfile[name] = value; // Cập nhật giá trị của trường tương ứng trong bản sao
        setProfile(updatedProfile); // Cập nhật state với bản sao đã được cập nhật
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
        return isValid
    }

    const handleUpdate = async () => {
        try {
            let isValid = validateInput();
            if (!isValid) {
                return;
            }

            // Lấy trạng thái hiện tại và token từ Redux state
            let updatedProfile = { ...profile, _id: profile.userId };


            // Gọi hàm dispatch để cập nhật thông tin người dùng
            await dispatch(editProfile(updatedProfile));

            handleClose(); // Đóng modal sau khi cập nhật thành công
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    }



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // show ảnh
    const [showImg, setShowImg] = useState(false);
    const handleCloseImg = () => setShowImg(false);
    const handleShowImg = () => setShowImg(true);

    //up anh
    const fileInputRef = useRef();

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setProfile(prevProfile => ({
                ...prevProfile,
                image: URL.createObjectURL(event.target.files[0])
            }));
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleDeleteImage = () => {
        setProfile(prevProfile => ({ ...prevProfile, image: '' }));
    };

    const handleUpdateImg = async () => {
        try {
            if (profile.image && profile.image !== userInfo.image) {
                await dispatch(updatePhoto({ _id: profile.userId, ...profile }));
            }

            handleCloseImg();
        } catch (error) {
            console.error('Lỗi cập nhật ảnh đại diện:', error);
            toast.error('Cập nhật ảnh đại diện thất bại. Vui lòng thử lại.');
        }
    };

    //update profile

    return (
        <>
            <div className='profile'>
                <div className='row row-big'>
                    <div className='col-3 content-left'>

                        <div className='row account'>
                            <div className='col-4 image'>
                                <img src={profile.image} />
                            </div>
                            <div className='col-6 name'>{profile.lastName} {profile.firstName}</div>
                        </div>
                        <div className='col nav-content'>

                            <NavLink to="/profile/account" activeClassName="active" className='row child-nav'>Tài khoản</NavLink>
                            <NavLink to="/profile/my-order" activeClassName="active" className='row child-nav'>Đơn hàng</NavLink>
                            <NavLink to="/favorite" activeClassName="active" className='row child-nav'>Sản phẩm yêu thích</NavLink>
                            <NavLink to="/dia-chi-nhan-hang" activeClassName="active" className='row child-nav'>Địa chỉ nhận hàng</NavLink>
                            <NavLink to="/hoi-dap" activeClassName="active" className='row child-nav'>Hỏi đáp</NavLink>
                        </div>
                    </div>

                    <div className='col-8 content'>
                        <div className='row account-right'>
                            <div className='col-2 ben-phai'>
                                <div>
                                    <div className='image-right'>
                                        <img src={profile.image} />
                                    </div>
                                    <span className='text-image' onClick={handleShowImg}>Tải ảnh đại diện</span>

                                </div>
                            </div>

                            <div className='col-9 ben-trai'>
                                <div className="form-group row mb-3">
                                    <label className="  col-sm-3 col-form-label"  >Họ:</label>
                                    <div className="col-sm-6"   >
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={profile.lastName}
                                        ></input>
                                    </div>
                                </div>

                                <div className="form-group row mb-3">
                                    <label className="  col-sm-3 col-form-label"  >Tên:</label>
                                    <div className="col-sm-6"   >
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={profile.firstName}
                                        ></input>
                                    </div>
                                </div>

                                <div className="form-group row mb-3">
                                    <label className="  col-sm-3 col-form-label"  >Email:</label>
                                    <div className="col-sm-6"   >
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={profile.email}
                                        ></input>
                                    </div>
                                </div>

                                <div className="form-group row mb-3">
                                    <label className="  col-sm-3 col-form-label"  >Mật khẩu:</label>
                                    <div className="col-sm-6"   >
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder='.......'

                                        ></input>
                                    </div>
                                </div>

                                <div className="form-group row mb-3">
                                    <label className="  col-sm-3 col-form-label"  >Diện thoại:</label>
                                    <div className="col-sm-6"   >
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={profile.phoneNumber}
                                        ></input>
                                    </div>
                                </div>

                                <div className="form-group row mb-3" >
                                    <label className="  col-sm-3 col-form-label"  >Đại chỉ:</label>
                                    <div className="col-sm-6"   >
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={profile.address}
                                        ></input>
                                    </div>
                                </div>

                                <button type="button"
                                    className="btn btn-edit text-light"
                                    onClick={handleShow}

                                >Chỉnh sửa</button>


                            </div>
                            {/* modal thay đổi thông tin */}

                        </div>
                    </div>
                </div>

                {/* show close modal */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header className='modal-header' closeButton>
                        <Modal.Title >Chỉnh sửa thông tin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='col ben-trai'>
                            <div className="form-group row mb-3">
                                <label className="col-sm-3 col-form-label" >Họ:</label>
                                <div className="col-sm-6"   >
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={profile.lastName}
                                        onChange={(event) => handleOnChange(event, 'lastName')}
                                    ></input>
                                </div>
                            </div>

                            <div className="form-group row mb-3">
                                <label className="  col-sm-3 col-form-label"  >Tên:</label>
                                <div className="col-sm-6"   >
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={profile.firstName}
                                        onChange={(event) => handleOnChange(event, 'firstName')}
                                    ></input>
                                </div>
                            </div>

                            <div className="form-group row mb-3">
                                <label className="  col-sm-3 col-form-label"  >Email:</label>
                                <div className="col-sm-6"   >
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={profile.email}
                                        onChange={(event) => handleOnChange(event, 'email')}

                                    ></input>
                                </div>
                            </div>

                            <div className="form-group row mb-3">
                                <label className="  col-sm-3 col-form-label"  >Mật khẩu:</label>
                                <div className="col-sm-6"   >
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder='.......'
                                    ></input>
                                </div>
                            </div>

                            <div className="form-group row mb-3">
                                <label className="  col-sm-3 col-form-label"  >Diện thoại:</label>
                                <div className="col-sm-6"   >
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={profile.phoneNumber}
                                        onChange={(event) => handleOnChange(event, 'phoneNumber')}

                                    ></input>
                                </div>
                            </div>

                            <div className="form-group row mb-3" >
                                <label className="  col-sm-3 col-form-label"  >Đại chỉ:</label>
                                <div className="col-sm-6"   >
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={profile.address}
                                        onChange={(event) => handleOnChange(event, 'address')}

                                    ></input>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button className="btn btn-save" onClick={handleUpdate} style={{ backgroundColor: "#85d400", borderColor: "#85d400" }}>
                            Lưu thay đổi
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* edit ảnh */}
                <Modal show={showImg} onHide={handleCloseImg}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ảnh đại diện</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='image-right mb-3'>
                            <img src={profile.image} alt="img" />
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <Button variant="primary me-3" onClick={handleUploadClick}>
                            Tải ảnh
                        </Button>
                        <Button variant="danger" onClick={handleDeleteImage}>
                            Xóa ảnh
                        </Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseImg}>
                            Đóng
                        </Button>
                        <Button className="btn btn-save" onClick={handleUpdateImg} style={{ backgroundColor: "#85d400", borderColor: "#85d400" }}>
                            Lưu thay đổi
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default Profile;