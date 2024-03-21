import adminReducer from "../reducer/adminReducer";
import { toast } from "react-toastify";
import actionTypes from "./actionTypes";
import { createOrderApi, getCartByUseIdApi } from "../../services/userService";

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