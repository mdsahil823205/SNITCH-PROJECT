import axios from "axios";
const productInstance = axios.create({
    baseURL: "/api/product",
    withCredentials: true
})
/**
 * @description create product
 * @param {FormData} formData
 * @returns {Promise<Object>}
 */
export const createProduct = async (formData) => {
    try {
        const response = await productInstance.post("/", formData)
        return response.data
    } catch (error) {
        return error.response.data
    }
}
/**
 * @description get all products
 * @returns {Promise<Object>}
 */
export const getAllProducts = async () => {
    try {
        const response = await productInstance.get("/seller")
        return response.data
    } catch (error) {
        return error.response.data
    }
}