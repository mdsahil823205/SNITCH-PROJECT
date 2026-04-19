import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})
export const register = async (email, password, fullName, contact, isSeller) => {
    try {
        const response = await api.post("/register", {
            email,
            password,
            fullName,
            contact,
            isSeller
        })
        return response.data
    } catch (error) {
        // Throw so useAuth catch block can handle it properly
        throw new Error(error.response?.data?.message || "Registration failed")
    }
}
export default api