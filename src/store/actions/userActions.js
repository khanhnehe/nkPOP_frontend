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

            // Gọi API để cập nhật thông tin người dùng
            const response = await updateUserApi(data, token);

            // Kiểm tra kết quả trả về từ API
            if (response.errCode !== 0) {
                // Nếu có lỗi, dispatch action xử lý cập nhật thất bại
                dispatch({
                    type: actionTypes.EDIT_USER_FAILED,
                    payload: response.message
                });
            } else {
                // Nếu cập nhật thành công, dispatch action xử lý cập nhật thành công
                dispatch({
                    type: actionTypes.EDIT_USER_SUCCESS,
                });

                // Cập nhật thông tin người dùng trong Redux state
                const updatedUserInfo = { ...getState().user.userInfo, ...data };
                dispatch({
                    type: actionTypes.UPDATE_USER_INFO,
                    payload: updatedUserInfo,
                });

                // Cập nhật local storage
                const updatedState = { ...state.user, userInfo: updatedUserInfo };
                updateLocalStorage(updatedState, true, token);
                toast.success('Cập nhật thông tin thành công!');
            }
        } catch (error) {
            // Xử lý nếu có lỗi trong quá trình gọi API
            dispatch({
                type: actionTypes.EDIT_USER_FAILED,
                payload: error.response ? error.response.message : error.message
            });
            toast.error('Có lỗi xảy ra khi cập nhật thông tin!');
            console.log(error)
        }
    };
};

//update image user
export const updatePhoto = (data) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = state.user.accessToken;

            const response = await updatePhotoApi(data, token);
            if (response.errCode !== 0) {
                dispatch({
                    type: actionTypes.UPDATE_USER_PHOTO_FAILED,
                    payload: response.message
                })
            }
            else {
                // Cập nhật thông tin người dùng trong Redux state
                const updateUserInfo = { ...getState().user.userInfo, ...data }
                dispatch({
                    type: actionTypes.UPDATE_USER_PHOTO_SUCCESS,
                    payload: updateUserInfo
                })
                // Cập nhật local storage
                const updatedState = { ...state.user, userInfo: updateUserInfo };
                updateLocalStorage(updatedState, true, token);
            }
        } catch (error) {
            dispatch({
                type: actionTypes.EDIT_USER_FAILED,
                payload: error.response ? error.response.message : error.message
            });
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

