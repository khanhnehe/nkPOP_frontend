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



export {
    loginApiService,
    ResisterApiService,
    logoutApi,
    updateUserApi,
    updatePhotoApi
}