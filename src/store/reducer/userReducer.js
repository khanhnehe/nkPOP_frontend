import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoggedIn: false,
    userInfo: '',
    error: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload,
                error: null,
            };
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
                error: action.payload,
            };

        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
                error: action.payload,
            }
        default:
            return state;
    }
};

export default userReducer;