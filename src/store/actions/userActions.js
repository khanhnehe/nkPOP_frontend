import { loginApiService, logoutApi, updateUserApi, updatePhotoApi } from "../../services/userService";
import { toast } from "react-toastify";
import actionTypes from "./actionTypes";

// Hàm đăng nhập
export const login = (userName, password) => {
    return async dispatch => {
        try {
            // Gọi API để đăng nhập
            const response = await loginApiService(userName, password);

            // Kiểm tra kết quả trả về từ API
            if (response.errCode !== 0) {
                // Nếu có lỗi, dispatch action xử lý đăng nhập thất bại
                dispatch({
                    type: actionTypes.USER_LOGIN_FAIL,
                    payload: response.message
                });
            } else {
                // Nếu đăng nhập thành công, dispatch action xử lý đăng nhập thành công
                dispatch(userLoginSuccess({
                    user: response.user, token: response.token
                }));

                // Cập nhật local storage cho trường hợp đăng nhập
                updateLocalStorage(response.user, true, response.token);
            }
        } catch (error) {
            // Xử lý nếu có lỗi trong quá trình gọi API
            dispatch({
                type: actionTypes.USER_LOGIN_FAIL,
                payload: error.response ? error.response.message : error.message
            });
        }
    };
};

// Hàm xử lý đăng nhập thành công
export const userLoginSuccess = ({ user, token }) => {
    return {
        type: actionTypes.USER_LOGIN_SUCCESS,
        payload: { user, token }
    };
};

// Hàm đăng xuất
export const logout = () => {
    return dispatch => {
        try {
            // Gọi API để đăng xuất
            logoutApi();

            // Dispatch action xử lý quá trình đăng xuất
            dispatch({
                type: actionTypes.PROCESS_LOGOUT,
                payload: null,
            });

            // Cập nhật local storage cho trường hợp đăng xuất
            updateLocalStorage(null, false, null);

            console.log('Logged out successfully');
        } catch (error) {
            console.log('Logout failed');
        }
    };
};

// Hàm chỉnh sửa thông tin người dùng
export const editProfile = (data) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;

            const response = await updateUserApi(data, token);

            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.UPDATE_USER_FAILED,
                    payload: response.message
                });
            } else {
                dispatch({
                    type: actionTypes.UPDATE_USER_SUCCESS,
                    payload: {
                        user: response.user
                    }
                });
                toast.success('Cập nhật thông tin thành công!');
            }
        } catch (error) {
            dispatch({
                type: actionTypes.EDIT_USER_FAILED,
                payload: error.response ? error.response.message : error.message
            });
            toast.error('Có lỗi xảy ra khi cập nhật thông tin!');
            console.log(error)
        }
    };
};

// Hàm updatePhoto nhận vào dữ liệu cần cập nhật và trả về một hàm bất đồng bộ
export const updatePhoto = (data) => {
    return async (dispatch, getState) => {
        try {
            // Lấy state hiện tại từ Redux store
            const state = getState();
            // Lấy access token từ state
            const token = state.user.accessToken;

            // Gọi API để cập nhật ảnh, truyền vào dữ liệu và token
            const response = await updatePhotoApi(data, token);
            // Nếu API trả về lỗi (errCode khác 0)
            if (response.errCode !== 0) {
                // Dispatch action để Redux store cập nhật trạng thái lỗi
                dispatch({
                    type: actionTypes.UPDATE_USER_PHOTO_FAILED,
                    payload: response.message
                })
            }
            else {
                // Nếu API trả về thành công, cập nhật thông tin người dùng trong Redux state
                const updateUserInfo = { ...getState().user.userInfo, ...data }
                // Dispatch action để Redux store cập nhật trạng thái thành công
                dispatch({
                    type: actionTypes.UPDATE_USER_PHOTO_SUCCESS,
                    payload: updateUserInfo
                })
                // Cập nhật local storage với thông tin người dùng mới
                const updatedState = { ...state.user, userInfo: updateUserInfo };
                updateLocalStorage(updatedState, true, token);
            }
        } catch (error) {
            // Nếu có lỗi xảy ra trong quá trình gọi API hoặc xử lý dữ liệu
            // Dispatch action để Redux store cập nhật trạng thái lỗi
            dispatch({
                type: actionTypes.EDIT_USER_FAILED,
                payload: error.response ? error.response.message : error.message
            });
            // Hiển thị thông báo lỗi cho người dùng
            toast.error('Có lỗi xảy ra khi cập nhật thông tin!');
        }
    }
}


// Hàm utility để cập nhật local storage
const updateLocalStorage = (userState, isLoggedIn, accessToken) => {
    const persistUser = {
        isLoggedIn: String(isLoggedIn),
        userInfo: JSON.stringify(userState.userInfo),
        accessToken: JSON.stringify(accessToken),
    };

    localStorage.setItem('persist:user', JSON.stringify(persistUser));
};

