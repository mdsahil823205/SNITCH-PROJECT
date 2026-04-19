import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/state/Auth.slice";
const stores = configureStore({
    reducer: {
        auth: authReducer,
    },
}); 
export default stores;
