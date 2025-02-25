import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Language = "en" | "vi";

interface LanguageState {
    locale: Language;
}

const getInitialLocale = (): Language => {
    if (typeof window !== "undefined") {
        return (localStorage.getItem("locale") as Language) || "en";
    }
    return "en"; // Mặc định khi SSR
};

const initialState: LanguageState = {
    locale: getInitialLocale(),
};

const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<Language>) => {
            state.locale = action.payload;
            if (typeof window !== "undefined") {
                localStorage.setItem("locale", action.payload);
            }
        },
    },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
