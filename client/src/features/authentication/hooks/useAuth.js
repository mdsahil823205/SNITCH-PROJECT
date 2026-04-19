import { register } from "../services/Auth.service";
import { setUser, setToken, setAuthicated, setLoading, setError } from "../state/Auth.slice.js";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleRegister = async (email, password, fullName, contact, isSeller = false) => {
        try {
            dispatch(setLoading(true))
            const response = await register(email, password, fullName, contact, isSeller)
            dispatch(setUser(response.user))
            dispatch(setAuthicated(true))
            dispatch(setLoading(false))
            console.log("user registered successfully")
            navigate("/")
        } catch (error) {
            dispatch(setError(error.message))
            dispatch(setLoading(false))
            console.log("user registration failed")
        }
    }
    return { handleRegister }
}