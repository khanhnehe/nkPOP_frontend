import axios from "../axios"


const getAllCategoryApi = (token) => {
    return axios.get(`/admin/getAllCategory`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const editCategoryApi = (data, token) => {
    return axios.put(`/admin/editCategory`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
const deleteCategoryApi = (token, _id) => {
    return axios.delete(`/admin/deleteCategory/${_id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
const createCategoryApi = (token, data) => {
    return axios.post(`/admin/createCategory`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const productCategoryApi = (token, categoryId) => {
    return axios.get(`/admin/productCategory/${categoryId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
// brand
const getAllBrandApi = (token) => {
    return axios.get(`/admin/getAllBrand`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
const editBrandApi = (data, token) => {
    return axios.put(`/admin/editBrand`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
const deleteBrandApi = (token, _id) => {
    return axios.delete(`/admin/deleteBrand/${_id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
const createBrandApi = (token, data) => {
    return axios.post(`/admin/createBrand`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const productBrandApi = (token, brandId) => {
    return axios.get(`/admin/productBrand/${brandId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
//type
const getAllTypeApi = (token) => {
    return axios.get(`/admin/getAllType`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
const editTypeApi = (data, token) => {
    return axios.put(`/admin/editType`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
const deleteTypeApi = (token, _id) => {
    return axios.delete(`/admin/deleteType/${_id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
const createTypeApi = (token, data) => {
    return axios.post(`/admin/createType`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const productTypeApi = (token, typeId) => {
    return axios.get(`/admin/productType/${typeId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

//product
const getAllProductApi = (token) => {
    return axios.get(`/admin/getAllProduct`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// const getAllProductApi = (token) => {
//     return axios.get('/admin/getAllProduct', {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     })

// }
const editProductApi = (data, token) => {
    return axios.put(`/admin/editProduct`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
const deleteProductApi = (token, _id) => {
    return axios.delete(`/admin/deleteProduct/${_id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
const createProductApi = (token, data) => {
    return axios.post(`/admin/createProduct`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const detailProductApi = (token, productId) => {
    return axios.get(`/admin/detailProduct/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}


//makeu
const makeupProductApi = (token, categoryId) => {
    return axios.get(`/admin/productCategory/${categoryId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

//tóc
const hairProductApi = (token, categoryId) => {
    return axios.get(`/admin/productCategory/${categoryId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
//phân loại theo price 
const filterByPriceApi = (minPrice, maxPrice, token) => {
    return axios.get(`/admin/filterByPrice/`, {
        params: {
            minPrice: minPrice,
            maxPrice: maxPrice
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
//bán chạy 
const getTopSellingApi = () => {
    return axios.get(`/getTopSelling`,
    );
}

//___order
const createOrderApi = (token, data) => {
    return axios.post(`/admin/createOrder`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

//getCartByUseIdApi
const getCartByUseIdApi = (token, userId) => {
    return axios.get(`/getCartByUseId?userId=${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const addCartApi = (token, data) => {
    return axios.post('/addCart', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const deleteitemCartApi = (token, itemId) => {
    return axios.delete(`/deleteProductCart/${itemId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const changeAmountApi = (token, itemId, action) => {
    return axios.put(`/changeAmount/${itemId}`, { action }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export {
    getAllCategoryApi,
    editCategoryApi,
    deleteCategoryApi,
    createCategoryApi,
    productCategoryApi,
    getAllBrandApi,
    editBrandApi,
    deleteBrandApi,
    createBrandApi,
    productBrandApi,
    getAllTypeApi,
    editTypeApi,
    deleteTypeApi,
    createTypeApi,
    productTypeApi,
    getAllProductApi,
    editProductApi,
    deleteProductApi,
    createProductApi,
    detailProductApi,
    makeupProductApi,
    hairProductApi,
    filterByPriceApi,
    getTopSellingApi,
    createOrderApi,
    getCartByUseIdApi,
    addCartApi,
    deleteitemCartApi,
    changeAmountApi
};