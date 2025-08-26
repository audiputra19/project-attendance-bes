import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { apiAuth } from "../services/api"
import { apiAttendance } from "../services/apiAttendance"
import { apiProfile } from "../services/apiProfile"
import { apiReport } from "../services/apiReport"
import { apiSalary } from "../services/apiSalary"
import authSlice from "./authSlice"
import languageSlice from "./languageSlice"
import { apiLeave } from "../services/apiLeave"
import { apiThr } from "../services/apiThr"

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'language']
}

const rootReducer = combineReducers({
    auth: authSlice,
    language: languageSlice,
    [apiAuth.reducerPath]: apiAuth.reducer,
    [apiAttendance.reducerPath]: apiAttendance.reducer,
    [apiReport.reducerPath]: apiReport.reducer,
    [apiSalary.reducerPath]: apiSalary.reducer,
    [apiProfile.reducerPath]: apiProfile.reducer,
    [apiLeave.reducerPath]: apiLeave.reducer,
    [apiThr.reducerPath]: apiThr.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
    }).concat(
        apiAuth.middleware, 
        apiAttendance.middleware, 
        apiReport.middleware,
        apiSalary.middleware,
        apiProfile.middleware,
        apiLeave.middleware,
        apiThr.middleware,
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;