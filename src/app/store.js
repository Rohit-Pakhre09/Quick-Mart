import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../modules/productSlice"

export const store = configureStore({
    reducer: {
        product: productReducer,
    }
});