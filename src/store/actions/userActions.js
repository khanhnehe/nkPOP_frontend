import { loginApiService } from "../../services/userService";
import { toast } from "react-toastify";
import actionTypes from "./actionTypes";


//login
export const login = (userName, password) => {
    return async (dispatch) => {
        try {
            const userInfo = await loginApiService(userName, password);
            dispatch({
                type: actionTypes.USER_LOGIN_SUCCESS,
                payload: userInfo,
            });
        } catch (e) {
            dispatch({
                type: actionTypes.USER_LOGIN_FAIL,
                payload: e.message,
            });
        }

    }
}
//logout
export const logout = () => {
    return {
        type: actionTypes.PROCESS_LOGOUT,
        payload: null,
    };
};
