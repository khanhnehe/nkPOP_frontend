import axios from "../axios"

const loginApiService = (userEmail, userPassword) => {
    // trong function này ta cần gọi đến cái server nodejs của we
    // để gọi đc ta cần dùng 1 cái pakage bên phía client để gửi 1 cái request lên phía server
    //pakage tên là axios

    return axios.post('/login', { email: userEmail, password: userPassword })
}


const ResisterApiService = (data) => {
    console.log('ResisterApiService: ', data);

    return axios.post('/register', data)
}

export {
    loginApiService,
    ResisterApiService
}