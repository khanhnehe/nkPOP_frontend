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

const getAllProductApi = (token) => {
    return axios.get('/admin/getAllProduct', {
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
    return axios.put(`/admin/editBrandry`, data, {
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
export {
    loginApiService,
    ResisterApiService, createUserApi,
    logoutApi,
    updateUserApi,
    updatePhotoApi,
    getAllProductApi,
    getAllUserApi,
    deleteUserApi,
    getAllCategoryApi, getAllBrandApi,
    editCategoryApi, editBrandApi,
    deleteCategoryApi, deleteBrandApi,
    createCategoryApi, createBrandApi,
    productCategoryApi, productBrandApi
}