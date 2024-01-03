import axios from 'axios';
import _ from 'lodash';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // withCredentials: true
});


//trong khi mà we gọi api thành công thì ta trả về cái response.data 
//thì nó sẽ bỏ bớt thuộc tính thừa của thằng axios
instance.interceptors.response.use(
    (response) => {
        // Thrown error for request with OK status code
        const { data } = response;

        return response.data;
    },
)

export default instance;
