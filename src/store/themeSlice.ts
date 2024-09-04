import { createSlice } from "@reduxjs/toolkit";

interface stateSlice {
    isDark: boolean;
    lastX: number;
    lastY: number;
}
const initState: stateSlice = {
    isDark: false,
    lastX: 0,
    lastY: 0,
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
