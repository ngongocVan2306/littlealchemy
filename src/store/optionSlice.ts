import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem, TItem } from "../utils/interface";
import { handleCombine } from "../helpers/handleCombine";
import { v4 as uuidv4 } from "uuid";
import { optionDefault } from "../utils/optionDefault";

interface stateSlice {
    optionSlice: IItem[];
    itemSlice: IItem[];
    result: number;
}
const initState: stateSlice = {
    optionSlice: optionDefault,
    itemSlice: [],
    result: 4,
};

export const optionSlice = createSlice({
    initialState: initState,
    name: "optionSlice",
    reducers: {
        addItem(state, action: PayloadAction<IItem>) {
            state.itemSlice.push(action.payload);
        },

        dragItem(state, action: PayloadAction<IItem>) {
            if (action.payload.x >= state.optionSlice[0].x - 80) {
                const listItemNew = state.itemSlice.filter(
                    (item) => item.uuid !== action.payload.uuid
                );

                state.itemSlice = [...listItemNew];

                return;
            }

            let isChange = false;
            let typeNew: TItem = "";
            let uuidChange: string | undefined;
            let xItemOld: number = 0;
            let yItemOld: number = 0;

            // check xem 2 cái kết hợp với nhau có dổid thành nguyên tố khác hay không

            state.itemSlice.forEach((item) => {
                let check: TItem = "";
                if (
                    item.uuid !== action.payload.uuid &&
                    Math.abs(item.x - action.payload.x) <= 40 &&
                    Math.abs(item.y - action.payload.y) <= 40
                ) {
                    check = handleCombine(item, action.payload);
                    if (check !== "") {
                        isChange = true;
                        typeNew = check;
                        uuidChange = item.uuid;
                        xItemOld = item.x;
                        yItemOld = item.y;
                    }
                }
            });

            // nếu đổi được

            if (isChange && uuidChange) {
                const filteredItems = state.itemSlice.filter(
                    (item) =>
                        item.uuid !== uuidChange &&
                        item.uuid !== action.payload.uuid
                );

                // cập nhật lại cấc item

                state.itemSlice = [
                    ...filteredItems,
                    {
                        name: typeNew,
                        uuid: uuidv4(),
                        isOption: false,
                        x: (action.payload.x + xItemOld) / 2,
                        y: (action.payload.y + yItemOld) / 2,
                    },
                ];

                // cập nhật thêm option

                let checkIsVald = false;

                state.optionSlice.forEach((item) => {
                    if (item.name === typeNew) {
                        checkIsVald = true;
                    }
                });
                if (!checkIsVald) {
                    state.optionSlice.push({
                        name: typeNew,
                        x: 0,
                        y: 0,
                        uuid: uuidv4(),
                        isOption: true,
                    });

                    // tăng kết qur réult
                    state.result += 1;
                }

                return;
            }

            // nếu không đổi được

            state.itemSlice.forEach((item) => {
                if (item.uuid === action.payload.uuid) {
                    item.x = action.payload.x;
                    item.y = action.payload.y;
                }
            });
        },

        clearItem(state) {
            state.result = 4;
            state.optionSlice = optionDefault;
            state.itemSlice = [];
        },

        reloadOption(state, action: PayloadAction<IItem>) {
            state.optionSlice = [
                ...state.optionSlice.filter(
                    (item) => item.uuid !== action.payload.uuid
                ),
            ];

            state.optionSlice.push({
                name: action.payload.name,
                // x: 0,
                // y: 0,
                x: action.payload.x,
                y: action.payload.y,
                uuid: uuidv4(),
                isOption: true,
            });
        },

        updatePositionOption(state, action: PayloadAction<IItem[]>) {
            state.optionSlice = [...action.payload];
        },
    },
});

export const {
    addItem,
    dragItem,
    clearItem,
    reloadOption,
    updatePositionOption,
} = optionSlice.actions;

export default optionSlice.reducer;
