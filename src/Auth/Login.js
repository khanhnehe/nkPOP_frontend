import React, { useState } from 'react';
import './Login.scss';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { connect } from 'react-redux';
import { login } from '../store/actions/userActions';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await props.LoginRedux(userName, password);
            navigate('/');
        } catch (error) {
            console.log('test thu', error.response);
        }
    }

    const handleOnChangeInputUserName = (event) => {
        setUserName(event.target.value);
    }

    const handleOnChangeInputPassword = (event) => {
        setPassword(event.target.value);
    }

    const handleShowHidePass = () => {
        setIsShowPassword(!isShowPassword);
    }

    return (
        <>
            <div className="login-background">
                <div className='left-content text-center'>
                </div>
                <div className="login-container">

                    <div className="login-content row p-4 p3">

                        <div className="col-md-12 login-input form-group">
                            <div className=" login-title text-center ">ĐĂNG NHẬP</div>

                            <label className="">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email của bạn"
                                value={userName}
                                onChange={handleOnChangeInputUserName}
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
                                    onChange={handleOnChangeInputPassword}
                                >
                                </input>
                                <span onClick={handleShowHidePass}>
                                    <i>
                                        {isShowPassword ? <FaRegEye className="eye-icon" /> : <FaEyeSlash className="eye-icon" />}
                                    </i>

                                </span>

                            </div>
                        </div>

                        <div className="col-md-12" style={{ color: 'black' }}>
                            {/* show error menage */}
                            {props.error}
                        </div>
                        <div>
                            <button type="button" className="col-md-12 login-btn text-light"
                                onClick={handleLogin}>
                                Đăng nhập
                            </button>
                        </div>

                        <div className="text-center  mt-3">
                            Bạn chưa có tài khoản?
                            <span onClick={() => { /* handleRegister function here */ }} className="register-link text-primary ms-2">
                                Đăng ký ngay
                            </span>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
}


const mapStateToProps = state => {
    return {
        error: state.user.error
    };
};
const mapDispatchToProps = dispatch => {
    return {
        LoginRedux: (userName, password) => dispatch(login(userName, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);