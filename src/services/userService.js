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

const updatePhotoApi = async (inputData, token) => {
    const response = await axios.put('/updatePhoto', inputData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    // Kiểm tra xem response.data có tồn tại không
    if (response.data) {
        // Tạo URL đầy đủ cho ảnh
        const imageUrl = `http://localhost:3000/uploads/${response.data.image}`;

        // Trả về phản hồi từ server, bao gồm URL đầy đủ của ảnh
        return {
            ...response,
            data: {
                ...response.data,
                image: imageUrl
            }
        };
    } else {
        console.log('response.data is undefined');
        // Xử lý trường hợp response.data là undefined
    }
}



export {
    loginApiService,
    ResisterApiService,
    logoutApi,
    updateUserApi,
    updatePhotoApi
}