import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import storage from 'redux-persist/lib/storage';
import { authApi } from './api/authApi';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import { postApi } from "./api/postApi";
import { userApi } from "./api/userApi";

const persistConfig = {
    key: "root",
    storage,
    version: 1
};


const persistedReducer = persistReducer(persistConfig,
    combineReducers({
        user: authReducer,
    })
);

const store = configureStore({
    reducer: {
        persistedReducer,
        [authApi.reducerPath]: authApi.reducer,
        [postApi.reducerPath]: postApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        }).concat(authApi.middleware, postApi.middleware, userApi.middleware)
    ]
});

export default store;