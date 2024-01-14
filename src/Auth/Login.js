import React, { useState } from 'react';
import './Login.scss';
import { loginApiService } from '../services/userService';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../store/actions/userActions';

//truyền props để LoginRedux
const Login = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    // hook  điều hướng 
    const navigate = useNavigate();

    const handleLogin = async () => {
        setErrMessage('');

        try {
            let data = await loginApiService(userName, password);
            if (data && data.errCode !== 0) {
                setErrMessage(data.message);
            } else {
                props.LoginRedux(userName, password);
                navigate('/');
            }
        } catch (error) {
            if (error.response) {
                // Nếu có phản hồi từ server, cập nhật thông báo lỗi trong state
                setErrMessage(error.response.data.message);
            }
            console.log('Lỗi đăng nhập', error);
        }
    };

    const handleOnChangeInputUserName = (event) => {
        setUserName(event.target.value);
    };

    const handleOnChangeInputPassword = (event) => {
        setPassword(event.target.value);
    };

    const handleShowHidePass = () => {
        setIsShowPassword(!isShowPassword);
    };

    return (
        <>
            <div className="login-background">
                <div className='left-content mt-4 text-center'></div>
                <div className="login-container">
                    <div className="login-content row p-4 p3">
                        <div className="col-md-12 login-input form-group">
                            <div className="col-md-12 login-title text-center ">Đăng nhập</div>
                            <label className="">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email của bạn"
                                value={userName}
                                onChange={(event) => handleOnChangeInputUserName(event)}
                            ></input>
                        </div>

                        <div className="col-md-12 login-input form-group mt-4">
                            <label className="">Mật khẩu:</label>
                            <div className="custom-input-pas">
                                <input
                                    type={isShowPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Mật khẩu của bạn"
                                    value={password}
                                    onChange={(event) => handleOnChangeInputPassword(event)}
                                />
                                <span onClick={() => handleShowHidePass()}>
                                    <i>
                                        {isShowPassword ? <FaRegEye className="eye-icon" /> : <FaEyeSlash className="eye-icon" />}
                                    </i>
                                </span>
                            </div>
                        </div>

                        <div className="col-md-12" style={{ color: 'red' }}>
                            {/* Hiển thị thông báo lỗi (nếu có) */}
                            {errMessage}
                        </div>
                        <div>
                            <button
                                type="button"
                                className="col-md-12 login-btn mt-4 text-light"
                                onClick={() => handleLogin()}
                            >
                                Đăng nhập
                            </button>
                        </div>

                        <div className="text-center  mt-4">
                            Bạn chưa có tài khoản?
                            <span onClick={() => navigate('/register')} className="register-link text-primary ms-2">
                                Đăng ký ngay
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        error: state.user.error,
        isLoggedIn: state.isLoggedIn

    };
};
const mapDispatchToProps = dispatch => {
    return {
        LoginRedux: (userName, password) => dispatch(login(userName, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);