import { loginApiService } from "../../services/userService";
import { toast } from "react-toastify";
import actionTypes from "./actionTypes";

// login
export const login = (userName, password) => {
    return async dispatch => {
        try {
            const response = await loginApiService(userName, password);
            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.USER_LOGIN_FAIL,
                    payload: response.message
                });
            } else {
                dispatch({
                    type: actionTypes.USER_LOGIN_SUCCESS,
                    payload: response.user
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.USER_LOGIN_FAIL,
                payload: error.response.message
            });
        }
    };
};

// logout
export const logout = () => {
    return {
        type: actionTypes.PROCESS_LOGOUT,
        payload: '',
    };
};
