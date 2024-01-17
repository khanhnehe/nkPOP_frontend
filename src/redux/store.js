import { configureStore } from "@reduxjs/toolkit";

// nhập  reducer auth
import authReducer from './feature/auth/authSilce'

// Tạo một store Redux mới bằng  configureStore
export const store = configureStore({
    // Định nghĩa các reducer cho store.
    reducer: {
        // authReducer sẽ quản lý state được gọi là 'auth'
        user: authReducer
    }
})

export default store;
