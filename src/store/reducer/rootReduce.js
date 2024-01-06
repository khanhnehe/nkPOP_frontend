// kết hợp tất cả các reducer
import { combineReducers } from 'redux';

//  persistReducer dùng lưu trữ reducer
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


// storage từ redux-persist để sử dụng lưu trữ mặc định (localStorage trong web)
import storage from 'redux-persist/lib/storage';

import userReducer from './userReducer';
import { connectRouter } from 'connected-react-router';
import appReducer from './appReducer';
//


const userPersistConfig = {
    key: 'user',
    storage, // Lưu trữ để sử dụng (localStorage trong web),
    stateReconciler: autoMergeLevel2,//  không ghi đè lên state mà là à hợp nhất lại các thay dổi
    whitelist: ['isLoggedIn', 'userInfo',] // Danh sách các reducer để lưu trữ
};

const appPersistConfig = {
    key: 'app',
    storage, // Lưu trữ để sử dụng (localStorage trong web),
    stateReconciler: autoMergeLevel2,//  không ghi đè lên state mà là à hợp nhất lại các thay dổi
    whitelist: ['',] // Danh sách các reducer để lưu trữ
};

// Kết hợp tất cả các reducer
// const rootReducer = combineReducers({
//     user: userReducer // Sử dụng reducer của người dùng dưới khóa 'user'
// });

export default (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    // admin: adminReducer
})