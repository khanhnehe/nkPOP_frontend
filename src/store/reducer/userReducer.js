import actionTypes from "../actions/actionTypes";
import adminReducer from "./adminReducer";

const initialState = {
    isLoggedIn: false,
    userInfo: null,  // Thay vì userInfo là một chuỗi, hãy để nó là một đối tượng hoặc null
    error: '',
    accessToken: null, // Thêm trường accessToken

};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload.user,
                accessToken: action.payload.token,
                error: '',
            };
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,  // Đặt userInfo về null khi đăng nhập thất bại
                error: action.payload,
            };

        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,  // Đặt userInfo về null khi đăng xuất
                error: '',
            }
        case actionTypes.UPDATE_USER_SUCCESS:
            // Cập nhật state với danh sách sản phẩm từ action
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    ...action.payload.user,
                }
            };

        case actionTypes.UPDATE_USER_FAILED:
            // Cập nhật state với danh sách sản phẩm trống
            return {
                ...state,
                userInfo: [],
            };
        default:
            return state;
    }
};

export default userReducer;
