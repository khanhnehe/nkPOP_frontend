import adminReducer from "../reducer/adminReducer";
import { toast } from "react-toastify";
import actionTypes from "./actionTypes";
import { createOrderApi, getCartByUseIdApi, addCartApi } from "../../services/userService";

export const createOrder = (data) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // Log giá trị của token ra console
            const response = await createOrderApi(token, data);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.CREATE_ORDER_FAILED,
                });

            } else {
                dispatch({
                    type: actionTypes.CREATE_ORDER_SUCCESS,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.CREATE_ORDER_FAILED,
            });
            console.log(error)
        }
    };
};

export const getCartByUseId = (userId) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;

            const response = await getCartByUseIdApi(token, userId);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.LIST_ORDER_FAILED
                })
            }
            else {
                dispatch({
                    type: actionTypes.LIST_ORDER_SUCCESS,
                    payload: {
                        cart: response.cart
                    }
                })
            }

        } catch (e) {
            dispatch({
                type: actionTypes.LIST_ORDER_FAILED,
                payload: e.response ? e.response.message : e.message
            }); console.error('Error:', e);
        }

    }

}

export const addCartProduct = (data) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // Log giá trị của token ra console
            const response = await addCartApi(token, data);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.ADD_PRODUCT_ORDER_FAILED,
                });
                toast.error(response.message || response.errMessage);

            } else {
                dispatch({
                    type: actionTypes.ADD_PRODUCT_ORDER_SUCCESS,
                });
                toast.success('Thêm sản phẩm vào giỏ hàng thành công');
                console.log('ADD_PRODUCT_ORDER_SUCCESS action dispatched'); // Add this line

            }
        } catch (error) {
            dispatch({
                type: actionTypes.ADD_PRODUCT_ORDER_FAILED,
                payload: error.response ? error.response.message : error.message

            });
            console.log(error)
        }
    };
};