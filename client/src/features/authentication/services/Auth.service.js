import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true
})
export const register = async (email, password, fullName, contact, isSeller) => {
    try {
        const response = await api.post("/auth/register", {
            email,
            password,
            fullName,
            contact,
            isSeller
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export default api