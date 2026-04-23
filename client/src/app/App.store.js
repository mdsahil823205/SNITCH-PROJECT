import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/state/Auth.slice";
import productReducer from "../../src/features/products/states/product.slice.js"
const stores = configureStore({
    reducer: {
        auth: authReducer,
        product:productReducer
    },
}); 
export default stores;
