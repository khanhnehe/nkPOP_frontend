import axios from "../axios"

const loginApiService = (userEmail, userPassword) => {
    // trong function này ta cần gọi đến cái server nodejs của we
    // để gọi đc ta cần dùng 1 cái pakage bên phía client để gửi 1 cái request lên phía server
    //pakage tên là axios

    return axios.post('/login', { email: userEmail, password: userPassword })
}

const ResisterApiService = (data) => {
    return axios.post('/register', data)
}

const logoutApi = () => {
    return axios.post('/logout')
}

// truyền thêm token vì được protected
const updateUserApi = (inputData, token) => {
    return axios.put('/updateUser', inputData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

}

const updatePhotoApi = (inputData, token) => {
    return axios.put('/updatePhoto', inputData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

}


const getAllUserApi = (token) => {
    return axios.get('/admin/getAllUser', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

}

const deleteUserApi = (token, userId) => {
    return axios.delete(`/admin/deleteUser/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}


const createUserApi = (token, data) => {
    return axios.post(`/admin/createUser`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
//Category
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

const searchProductApi = (token, query) => {
    return axios.get(`/search?q=${query}`, {
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



export {
    loginApiService,
    // phân loại outseding
    makeupProductApi,
    hairProductApi,
    //các action user
    ResisterApiService,
    createUserApi,
    logoutApi,
    updateUserApi,
    updatePhotoApi,
    // phần admin
    getAllProductApi,
    getAllUserApi,
    deleteUserApi,
    getAllCategoryApi, getAllBrandApi, getAllTypeApi,
    editCategoryApi, editBrandApi, editTypeApi, editProductApi,
    deleteCategoryApi, deleteBrandApi, deleteTypeApi, deleteProductApi,
    createCategoryApi, createBrandApi, createTypeApi, createProductApi,
    //lọc theo cbt
    productCategoryApi, productBrandApi, productTypeApi,
    //find
    detailProductApi,
    searchProductApi,
    //lọc theo price, luọt bán 
    filterByPriceApi, getTopSellingApi,

    //__order
    createOrderApi,
    getCartByUseIdApi
}