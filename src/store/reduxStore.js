//reduxStore.js
import { createStore, applyMiddleware, compose } from 'redux';
//
import { persistStore, persistReducer } from 'redux-persist';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import rootReducer from './reducer/rootReduce';
//
import storage from 'redux-persist/lib/storage'; // import storage

export const history = createBrowserHistory();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Thêm middleware để log action và state vào console
const loggerMiddleware = store => next => action => {
    console.log('Dispatching:', action);
    const result = next(action);
    console.log('Next state:', store.getState());
    return result;
};


const reduxStore = createStore(
    rootReducer(history),
    composeEnhancer(
        applyMiddleware(
            routerMiddleware(history),
            thunk,
            loggerMiddleware, // Thêm middleware log
        ),
    ),
);

let persistor = persistStore(reduxStore);

export default reduxStore;
export { persistor };
