import actionTypes from "../actions/actionTypes";

const initialState = {
    allProduct: [],  // Danh sách sản phẩm, ban đầu là một mảng trống
    allUser: [],
    infoUser: null,
    allCategory: [],
    productCategory: [],
    //brand
    allBrand: [],
    productBrand: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_All_PRODUCT_SUCCESS:
            // Cập nhật state với danh sách sản phẩm từ action
            return {
                ...state,
                allProduct: action.payload.product
            };

        case actionTypes.GET_All_PRODUCT_FAILED:
            // Cập nhật state với danh sách sản phẩm trống
            return {
                ...state,
                allProduct: [],
            };

        case actionTypes.GET_All_USER_SUCCESS:
            // Cập nhật state với danh sách sản phẩm từ action
            return {
                ...state,
                allUser: action.payload.user
            };

        case actionTypes.GET_All_USER_FAILED:
            // Cập nhật state với danh sách sản phẩm trống
            return {
                ...state,
                allUser: [],
            };

        case actionTypes.UPDATE_USER_SUCCESS:
            // Cập nhật state với danh sách sản phẩm từ action
            return {
                ...state,
                infoUser: action.payload.user
            };

        case actionTypes.UPDATE_USER_FAILED:
            // Cập nhật state với danh sách sản phẩm trống
            return {
                ...state,
                infoUser: [],
            };

        case actionTypes.GET_All_CATEGORY_SUCCESS:
            // Cập nhật state với danh sách sản phẩm từ action
            return {
                ...state,
                allCategory: action.payload.category
            };

        case actionTypes.GET_All_CATEGORY_FAILED:
            // Cập nhật state với danh sách sản phẩm trống
            return {
                ...state,
                allCategory: [],
            };

        case actionTypes.GET_All_PRODUCT_CATEGORY_SUCCESS:
            // Cập nhật state với danh sách sản phẩm từ action
            return {
                ...state,
                productCategory: action.payload.product
            };

        case actionTypes.GET_All_PRODUCT_CATEGORY_FAILED:
            // Cập nhật state với danh sách sản phẩm trống
            return {
                ...state,
                productCategory: [],
            };

        //brand
        case actionTypes.GET_All_BRAND_SUCCESS:
            // Cập nhật state với danh sách sản phẩm từ action
            return {
                ...state,
                allBrand: action.payload.brand
            };

        case actionTypes.GET_All_BRAND_FAILED:
            // Cập nhật state với danh sách sản phẩm trống
            return {
                ...state,
                allBrand: [],
            };

        case actionTypes.GET_All_PRODUCT_BRAND_SUCCESS:
            // Cập nhật state với danh sách sản phẩm từ action
            return {
                ...state,
                productBrand: action.payload.product
            };

        case actionTypes.GET_All_PRODUCT_BRAND_FAILED:
            // Cập nhật state với danh sách sản phẩm trống
            return {
                ...state,
                productBrand: [],
            };

        default:
            return state;
    }
};

export default adminReducer;
