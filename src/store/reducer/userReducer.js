import actionTypes from "../actions/actionTypes";

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

        default:
            return state;
    }
};

export default userReducer;
