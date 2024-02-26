import {
    getAllProductApi, updateUserApi, getAllUserApi, deleteUserApi,
    createUserApi, getAllCategoryApi, editCategoryApi, deleteCategoryApi,
    createCategoryApi, productCategoryApi, createBrandApi, editBrandApi, deleteBrandApi, getAllBrandApi,
    productBrandApi, getAllTypeApi, editTypeApi, deleteTypeApi, createTypeApi, productTypeApi,
    deleteProductApi, editProductApi, createProductApi

} from "../../services/userService";
import adminReducer from "../reducer/adminReducer";
import { toast } from "react-toastify";
import actionTypes from "./actionTypes";


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
                    payload: res.message

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
            // Log giá trị của token ra console
            const response = await updateUserApi(data, token);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.UPDATE_USER_FAILED,
                    payload: response.message
                });
            } else {
                dispatch({
                    type: actionTypes.UPDATE_USER_SUCCESS,
                    payload: {
                        user: response.user
                    }
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

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // console.log('Token:', token);

            const response = await deleteUserApi(token, userId);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.DELETE_USER_SUCCESS,
                });
            } else {
                dispatch({
                    type: actionTypes.DELETE_USER_FAILED,
                });
                toast.success('Xóa người dùng thành công!');
            }
        } catch (error) {
            dispatch({
                type: actionTypes.DELETE_USER_FAILED,
            });
            toast.error('Xóa người dùng thất bại!');
            console.log(error)
        }
    };
};

export const createUser = (data) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // Log giá trị của token ra console
            const response = await createUserApi(token, data);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.CREATE_USER_FAILED,
                });
                toast.error('Có lỗi xảy ra khi Thêm người dùng!');

            } else {
                dispatch({
                    type: actionTypes.CREATE_USER_SUCCESS,
                });
                toast.success('Thêm người dùng thành công!');
            }
        } catch (error) {
            dispatch({
                type: actionTypes.CREATE_USER_FAILED,
            });
            toast.error('Có lỗi xảy ra khi Thêm người dùng!');
            console.log(error)
        }
    };
};


//category
export const getAllCategory = () => {
    return async (dispatch, getState) => {
        try {
            // Lấy state hiện tại từ Redux store
            const state = getState();
            // Lấy access token từ state
            const token = state.user.accessToken;

            const res = await getAllCategoryApi(token);

            if (res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_All_CATEGORY_SUCCESS,
                    payload: {
                        category: res.category
                    }
                });
            } else {
                dispatch({
                    type: actionTypes.GET_All_CATEGORY_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.GET_All_CATEGORY_FAILED,
                payload: error.response ? error.response.message : error.message
            }); console.error('Error:', error);
        }
    };
};

export const editCategory = (data) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // Log giá trị của token ra console
            const response = await editCategoryApi(data, token);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.EDIT_CATEGORY_FAILED,
                    payload: response.message
                });
            } else {
                dispatch({
                    type: actionTypes.EDIT_CATEGORY_SUCCESS,

                });
                toast.success('Cập nhật danh mục thành công!');
            }
        } catch (error) {
            dispatch({
                type: actionTypes.EDIT_CATEGORY_FAILED,
                payload: error.response ? error.response.message : error.message
            });
            toast.error('Có lỗi xảy ra khi cập nhật danh mục!');
            console.log(error)
        }
    };
};

export const deleteCategory = (_id) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // console.log('Token:', token);

            const response = await deleteCategoryApi(token, _id);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.DELETE_CATEGORY_SUCCESS,
                });
            } else {
                dispatch({
                    type: actionTypes.DELETE_CATEGORY_FAILED,
                });
                toast.success('Xóa danh mục thành công thành công!');
            }
        } catch (error) {
            dispatch({
                type: actionTypes.DELETE_CATEGORY_FAILED,
            });
            toast.error('Xóa danh mục thất bại!');
            console.log(error)
        }
    };
};

export const createCategory = (data) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // Log giá trị của token ra console
            const response = await createCategoryApi(token, data);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.CREATE_USER_FAILED,
                });
                toast.error('Có lỗi xảy ra khi Thêm danh mục!');

            } else {
                dispatch({
                    type: actionTypes.CREATE_USER_SUCCESS,
                });
                toast.success('Thêm danh mục thành công!');
            }
        } catch (error) {
            dispatch({
                type: actionTypes.CREATE_USER_FAILED,
            });
            toast.error('Có lỗi xảy ra khi Thêm danh mục!');
            console.log(error)
        }
    };
};

