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


const checkOutOrderApi = (token, data) => {
    return axios.post(`/checkOutOrder`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getOrderValuesApi = (token) => {
    return axios.get(`/admin/getOrderValues`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const tinhFreeShipApi = (token, totalPrice, city) => {
    return axios.post(`/tinhFreeShip`, { totalPrice, city }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getShipPrice_totalPrice = (token, totalPrice, city) => {
    return axios.post(`/getShipPrice-totalPrice`, { totalPrice, city }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getAllOrderApi = (token) => {
    return axios.get(`/admin/getAllOrder`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
// chuyển status của order
const confirmStatusOrderApi = (token, orderId, adminAction) => {
    return axios.put(`/confirmStatusOrder/${orderId}`, { adminAction }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
//lọc đơn chưa xác nhận
const getChoXacNhanApi = (token) => {
    return axios.get(`/admin/getChoXacNhan`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

//filter status theo status
const filterStatusOderApi = (token, statusAdmin) => {
    return axios.get(`/admin/filterStatusOder?statusAdmin=${statusAdmin}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


const addReviewApi = (token, productId, data) => {
    return axios.post(`/addReview/${productId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
const searchOrderApi = (token, search) => {
    return axios.get(`/admin/searchOrder`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            search: search
        }

    })
}
const searchProductApi = (token, searchproduct) => {
    return axios.get(`/search`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            searchproduct: searchproduct
        }
    });
}

const getOrderByUserIdApi =(token, userId)=>{
    return axios.get(`/getOrderByUserId?userId=${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


const weeklyRevenueApi =(token)=>{
    return axios.get(`/admin/weekly`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const dailyRevenueApi =(token)=>{
    return axios.get(`/admin/daily`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const monthlyRevenueApi =(token)=>{
    return axios.get(`/admin/monthly`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getOrderByDateApi = (token, startDate, endDate) => {
    return axios.get(`/admin/getOrderByDate`, {
        params: {
            startDate: startDate.toISOString(), // Chuyển đổi startDate thành chuỗi ISO
            endDate: endDate.toISOString() // Chuyển đổi endDate thành chuỗi ISO
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}




const allPhieuNhapApi = (token) => {
    return axios.get(`/admin/getAllPhieuNhap`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
const changeNhapHangApi = (token, data) => {
    return axios.put(`/admin/changeNhapHang`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const updateNhapHangApi = (token, data) => {
    return axios.put(`/admin/updateNhapHang`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export {
    loginApiService,
    ResisterApiService,
    createUserApi,
    logoutApi,
    updateUserApi,
    updatePhotoApi,
    // phần admin
    getAllUserApi,
    deleteUserApi,
    searchProductApi,
    checkOutOrderApi,
    tinhFreeShipApi,
    getShipPrice_totalPrice,
    getOrderValuesApi,
    //order
    getAllOrderApi,
    confirmStatusOrderApi,
    //lọc orde
    getChoXacNhanApi,
    filterStatusOderApi,
    addReviewApi,
    searchOrderApi,
    getOrderByUserIdApi,
    //doanh thu
    weeklyRevenueApi,
    dailyRevenueApi,
    monthlyRevenueApi,
    getOrderByDateApi,
    changeNhapHangApi,
    allPhieuNhapApi,
    updateNhapHangApi
}
