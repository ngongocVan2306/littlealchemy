import { createSlice } from "@reduxjs/toolkit";

interface stateSlice {
    isDark: boolean;
}
const initState: stateSlice = {
    isDark: true,
};

export const themeSlice = createSlice({
    initialState: initState,
    name: "themeSlice",
    reducers: {
        changeThame(state) {
            state.isDark = !state.isDark;
        },
    },
});

export const { changeThame } = themeSlice.actions;

export default themeSlice.reducer;
