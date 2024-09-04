import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface stateSlice {
    lastX: number;
    lastY: number;
}
const initState: stateSlice = {
    lastX: 0,
    lastY: 0,
};

export const positionSlice = createSlice({
    initialState: initState,
    name: "positionSlice",
    reducers: {
        saveLastDrag(state, action: PayloadAction<{ x: number; y: number }>) {
            state.lastX = action.payload.x;
            state.lastY = action.payload.y;
        },

        clearDrag(state) {
            state.lastX = 0;
            state.lastY = 0;
        },
    },
});

export const { saveLastDrag, clearDrag } = positionSlice.actions;

export default positionSlice.reducer;
