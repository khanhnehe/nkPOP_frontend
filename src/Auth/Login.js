import React, { Component } from 'react';
import './Login.scss';
import { loginApiService } from '../services/userService';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isShowPassword: false,
            errMessage: ''

        };
    }

    componentDidMount() {

    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await loginApiService(this.state.userName, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            else {
                this.props.loginApiService(data.user);
                console.log('login success')
            }

        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log('test thu', error)



        }

    }

    handleOnChangeInputUserName = (event) => {
        //hàm cập nhật lại biến state
        //bên trong là cái biến ta muốn setState
        this.setState({
            userName: event.target.value

        },
            () => console.log('userName', this.state.userName)
        )
    }

    handleOnChangeInputPassword = (event) => {
        this.setState({
            password: event.target.value,

        }, () => console.log('paa', this.state.password)
        )
    }

    //show pass
    handleShowHidePass = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })

    }

    render() {

        return (
            <>
                <div className="login-background">
                    <div className='left-content mt-4 text-center'>
                    </div>
                    <div className="login-container">

                        <div className="login-content row p-4 p3">

                            <div className="col-md-12  login-title text-center ">Đăng nhập</div>

                            <div className="col-md-12 login-input form-group">
                                <label className="">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email của bạn"
                                    value={this.state.userName}
                                    onChange={(event) => this.handleOnChangeInputUserName(event)}
                                ></input>
                            </div>

                            <div className="col-md-12 login-input form-group mt-4">
                                <label className="">Mật khẩu:</label>
                                <div className="custom-input-pas">
                                    <input
                                        type={this.state.isShowPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Mật khẩu của bạn"
                                        value={this.state.password}
                                        onChange={(event) =>
                                            this.handleOnChangeInputPassword(event)
                                        }
                                    >
                                    </input>
                                    <span onClick={() => { this.handleShowHidePass(); }}>
                                        <i>
                                            {this.state.isShowPassword ? <FaRegEye className="eye-icon" /> : <FaEyeSlash className="eye-icon" />}
                                        </i>

                                    </span>

                                </div>
                            </div>

                            <div className="col-md-12" style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                            <div>
                                <button type="button" className="col-md-12 login-btn mt-4 ms-5 text-light"
                                    onClick={() => {
                                        this.handleLogin();
                                    }}>
                                    Đăng nhập
                                </button>
                            </div>

                            <div className="text-center  mt-3">
                                Bạn chưa có tài khoản?
                                <span onClick={() => { this.handleRegister() }} className="register-link text-primary ms-2">
                                    Đăng ký ngay
                                </span>
                            </div>


                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Login;
