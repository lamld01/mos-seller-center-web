import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/languageSlice";
import themeReducer from "./slices/themeSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        language: languageReducer,
        theme: themeReducer,
        auth: authReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
