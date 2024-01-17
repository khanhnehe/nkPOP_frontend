import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { loginApiService, ResisterApiService } from "../../../services/userService";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const initialState = {
    isLoggedIn: false,
    isSuccess: false,
    userInfo: null,
    isError: '',
}

export const register = createAsyncThunk(
    "auth/register", // Tên của action.
    async (data, thunkAPI) => {
        try {
            // Gọi API với đối tượng data chứa các trường cần thiết.
            return await ResisterApiService(data);
        } catch (error) {
            // Trả về lỗi nếu có.
            const message = (error.response
                && error.response.data
                && error.response.data.message) ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const authSlice = createSlice({
    name: 'auth', // Tên của slice.
    initialState,
    reducers: { // Định nghĩa các reducer.
        RESET_AUTH(state) { // Reducer để reset trạng thái auth.
            state.isSuccess = false;
            state.isError = '';
        }
    },// Định nghĩa các extra reducer
    extraReducers: (builder) => {
        builder
            // action đăng ký đang được xử lý.
            .addCase(register.pending, (state) => {
                // state.isLoading = true // Đặt trạng thái đang tải.
            })
            // Khi action đăng ký thành công.
            .addCase(register.fulfilled, (state, action) => {
                // state.isLoading = false;
                state.isLoggedIn = true;
                state.isSuccess = true;
                state.isError = action.payload.message; // Lưu thông báo từ payload của action.
                state.userInfo = action.payload.user; // Lưu thông tin người dùng từ payload của action.
            })
            // Khi action đăng ký thất bại.
            .addCase(register.rejected, (state, action) => {
                // state.isLoading = false;
                state.userInfo = null; // Xóa thông tin người dùng.
                state.isError = action.error.message; // Lưu thông báo lỗi từ action.
            })
    }
})

export const { RESET_AUTH } = authSlice.actions;
// Xuất reducer của slice để sử dụng khi cấu hình store.
export default authSlice.reducer; 