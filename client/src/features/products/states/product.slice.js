import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
    name: "products",
    initialState: {
        sellerProducts: [],
        loading: false,
        error: null
    }, reducers: {
        setSellerProduct: (state, action) => {
            state.sellerProducts = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})
export const { setSellerProduct, setLoading, setError } = productSlice.actions
export default productSlice.reducer