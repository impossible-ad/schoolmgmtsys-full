import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./features/authState.js"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)


const store = configureStore({
    reducer: {
        user: persistedReducer,
    },

    //to resolve serialized/unserialized value issue in frontend console
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

export const persistor = persistStore(store);
export default store;