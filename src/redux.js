import { createStore } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
// const reduxStore = createStore(persistedReducer, composeEnhancers(applyMiddleware));
const reduxStore = createStore(persistedReducer);

export const persistor = persistStore(reduxStore);

export default reduxStore;