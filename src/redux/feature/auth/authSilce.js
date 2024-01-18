// // userSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { loginApiService, ResisterApiService } from '../../../services/userService';

// const initialState = {
//     isLoggedIn: false,
//     userInfo: null,
//     error: '',
// };

// // Async Thunks
// export const loginUser = createAsyncThunk('user/login', async (credentials, { dispatch }) => {
//     try {
//         const response = await loginApiService(credentials.email, credentials.password);
//         if (response.data) {
//             dispatch(setUser(response.data));
//         }
//     } catch (error) {
//         if (error.response && error.response.data && error.response.data.message) {
//             dispatch(setError(error.response.data.message));
//         } else {
//             // Handle other types of errors if needed
//             console.error('Login error:', error);
//         }
//     }
// });

// export const registerUser = createAsyncThunk('user/register', async (userData, { dispatch }) => {
//     try {
//         const response = await ResisterApiService(userData);
//         dispatch(setUser(response.data));
//     } catch (error) {
//         if (error.response.data.message) {
//             dispatch(setError(error.response.data.message));
//         }
//     }
// });

// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         setUser: (state, action) => {
//             state.userInfo = action.payload;
//             state.isLoggedIn = true;
//             state.error = '';
//             localStorage.setItem('isLoggedIn', 'true');
//             localStorage.setItem('userInfo', JSON.stringify(action.payload));
//         },

//         clearUser: (state) => {
//             state.userInfo = null;
//             state.isLoggedIn = false;
//             state.error = '';
//             localStorage.removeItem('isLoggedIn');
//             localStorage.removeItem('userInfo');
//         },

//         setError: (state, action) => {
//             state.error = action.payload;
//         },

//         clearError: (state) => {
//             state.error = '';
//         },
//     },
// });

// export const { setUser, clearUser, setError, clearError } = userSlice.actions;
// export default userSlice.reducer;