// redux.js

// Import các module và thư viện cần thiết từ Redux và React
import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import rootReducer from './reducer/rootReduce';
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';
import actionTypes from './actions/actionTypes';

// Tạo history để kết nối lịch sử trình duyệt với Redux store
export const history = createBrowserHistory({ basename: process.env.REACT_APP_ROUTER_BASE_NAME });

// Tạo rootReducer sử dụng lịch sử trình duyệt đã tạo
const RootReducer = rootReducer(history);

// Tạo cấu hình cho redux-state-sync middleware
const syncConfig = {
    whitelist: [actionTypes.APP_START_UP_COMPLETE],
};

// Tạo middleware array với routerMiddleware, thunk, và redux-state-sync middleware
const middleware = [
    routerMiddleware(history),  // Middleware để kết nối lịch sử trình duyệt với Redux store
    thunk,  // Middleware cho phép viết các action creator trả về function thay vì các action đồng bộ
    createStateSyncMiddleware(syncConfig),  // Middleware để đồng bộ hóa state giữa các tab trình duyệt
];

// Tạo Redux DevTools Extension compose hoặc sử dụng compose mặc định nếu không có Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Tạo store với rootReducer, middleware và Redux DevTools Extension
const store = createStore(
    RootReducer,
    composeEnhancers(applyMiddleware(...middleware))
);

// Đồng bộ với các tab khác
initStateWithPrevTab(store);

// Xuất store để sử dụng trong toàn bộ ứng dụng
export default store;
