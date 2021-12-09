import { createStore, compose, combineReducers } from 'redux';
import { throttle } from 'lodash';

import { loadFromLocalStorage, saveToLocalStorage } from './localStorage';
import usersReducer from './users';
import { composeWithDevTools } from 'redux-devtools-extension';

const LOCAL_STORAGE_REDUX_NAME = 'REDUX_USERS';
const LOCAL_STORAGE_THROTTLE_TIME = 2000;

const composeEnhancers =
    process.env.NODE_ENV === 'development' ? () => composeWithDevTools() : compose;

const rootReducer = combineReducers({
    users: usersReducer,
});

const store = createStore(
    rootReducer,
    loadFromLocalStorage<StoreType>(LOCAL_STORAGE_REDUX_NAME),
    composeEnhancers(),
);

store.subscribe(
    throttle(() => {
        saveToLocalStorage({ users: store.getState().users }, LOCAL_STORAGE_REDUX_NAME);
    }, LOCAL_STORAGE_THROTTLE_TIME),
);

export type StoreType = ReturnType<typeof rootReducer>;
export type StoreDispatchType = typeof store.dispatch;

export default store;
