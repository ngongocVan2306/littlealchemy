import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";
import persistStore from "redux-persist/es/persistStore";
import { Persistor } from "redux-persist";
import optionSlice from "./optionSlice";
import themeSlice from "./themeSlice";
import positionSlice from "./positionSlice";

const persistConfig = {
    key: "root",
    storage,
};
const optionPersist = persistReducer(persistConfig, optionSlice);
const themePersist = persistReducer(persistConfig, themeSlice);
const positionPersist = persistReducer(persistConfig, positionSlice);

export const store = configureStore({
    reducer: {
        optionSlice: optionPersist,
        themeSlice: themePersist,
        positionSlice: positionPersist,
    },

    middleware: [thunk],
});

export const persistor: Persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