export const productCategory = (categoryId) => {
    return async (dispatch, getState) => {
        try {
            // Lấy state hiện tại từ Redux store
            const state = getState();
            // Lấy access token từ state
            const token = state.user.accessToken;

            const res = await productCategoryApi(token, categoryId);

            if (res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_All_PRODUCT_CATEGORY_SUCCESS,
                    payload: {
                        product: res.product
                    }
                });
            } else {
                dispatch({
                    type: actionTypes.GET_All_PRODUCT_CATEGORY_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.GET_All_PRODUCT_CATEGORY_FAILED,
                payload: error.response ? error.response.message : error.message
            }); console.error('Error:', error);
        }
    };
};

//brand
export const getAllBrand = () => {
    return async (dispatch, getState) => {
        try {
            // Lấy state hiện tại từ Redux store
            const state = getState();
            // Lấy access token từ state
            const token = state.user.accessToken;

            const res = await getAllBrandApi(token);

            if (res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_All_BRAND_SUCCESS,
                    payload: {
                        brand: res.brand
                    }
                });
            } else {
                dispatch({
                    type: actionTypes.GET_All_BRAND_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.GET_All_BRAND_FAILED,
                payload: error.response ? error.response.message : error.message
            }); console.error('Error:', error);
        }
    };
};

export const editBrand = (data) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // Log giá trị của token ra console
            const response = await editBrandApi(data, token);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.EDIT_BRAND_SUCCESS,
                    payload: response.message
                });
            } else {
                dispatch({
                    type: actionTypes.EDIT_BRAND_FAILED,

                });
                toast.success('Cập nhật thương hiệu thành công!');
            }
        } catch (error) {
            dispatch({
                type: actionTypes.EDIT_BRAND_FAILED,
                payload: error.response ? error.response.message : error.message
            });
            toast.error('Có lỗi xảy ra khi thương hiệu danh mục!');
            console.log(error)
        }
    };
};

export const deleteBrand = (_id) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // console.log('Token:', token);

            const response = await deleteBrandApi(token, _id);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.DELETE_BRAND_SUCCESS,
                });
            } else {
                dispatch({
                    type: actionTypes.DELETE_BRAND_FAILED,
                });
                toast.success('Xóa thương hiệu thành công!');
            }
        } catch (error) {
            dispatch({
                type: actionTypes.DELETE_BRAND_FAILED,
            });
            toast.error('Xóa thương hiệu thất bại!');
            console.log(error)
        }
    };
};

export const createBrand = (data) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // Log giá trị của token ra console
            const response = await createBrandApi(token, data);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.CREATE_BRAND_FAILED,
                });
                toast.error('Có lỗi xảy ra khi Thêm thương hiệu!');

            } else {
                dispatch({
                    type: actionTypes.CREATE_BRAND_SUCCESS,
                });
                toast.success('Thêm thương hiệu thành công!');
            }
        } catch (error) {
            dispatch({
                type: actionTypes.CREATE_BRAND_FAILED,
            });
            toast.error('Có lỗi xảy ra khi Thêm thương hiệu!');
            console.log(error)
        }
    };
};

export const productBrand = (brandId) => {
    return async (dispatch, getState) => {
        try {
            // Lấy state hiện tại từ Redux store
            const state = getState();
            // Lấy access token từ state
            const token = state.user.accessToken;

            const res = await productBrandApi(token, brandId);

            if (res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_All_PRODUCT_BRAND_SUCCESS,
                    payload: {
                        product: res.product
                    }
                });
            } else {
                dispatch({
                    type: actionTypes.GET_All_PRODUCT_BRAND_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.GET_All_PRODUCT_BRAND_FAILED,
                payload: error.response ? error.response.message : error.message
            }); console.error('Error:', error);
        }
    };
};

//type
export const getAllType = () => {
    return async (dispatch, getState) => {
        try {
            // Lấy state hiện tại từ Redux store
            const state = getState();
            // Lấy access token từ state
            const token = state.user.accessToken;

            const res = await getAllTypeApi(token);

            if (res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_All_TYPE_SUCCESS,
                    payload: {
                        type: res.type
                    }
                });
            } else {
                dispatch({
                    type: actionTypes.GET_All_TYPE_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.GET_All_TYPE_FAILED,
                payload: error.response ? error.response.message : error.message
            }); console.error('Error:', error);
        }
    };
};

