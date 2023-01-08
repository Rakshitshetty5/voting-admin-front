import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './auth/reducer'
import { combineReducers } from 'redux';

const persistConfig = {
    key: 'rootAdmin',
    storage,
    whitelist: ['auth']
}

const rootReducer = combineReducers({
    auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [],
  });
  
  export default store;