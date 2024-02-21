import { getAllProductApi, updateUserApi, getAllUserApi } from "../../services/userService";
import adminReducer from "../reducer/adminReducer";
import { toast } from "react-toastify";
import actionTypes from "./actionTypes";



export const getAllProduct = () => {
    return async (dispatch, getState) => {
        try {
            // Lấy state hiện tại từ Redux store
            const state = getState();
            // Lấy access token từ state
            const token = state.user.accessToken;

            const res = await getAllProductApi(token);

            if (res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_All_PRODUCT_SUCCESS,
                    payload: {
                        product: res.product
                    }
                });
            } else {
                dispatch({
                    type: actionTypes.GET_All_PRODUCT_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.GET_All_PRODUCT_FAILED,
                payload: error.response ? error.response.message : error.message
            }); console.error('Error:', error);
        }
    };
};

export const getAllUser = () => {
    return async (dispatch, getState) => {
        try {
            // Lấy state hiện tại từ Redux store
            const state = getState();
            // Lấy access token từ state
            const token = state.user.accessToken;

            const res = await getAllUserApi(token);

            if (res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_All_USER_SUCCESS,
                    payload: {
                        user: res.user
                    }
                });
            } else {
                dispatch({
                    type: actionTypes.GET_All_USER_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.GET_All_USER_FAILED,
                payload: error.response ? error.response.message : error.message
            }); console.error('Error:', error);
        }
    };
};

export const updateProfile = (data) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;

            const response = await updateUserApi(data, token);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.UPDATE_USER_FAILED,
                    payload: response.message
                });
            } else {
                dispatch({
                    type: actionTypes.UPDATE_USER_SUCCESS,
                    payload: response.user
                });
                toast.success('Cập nhật thông tin thành công!');
            }
        } catch (error) {
            dispatch({
                type: actionTypes.EDIT_USER_FAILED,
                payload: error.response ? error.response.message : error.message
            });
            toast.error('Có lỗi xảy ra khi cập nhật thông tin!');
            console.log(error)
        }
    };
};