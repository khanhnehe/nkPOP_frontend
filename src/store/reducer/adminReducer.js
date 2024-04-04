import actionTypes from "../actions/actionTypes";

const initialState = {
    allUser: [],
    infoUser: null,
    //category
    allCategory: [],
    productCategory: [],
    //brand
    allBrand: [],
    productBrand: [],
    //type
    allType: [],
    productType: [],
    //product
    allProduct: [],
    detailProduct: null,
    listSearchProduct: [],
    makeupProduct: [],
    skinProduct: [],
    hairProduct: [],
    priceProduct: [],
    topProduct: [],
    listCartOrder: [],
    checkOutOrder: [],
    orderValues: [],
    freeShip: [],
    listAllOrders: [],
    listStatusOfOrder: [],
    //search order
    listSearchOrder: []


};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.GET_MAKEUP_PRODUCT_SUCCESS:
            return {
                ...state,
                makeupProduct: action.payload.product
            };

        case actionTypes.GET_MAKEUP_PRODUCT_FAILED:
            return {
                ...state,
                makeupProduct: [],
            };
        //haiir
        case actionTypes.GET_HAIR_PRODUCT_SUCCESS:
            return {
                ...state,
                hairProduct: action.payload.product
            };

        case actionTypes.GET_HAIR_PRODUCT_FAILED:
            return {
                ...state,
                hairProduct: [],
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
                productCategory: [...action.payload.product]
            };


        case actionTypes.GET_All_PRODUCT_CATEGORY_FAILED:
            return {
                ...state,
                productCategory: [],
            };

        //brand
        case actionTypes.GET_All_BRAND_SUCCESS:
            return {
                ...state,
                allBrand: action.payload.brand
            };

        case actionTypes.GET_All_BRAND_FAILED:
            return {
                ...state,
                allBrand: [],
            };

        case actionTypes.GET_All_PRODUCT_BRAND_SUCCESS:
            return {
                ...state,
                productBrand: action.payload.product
            };

        case actionTypes.GET_All_PRODUCT_BRAND_FAILED:
            return {
                ...state,
                productBrand: [],
            };

        //type
        case actionTypes.GET_All_TYPE_SUCCESS:
            return {
                ...state,
                allType: action.payload.type
            };

        case actionTypes.GET_All_TYPE_FAILED:
            return {
                ...state,
                allType: [],
            };

        case actionTypes.GET_All_PRODUCT_TYPE_SUCCESS:
            return {
                ...state,
                productType: action.payload.product
            };

        case actionTypes.GET_All_PRODUCT_TYPE_FAILED:
            return {
                ...state,
                productType: [],
            };

        //product
        case actionTypes.GET_All_PRODUCT_SUCCESS:
            return {
                ...state,
                allProduct: action.payload.product
            };

        //detail product

        case actionTypes.GET_DETAIL_PRODUCT_SUCCESS:
            return {
                ...state,
                detailProduct: action.payload.product
            };

        case actionTypes.GET_DETAIL_PRODUCT_FAILED:
            return {
                ...state,
                detailProduct: null,
            };

        //search
        case actionTypes.GET_SEARCH_PRODUCT_SUCCESS:
            return {
                ...state,
                listSearchProduct: action.payload.product
            };

        case actionTypes.GET_SEARCH_PRODUCT_FAILED:
            return {
                ...state,
                listSearchProduct: [],
            };

        //price
        case actionTypes.GET_PRICE_PRODUCT_SUCCESS:
            return {
                ...state,
                priceProduct: action.payload.product
            };

        case actionTypes.GET_PRICE_PRODUCT_FAILED:
            return {
                ...state,
                priceProduct: [],
            };

        //top product 
        case actionTypes.GET_TOP_PRODUCT_SUCCESS:
            return {
                ...state,
                topProduct: action.payload.product
            };

        case actionTypes.GET_TOP_PRODUCT_FAILED:
            return {
                ...state,
                topProduct: [],
            };

        //listCartOrder
        case actionTypes.LIST_ORDER_SUCCESS:
            return {
                ...state,
                listCartOrder: action.payload.cart
            };

        case actionTypes.LIST_ORDER_FAILED:
            return {
                ...state,
                listCartOrder: [],
            };

        //check out

        case actionTypes.CHECK_OUT_ORDER_SUCCESS:
            return {
                ...state,
                checkOutOrder: action.payload.order
            };

        case actionTypes.CHECK_OUT_ORDER_FAILED:
            return {
                ...state,
                checkOutOrder: [],
            };

        case actionTypes.VALUE_ORDER_SUCCESS:
            return {
                ...state,
                orderValues: action.payload.order
            };

        case actionTypes.VALUE_ORDER_FAILED:
            return {
                ...state,
                orderValues: [],
            };

        case actionTypes.FREE_SHIP_SUCCESS:
            return {
                ...state,
                freeShip: action.payload.tinhFreeShip
            };

        case actionTypes.FREE_SHIP_FAILED:
            return {
                ...state,
                orderValues: [],
            };

        //get all orders
        case actionTypes.GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                listAllOrders: action.payload.order
            };

        case actionTypes.GET_ALL_ORDERS_FAILED:
            return {
                ...state,
                listAllOrders: [],
            };

        //lọc order chờ xác nhận
        case actionTypes.GET_STATUS_ORDERS_SUCCESS:
            return {
                ...state,
                listStatusOfOrder: action.payload.order
            };

        case actionTypes.GET_STATUS_ORDERS_FAILED:
            return {
                ...state,
                listStatusOfOrder: [],
            };

        //search order 
        case actionTypes.SEARCH_ORDERS_SUCCESS:
            return {
                ...state,
                listSearchOrder: action.payload.order
            };

        case actionTypes.SEARCH_ORDERS_FAILED:
            return {
                ...state,
                listSearchOrder: [],
            };




        default:
            return state;
    }
};

export default adminReducer;
