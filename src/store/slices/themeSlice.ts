import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeState = {
    mode: "light" | "dark";
};

const initialState: ThemeState = {
    mode: "light", // Mặc định là Light Mode
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<"light" | "dark">) => {
            state.mode = action.payload;
        },
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
