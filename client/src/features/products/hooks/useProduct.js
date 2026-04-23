import { createProduct, getAllProducts } from "../services/product.service.js"
import { setSellerProduct, setLoading, setError } from "../states/product.slice.js"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const useProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleCreateProduct = async (formData) => {
        try {
            dispatch(setLoading(true))
            const result = await createProduct(formData)
            dispatch(setLoading(false))
            navigate("/")
            console.log(result)
            return result.product
        } catch (error) {
            dispatch(setError(error))
            dispatch(setLoading(false))
            return error
        }
    }
    const handleGetAllProducts = async () => {
        try {
            dispatch(setLoading(true))
            const result = await getAllProducts()
            dispatch(setSellerProduct(result.products))
            console.log(result.products)
            dispatch(setLoading(false))
           
        } catch (error) {
            dispatch(setError(error))
            dispatch(setLoading(false))
        }
    }
    return {
        handleCreateProduct,
        handleGetAllProducts
    }
}