export const editType = (data) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // Log giá trị của token ra console
            const response = await editTypeApi(data, token);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.EDIT_TYPE_SUCCESS,
                    payload: response.message
                });
            } else {
                dispatch({
                    type: actionTypes.EDIT_TYPE_FAILED,

                });
                toast.success('Cập nhật phân loại thành công!');
            }
        } catch (error) {
            dispatch({
                type: actionTypes.EDIT_TYPE_FAILED,
                payload: error.response ? error.response.message : error.message
            });
            toast.error('Có lỗi xảy ra khi cập nhật phân loại!');
            console.log(error)
        }
    };
};

export const deleteType = (_id) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // console.log('Token:', token);

            const response = await deleteTypeApi(token, _id);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.DELETE_TYPE_SUCCESS,
                });
            } else {
                dispatch({
                    type: actionTypes.DELETE_TYPE_FAILED,
                });
                toast.success('Xóa phân loại thành công!');
            }
        } catch (error) {
            dispatch({
                type: actionTypes.DELETE_TYPE_FAILED,
            });
            toast.error('Xóa phân loại thất bại!');
            console.log(error)
        }
    };
};

export const createType = (data) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // Log giá trị của token ra console
            const response = await createTypeApi(token, data);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.CREATE_TYPE_FAILED,
                });
                toast.error('Có lỗi xảy ra khi Thêm phân loại!');

            } else {
                dispatch({
                    type: actionTypes.CREATE_TYPE_SUCCESS,
                });
                toast.success('Thêm phân loại thành công!');
            }
        } catch (error) {
            dispatch({
                type: actionTypes.CREATE_TYPE_FAILED,
            });
            toast.error('Có lỗi xảy ra khi thêm phân loại!');
            console.log(error)
        }
    };
};

export const productType = (typeId) => {
    return async (dispatch, getState) => {
        try {
            // Lấy state hiện tại từ Redux store
            const state = getState();
            // Lấy access token từ state
            const token = state.user.accessToken;

            const res = await productTypeApi(token, typeId);

            if (res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_All_PRODUCT_TYPE_SUCCESS,
                    payload: {
                        product: res.product
                    }
                });
            } else {
                dispatch({
                    type: actionTypes.GET_All_PRODUCT_TYPE_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.GET_All_PRODUCT_TYPE_FAILED,
                payload: error.response ? error.response.message : error.message
            }); console.error('Error:', error);
        }
    };
};

//product
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


export const editProduct = (data) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // Log giá trị của token ra console
            const response = await editProductApi(data, token);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.EDIT_PRODUCT_SUCCESS,
                    payload: response.message
                });
            } else {
                dispatch({
                    type: actionTypes.EDIT_PRODUCT_FAILED,

                });
                toast.success('Cập nhật sản phẩm thành công!');
            }
        } catch (error) {
            dispatch({
                type: actionTypes.EDIT_PRODUCT_FAILED,
                payload: error.response ? error.response.message : error.message
            });
            toast.error('Có lỗi xảy ra khi cập nhật sản phẩm!');
            console.log(error)
        }
    };
};

export const deleteProduct = (_id) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // console.log('Token:', token);

            const response = await deleteProductApi(token, _id);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.DELETE_PRODUCT_SUCCESS,
                });
            } else {
                dispatch({
                    type: actionTypes.DELETE_PRODUCT_FAILED,
                });
                toast.success('Xóa sản phẩm thành công!');
            }
        } catch (error) {
            dispatch({
                type: actionTypes.DELETE_PRODUCT_FAILED,
            });
            toast.error('Xóa sản phẩm thất bại!');
            console.log(error)
        }
    };
};

export const createProduct = (data) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;
            // Log giá trị của token ra console
            const response = await createProductApi(token, data);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.CREATE_PRODUCT_FAILED,
                });
                toast.error('Có lỗi xảy ra khi Thêm sản phẩmi!');

            } else {
                dispatch({
                    type: actionTypes.CREATE_PRODUCT_SUCCESS,
                });
                toast.success('Thêm sản phẩm thành công!');
            }
        } catch (error) {
            dispatch({
                type: actionTypes.CREATE_PRODUCT_FAILED,
            });
            toast.error('Có lỗi xảy ra khi thêm sản phẩm!');
            console.log(error)
        }
    };
};