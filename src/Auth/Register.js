import React, { useState } from 'react';
import './Register.scss';
import { ResisterApiService } from '../services/userService';
import { FaRegEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Register } from '../store/actions/userActions';
import { toast } from 'react-toastify';

// Truyền props để RegisterRedux
const Register = (props) => {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',

    });
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    // Hook điều hướng
    const navigate = useNavigate();

    //show pass
    const handleShowHidePass = () => {
        setIsShowPassword(prevState => !prevState);
    };

    //cập nhật trạng thái trong React. setState với hàm callback nhận vào prevState giúp bạn giữ nguyên trạng thái hiện tại và chỉ cập nhật những phần muốn thay đổi.
    const handleOnChangeInput = (event, id) => {
        let checkState = state; // tạo ra một biến để lưu trữ dữ liệu. "prevState" = gán giá trị hiện tại của state
        const value = event.target.value;
        setState((prevState) => ({
            ...prevState,// Giữ nguyên tất cả giá trị hiện tại
            [id]: value,// Cập nhật giá trị của id
        }));
        console.log('check state', checkState);
    };

    //validate input
    const checkValidateInput = () => {
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




    const handleSubmit = async () => {
        setErrMessage('');
        try {
            let isValid = checkValidateInput();
            if (!isValid) {
                return;
            }

            let response = await ResisterApiService(state)
            if (response && response.errCode !== 0) {
                setErrMessage(response.message);
            }
            else {
                navigate('/login');
                alert('Đăng ký thành công')
            }

        } catch (error) {

        }

    };

    return (
        <>
            <div className="Register-background">
                <div className="left-content mt-4 text-center"></div>
                <div className="Register-container">
                    <div className="Register-content row p-4 p3">
                        <div className="col-md-12 Register-input form-group">
                            <div className="col-md-12 Register-title text-center ">Đăng ký</div>
                            <label className="">Họ:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Họ của bạn"
                                value={state.lastName}
                                onChange={(event) => handleOnChangeInput(event, 'lastName')}
                            ></input>
                        </div>
                        <div className="col-md-12 Register-input form-group mt-4">
                            <label className="">Tên:</label>
                            <div className="custom-input-pas">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tên của bạn"
                                    value={state.firstName}
                                    onChange={(event) => handleOnChangeInput(event, 'firstName')}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 Register-input form-group mt-4">
                            <label className="">Email:</label>
                            <div className="custom-input-pas">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email của bạn"
                                    value={state.email}
                                    onChange={(event) => handleOnChangeInput(event, 'email')}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 Register-input form-group mt-4">
                            <label className="">Mật khẩu:</label>
                            <div className="custom-input-pas">
                                <input
                                    type={isShowPassword ? 'text' : 'password'}
                                    className="form-control"
                                    placeholder="Mật khẩu của bạn"
                                    value={state.password}
                                    onChange={(event) => handleOnChangeInput(event, 'password')}
                                />
                                {/* hide eye */}
                                <span onClick={() => handleShowHidePass()}>
                                    <i>
                                        {isShowPassword ? (
                                            <FaRegEye className="eye-icon" />
                                        ) : (
                                            <FaEyeSlash className="eye-icon" />
                                        )}
                                    </i>
                                </span>
                            </div>
                        </div>
                        <div className="col-md-12 Register-input form-group mt-4">
                            <label className="">Số điện thoại:</label>
                            <div className="custom-input-pas">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="sdt của bạn"
                                    value={state.phoneNumber}
                                    onChange={(event) => handleOnChangeInput(event, 'phoneNumber')}
                                />
                            </div>
                        </div>

                        <div className="col-md-12" style={{ color: 'red' }}>
                            {/* lỗi */}
                            {errMessage}
                        </div>
                        <div>
                            <button
                                type="button"
                                className="col-md-12 Register-btn mt-4 text-light"
                                onClick={() => handleSubmit()}
                            >
                                Đăng ký
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);