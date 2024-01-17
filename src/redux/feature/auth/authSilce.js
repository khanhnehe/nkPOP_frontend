// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApiService, ResisterApiService } from '../../../services/userService';

const initialState = {
    isLoggedIn: false,
    isSuccess: false,
    userInfo: null,
    error: '', // Thay đổi tên thành 'error'
};

// Async Thunks
export const loginUser = createAsyncThunk('user/login', async (credentials, { dispatch }) => {
    try {
        const response = await loginApiService(credentials.email, credentials.password);
        dispatch(setUser(response.data));
    } catch (error) {
        if (error.response.data.message) {
            dispatch(setError(error.response.data.message));
        }
    }
});

export const registerUser = createAsyncThunk('user/register', async (userData, { dispatch }) => {
    try {
        const response = await ResisterApiService(userData);
        dispatch(setUser(response.data));
    } catch (error) {
        if (error.response.data.message) {
            dispatch(setError(error.response.data.message));
        }
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload;
            state.isLoggedIn = !!action.payload;
            state.isSuccess = true;
            state.error = ''; // Thay đổi tên thành 'error'
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        clearUser: (state) => {
            state.userInfo = null;
            state.isLoggedIn = false;
            state.isSuccess = false;
            state.error = ''; // Thay đổi tên thành 'error'
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userInfo');
        },
        setError: (state, action) => {
            state.error = action.payload; // Thay đổi tên thành 'error'
            state.isSuccess = false;
        },
        clearError: (state) => {
            state.error = ''; // Thay đổi tên thành 'error'
        },
    },
});

export const { setUser, clearUser, setError, clearError } = userSlice.actions;
export default userSlice.reducer;
