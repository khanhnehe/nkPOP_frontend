import adminReducer from "../reducer/adminReducer";
import { toast } from "react-toastify";
import actionTypes from "./actionTypes";
import {
    createOrderApi, getCartByUseIdApi, addCartApi,
    deleteitemCartApi, changeAmountApi, checkOutOrderApi,
    getOrderValuesApi, tinhFreeShipApi, getShipPrice_totalPrice,
    getAllOrderApi, confirmStatusOrderApi, getChoXacNhanApi, filterStatusOderApi
} from "../../services/userService";

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


export const deleteitemCart = (itemId) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            const response = await deleteitemCartApi(token, itemId);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.DELETE_PRODUCT_ORDER_FAILED,
                });
                toast.error(response.message || response.errMessage);
            }
            else {
                dispatch({
                    type: actionTypes.DELETE_PRODUCT_ORDER_SUCCESS,
                })
                toast.success('Xóa sản phẩm thành công')
            }

        } catch (e) {
            dispatch({
                payload: e.response ? e.response.message : e.message
            }); console.error('Error:', e);
        }

    }

}

export const changeAmount = (itemId, action) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            const response = await changeAmountApi(token, itemId, action);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.CHANGE_AMOUNT_ORDER_FAILED,
                });
                toast.error(response.message || response.errMessage);
            }
            else {
                dispatch({
                    type: actionTypes.CHANGE_AMOUNT_ORDER_SUCCESS,
                })
            }

        } catch (e) {
            dispatch({
                payload: e.response ? e.response.message : e.message
            }); console.error('Error:', e);
        }

    }

}

export const checkOutOrder = (data) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            const response = await checkOutOrderApi(token, data);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.CHECK_OUT_ORDER_FAILED,
                });
                toast.error('Đặt hàng thất bại');
            }
            else {
                dispatch({
                    type: actionTypes.CHECK_OUT_ORDER_SUCCESS,
                    payload: {
                        order: response.order
                    }
                })
                toast.success('Đặt hàng thành công');
            }

        } catch (e) {
            dispatch({
                payload: e.response ? e.response.message : e.message
            }); console.error('Error:', e);
        }

    }

}

export const getOrderValues = () => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // Log giá trị của token ra console
            const response = await getOrderValuesApi(token);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.VALUE_ORDER_FAILED,
                });

            } else {
                dispatch({
                    type: actionTypes.VALUE_ORDER_SUCCESS,
                    payload: {
                        order: response.order
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.VALUE_ORDER_FAILED,
                payload: error.response ? error.response.message : error.message

            });
            console.log(error)
        }
    };
};

export const tinhFreeShip = (totalPrice, city) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // Log giá trị của token ra console
            const response = await tinhFreeShipApi(token, totalPrice, city);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.FREE_SHIP_FAILED,
                });

            } else {
                dispatch({
                    type: actionTypes.FREE_SHIP_SUCCESS,
                    payload: {
                        tinhFreeShip: response.tinhFreeShip
                    }
                });
                return response.tinhFreeShip; // Return the value here

            }
        } catch (error) {
            dispatch({
                type: actionTypes.FREE_SHIP_FAILED,
                payload: error.response ? error.response.message : error.message

            });
            console.log(error)
        }
    };
};

export const getShipPrice_total = (totalPrice, city) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // Log giá trị của token ra console
            const response = await getShipPrice_totalPrice(token, totalPrice, city);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.TOTAL_SHIP_FAILED,
                });

            } else {
                dispatch({
                    type: actionTypes.TOTAL_SHIP_SUCCESS,
                });
                //lấy ra các giá trị
                return {
                    shippingPrice: response.shippingPrice,
                    totalPriceOrder: response.totalPriceOrder
                }

            }
        } catch (error) {
            dispatch({
                type: actionTypes.TOTAL_SHIP_FAILED,
                payload: error.response ? error.response.message : error.message

            });
            console.log(error)
        }
    };
};

export const getAllOrder = () => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // Log giá trị của token ra console
            const response = await getAllOrderApi(token);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.GET_ALL_ORDERS_FAILED,
                });

            } else {
                dispatch({
                    type: actionTypes.GET_ALL_ORDERS_SUCCESS,
                    payload: {
                        order: response.order
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.GET_ALL_ORDERS_FAILED,
                payload: error.response ? error.response.message : error.message

            });
            console.log(error)
        }
    };
};

export const confirmStatusOrder = (orderId, adminAction) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            const response = await confirmStatusOrderApi(token, orderId, adminAction);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.STATUS_ORDERS_FAILED,
                });
                toast.error('Cập nhật trạng thái đơn hàng thất bại');

            }
            else {
                dispatch({
                    type: actionTypes.STATUS_ORDERS_SUCCESS,
                })
                toast.success('Cập nhật trạng thái đơn hàng thành công');
            }

        } catch (e) {
            dispatch({
                payload: e.response ? e.response.message : e.message
            }); console.error('Error:', e);
        }

    }

}

export const filterStatusOder = (statusAdmin) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // Log giá trị của token ra console
            const response = await filterStatusOderApi(token, statusAdmin);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.GET_STATUS_ORDERS_FAILED,
                });

            } else {
                dispatch({
                    type: actionTypes.GET_STATUS_ORDERS_SUCCESS,
                    payload: {
                        order: response.order
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.GET_ALL_ORDERS_FAILED,
                payload: error.response ? error.response.message : error.message

            });
            console.log(error)
        }
    };
};